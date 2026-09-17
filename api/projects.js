/*
 * Vercel serverless wrapper — public project list.
 * GET (or POST) returns the published portfolio.
 */
import { listPublicProjects } from "../lib/projects-core.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { status, body } = await listPublicProjects();
  return res.status(status).json(body);
}
