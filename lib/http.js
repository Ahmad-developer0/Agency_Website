/*
 * ============================================
 *  CORS for the API — platform-neutral
 *
 *  The API only answers browsers on this site itself. A request
 *  whose Origin is another website is refused, so other sites
 *  can't use our forms, chat or admin API from their pages.
 *  Requests with no Origin (curl, server-to-server) are still
 *  answered; the rate limits in attempt-guard.js cover those.
 *
 *  Extra origins (e.g. a preview domain) can be added with the
 *  ALLOWED_ORIGINS environment variable, comma separated.
 * ============================================
 */

const SITE_ORIGINS = ["https://nexyrastudio.com", "https://www.nexyrastudio.com"];

function allowedOrigins() {
  const extra = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean);
  return [...SITE_ORIGINS, ...extra];
}

/* true when the request may be answered */
export function originAllowed(origin, host) {
  if (!origin) return true;
  let url;
  try { url = new URL(origin); } catch { return false; }
  // Same site as the one serving the API (covers deploy previews too)
  if (host && url.host === String(host).toLowerCase()) return true;
  if (allowedOrigins().includes(url.origin)) return true;
  // Local development
  return !process.env.NETLIFY && !process.env.VERCEL && ["localhost", "127.0.0.1"].includes(url.hostname);
}

/* Response headers for an allowed request */
export function corsHeaders(origin, methods = "POST, OPTIONS") {
  const headers = {
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

export const ORIGIN_REFUSED = { success: false, error: "Origin not allowed" };
