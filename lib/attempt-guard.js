/*
 * ============================================
 *  Failed-attempt guard — platform-neutral
 *
 *  Counts failed admin logins and failed certificate lookups per
 *  visitor IP in the Supabase table `security_attempts`
 *  (create it with docs/security-setup.sql), and blocks an IP
 *  for a while after too many failures. The same counter also
 *  rate-limits the chat and contact form (every request counts).
 *
 *  If the table is missing or Supabase is unreachable, the guard
 *  logs the problem and falls back to an in-memory counter for
 *  this server instance, so limits still apply (just less strictly).
 * ============================================
 */

import { createHash, timingSafeEqual } from "node:crypto";

export const LIMITS = {
  admin: { maxFailures: 5, windowMinutes: 60, lockMinutes: 60 },
  verify: { maxFailures: 10, windowMinutes: 60, lockMinutes: 60 },
  // Rate limits: here every request counts, not only failures
  chat: { maxFailures: 40, windowMinutes: 10, lockMinutes: 10 },
  send: { maxFailures: 5, windowMinutes: 60, lockMinutes: 60 },
};

// Fallback store when the database is not available: "<scope>:<ip>" → row
const memory = new Map();

function db() {
  const url = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_KEY || "";
  if (!url || !key) return null;
  return {
    base: `${url}/rest/v1/security_attempts`,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  };
}

/* The visitor's IP. Vercel overwrites x-real-ip / x-forwarded-for with
   the real address, so visitors can't fake them there. Netlify passes
   context.ip instead (see the netlify/functions wrappers), so this only
   runs there as a fallback. Other headers such as x-nf-client-connection-ip
   are never read: they pass through from the visitor untouched, and
   trusting them would let anyone fake an IP and dodge the lockout. */
export function clientIp(headers, fallback = "") {
  const get = (name) => {
    if (!headers) return "";
    if (typeof headers.get === "function") return headers.get(name) || "";
    return headers[name] || "";
  };
  const ip = get("x-real-ip") || String(get("x-forwarded-for")).split(",")[0] || fallback;
  return limitKey(ip);
}

/* One key per visitor network. An IPv6 user gets a whole /64 block of
   addresses, so counting single addresses would let them rotate through
   it; the /64 prefix is counted instead. */
export function limitKey(ip) {
  let s = String(ip || "").trim().toLowerCase().replace(/^::ffff:/, "");
  if (s.includes(":")) {
    const [head, tail = ""] = s.split("::");
    const left = head ? head.split(":") : [];
    const right = tail ? tail.split(":") : [];
    const full = s.includes("::")
      ? [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill("0"), ...right]
      : left;
    s = full.slice(0, 4).map((g) => g || "0").join(":") + "::/64";
  }
  return s.slice(0, 64) || "unknown";
}

async function readRow(conn, id) {
  const resp = await fetch(`${conn.base}?id=eq.${encodeURIComponent(id)}&select=*`, { headers: conn.headers });
  if (!resp.ok) throw new Error(await resp.text());
  const rows = await resp.json();
  return rows[0] || null;
}

/* { blocked, minutesLeft, failures } for this scope + IP */
export async function checkBlocked(scope, ip) {
  const id = `${scope}:${ip}`;
  const conn = db();
  let row = memory.get(id) || null;
  if (conn) {
    try {
      row = await readRow(conn, id);
    } catch (err) {
      console.error(`Attempt guard unavailable (${scope}), using memory:`, err.message);
    }
  }
  if (!row) return { blocked: false, failures: 0 };
  const until = row.locked_until ? new Date(row.locked_until).getTime() : 0;
  if (until > Date.now()) {
    return { blocked: true, minutesLeft: Math.ceil((until - Date.now()) / 60000), failures: row.failures };
  }
  // Failures older than the window no longer count
  const last = row.last_failure ? new Date(row.last_failure).getTime() : 0;
  const fresh = Date.now() - last < LIMITS[scope].windowMinutes * 60000;
  return { blocked: false, failures: fresh ? row.failures : 0 };
}

/* Records one failure; returns { blocked, remaining } after it */
export async function recordFailure(scope, ip, priorFailures) {
  const conn = db();
  const { maxFailures, lockMinutes } = LIMITS[scope];
  const failures = (priorFailures || 0) + 1;
  const blocked = failures >= maxFailures;
  const row = {
    id: `${scope}:${ip}`,
    failures,
    last_failure: new Date().toISOString(),
    locked_until: blocked ? new Date(Date.now() + lockMinutes * 60000).toISOString() : null,
  };
  rememberRow(row);

  if (conn) {
    try {
      const resp = await fetch(`${conn.base}?on_conflict=id`, {
        method: "POST",
        headers: { ...conn.headers, Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify(row),
      });
      if (!resp.ok) throw new Error(await resp.text());
    } catch (err) {
      console.error(`Attempt guard could not save (${scope}):`, err.message);
    }
  }
  return { blocked, remaining: Math.max(0, maxFailures - failures) };
}

function rememberRow(row) {
  // Keep the fallback store small on a long-running instance
  if (memory.size > 5000) memory.clear();
  memory.set(row.id, row);
}

/* Counts one request against a rate limit (LIMITS.chat, LIMITS.send).
   Returns null when allowed, or a 429 { status, body } to send back. */
export async function rateLimit(scope, ip) {
  const state = await checkBlocked(scope, ip);
  if (state.blocked) {
    return { status: 429, body: { success: false, error: `Too many requests. Please try again in ${state.minutesLeft} ${state.minutesLeft === 1 ? "minute" : "minutes"}.` } };
  }
  await recordFailure(scope, ip, state.failures);
  return null;
}

/* Forgets this IP's failures (after a successful login) */
export async function clearFailures(scope, ip) {
  memory.delete(`${scope}:${ip}`);
  const conn = db();
  if (!conn) return;
  try {
    await fetch(`${conn.base}?id=eq.${encodeURIComponent(`${scope}:${ip}`)}`, { method: "DELETE", headers: conn.headers });
  } catch (err) {
    console.error(`Attempt guard could not clear (${scope}):`, err.message);
  }
}

/* Shared admin password check for every admin action.
   Returns null when the password is right, or a { status, body } to send back. */
export async function checkAdminPassword(given, ip) {
  const password = process.env.ADMIN_PASSWORD || "";
  if (!password) {
    return { status: 500, body: { success: false, error: "ADMIN_PASSWORD is not set" } };
  }

  const state = await checkBlocked("admin", ip);
  if (state.blocked) {
    return { status: 429, body: { success: false, error: lockedMessage(state.minutesLeft) } };
  }

  if (sameSecret(String(given || ""), password)) {
    if (state.failures > 0) await clearFailures("admin", ip);
    return null;
  }

  // small delay makes guessing over the network slower
  await new Promise((r) => setTimeout(r, 600));
  const after = await recordFailure("admin", ip, state.failures);
  if (after.blocked) {
    return { status: 429, body: { success: false, error: lockedMessage(LIMITS.admin.lockMinutes) } };
  }
  const left = after.remaining;
  return {
    status: 401,
    body: { success: false, error: `Wrong password. ${left} ${left === 1 ? "attempt" : "attempts"} left before this device is blocked.` },
  };
}

/* Constant-time comparison, so response timing reveals nothing about the password */
function sameSecret(a, b) {
  const hash = (v) => createHash("sha256").update(v).digest();
  return timingSafeEqual(hash(a), hash(b));
}

function lockedMessage(minutes) {
  return `Too many wrong passwords. This device is blocked for ${minutes} more ${minutes === 1 ? "minute" : "minutes"}.`;
}
