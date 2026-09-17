/*
 * Vercel serverless wrapper — project admin (CRUD + image upload).
 */
import { projectsAdmin } from "../lib/projects-core.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "POST only" });

  const { status, body } = await projectsAdmin(req.body || {});
  return res.status(status).json(body);
}

// Image uploads arrive as base64 — raise the body limit above the 1MB default
export const config = { api: { bodyParser: { sizeLimit: "8mb" } } };
