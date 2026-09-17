/*
 * Netlify function — public project list.
 */
import { listPublicProjects } from "../../lib/projects-core.js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async (request) => {
  if (request.method === "OPTIONS") return new Response("", { status: 200, headers: CORS });

  const { status, body } = await listPublicProjects();
  return new Response(JSON.stringify(body), { status, headers: CORS });
};
