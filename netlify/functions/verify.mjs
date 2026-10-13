/*
 * Netlify function — certificate verification.
 * Shares lib/verify-core.js with the Vercel handler.
 * Reachable at /api/verify via the redirect in netlify.toml
 */
import { verifyCertificate } from "../../lib/verify-core.js";
import { clientIp } from "../../lib/attempt-guard.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async (request, context) => {
  if (request.method === "OPTIONS") return new Response("", { status: 200, headers: CORS });
  if (request.method !== "POST") {
    return Response.json({ success: false, error: "POST only" }, { status: 405, headers: CORS });
  }

  let input = {};
  try { input = await request.json(); } catch { /* empty body */ }

  const { status, body } = await verifyCertificate(input, (context && context.ip) || clientIp(request.headers));
  return new Response(JSON.stringify(body), { status, headers: CORS });
};
