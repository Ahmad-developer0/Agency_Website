/*
 * Vercel serverless wrapper — contact & booking emails.
 * All logic lives in lib/send-core.js so Netlify can share it.
 */
import { sendContactEmail } from "../lib/send-core.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "POST only" });

  const { status, body } = await sendContactEmail(req.body || {});
  return res.status(status).json(body);
}
