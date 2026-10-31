/*
 * Netlify function — contact & booking emails.
 * Shares lib/send-core.js with the Vercel handler.
 */
import { sendContactEmail } from "../../lib/send-core.js";
import { clientIp, limitKey } from "../../lib/attempt-guard.js";
import { originAllowed, corsHeaders, ORIGIN_REFUSED } from "../../lib/http.js";

export default async (request, context) => {
  const origin = request.headers.get("origin");
  if (!originAllowed(origin, request.headers.get("host"))) {
    return Response.json(ORIGIN_REFUSED, { status: 403 });
  }
  const headers = { ...corsHeaders(origin), "Content-Type": "application/json" };

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method !== "POST") {
    return Response.json({ success: false, error: "POST only" }, { status: 405, headers });
  }

  let input = {};
  try { input = await request.json(); } catch { /* empty body */ }

  const { status, body } = await sendContactEmail(input, context && context.ip ? limitKey(context.ip) : clientIp(request.headers));
  return new Response(JSON.stringify(body), { status, headers });
};
