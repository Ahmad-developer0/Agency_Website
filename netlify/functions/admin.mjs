/*
 * Netlify function — intern records admin.
 * Shares lib/admin-core.js with the Vercel handler.
 */
import { adminAction } from "../../lib/admin-core.js";
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

  const { status, body } = await adminAction(input, (context && context.ip) || clientIp(request.headers));
  return new Response(JSON.stringify(body), { status, headers: CORS });
};
