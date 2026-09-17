/*
 * ============================================
 *  Certificate verification — platform-neutral core
 *  Takes a plain object, returns { status, body }.
 *  Vercel and Netlify wrappers both call this.
 * ============================================
 */

export async function verifyCertificate(input) {
  const raw = (input && input.certificate) || "";
  const certificate = String(raw).trim().toUpperCase();

  if (!certificate) {
    return { status: 400, body: { success: false, error: "Certificate number required" } };
  }

  // Basic shape guard — keeps junk queries away from the database
  if (certificate.length < 4 || certificate.length > 40 || !/^[A-Z0-9\-\/]+$/.test(certificate)) {
    return { status: 200, body: { success: true, found: false } };
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { status: 500, body: { success: false, error: "Database is not configured" } };
  }

  try {
    const query =
      `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/interns` +
      `?certificate_no=eq.${encodeURIComponent(certificate)}` +
      `&select=full_name,certificate_no,role,department,start_date,end_date,issue_date,status,photo_url` +
      `&limit=1`;

    const resp = await fetch(query, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
    });

    if (!resp.ok) {
      console.error("Supabase error:", await resp.text());
      return { status: 500, body: { success: false, error: "Lookup failed" } };
    }

    const rows = await resp.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return { status: 200, body: { success: true, found: false } };
    }

    const r = rows[0];
    return {
      status: 200,
      body: {
        success: true,
        found: true,
        data: {
          name: r.full_name,
          certificate: r.certificate_no,
          role: r.role || "Intern",
          department: r.department || "",
          startDate: r.start_date || "",
          endDate: r.end_date || "",
          issueDate: r.issue_date || "",
          status: r.status || "Completed",
          photo: r.photo_url || "",
        },
      },
    };
  } catch (err) {
    console.error("Verify error:", err);
    return { status: 500, body: { success: false, error: "Lookup failed" } };
  }
}
