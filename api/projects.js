/*
 * Vercel serverless wrapper — public project list.
 * GET (or POST) returns the published portfolio.
 */
import { listPublicProjects } from "../lib/projects-core.js";
import { originAllowed, corsHeaders, ORIGIN_REFUSED } from "../lib/http.js";

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (!originAllowed(origin, req.headers.host)) return res.status(403).json(ORIGIN_REFUSED);
  for (const [k, v] of Object.entries(corsHeaders(origin, "GET, POST, OPTIONS"))) res.setHeader(k, v);

  if (req.method === "OPTIONS") return res.status(204).end();

  const { status, body } = await listPublicProjects();
  return res.status(status).json(body);
}
