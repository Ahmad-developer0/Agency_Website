/* ============================================
   Nexyra Studio — local development server

   Serves the static site AND runs the serverless
   functions in api/ the way Vercel does, so
   /api/verify and /api/send work locally.

   Usage:  npm run dev:local     (then open http://localhost:3000)
   Reads environment variables from .env.local
============================================ */

import { createServer } from "node:http";
import { readFile, access } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname } from "node:path";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;

// Same security headers as netlify.toml / vercel.json, so problems show up locally
const SECURITY_HEADERS = {
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob: https:; connect-src 'self' https://challenges.cloudflare.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

/* ── Load .env.local into process.env ── */
async function loadEnv() {
  try {
    const raw = await readFile(join(ROOT, ".env.local"), "utf8");
    let loaded = 0;
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (key) { process.env[key] = value; loaded++; }
    }
    console.log(`  .env.local loaded (${loaded} variables)`);
  } catch {
    console.log("  .env.local not found — API routes will report missing config");
  }
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".mjs":  "text/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml":  "application/xml; charset=utf-8",
  ".txt":  "text/plain; charset=utf-8",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
};

/* ── Minimal Vercel-style res helpers ── */
function decorate(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(obj));
    return res;
  };
  res.send = (body) => { res.end(body); return res; };
  return res;
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => { data += c; });
    req.on("end", () => {
      if (!data) return resolve(undefined);
      try { resolve(JSON.parse(data)); } catch { resolve(data); }
    });
  });
}

/* ── Request handling ── */
const server = createServer(async (req, res) => {
  decorate(res);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { return res.status(400).send("Bad request"); }

  // Never serve dotfiles (.env.local holds the API keys) or other private files
  if (pathname.split("/").some((part) => part.startsWith(".")) ||
      /^\/(node_modules|docs|scripts|netlify)\//.test(pathname)) {
    return res.status(404).send("Not found");
  }

  // ---- API routes: /api/<name> -> api/<name>.js ----
  if (pathname.startsWith("/api/")) {
    const name = pathname.slice(5).replace(/\/+$/, "");
    const fnPath = join(ROOT, "api", `${name}.js`);

    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    try {
      await access(fnPath);
    } catch {
      console.log(`  ${req.method} ${pathname} -> 404 (api/${name}.js not found)`);
      return res.status(404).json({ success: false, error: "Function not found" });
    }

    try {
      // cache-bust so edits to the function are picked up without a restart
      const mod = await import(`${pathToFileURL(fnPath).href}?t=${Date.now()}`);
      req.body = await readBody(req);
      req.query = Object.fromEntries(url.searchParams);
      await mod.default(req, res);
      console.log(`  ${req.method} ${pathname} -> ${res.statusCode}`);
    } catch (err) {
      console.error(`  ${req.method} ${pathname} -> 500`, err);
      if (!res.headersSent) res.status(500).json({ success: false, error: "Function error" });
    }
    return;
  }

  // ---- Server code is never served as a file (same as the hosts) ----
  if (pathname.startsWith("/lib/")) {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  // ---- Route aliases, mirroring netlify.toml / vercel.json ----
  // Old guesses at the admin path go home rather than revealing anything.
  if (pathname === "/admin" || pathname === "/admin.html") {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  // The dental clinics page was removed
  if (pathname === "/dental-clinics" || pathname === "/dental-clinics.html") {
    res.statusCode = 301;
    res.setHeader("Location", "/");
    return res.end();
  }

  // ---- Static files ----
  if (pathname === "/") pathname = "/index.html";
  // allow /verify as well as /verify.html
  if (!extname(pathname)) pathname += ".html";

  const filePath = normalize(join(ROOT, pathname));
  if (!filePath.startsWith(ROOT + sep)) {
    return res.status(403).send("Forbidden");
  }

  try {
    const content = await readFile(filePath);
    res.setHeader("Content-Type", MIME[extname(filePath).toLowerCase()] || "application/octet-stream");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(content);
  } catch {
    // Same 404 page the hosts serve
    try {
      const page = await readFile(join(ROOT, "404.html"));
      res.status(404);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(page);
    } catch {
      res.status(404);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send("<h1>404 — Not found</h1><p><a href='/'>Home</a></p>");
    }
  }
});

await loadEnv();
// localhost only: other devices on the network can't reach it (or .env.local's keys)
server.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("  Nexyra Studio — local dev server");
  console.log("  ────────────────────────────────────────");
  console.log(`  Site      http://localhost:${PORT}/`);
  console.log(`  Verify    http://localhost:${PORT}/verify`);
  console.log(`  Admin     http://localhost:${PORT}/staff-portal`);
  console.log(`  API       http://localhost:${PORT}/api/verify`);
  console.log("");
  console.log("  Press Ctrl+C to stop");
  console.log("");
});
