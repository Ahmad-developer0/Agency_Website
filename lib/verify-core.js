/*
 * ============================================
 *  Certificate verification — platform-neutral core
 *  Takes a plain object, returns { status, body }.
 *  Vercel and Netlify wrappers both call this.
 * ============================================
 */

import { checkBlocked, recordFailure } from "./attempt-guard.js";

/*
 * Privacy: a record is only shown when BOTH the certificate number and
 * the intern's full name match, so nobody can browse other interns'
 * records by trying numbers. Wrong guesses are counted per IP, and after
 * 10 in an hour that IP is blocked for an hour.
 */
export async function verifyCertificate(input, ip = "unknown") {
  const certificate = String((input && input.certificate) || "").trim().toUpperCase();
  const name = normalizeName(input && input.name);

  if (!certificate || !name) {
    return { status: 400, body: { success: false, error: "Enter both the certificate number and the full name" } };
  }

  const state = await checkBlocked("verify", ip);
  if (state.blocked) {
    return {
      status: 429,
      body: { success: false, error: `Too many unsuccessful checks. Please try again in ${state.minutesLeft} minutes.` },
    };
  }

  // Same answer for "no such number" and "wrong name", so neither leaks anything
  const notFound = async () => {
    await recordFailure("verify", ip, state.failures);
    return { status: 200, body: { success: true, found: false } };
  };

  // Basic shape guard — keeps junk queries away from the database
  if (certificate.length < 4 || certificate.length > 40 || !/^[A-Z0-9\-\/]+$/.test(certificate)) {
    return notFound();
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
    const r = Array.isArray(rows) ? rows[0] : null;
    if (!r || normalizeName(r.full_name) !== name) {
      return notFound();
    }

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

/* "  Ali   KHAN " → "ali khan"; also ignores accents and punctuation */
function normalizeName(v) {
  return String(v || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}
