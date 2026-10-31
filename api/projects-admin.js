/*
 * Vercel serverless wrapper — project admin (CRUD + image upload).
 */
import { projectsAdmin } from "../lib/projects-core.js";
import { clientIp } from "../lib/attempt-guard.js";
import { originAllowed, corsHeaders, ORIGIN_REFUSED } from "../lib/http.js";

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (!originAllowed(origin, req.headers.host)) return res.status(403).json(ORIGIN_REFUSED);
  for (const [k, v] of Object.entries(corsHeaders(origin))) res.setHeader(k, v);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "POST only" });

  const { status, body } = await projectsAdmin(req.body || {}, clientIp(req.headers, req.socket && req.socket.remoteAddress));
  return res.status(status).json(body);
}

// Image uploads arrive as base64 — raise the body limit above the 1MB default
export const config = { api: { bodyParser: { sizeLimit: "8mb" } } };
