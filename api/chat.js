/*
 * Vercel serverless wrapper — website chat assistant.
 * All logic lives in lib/chat-core.js so Netlify can share it.
 */
import { getChatReply } from "../lib/chat-core.js";
import { clientIp } from "../lib/attempt-guard.js";
import { originAllowed, corsHeaders, ORIGIN_REFUSED } from "../lib/http.js";

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (!originAllowed(origin, req.headers.host)) return res.status(403).json(ORIGIN_REFUSED);
  for (const [k, v] of Object.entries(corsHeaders(origin))) res.setHeader(k, v);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "POST only" });

  const { status, body } = await getChatReply(req.body || {}, clientIp(req.headers, req.socket && req.socket.remoteAddress));
  return res.status(status).json(body);
}
