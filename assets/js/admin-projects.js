/* ============================================
   Nexyra Studio — Portfolio projects admin
   Loaded alongside admin.js; shares its password
   through window.NexyraAdmin.
============================================ */

const PROJECTS_ENDPOINT = "/api/projects-admin";

let PROJECTS = [];
let P_EDITING = null;   // original slug while editing, null when adding
let GALLERY = [];       // image URLs currently on the form

document.addEventListener("DOMContentLoaded", () => {
  wireTabs();
  wireProjectForm();
  wireUploads();
  wireProjectSearch();
});

/* ──────────────── TABS ──────────────── */
function wireTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.dataset.tab;
      document.getElementById("tab-interns").classList.toggle("hidden", tab !== "interns");
      document.getElementById("tab-projects").classList.toggle("hidden", tab !== "projects");

      if (tab === "projects" && !PROJECTS.length) loadProjects();
    });
  });
}

/* ──────────────── API ──────────────── */
async function papi(payload) {
  const password = window.NexyraAdmin && window.NexyraAdmin.password();
  if (!password) throw new Error("Session expired — please log in again");

  const resp = await fetch(PROJECTS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, password }),
  });
  const json = await resp.json().catch(() => null);
  if (!json) throw new Error("The server did not respond properly");
  if (!json.success) throw new Error(json.error || "Request failed");
  return json;
}

async function loadProjects() {
  try {
    const { rows } = await papi({ action: "list" });
    PROJECTS = rows || [];
    renderProjects();
  } catch (err) {
    document.getElementById("p-loading").classList.add("hidden");
    ptoast(err.message, "error");
  }
}

// admin.js calls this right after a successful login
window.loadProjectsIfVisible = () => {
  if (!document.getElementById("tab-projects").classList.contains("hidden")) loadProjects();
};

/* ──────────────── FORM ──────────────── */
function wireProjectForm() {
  document.getElementById("p-add-btn").addEventListener("click", () => openProjectForm(null));
  document.getElementById("p-cancel-btn").addEventListener("click", closeProjectForm);
  document.getElementById("p-form-close").addEventListener("click", closeProjectForm);
  document.getElementById("p-add-result").addEventListener("click", () => addResultRow());

  document.getElementById("project-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("p-save-btn");
    const label = document.getElementById("p-save-label");
    const spinner = document.getElementById("p-save-spinner");

    const project = {
      slug: P_EDITING || pval("p-title"),
      title: pval("p-title"),
      category: pval("p-category") || "Project",
      emoji: pval("p-emoji"),
      summary: pval("p-summary"),
      description: pval("p-description"),
      tags: pval("p-tags"),
      cover_url: pval("p-cover-url"),
      gallery: GALLERY,
      client: pval("p-client"),
      project_date: pval("p-date"),
      results: collectResults(),
      live_url: pval("p-live"),
      featured: document.getElementById("p-featured").checked,
      published: document.getElementById("p-published").checked,
      sort_order: Number(pval("p-order")) || 0,
    };

    btn.disabled = true;
    label.textContent = "Saving";
    spinner.classList.remove("hidden");

    try {
      await papi({ action: "save", project, original_slug: P_EDITING || "" });
      ptoast(P_EDITING ? "Project updated" : "Project added", "ok");
      closeProjectForm();
      await loadProjects();
    } catch (err) {
      ptoast(err.message, "error");
    } finally {
      btn.disabled = false;
      label.textContent = "Save Project";
      spinner.classList.add("hidden");
    }
  });
}

function openProjectForm(row) {
  P_EDITING = row ? row.slug : null;
  document.getElementById("p-form-title").textContent = row ? "Edit Project" : "Add Project";
  document.getElementById("p-save-label").textContent = row ? "Update Project" : "Save Project";

  pset("p-title", row ? row.title : "");
  pset("p-category", row ? row.category : "Web Dev");
  pset("p-emoji", row ? row.emoji : "");
  pset("p-summary", row ? row.summary : "");
  pset("p-description", row ? row.description : "");
  pset("p-tags", row && Array.isArray(row.tags) ? row.tags.join(", ") : "");
  pset("p-cover-url", row ? row.cover_url : "");
  pset("p-client", row ? row.client : "");
  pset("p-date", row ? row.project_date : "");
  pset("p-live", row ? row.live_url : "");
  pset("p-order", row ? row.sort_order : 0);

  document.getElementById("p-featured").checked = row ? !!row.featured : false;
  document.getElementById("p-published").checked = row ? !!row.published : true;

  GALLERY = row && Array.isArray(row.gallery) ? [...row.gallery] : [];
  renderGallery();
  renderCoverPreview();

  // results
  const list = document.getElementById("p-results-list");
  list.innerHTML = "";
  const results = row && Array.isArray(row.results) ? row.results : [];
  if (results.length) results.forEach((r) => addResultRow(r.label, r.value));
  else addResultRow();

  const card = document.getElementById("p-form-card");
  card.classList.remove("hidden");
  card.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("p-title").focus();
}

function closeProjectForm() {
  document.getElementById("p-form-card").classList.add("hidden");
  document.getElementById("project-form").reset();
  GALLERY = [];
  P_EDITING = null;
  renderGallery();
  renderCoverPreview();
}

const pval = (id) => (document.getElementById(id).value || "").trim();
const pset = (id, v) => { document.getElementById(id).value = v == null ? "" : v; };

/* ──────────────── RESULTS ──────────────── */
function addResultRow(label = "", value = "") {
  const row = document.createElement("div");
  row.className = "result-row";

  const l = document.createElement("input");
  l.className = "adm-input";
  l.placeholder = "Organic traffic";
  l.value = label;
  l.maxLength = 80;

  const v = document.createElement("input");
  v.className = "adm-input";
  v.placeholder = "+280%";
  v.value = value;
  v.maxLength = 40;

  const del = document.createElement("button");
  del.type = "button";
  del.innerHTML = '<i class="bi bi-trash"></i>';
  del.setAttribute("aria-label", "Remove this result");
  del.addEventListener("click", () => row.remove());

  row.append(l, v, del);
  document.getElementById("p-results-list").appendChild(row);
}

function collectResults() {
  return [...document.querySelectorAll("#p-results-list .result-row")]
    .map((row) => {
      const [l, v] = row.querySelectorAll("input");
      return { label: l.value.trim(), value: v.value.trim() };
    })
    .filter((r) => r.label || r.value);
}

/* ──────────────── IMAGE UPLOADS ──────────────── */
function wireUploads() {
  const coverDrop = document.getElementById("p-cover-drop");
  const coverFile = document.getElementById("p-cover-file");
  const galleryDrop = document.getElementById("p-gallery-drop");
  const galleryFile = document.getElementById("p-gallery-file");

  // Cover
  coverDrop.addEventListener("click", (e) => {
    if (e.target.closest(".dz-remove")) return;
    coverFile.click();
  });
  coverFile.addEventListener("change", () => {
    if (coverFile.files[0]) uploadCover(coverFile.files[0]);
    coverFile.value = "";
  });
  document.getElementById("p-cover-remove").addEventListener("click", (e) => {
    e.stopPropagation();
    pset("p-cover-url", "");
    renderCoverPreview();
  });
  document.getElementById("p-cover-url").addEventListener("input", renderCoverPreview);
  dragDrop(coverDrop, (files) => { if (files[0]) uploadCover(files[0]); });

  // Gallery
  galleryDrop.addEventListener("click", () => galleryFile.click());
  galleryFile.addEventListener("change", () => {
    uploadGallery([...galleryFile.files]);
    galleryFile.value = "";
  });
  dragDrop(galleryDrop, (files) => uploadGallery(files));
}

function dragDrop(zone, onFiles) {
  ["dragenter", "dragover"].forEach((ev) =>
    zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.add("drag"); }));
  ["dragleave", "drop"].forEach((ev) =>
    zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.remove("drag"); }));
  zone.addEventListener("drop", (e) => {
    const files = [...(e.dataTransfer?.files || [])].filter((f) => f.type.startsWith("image/"));
    if (files.length) onFiles(files);
  });
}

async function uploadCover(file) {
  const drop = document.getElementById("p-cover-drop");
  setBusy(drop, true);
  try {
    const url = await uploadOne(file);
    pset("p-cover-url", url);
    renderCoverPreview();
    ptoast("Cover image uploaded", "ok");
  } catch (err) {
    ptoast(err.message, "error");
  } finally {
    setBusy(drop, false);
  }
}

async function uploadGallery(files) {
  const drop = document.getElementById("p-gallery-drop");
  setBusy(drop, true);
  let done = 0;
  for (const file of files) {
    try {
      GALLERY.push(await uploadOne(file));
      done++;
      renderGallery();
    } catch (err) {
      ptoast(err.message, "error");
    }
  }
  setBusy(drop, false);
  if (done) ptoast(done === 1 ? "Image added" : `${done} images added`, "ok");
}

async function uploadOne(file) {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error(`"${file.name}" is larger than 5MB — please compress it first`);
  }
  const dataUrl = await readAsDataUrl(file);
  const slug = slugifyClient(pval("p-title") || "misc");
  const { url } = await papi({ action: "upload", file: dataUrl, slug });
  return url;
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read "${file.name}"`));
    reader.readAsDataURL(file);
  });
}

function setBusy(zone, busy) {
  zone.querySelector(".dz-busy").classList.toggle("hidden", !busy);
  const empty = zone.querySelector(".dz-empty");
  const preview = zone.querySelector(".dz-preview");
  if (busy) {
    empty.classList.add("hidden");
    if (preview) preview.classList.add("hidden");
  } else {
    // renderCoverPreview / renderGallery restore the right state
    if (zone.id === "p-cover-drop") renderCoverPreview();
    else empty.classList.remove("hidden");
  }
}

function renderCoverPreview() {
  const zone = document.getElementById("p-cover-drop");
  const url = pval("p-cover-url");
  const empty = zone.querySelector(".dz-empty");
  const preview = zone.querySelector(".dz-preview");
  const img = document.getElementById("p-cover-img");

  if (url) {
    img.src = url;
    preview.classList.remove("hidden");
    empty.classList.add("hidden");
  } else {
    preview.classList.add("hidden");
    empty.classList.remove("hidden");
  }
}

function renderGallery() {
  const list = document.getElementById("p-gallery-list");
  list.innerHTML = "";

  GALLERY.forEach((url, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const img = document.createElement("img");
    img.src = url;
    img.alt = `Gallery image ${i + 1}`;

    const del = document.createElement("button");
    del.type = "button";
    del.innerHTML = "&#10005;";
    del.setAttribute("aria-label", "Remove this image");
    del.addEventListener("click", () => {
      GALLERY.splice(i, 1);
      renderGallery();
      papi({ action: "remove_image", url }).catch(() => { /* row is what matters */ });
    });

    item.append(img, del);
    list.appendChild(item);
  });
}

/* ──────────────── LIST ──────────────── */
function wireProjectSearch() {
  document.getElementById("p-search").addEventListener("input", renderProjects);
}

function renderProjects() {
  const grid = document.getElementById("p-cards");
  const empty = document.getElementById("p-empty");
  const loading = document.getElementById("p-loading");
  const term = (document.getElementById("p-search").value || "").trim().toLowerCase();

  loading.classList.add("hidden");
  grid.innerHTML = "";

  const list = term
    ? PROJECTS.filter((p) =>
        [p.title, p.category, p.client, ...(p.tags || [])]
          .filter(Boolean)
          .some((f) => String(f).toLowerCase().includes(term)))
    : PROJECTS;

  if (!list.length) {
    empty.classList.remove("hidden");
    empty.querySelector("p").textContent = term
      ? "No projects match that search."
      : "No projects yet. Click Add Project to create the first one.";
    return;
  }
  empty.classList.add("hidden");

  for (const p of list) grid.appendChild(projectCard(p));
}

function projectCard(p) {
  const card = document.createElement("div");
  card.className = "p-card";

  // thumbnail
  const thumb = document.createElement("div");
  thumb.className = "p-thumb";
  if (p.cover_url) {
    const img = document.createElement("img");
    img.src = p.cover_url;
    img.alt = p.title;
    img.onerror = () => { thumb.textContent = p.emoji || "🖼️"; };
    thumb.appendChild(img);
  } else {
    thumb.textContent = p.emoji || "🖼️";
  }

  const flags = document.createElement("div");
  flags.className = "p-flags";
  if (p.featured) flags.appendChild(flag("Featured", "flag-featured"));
  if (!p.published) flags.appendChild(flag("Draft", "flag-draft"));
  if (flags.children.length) thumb.appendChild(flags);
  card.appendChild(thumb);

  // body
  const body = document.createElement("div");
  body.className = "p-body";

  body.appendChild(el("div", "p-cat", p.category || "Project"));
  body.appendChild(el("div", "p-title", p.title));
  body.appendChild(el("div", "p-sum", p.summary || "No short description yet."));

  const meta = document.createElement("div");
  meta.className = "p-meta";
  if (p.client) meta.appendChild(el("span", null, "👤 " + p.client));
  meta.appendChild(el("span", null, "↕ Order " + (p.sort_order ?? 0)));
  if (Array.isArray(p.gallery) && p.gallery.length) {
    meta.appendChild(el("span", null, `🖼 ${p.gallery.length} image${p.gallery.length > 1 ? "s" : ""}`));
  }
  body.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "p-actions";

  const edit = document.createElement("button");
  edit.className = "btn-ghost";
  edit.textContent = "Edit";
  edit.addEventListener("click", () => openProjectForm(p));

  const del = document.createElement("button");
  del.className = "btn-danger";
  del.textContent = "Delete";
  del.addEventListener("click", () => removeProject(p));

  actions.append(edit, del);
  body.appendChild(actions);
  card.appendChild(body);

  return card;
}

function flag(text, cls) {
  const s = document.createElement("span");
  s.className = "flag " + cls;
  s.textContent = text;
  return s;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

async function removeProject(p) {
  if (!confirm(`Delete "${p.title}"?\n\nThis also removes its uploaded images and cannot be undone.`)) return;
  try {
    await papi({ action: "delete", slug: p.slug });
    ptoast("Project deleted", "ok");
    await loadProjects();
  } catch (err) {
    ptoast(err.message, "error");
  }
}

/* ──────────────── small helpers ──────────────── */
function slugifyClient(v) {
  return String(v || "")
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function ptoast(message, kind) {
  if (window.NexyraAdmin && window.NexyraAdmin.toast) window.NexyraAdmin.toast(message, kind);
}
