/* ============================================
   Nexyra Studio — Intern records admin
   Talks to /api/admin. The password is kept in
   sessionStorage only, so closing the tab logs out.
============================================ */

const ADMIN_ENDPOINT = "/api/admin";

let PASSWORD = "";
let ROWS = [];
let EDITING = null; // certificate_no being edited, or null for a new record

/* Shared with admin-projects.js — it needs the live password and the toast */
window.NexyraAdmin = {
  password: () => PASSWORD,
  toast: (message, kind) => toast(message, kind),
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  wireLogin();
  wireForm();
  wireSearch();

  // Resume an open session after a refresh
  const saved = sessionStorage.getItem("nexyra_admin_pw");
  if (saved) {
    PASSWORD = saved;
    showDashboard();
    loadRows();
  }
});

/* ──────────────── THEME ──────────────── */
function initTheme() {
  const body = document.body;
  const btn = document.getElementById("theme-toggle");
  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");

  const apply = (theme) => {
    const dark = theme === "dark";
    body.classList.toggle("dark-mode", dark);
    body.classList.toggle("light-mode", !dark);
    sun.classList.toggle("hidden", !dark);
    moon.classList.toggle("hidden", dark);
  };

  apply(localStorage.getItem("theme") || "light");
  btn.addEventListener("click", () => {
    const next = body.classList.contains("dark-mode") ? "light" : "dark";
    localStorage.setItem("theme", next);
    apply(next);
  });
}

/* ──────────────── API ──────────────── */
async function api(payload) {
  const resp = await fetch(ADMIN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, password: PASSWORD }),
  });
  const json = await resp.json().catch(() => null);
  if (!json) throw new Error("The server did not respond properly");
  if (!json.success) throw new Error(json.error || "Request failed");
  return json;
}

/* ──────────────── LOGIN ──────────────── */
function wireLogin() {
  const form = document.getElementById("login-form");
  const input = document.getElementById("password");
  const btn = document.getElementById("login-btn");
  const label = document.getElementById("login-label");
  const spinner = document.getElementById("login-spinner");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pw = input.value;
    if (!pw) return;

    btn.disabled = true;
    label.textContent = "Checking";
    spinner.classList.remove("hidden");

    try {
      PASSWORD = pw;
      const { rows } = await api({ action: "list" });
      sessionStorage.setItem("nexyra_admin_pw", pw);
      ROWS = rows || [];
      showDashboard();
      renderRows();
      if (window.loadProjectsIfVisible) window.loadProjectsIfVisible();
      toast("Welcome back", "ok");
    } catch (err) {
      PASSWORD = "";
      toast(err.message, "error");
      input.select();
    } finally {
      btn.disabled = false;
      label.textContent = "Log in";
      spinner.classList.add("hidden");
    }
  });

  // Show / hide the password
  const pwToggle = document.getElementById("pw-toggle");
  pwToggle.addEventListener("click", () => {
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    document.getElementById("pw-icon").className = showing ? "bi bi-eye" : "bi bi-eye-slash";
    pwToggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    pwToggle.setAttribute("aria-pressed", String(!showing));
    input.focus();
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem("nexyra_admin_pw");
    PASSWORD = "";
    ROWS = [];
    document.getElementById("dash-view").classList.add("hidden");
    document.getElementById("login-view").classList.remove("hidden");
    document.getElementById("logout-btn").classList.add("hidden");
    input.value = "";
    // back to hidden, so the next login does not start revealed
    input.type = "password";
    document.getElementById("pw-icon").className = "bi bi-eye";
    pwToggle.setAttribute("aria-label", "Show password");
    pwToggle.setAttribute("aria-pressed", "false");
  });
}

function showDashboard() {
  document.getElementById("login-view").classList.add("hidden");
  document.getElementById("dash-view").classList.remove("hidden");
  document.getElementById("logout-btn").classList.remove("hidden");
}

async function loadRows() {
  try {
    const { rows } = await api({ action: "list" });
    ROWS = rows || [];
    renderRows();
  } catch (err) {
    toast(err.message, "error");
    if (/password/i.test(err.message)) {
      sessionStorage.removeItem("nexyra_admin_pw");
      location.reload();
    }
  }
}

/* ──────────────── FORM ──────────────── */
function wireForm() {
  const card = document.getElementById("form-card");

  document.getElementById("add-btn").addEventListener("click", () => openForm(null));
  document.getElementById("cancel-btn").addEventListener("click", closeForm);
  document.getElementById("form-close").addEventListener("click", closeForm);

  document.getElementById("intern-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("save-btn");
    const label = document.getElementById("save-label");
    const spinner = document.getElementById("save-spinner");

    const record = {
      certificate_no: val("f-cert").toUpperCase(),
      full_name: val("f-name"),
      role: val("f-role"),
      department: val("f-dept"),
      start_date: val("f-start"),
      end_date: val("f-end"),
      issue_date: val("f-issue"),
      status: val("f-status"),
      photo_url: val("f-photo"),
    };

    btn.disabled = true;
    label.textContent = "Saving";
    spinner.classList.remove("hidden");

    try {
      await api({ action: "save", record });
      toast(EDITING ? "Record updated" : "Intern added", "ok");
      closeForm();
      await loadRows();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      btn.disabled = false;
      label.textContent = "Save Intern";
      spinner.classList.add("hidden");
    }
  });
}

function openForm(row) {
  EDITING = row ? row.certificate_no : null;
  document.getElementById("form-title").textContent = row ? "Edit Intern" : "Add Intern";
  document.getElementById("save-label").textContent = row ? "Update Intern" : "Save Intern";

  set("f-cert", row ? row.certificate_no : "");
  set("f-name", row ? row.full_name : "");
  set("f-role", row ? row.role : "");
  set("f-dept", row ? row.department : "");
  set("f-start", row ? row.start_date : "");
  set("f-end", row ? row.end_date : "");
  set("f-issue", row ? row.issue_date : "");
  set("f-status", row ? row.status : "Completed");
  set("f-photo", row ? row.photo_url : "");

  const card = document.getElementById("form-card");
  card.classList.remove("hidden");
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  document.getElementById("f-cert").focus();
}

function closeForm() {
  document.getElementById("form-card").classList.add("hidden");
  document.getElementById("intern-form").reset();
  EDITING = null;
}

const val = (id) => (document.getElementById(id).value || "").trim();
const set = (id, v) => { document.getElementById(id).value = v == null ? "" : v; };

/* ──────────────── SEARCH ──────────────── */
function wireSearch() {
  document.getElementById("search").addEventListener("input", renderRows);
}

/* ──────────────── TABLE ──────────────── */
function renderRows() {
  const tbody = document.getElementById("rows");
  const empty = document.getElementById("empty");
  const loading = document.getElementById("loading");
  const term = (document.getElementById("search").value || "").trim().toLowerCase();

  loading.classList.add("hidden");
  tbody.innerHTML = "";

  const list = term
    ? ROWS.filter((r) =>
        [r.certificate_no, r.full_name, r.role, r.department]
          .filter(Boolean)
          .some((f) => String(f).toLowerCase().includes(term)))
    : ROWS;

  if (!list.length) {
    empty.classList.remove("hidden");
    empty.querySelector("p").textContent = term
      ? "No records match that search."
      : "No intern records yet. Click Add Intern to create the first one.";
    return;
  }
  empty.classList.add("hidden");

  for (const r of list) {
    const tr = document.createElement("tr");

    tr.appendChild(cell(r.certificate_no, "cert-mono"));
    tr.appendChild(cell(r.full_name));
    tr.appendChild(cell([r.role, r.department].filter(Boolean).join(" · ") || "—"));
    tr.appendChild(cell(duration(r)));

    const statusCell = document.createElement("td");
    const pill = document.createElement("span");
    pill.className = "pill " + pillClass(r.status);
    pill.textContent = r.status || "Completed";
    statusCell.appendChild(pill);
    tr.appendChild(statusCell);

    const actions = document.createElement("td");
    actions.style.textAlign = "right";
    actions.style.whiteSpace = "nowrap";

    const edit = document.createElement("button");
    edit.className = "btn-ghost px-3.5 py-2 rounded-lg text-xs font-semibold mr-2";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => openForm(r));
    actions.appendChild(edit);

    const del = document.createElement("button");
    del.className = "btn-danger px-3.5 py-2 rounded-lg text-xs font-semibold";
    del.textContent = "Delete";
    del.addEventListener("click", () => removeRow(r));
    actions.appendChild(del);

    tr.appendChild(actions);
    tbody.appendChild(tr);
  }
}

function cell(text, className) {
  const td = document.createElement("td");
  if (className) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = text || "—";
    td.appendChild(span);
  } else {
    td.textContent = text || "—";
  }
  return td;
}

function duration(r) {
  const f = fmt(r.start_date);
  const t = fmt(r.end_date);
  if (f && t) return `${f} — ${t}`;
  if (f) return `${f} — present`;
  return "—";
}

function fmt(v) {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return v;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function pillClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("revok") || s.includes("cancel")) return "pill-revoked";
  if (s.includes("ongoing") || s.includes("progress")) return "pill-ongoing";
  return "pill-ok";
}

async function removeRow(r) {
  if (!confirm(`Delete the record for ${r.full_name} (${r.certificate_no})?\n\nThis cannot be undone, and the certificate will stop verifying.`)) {
    return;
  }
  try {
    await api({ action: "delete", certificate_no: r.certificate_no });
    toast("Record deleted", "ok");
    await loadRows();
  } catch (err) {
    toast(err.message, "error");
  }
}

/* ──────────────── TOAST ──────────────── */
let toastTimer;
function toast(message, kind) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.className = "toast toast-" + (kind === "error" ? "error" : "ok");
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}
