/*
 * ============================================
 *  Failed-attempt guard — platform-neutral
 *
 *  Counts failed admin logins and failed certificate lookups per
 *  visitor IP in the Supabase table `security_attempts`
 *  (create it with docs/security-setup.sql), and blocks an IP
 *  for a while after too many failures.
 *
 *  If the table is missing or Supabase is unreachable, the guard
 *  logs the problem and lets the request through, so a database
 *  hiccup never locks you out of your own admin panel.
 * ============================================
 */

export const LIMITS = {
  admin: { maxFailures: 5, windowMinutes: 60, lockMinutes: 60 },
  verify: { maxFailures: 10, windowMinutes: 60, lockMinutes: 60 },
};

function db() {
  const url = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_KEY || "";
  if (!url || !key) return null;
  return {
    base: `${url}/rest/v1/security_attempts`,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  };
}

/* Best guess at the visitor's IP from the request headers.
   Vercel and Netlify both set these themselves, so visitors can't fake them. */
export function clientIp(headers, fallback = "") {
  const get = (name) => {
    if (!headers) return "";
    if (typeof headers.get === "function") return headers.get(name) || "";
    return headers[name] || "";
  };
  const ip =
    get("x-nf-client-connection-ip") ||
    get("x-real-ip") ||
    String(get("x-forwarded-for")).split(",")[0] ||
    fallback;
  return String(ip).trim().slice(0, 64) || "unknown";
}

async function readRow(conn, id) {
  const resp = await fetch(`${conn.base}?id=eq.${encodeURIComponent(id)}&select=*`, { headers: conn.headers });
  if (!resp.ok) throw new Error(await resp.text());
  const rows = await resp.json();
  return rows[0] || null;
}

/* { blocked, minutesLeft, failures } for this scope + IP */
export async function checkBlocked(scope, ip) {
  const conn = db();
  if (!conn) return { blocked: false, failures: 0 };
  try {
    const row = await readRow(conn, `${scope}:${ip}`);
    if (!row) return { blocked: false, failures: 0 };
    const until = row.locked_until ? new Date(row.locked_until).getTime() : 0;
    if (until > Date.now()) {
      return { blocked: true, minutesLeft: Math.ceil((until - Date.now()) / 60000), failures: row.failures };
    }
    // Failures older than the window no longer count
    const last = row.last_failure ? new Date(row.last_failure).getTime() : 0;
    const fresh = Date.now() - last < LIMITS[scope].windowMinutes * 60000;
    return { blocked: false, failures: fresh ? row.failures : 0 };
  } catch (err) {
    console.error(`Attempt guard unavailable (${scope}):`, err.message);
    return { blocked: false, failures: 0 };
  }
}

/* Records one failure; returns { blocked, remaining } after it */
export async function recordFailure(scope, ip, priorFailures) {
  const conn = db();
  const { maxFailures, lockMinutes } = LIMITS[scope];
  const failures = (priorFailures || 0) + 1;
  const blocked = failures >= maxFailures;
  if (!conn) return { blocked: false, remaining: maxFailures - failures };

  try {
    const resp = await fetch(`${conn.base}?on_conflict=id`, {
      method: "POST",
      headers: { ...conn.headers, Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({
        id: `${scope}:${ip}`,
        failures,
        last_failure: new Date().toISOString(),
        locked_until: blocked ? new Date(Date.now() + lockMinutes * 60000).toISOString() : null,
      }),
    });
    if (!resp.ok) throw new Error(await resp.text());
  } catch (err) {
    console.error(`Attempt guard could not save (${scope}):`, err.message);
  }
  return { blocked, remaining: Math.max(0, maxFailures - failures) };
}

/* Forgets this IP's failures (after a successful login) */
export async function clearFailures(scope, ip) {
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

  const attempt = String(given || "");
  if (attempt.length === password.length && attempt === password) {
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

function lockedMessage(minutes) {
  return `Too many wrong passwords. This device is blocked for ${minutes} more ${minutes === 1 ? "minute" : "minutes"}.`;
}
