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
  if (req.method === "GET" && status === 200) {
    // Portfolio changes rarely; cache briefly at the edge and in browsers so
    // repeat visits render the portfolio without waiting on Supabase.
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60, stale-while-revalidate=300");
  }
  return res.status(status).json(body);
}
