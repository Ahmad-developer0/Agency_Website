/*
 * Vercel serverless wrapper — contact & booking emails.
 * All logic lives in lib/send-core.js so Netlify can share it.
 */
import { sendContactEmail } from "../lib/send-core.js";
import { clientIp } from "../lib/attempt-guard.js";
import { originAllowed, corsHeaders, ORIGIN_REFUSED } from "../lib/http.js";

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (!originAllowed(origin, req.headers.host)) return res.status(403).json(ORIGIN_REFUSED);
  for (const [k, v] of Object.entries(corsHeaders(origin))) res.setHeader(k, v);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "POST only" });

  const { status, body } = await sendContactEmail(req.body || {}, clientIp(req.headers, req.socket && req.socket.remoteAddress));
  return res.status(status).json(body);
}
