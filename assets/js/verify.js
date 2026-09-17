/* ============================================
   Nexyra Studio — Certificate Verification
   Talks to /api/verify and renders the result.
============================================ */

/* Point this at the deployed API. Same-origin on Vercel,
   so a relative path works in production and on preview URLs. */
const VERIFY_ENDPOINT = "/api/verify";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initVerifyForm();
  prefillFromUrl();
});

/* ──────────────── THEME (same behaviour as the main site) ──────────────── */
function initTheme() {
  const body = document.body;
  const btn = document.getElementById("theme-toggle");
  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");

  const apply = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      if (sun) sun.classList.remove("hidden");
      if (moon) moon.classList.add("hidden");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      if (sun) sun.classList.add("hidden");
      if (moon) moon.classList.remove("hidden");
    }
  };

  apply(localStorage.getItem("theme") || "light");

  if (btn) {
    btn.addEventListener("click", () => {
      const next = body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("theme", next);
      apply(next);
    });
  }
}

/* ──────────────── URL PREFILL (?cert=NXS-2025-014) ──────────────── */
function prefillFromUrl() {
  const cert = new URLSearchParams(window.location.search).get("cert");
  if (!cert) return;
  const input = document.getElementById("cert-input");
  input.value = cert.trim().toUpperCase();
  document.getElementById("verify-form").requestSubmit();
}

/* ──────────────── FORM ──────────────── */
function initVerifyForm() {
  const form = document.getElementById("verify-form");
  const input = document.getElementById("cert-input");
  const btn = document.getElementById("verify-btn");
  const label = document.getElementById("btn-label");
  const spinner = document.getElementById("btn-spinner");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const certificate = input.value.trim().toUpperCase();
    if (!certificate) {
      renderMessage("error", "Enter a certificate number", "Please type the number printed on the certificate.");
      return;
    }

    // Loading state
    btn.disabled = true;
    btn.style.opacity = "0.75";
    btn.style.cursor = "wait";
    label.textContent = "Verifying";
    spinner.classList.remove("hidden");
    clearResult();

    try {
      const resp = await fetch(VERIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificate }),
      });

      const json = await resp.json().catch(() => null);

      if (!resp.ok || !json || !json.success) {
        const msg = (json && json.error) || "The verification service is unavailable right now.";
        renderMessage("error", "Verification failed", msg + " Please try again in a moment.");
        return;
      }

      if (!json.found) {
        renderNotFound(certificate);
        return;
      }

      renderRecord(json.data);
    } catch (err) {
      console.error(err);
      renderMessage("error", "Connection problem", "We could not reach the verification service. Check your internet connection and try again.");
    } finally {
      btn.disabled = false;
      btn.style.opacity = "";
      btn.style.cursor = "";
      label.textContent = "Verify";
      spinner.classList.add("hidden");
    }
  });
}

/* ──────────────── RENDERING ──────────────── */
function resultEl() {
  return document.getElementById("result");
}

function clearResult() {
  const el = resultEl();
  el.classList.remove("show");
  el.innerHTML = "";
}

function showResult(node) {
  const el = resultEl();
  el.innerHTML = "";
  el.appendChild(node);
  // next frame so the transition runs
  requestAnimationFrame(() => el.classList.add("show"));
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* Build an element with text content — never innerHTML for DB values */
function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function fieldRow(labelText, valueText) {
  const row = make("div", "field-row");
  row.appendChild(make("div", "field-label mb-1", labelText));
  row.appendChild(make("div", "field-value", valueText || "—"));
  return row;
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function statusBadgeClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("revok") || s.includes("cancel")) return "badge-revoked";
  if (s.includes("ongoing") || s.includes("progress")) return "badge-ongoing";
  return "badge-ok";
}

function initials(name) {
  return (name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/* ── Verified record ── */
function renderRecord(d) {
  const revoked = (d.status || "").toLowerCase().includes("revok");

  const card = make("div", "verify-card rounded-3xl overflow-hidden");

  // Status banner
  const banner = make("div", "px-6 md:px-8 py-5 flex items-center gap-3.5");
  banner.style.background = revoked ? "rgba(239,68,68,.1)" : "rgba(34,197,94,.1)";
  banner.style.borderBottom = "1px solid var(--border)";

  const icon = make("div", "w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0");
  icon.style.background = revoked ? "rgba(239,68,68,.16)" : "rgba(34,197,94,.16)";
  icon.style.color = revoked ? "#dc2626" : "#16a34a";
  icon.innerHTML = revoked
    ? '<i class="bi bi-x-circle-fill"></i>'
    : '<i class="bi bi-patch-check-fill"></i>';
  banner.appendChild(icon);

  const bannerText = make("div");
  const title = make("div", "font-display font-extrabold text-lg tracking-tight",
    revoked ? "Certificate Revoked" : "Certificate Verified");
  title.style.color = revoked ? "#dc2626" : "#16a34a";
  bannerText.appendChild(title);
  bannerText.appendChild(make("div", "body-muted text-sm",
    revoked
      ? "This certificate exists in our records but is no longer valid."
      : "This certificate is genuine and issued by Nexyra Studio."));
  banner.appendChild(bannerText);
  card.appendChild(banner);

  // Identity block
  const body = make("div", "p-6 md:p-8");
  const head = make("div", "flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-7 text-center sm:text-left");

  if (d.photo) {
    const img = document.createElement("img");
    img.className = "verify-photo shrink-0";
    img.alt = d.name ? "Photo of " + d.name : "Intern photo";
    img.src = d.photo;
    img.onerror = () => {
      const fb = make("div", "photo-fallback shrink-0", initials(d.name));
      img.replaceWith(fb);
    };
    head.appendChild(img);
  } else {
    head.appendChild(make("div", "photo-fallback shrink-0", initials(d.name)));
  }

  const idBlock = make("div", "min-w-0");
  idBlock.appendChild(make("h2", "font-display text-2xl font-extrabold tracking-tight mb-1.5", d.name));

  const roleLine = [d.role, d.department].filter(Boolean).join(" · ");
  if (roleLine) idBlock.appendChild(make("p", "body-muted text-sm mb-3", roleLine));

  const badge = make("span",
    "inline-block px-3.5 py-1.5 rounded-full text-xs font-bold " + statusBadgeClass(d.status),
    d.status || "Completed");
  idBlock.appendChild(badge);
  head.appendChild(idBlock);
  body.appendChild(head);

  // Details
  const details = make("div", "rounded-2xl px-5");
  details.style.background = "var(--surface-2)";
  details.style.border = "1px solid var(--border)";

  details.appendChild(fieldRow("Full Name", d.name));
  details.appendChild(fieldRow("Certificate Number", d.certificate));
  if (d.role) details.appendChild(fieldRow("Role", d.role));
  if (d.department) details.appendChild(fieldRow("Department", d.department));

  const from = formatDate(d.startDate);
  const to = formatDate(d.endDate);
  if (from || to) {
    details.appendChild(fieldRow("Internship Duration", [from, to].filter(Boolean).join(" — ")));
  }
  if (d.issueDate) details.appendChild(fieldRow("Issue Date", formatDate(d.issueDate)));
  details.appendChild(fieldRow("Status", d.status || "Completed"));

  body.appendChild(details);

  body.appendChild(make("p", "body-muted text-xs mt-5 leading-relaxed",
    "This record was retrieved from the official Nexyra Studio internship database at " +
    new Date().toLocaleString("en-GB") + "."));

  card.appendChild(body);
  showResult(card);
}

/* ── Not found ── */
function renderNotFound(certificate) {
  const card = make("div", "verify-card rounded-3xl p-7 md:p-9 text-center");

  const icon = make("div", "w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-4");
  icon.style.background = "rgba(239,68,68,.12)";
  icon.style.color = "#dc2626";
  icon.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i>';
  card.appendChild(icon);

  const title = make("h2", "font-display text-xl font-extrabold tracking-tight mb-2.5", "No Record Found");
  title.style.color = "#dc2626";
  card.appendChild(title);

  const p = make("p", "body-muted text-sm leading-relaxed max-w-md mx-auto mb-1");
  p.appendChild(document.createTextNode("We could not find a certificate with the number "));
  const strong = make("strong", null, certificate);
  strong.style.color = "var(--text)";
  p.appendChild(strong);
  p.appendChild(document.createTextNode(" in our records."));
  card.appendChild(p);

  card.appendChild(make("p", "body-muted text-sm leading-relaxed max-w-md mx-auto mt-3",
    "Please check the number for typing mistakes. If it still does not verify, the certificate may not have been issued by Nexyra Studio."));

  const mail = document.createElement("a");
  mail.href = "mailto:info.ahmadinnovate@gmail.com?subject=Certificate%20verification%20query%20-%20" + encodeURIComponent(certificate);
  mail.className = "btn-primary inline-block px-7 py-3 rounded-xl text-sm font-semibold mt-6";
  mail.textContent = "Contact us about this certificate";
  card.appendChild(mail);

  showResult(card);
}

/* ── Generic message (errors) ── */
function renderMessage(kind, heading, text) {
  const card = make("div", "verify-card rounded-3xl p-7 text-center");

  const icon = make("div", "w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-3.5");
  icon.style.background = "rgba(234,179,8,.12)";
  icon.style.color = "#ca8a04";
  icon.innerHTML = '<i class="bi bi-info-circle-fill"></i>';
  card.appendChild(icon);

  card.appendChild(make("h2", "font-display text-lg font-extrabold tracking-tight mb-2", heading));
  card.appendChild(make("p", "body-muted text-sm leading-relaxed max-w-md mx-auto", text));

  showResult(card);
}
