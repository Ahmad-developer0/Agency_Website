/*
 * Netlify function — website chat assistant.
 * Shares lib/chat-core.js with the Vercel handler.
 */
import { getChatReply } from "../../lib/chat-core.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async (request) => {
  if (request.method === "OPTIONS") return new Response("", { status: 200, headers: CORS });
  if (request.method !== "POST") {
    return Response.json({ success: false, error: "POST only" }, { status: 405, headers: CORS });
  }

  let input = {};
  try { input = await request.json(); } catch { /* empty body */ }

  const { status, body } = await getChatReply(input);
  return new Response(JSON.stringify(body), { status, headers: CORS });
};
