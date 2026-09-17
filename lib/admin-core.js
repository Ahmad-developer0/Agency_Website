/*
 * ============================================
 *  Intern records admin — platform-neutral core
 *  Takes a plain object, returns { status, body }.
 * ============================================
 */

export async function adminAction(input) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { status: 500, body: { success: false, error: "Database is not configured" } };
  }
  if (!ADMIN_PASSWORD) {
    return { status: 500, body: { success: false, error: "ADMIN_PASSWORD is not set" } };
  }

  const body = input || {};

  // ── Auth ──
  const given = String(body.password || "");
  if (given.length !== ADMIN_PASSWORD.length || given !== ADMIN_PASSWORD) {
    // small delay makes brute forcing over the network less attractive
    await new Promise((r) => setTimeout(r, 600));
    return { status: 401, body: { success: false, error: "Wrong password" } };
  }

  const action = String(body.action || "list");
  const base = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/interns`;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    /* ── LIST ── */
    if (action === "list") {
      const resp = await fetch(`${base}?select=*&order=created_at.desc`, { headers });
      if (!resp.ok) throw new Error(await resp.text());
      return { status: 200, body: { success: true, rows: await resp.json() } };
    }

    /* ── SAVE (insert or update) ── */
    if (action === "save") {
      const r = body.record || {};
      const certificate_no = String(r.certificate_no || "").trim().toUpperCase();
      const full_name = String(r.full_name || "").trim();

      if (!certificate_no) {
        return { status: 400, body: { success: false, error: "Certificate number is required" } };
      }
      if (!full_name) {
        return { status: 400, body: { success: false, error: "Full name is required" } };
      }
      if (!/^[A-Z0-9\-\/]+$/.test(certificate_no)) {
        return {
          status: 400,
          body: { success: false, error: "Certificate number may only contain letters, numbers, - and /" },
        };
      }

      const record = {
        certificate_no,
        full_name,
        role: emptyToNull(r.role),
        department: emptyToNull(r.department),
        start_date: emptyToNull(r.start_date),
        end_date: emptyToNull(r.end_date),
        issue_date: emptyToNull(r.issue_date),
        status: String(r.status || "Completed").trim(),
        photo_url: emptyToNull(r.photo_url),
      };

      const resp = await fetch(`${base}?on_conflict=certificate_no`, {
        method: "POST",
        headers: { ...headers, Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify(record),
      });

      if (!resp.ok) {
        const detail = await resp.text();
        console.error("Save failed:", detail);
        return { status: 400, body: { success: false, error: friendlyError(detail) } };
      }

      const saved = await resp.json();
      return { status: 200, body: { success: true, row: Array.isArray(saved) ? saved[0] : saved } };
    }

    /* ── DELETE ── */
    if (action === "delete") {
      const certificate_no = String(body.certificate_no || "").trim().toUpperCase();
      if (!certificate_no) {
        return { status: 400, body: { success: false, error: "Certificate number is required" } };
      }

      const resp = await fetch(`${base}?certificate_no=eq.${encodeURIComponent(certificate_no)}`, {
        method: "DELETE",
        headers,
      });
      if (!resp.ok) throw new Error(await resp.text());
      return { status: 200, body: { success: true } };
    }

    return { status: 400, body: { success: false, error: "Unknown action" } };
  } catch (err) {
    console.error("Admin error:", err);
    return { status: 500, body: { success: false, error: "Something went wrong" } };
  }
}

function emptyToNull(v) {
  const s = String(v == null ? "" : v).trim();
  return s === "" ? null : s;
}

function friendlyError(detail) {
  if (detail.includes("duplicate key")) return "That certificate number already exists";
  if (detail.includes("invalid input syntax for type date")) return "Check the date fields — use the date picker";
  return "Could not save the record";
}
