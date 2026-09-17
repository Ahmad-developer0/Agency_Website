/*
 * ============================================
 *  Portfolio projects — platform-neutral core
 *
 *  Public:  listPublicProjects()   — what the website shows
 *  Admin:   projectsAdmin(input)   — password-protected CRUD + image upload
 * ============================================
 */

const BUCKET = "project-images";

const PUBLIC_FIELDS =
  "slug,title,category,emoji,summary,description,tags,cover_url,gallery," +
  "client,project_date,results,live_url,featured,sort_order";

/* ──────────────── helpers ──────────────── */

function env() {
  return {
    url: (process.env.SUPABASE_URL || "").replace(/\/$/, ""),
    key: process.env.SUPABASE_SERVICE_KEY || "",
    password: process.env.ADMIN_PASSWORD || "",
  };
}

function restHeaders(key) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function shapeProject(r) {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category || "Project",
    emoji: r.emoji || "",
    summary: r.summary || "",
    description: r.description || "",
    tags: Array.isArray(r.tags) ? r.tags : [],
    cover: r.cover_url || "",
    gallery: Array.isArray(r.gallery) ? r.gallery : [],
    client: r.client || "",
    date: r.project_date || "",
    results: Array.isArray(r.results) ? r.results : [],
    liveUrl: r.live_url || "",
    featured: !!r.featured,
  };
}

/* ──────────────── PUBLIC: list projects for the site ──────────────── */

export async function listPublicProjects() {
  const { url, key } = env();
  if (!url || !key) {
    return { status: 500, body: { success: false, error: "Database is not configured" } };
  }

  try {
    const query =
      `${url}/rest/v1/projects` +
      `?published=eq.true` +
      `&select=${PUBLIC_FIELDS}` +
      `&order=featured.desc,sort_order.asc,created_at.desc`;

    const resp = await fetch(query, { headers: restHeaders(key) });
    if (!resp.ok) {
      console.error("Projects fetch failed:", await resp.text());
      return { status: 500, body: { success: false, error: "Could not load projects" } };
    }

    const rows = await resp.json();
    return {
      status: 200,
      body: { success: true, projects: (rows || []).map(shapeProject) },
    };
  } catch (err) {
    console.error("Projects error:", err);
    return { status: 500, body: { success: false, error: "Could not load projects" } };
  }
}

/* ──────────────── ADMIN ──────────────── */

export async function projectsAdmin(input) {
  const { url, key, password } = env();

  if (!url || !key) {
    return { status: 500, body: { success: false, error: "Database is not configured" } };
  }
  if (!password) {
    return { status: 500, body: { success: false, error: "ADMIN_PASSWORD is not set" } };
  }

  const body = input || {};

  // ── Auth ──
  const given = String(body.password || "");
  if (given.length !== password.length || given !== password) {
    await new Promise((r) => setTimeout(r, 600));
    return { status: 401, body: { success: false, error: "Wrong password" } };
  }

  const action = String(body.action || "list");
  const base = `${url}/rest/v1/projects`;
  const headers = restHeaders(key);

  try {
    /* ── LIST (admin sees drafts too) ── */
    if (action === "list") {
      const resp = await fetch(
        `${base}?select=*&order=featured.desc,sort_order.asc,created_at.desc`,
        { headers }
      );
      if (!resp.ok) throw new Error(await resp.text());
      return { status: 200, body: { success: true, rows: await resp.json() } };
    }

    /* ── SAVE (insert or update by slug) ── */
    if (action === "save") {
      const p = body.project || {};

      const title = String(p.title || "").trim();
      if (!title) {
        return { status: 400, body: { success: false, error: "Title is required" } };
      }

      const slug = slugify(p.slug || title);
      if (!slug) {
        return { status: 400, body: { success: false, error: "Could not build a valid slug from that title" } };
      }

      const record = {
        slug,
        title,
        category: String(p.category || "Web Dev").trim(),
        emoji: emptyToNull(p.emoji),
        summary: emptyToNull(p.summary),
        description: emptyToNull(p.description),
        tags: toArray(p.tags),
        cover_url: emptyToNull(p.cover_url),
        gallery: toArray(p.gallery),
        client: emptyToNull(p.client),
        project_date: emptyToNull(p.project_date),
        results: toResults(p.results),
        live_url: emptyToNull(p.live_url),
        featured: !!p.featured,
        sort_order: Number.isFinite(Number(p.sort_order)) ? Number(p.sort_order) : 0,
        published: p.published === undefined ? true : !!p.published,
      };

      // When editing and the slug changed, update that row by its old slug
      const originalSlug = slugify(body.original_slug || "");
      let resp;

      if (originalSlug && originalSlug !== slug) {
        resp = await fetch(`${base}?slug=eq.${encodeURIComponent(originalSlug)}`, {
          method: "PATCH",
          headers: { ...headers, Prefer: "return=representation" },
          body: JSON.stringify(record),
        });
      } else {
        resp = await fetch(`${base}?on_conflict=slug`, {
          method: "POST",
          headers: { ...headers, Prefer: "resolution=merge-duplicates,return=representation" },
          body: JSON.stringify(record),
        });
      }

      if (!resp.ok) {
        const detail = await resp.text();
        console.error("Project save failed:", detail);
        return { status: 400, body: { success: false, error: friendlyError(detail) } };
      }

      const saved = await resp.json();
      return { status: 200, body: { success: true, row: Array.isArray(saved) ? saved[0] : saved } };
    }

    /* ── DELETE ── */
    if (action === "delete") {
      const slug = slugify(body.slug || "");
      if (!slug) return { status: 400, body: { success: false, error: "Slug is required" } };

      // Clean up the images this project owns, then remove the row
      const getResp = await fetch(
        `${base}?slug=eq.${encodeURIComponent(slug)}&select=cover_url,gallery`,
        { headers }
      );
      if (getResp.ok) {
        const rows = await getResp.json();
        if (rows && rows[0]) {
          const urls = [rows[0].cover_url, ...(rows[0].gallery || [])].filter(Boolean);
          await deleteStoredImages(url, key, urls);
        }
      }

      const resp = await fetch(`${base}?slug=eq.${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers,
      });
      if (!resp.ok) throw new Error(await resp.text());
      return { status: 200, body: { success: true } };
    }

    /* ── UPLOAD an image (base64 from the admin form) ── */
    if (action === "upload") {
      const dataUrl = String(body.file || "");
      const match = /^data:(image\/(png|jpe?g|webp|avif|gif));base64,(.+)$/i.exec(dataUrl);
      if (!match) {
        return {
          status: 400,
          body: { success: false, error: "Only PNG, JPG, WebP, AVIF or GIF images are supported" },
        };
      }

      const contentType = match[1].toLowerCase();
      const bytes = Buffer.from(match[3], "base64");

      // 5 MB ceiling — plenty for web images, keeps the function fast
      if (bytes.length > 5 * 1024 * 1024) {
        return { status: 400, body: { success: false, error: "Image is larger than 5MB — please compress it first" } };
      }

      const ext = contentType.split("/")[1].replace("jpeg", "jpg");
      const folder = slugify(body.slug || "misc") || "misc";
      const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const upResp = await fetch(`${url}/storage/v1/object/${BUCKET}/${name}`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": contentType,
          "x-upsert": "true",
        },
        body: bytes,
      });

      if (!upResp.ok) {
        const detail = await upResp.text();
        console.error("Upload failed:", detail);
        if (detail.includes("Bucket not found")) {
          return {
            status: 400,
            body: { success: false, error: `Storage bucket "${BUCKET}" does not exist — create it in Supabase > Storage` },
          };
        }
        return { status: 400, body: { success: false, error: "Could not upload the image" } };
      }

      return {
        status: 200,
        body: { success: true, url: `${url}/storage/v1/object/public/${BUCKET}/${name}` },
      };
    }

    /* ── REMOVE a single stored image ── */
    if (action === "remove_image") {
      const removed = await deleteStoredImages(url, key, [String(body.url || "")]);
      return { status: 200, body: { success: true, removed } };
    }

    return { status: 400, body: { success: false, error: "Unknown action" } };
  } catch (err) {
    console.error("Projects admin error:", err);
    return { status: 500, body: { success: false, error: "Something went wrong" } };
  }
}

/* ──────────────── small helpers ──────────────── */

async function deleteStoredImages(url, key, urls) {
  const prefix = `${url}/storage/v1/object/public/${BUCKET}/`;
  const paths = urls
    .filter((u) => typeof u === "string" && u.startsWith(prefix))
    .map((u) => decodeURIComponent(u.slice(prefix.length)));

  if (!paths.length) return 0;

  try {
    const resp = await fetch(`${url}/storage/v1/object/${BUCKET}`, {
      method: "DELETE",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefixes: paths }),
    });
    return resp.ok ? paths.length : 0;
  } catch (err) {
    console.error("Image cleanup failed:", err);
    return 0;
  }
}

function slugify(v) {
  return String(v || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function emptyToNull(v) {
  const s = String(v == null ? "" : v).trim();
  return s === "" ? null : s;
}

function toArray(v) {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  return String(v || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function toResults(v) {
  if (!Array.isArray(v)) return [];
  return v
    .map((r) => ({
      label: String((r && r.label) || "").trim(),
      value: String((r && r.value) || "").trim(),
    }))
    .filter((r) => r.label || r.value);
}

function friendlyError(detail) {
  if (detail.includes("duplicate key")) return "A project with that name already exists";
  if (detail.includes("invalid input syntax for type date")) return "Check the project date — use the date picker";
  if (detail.includes('relation "public.projects" does not exist')) {
    return "The projects table does not exist yet — run docs/projects-setup.sql in Supabase";
  }
  return "Could not save the project";
}
