/*
 * Netlify function — public project list.
 */
import { listPublicProjects } from "../../lib/projects-core.js";
import { originAllowed, corsHeaders, ORIGIN_REFUSED } from "../../lib/http.js";

export default async (request) => {
  const origin = request.headers.get("origin");
  if (!originAllowed(origin, request.headers.get("host"))) {
    return Response.json(ORIGIN_REFUSED, { status: 403 });
  }
  const headers = { ...corsHeaders(origin, "GET, POST, OPTIONS"), "Content-Type": "application/json" };

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });

  const { status, body } = await listPublicProjects();
  return new Response(JSON.stringify(body), { status, headers });
};
