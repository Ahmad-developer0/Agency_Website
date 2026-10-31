/* =================== ICONS =================== */
// Inline SVG line icons (24px grid), coloured by the card's accent via currentColor
const ICON_PATHS = {
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  pen: '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
};

function icon(name) {
  return `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ""}</svg>`;
}

/* =================== DATA =================== */
const whyData = [
  {
    icon: "target",
    title: "Built Around Bookings",
    description:
      "Every page we build has one job: turn a visitor into a call, a WhatsApp message or a booked appointment. Clear offers, clear buttons, nothing in the way.",
  },
  {
    icon: "zap",
    title: "Fast & Mobile-First",
    description:
      "Most customers search on their phone. We build sites that load quickly and work properly on small screens, because a slow site loses the sale.",
  },
  {
    icon: "chart",
    title: "Honest Reporting",
    description:
      "A short monthly report in plain English: calls, form enquiries, bookings and Google rankings. If something isn't working, we tell you and change it.",
  },
  {
    icon: "globe",
    title: "Local & International",
    description:
      "Clients across Pakistan and abroad. We work remotely in clear English and keep hours that overlap the US, UK, Europe and the Gulf.",
  },
];

const benefitsData = [
  {
    icon: "mapPin",
    title: "Found on Google Maps",
    description:
      "We set up and optimise your Google Business Profile and local SEO so nearby customers see you when they search.",
  },
  {
    icon: "calendar",
    title: "Online Booking",
    description:
      "Let customers book or request a call any time, from any device, without waiting on the phone.",
  },
  {
    icon: "smartphone",
    title: "Works on Every Phone",
    description:
      "Responsive pages, readable text and tap-friendly buttons, tested on the phones your customers actually use.",
  },
  {
    icon: "users",
    title: "Direct Contact",
    description:
      "You talk to the people building your site and running your campaigns, by WhatsApp, email or a call.",
  },
];

// Homepage service groups, in display order
const serviceGroups = [
  "Booking, CRM & Calling",
  "Automation & Custom Software",
  "Web, Apps & Marketing",
];

const servicesData = [
  {
    icon: "calendar",
    title: "Online Appointment Systems",
    group: "Booking, CRM & Calling",
    description:
      "Let customers book 24/7 from your website, Google or WhatsApp, with live availability and no double bookings.",
    keypoints: [
      "Online booking on your website & Google profile",
      "Live availability across staff, rooms & locations",
      "Booking confirmations by email, SMS or WhatsApp",
      "Rescheduling & cancellation links",
      "Deposits or prepayment (optional)",
      "Calendar sync with Google & Outlook",
    ],
  },
  {
    icon: "users",
    title: "Customer CRM",
    group: "Booking, CRM & Calling",
    description:
      "One place for every customer's details, deals, messages and follow-ups, so nobody falls through the cracks.",
    keypoints: [
      "Customer profiles & history",
      "Lead tracking from enquiry to sale",
      "Follow-up tasks & recalls",
      "Notes, tags & segments",
      "Messaging history in one place",
      "Reports on new customers & bookings",
    ],
  },
  {
    icon: "bell",
    title: "Automated Reminders",
    group: "Booking, CRM & Calling",
    description:
      "Automatic SMS, WhatsApp and email reminders that cut no-shows and bring customers back again.",
    keypoints: [
      "Appointment reminders before each visit",
      "SMS, WhatsApp & email channels",
      "Repeat-visit & renewal reminders",
      "Review requests after the visit",
      "Custom timing & message templates",
      "Two-way confirm / reschedule replies",
    ],
  },
  {
    icon: "phone",
    title: "Calling Systems",
    group: "Booking, CRM & Calling",
    description:
      "Business phone and call-handling setup so every call is answered, routed or followed up, even after hours.",
    keypoints: [
      "Cloud phone numbers & call routing",
      "IVR menus & after-hours handling",
      "Missed-call text-back",
      "Call recording & call logs",
      "Call tracking for marketing campaigns",
      "CRM integration for every call",
    ],
  },
  {
    icon: "zap",
    title: "Business Automation",
    group: "Automation & Custom Software",
    description:
      "Automate the repetitive work — forms, follow-ups, data entry and reports — so your team can focus on customers.",
    keypoints: [
      "Workflow mapping & process audit",
      "Form-to-CRM & lead routing automation",
      "Automatic follow-up sequences",
      "Invoices, documents & data entry automation",
      "Scheduled reports & alerts",
      "Tools like Zapier, Make & n8n, or custom code",
    ],
  },
  {
    icon: "code",
    title: "Custom Software",
    group: "Automation & Custom Software",
    description:
      "Web-based software built around how your business works, when off-the-shelf tools don't fit.",
    keypoints: [
      "Requirement analysis & planning",
      "Custom dashboards & admin panels",
      "Internal tools & portals",
      "Secure user accounts & roles",
      "Cloud hosting & backups",
      "Ongoing support & improvements",
    ],
  },
  {
    icon: "link",
    title: "Integrations",
    group: "Automation & Custom Software",
    description:
      "Connect the tools you already use — booking, CRM, payments, WhatsApp, email and accounting — so data flows automatically.",
    keypoints: [
      "API integrations between your systems",
      "WhatsApp Business & SMS integration",
      "Payment gateway integration",
      "Google, Meta & calendar integrations",
      "Data sync & migration",
      "Webhooks & custom connectors",
    ],
  },
  {
    icon: "monitor",
    title: "Web Development",
    group: "Web, Apps & Marketing",
    description:
      "Fast, mobile-friendly websites and landing pages with online booking, built to turn visitors into enquiries.",
    keypoints: [
      "UX/UI design & prototyping",
      "Responsive web development",
      "Online booking & contact forms",
      "Landing page & funnel building",
      "Website speed & core web vitals",
      "CMS setup & team training",
    ],
  },
  {
    icon: "smartphone",
    title: "App Development",
    group: "Web, Apps & Marketing",
    description:
      "Android apps for bookings, customer portals and internal teams, designed to be simple to use and easy to scale.",
    keypoints: [
      "Requirement analysis & project planning",
      "UI/UX design & prototyping",
      "Kotlin & Java development",
      "API integration & backend setup",
      "Testing & performance optimization",
      "Publishing & ongoing updates",
    ],
  },
  {
    icon: "search",
    title: "Digital Marketing & SEO",
    group: "Web, Apps & Marketing",
    description:
      "Rank on Google Search and Google Maps, and run Google and Meta ads that turn clicks into bookings.",
    keypoints: [
      "Google Business Profile & local SEO",
      "Technical SEO & keyword research",
      "Paid ads (Google, Meta, TikTok)",
      "Social media marketing & content",
      "Conversion tracking (calls, forms, bookings)",
      "Monthly reporting",
    ],
  },
];

/* ===================================================
   PORTFOLIO
   Loaded from the database (/api/projects). The section
   and its nav links stay hidden until there is at least
   one real project to show.
   Tag a project "Sample" or "Concept" in the admin panel
   to label it as a sample / concept project.
=================================================== */

let portfolioData = [];

async function loadPortfolio() {
  try {
    const resp = await fetch("/api/projects");
    const json = await resp.json();
    if (json && json.success && Array.isArray(json.projects)) {
      portfolioData = json.projects;
    }
  } catch (err) {
    console.warn("Could not load projects:", err);
  }

  if (!portfolioData.length) return;

  document.getElementById("portfolio").hidden = false;
  document.querySelectorAll("[data-portfolio-link]").forEach((el) => (el.hidden = false));
  renderPortfolioFilters();
  renderPortfolio();
}

function isConceptProject(item) {
  return (item.tags || []).some((t) => /^(sample|concept)$/i.test(String(t).trim()));
}

/* =================== RENDER FUNCTIONS =================== */

function renderWhy() {
  const grid = document.getElementById("why-grid");
  if (grid.childElementCount) return; // already pre-rendered into the HTML
  grid.innerHTML = whyData
    .map(
      (item, i) => `
    <div class="feature-card reveal-up" style="transition-delay: ${i * 0.1}s">
      <div class="card-icon">${icon(item.icon)}</div>
      <h3 class="font-display font-bold text-xl mb-3">${item.title}</h3>
      <p class="body-muted text-sm leading-relaxed">${item.description}</p>
    </div>
  `,
    )
    .join("");
}

function renderBenefits() {
  const grid = document.getElementById("benefits-grid");
  if (grid.childElementCount) return; // already pre-rendered into the HTML
  grid.innerHTML = benefitsData
    .map(
      (item, i) => `
    <div class="feature-card reveal-up" style="transition-delay: ${i * 0.1}s">
      <div class="card-icon">${icon(item.icon)}</div>
      <h3 class="font-display font-bold text-lg mb-2">${item.title}</h3>
      <p class="body-muted text-sm leading-relaxed">${item.description}</p>
    </div>
  `,
    )
    .join("");
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  if (grid.childElementCount) return; // already pre-rendered into the HTML
  grid.innerHTML = serviceGroups
    .map((group) => {
      const items = servicesData
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => item.group === group);
      const cards = items
        .map(
          ({ item, i }, n) => `
        <div class="feature-card reveal-up" style="transition-delay: ${n * 0.08}s; cursor: pointer;" onclick="openServiceModal(${i})">
          <div class="card-icon">${icon(item.icon)}</div>
          <h4 class="font-display font-bold text-lg mb-3">${item.title}</h4>
          <p class="body-muted text-sm leading-relaxed mb-4">${item.description}</p>
          <div class="inline-flex items-center gap-1 text-sm font-semibold" style="color: var(--accent)">
            Learn more <span>→</span>
          </div>
        </div>`,
        )
        .join("");
      const cols = items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3";
      return `
    <div class="service-group">
      <h3 class="service-group-title reveal-up">${group}</h3>
      <div class="grid sm:grid-cols-2 ${cols} gap-6">${cards}
      </div>
    </div>`;
    })
    .join("");
}

function renderPortfolio(filter = "all") {
  const grid = document.getElementById("portfolio-grid");

  if (!portfolioData.length) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <p class="body-muted">No projects to show yet.</p>
      </div>`;
    return;
  }

  grid.innerHTML = portfolioData
    .map((item, i) => {
      const hidden = filter !== "all" && item.category !== filter ? "hidden" : "";
      const media = item.cover
        ? `<img src="${esc(item.cover)}" alt="${esc(item.title)}" class="portfolio-img"
                loading="lazy" onerror="portfolioImgFallback(this)">`
        : `<div class="portfolio-img-placeholder overflow-hidden"><span>${icon("image")}</span></div>`;

      const tagList = item.tags || [];
      const tags = tagList.slice(0, 3).map((t) => `<span class="chip">${esc(t)}</span>`).join("");
      const more = tagList.length > 3 ? `<span class="chip">+${tagList.length - 3}</span>` : "";

      return `
    <div class="portfolio-card reveal-up ${hidden}"
         data-category="${esc(item.category)}"
         style="transition-delay: ${i * 0.08}s"
         onclick="openPortfolioModal(${i})">
      <div class="portfolio-media">
        ${media}
        ${item.featured ? '<span class="featured-badge">Featured</span>' : ""}
        ${isConceptProject(item) ? '<span class="concept-badge">Sample / concept project</span>' : ""}
      </div>
      <div class="p-5">
        <div class="flex items-center justify-between mb-2">
          <span class="chip">${esc(item.category)}</span>
        </div>
        <h3 class="font-display font-bold text-lg mb-2">${esc(item.title)}</h3>
        ${item.summary ? `<p class="body-muted text-sm leading-relaxed mb-3 clamp-2">${esc(item.summary)}</p>` : ""}
        <div class="flex flex-wrap gap-1.5">${tags}${more}</div>
      </div>
    </div>`;
    })
    .join("");
  observeReveal();
}

/* A cover image that fails to load falls back to the placeholder tile */
function portfolioImgFallback(img) {
  const box = document.createElement("div");
  box.className = "portfolio-img-placeholder overflow-hidden";
  box.innerHTML = `<span>${icon("image")}</span>`;
  img.replaceWith(box);
}

/* Escape anything coming from the database before it reaches innerHTML */
function esc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPortfolioFilters() {
  const categories = ["all", ...new Set(portfolioData.map((p) => p.category))];
  const filterContainer = document.getElementById("portfolio-filters");
  filterContainer.innerHTML = categories
    .map(
      (cat) => `
    <button class="filter-btn ${cat === "all" ? "active" : ""} px-5 py-2 rounded-full text-sm font-medium transition-all duration-300" data-filter="${esc(cat)}">
      ${esc(cat.charAt(0).toUpperCase() + cat.slice(1))}
    </button>
  `,
    )
    .join("");

  filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterContainer
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      renderPortfolio(filter);
    });
  });
}

/* =================== MODALS =================== */

function openServiceModal(index) {
  const item = servicesData[index];
  document.getElementById("service-modal-content").innerHTML = `
    <div class="card-icon">${icon(item.icon)}</div>
    <h2 class="font-display font-extrabold text-2xl mb-4">${item.title}</h2>
    <p class="body-muted leading-relaxed mb-6">${item.description}</p>
    <h4 class="font-semibold text-sm mb-3" style="color:var(--accent)">WHAT'S INCLUDED</h4>
    <div class="flex flex-col">
      ${item.keypoints
        .map(
          (k) => `
        <div class="keypoint">
          <div class="keypoint-dot"></div>
          <span>${k}</span>
        </div>
      `,
        )
        .join("")}
    </div>
    <a href="#book-meeting" class="btn-primary mt-8 px-6 py-3 rounded-xl font-semibold text-sm inline-block transition-all duration-300 hover:scale-105" onclick="closeModal('service-modal'); preselectService(servicesData[${index}].title)">Book a Free Call →</a>
  `;
  openModal("service-modal");
}

function openPortfolioModal(index) {
  const item = portfolioData[index];
  if (!item) return;

  // ── Hero ──
  const hero = item.cover
    ? `<img src="${esc(item.cover)}" alt="${esc(item.title)}" class="case-hero-img"
            onerror="caseHeroFallback(this)">`
    : `<div class="case-hero-placeholder"><span>${icon("image")}</span></div>`;

  // ── Meta strip: client and date ──
  const metaBits = [];
  if (item.client) {
    metaBits.push(`<div class="case-meta-item">
      <span class="case-meta-label">Client</span>
      <span class="case-meta-value">${esc(item.client)}</span>
    </div>`);
  }
  if (item.date) {
    metaBits.push(`<div class="case-meta-item">
      <span class="case-meta-label">Delivered</span>
      <span class="case-meta-value">${esc(formatProjectDate(item.date))}</span>
    </div>`);
  }
  const meta = metaBits.length ? `<div class="case-meta">${metaBits.join("")}</div>` : "";

  // ── Results ──
  const results = (item.results || []).filter((r) => r && (r.label || r.value));
  const resultsBlock = results.length
    ? `<div class="case-block">
         <h4 class="case-heading">Results</h4>
         <div class="case-results">
           ${results.map((r) => `
             <div class="case-result">
               <div class="case-result-value">${esc(r.value)}</div>
               <div class="case-result-label">${esc(r.label)}</div>
             </div>`).join("")}
         </div>
       </div>`
    : "";

  // ── Gallery ──
  const gallery = (item.gallery || []).filter(Boolean);
  const galleryBlock = gallery.length
    ? `<div class="case-block">
         <h4 class="case-heading">Gallery</h4>
         <div class="case-gallery">
           ${gallery.map((g, gi) => `
             <img src="${esc(g)}" alt="${esc(item.title)} image ${gi + 1}" loading="lazy"
                  class="case-gallery-img" data-full="${esc(g)}">`).join("")}
         </div>
       </div>`
    : "";

  // ── Tags ──
  const tags = (item.tags || []).length
    ? `<div class="case-block">
         <h4 class="case-heading">What we did</h4>
         <div class="flex flex-wrap gap-2">
           ${item.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}
         </div>
       </div>`
    : "";

  // ── Actions: live link (if any) + book a meeting ──
  const liveBtn = /^https?:\/\//i.test(item.liveUrl || "")
    ? `<a href="${esc(item.liveUrl)}" target="_blank" rel="noopener noreferrer"
          class="btn-primary px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2 transition-all duration-300 hover:scale-105">
         View Live Project <span aria-hidden="true">&#8599;</span>
       </a>`
    : "";

  const bookBtn = `
    <button type="button" id="case-book-btn"
            class="btn-outline px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2 transition-all duration-300 hover:scale-105">
      Book a Meeting <span aria-hidden="true">&#8594;</span>
    </button>`;

  document.getElementById("portfolio-modal-content").innerHTML = `
    <div class="case-hero">${hero}</div>

    <div class="flex flex-wrap items-center gap-2 mb-3">
      <span class="chip">${esc(item.category)}</span>
      ${item.featured ? '<span class="chip chip-featured">Featured</span>' : ""}
      ${isConceptProject(item) ? '<span class="chip">Sample / concept project</span>' : ""}
    </div>

    <h2 class="font-display font-extrabold text-2xl mb-3">${esc(item.title)}</h2>
    ${item.summary ? `<p class="case-summary">${esc(item.summary)}</p>` : ""}

    ${meta}

    ${item.description ? `
      <div class="case-block">
        <h4 class="case-heading">About this project</h4>
        <p class="body-muted leading-relaxed whitespace-pre-line">${esc(item.description)}</p>
      </div>` : ""}

    ${resultsBlock}
    ${galleryBlock}
    ${tags}

    <div class="case-actions">${liveBtn}${bookBtn}</div>
  `;

  // Wire the buttons here rather than with inline handlers, so titles
  // containing quotes or backslashes cannot break out of an attribute.
  const bookEl = document.getElementById("case-book-btn");
  if (bookEl) {
    bookEl.addEventListener("click", () => bookFromProject(item.title, item.category));
  }
  document.querySelectorAll("#portfolio-modal-content .case-gallery-img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.dataset.full));
  });

  openModal("portfolio-modal");
}

function caseHeroFallback(img) {
  const box = document.createElement("div");
  box.className = "case-hero-placeholder";
  box.innerHTML = `<span>${icon("image")}</span>`;
  img.replaceWith(box);
}

function formatProjectDate(v) {
  const d = new Date(v);
  if (isNaN(d.getTime())) return v;
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/* Close the project, then jump to the booking form with the
   service prefilled so the enquiry arrives with context. */
function bookFromProject(title, category) {
  closeModal("portfolio-modal");

  // Prefill the message so the enquiry arrives with context
  const note = document.getElementById("book-message");
  if (note && !note.value.trim()) {
    note.value = `I'd like to discuss a project similar to "${title}".`;
  }

  // Match the project's category to a service in the dropdown, when one fits
  const select = document.getElementById("book-service");
  if (select && !select.value && category) {
    const wanted = String(category).toLowerCase();
    const option = [...select.options].find(
      (o) => o.value && o.value.toLowerCase().includes(wanted)
    );
    if (option) select.value = option.value;
  }

  setTimeout(() => {
    const section = document.getElementById("book-meeting");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 260);
}

/* Full-size view of a gallery image */
function openLightbox(src) {
  const existing = document.getElementById("case-lightbox");
  if (existing) existing.remove();

  const box = document.createElement("div");
  box.id = "case-lightbox";
  box.className = "case-lightbox";
  const closeBtn = document.createElement("button");
  closeBtn.className = "case-lightbox-close";
  closeBtn.setAttribute("aria-label", "Close image");
  closeBtn.innerHTML = "&#10005;";

  const full = document.createElement("img");
  full.src = src;
  full.alt = "";

  box.append(closeBtn, full);

  const close = () => box.remove();
  box.addEventListener("click", (e) => { if (e.target !== full) close(); });
  document.addEventListener("keydown", function onEsc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", onEsc); }
  });

  document.body.appendChild(box);
  requestAnimationFrame(() => box.classList.add("open"));
}

function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

/* =================== THEME TOGGLE =================== */
function initTheme() {
  const body = document.body;
  const btn = document.getElementById("theme-toggle");
  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");

  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);

  btn.addEventListener("click", () => {
    const current = body.classList.contains("dark-mode") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      sun.classList.remove("hidden");
      moon.classList.add("hidden");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      sun.classList.add("hidden");
      moon.classList.remove("hidden");
    }
  }
}

/* =================== NAVBAR =================== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = mobileMenu.querySelectorAll("a");
  let isMenuOpen = false;

  // Scroll shadow + active link, at most once per frame. Layout is read
  // first and classes written after, so the browser never has to redo
  // layout in the middle of the handler (a "forced reflow").
  let scrollQueued = false;
  window.addEventListener("scroll", () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      const scrolled = window.scrollY > 20;
      const current = activeSection();
      navbar.classList.toggle("scrolled", scrolled);
      setActiveNav(current);
    });
  }, { passive: true });

  // Hamburger toggle
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isMenuOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close on any menu link click
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
  });

  // Close modal bg clicks
  document
    .getElementById("service-modal-bg")
    .addEventListener("click", () => closeModal("service-modal"));
  document
    .getElementById("portfolio-modal-bg")
    .addEventListener("click", () => closeModal("portfolio-modal"));
  document
    .getElementById("service-modal-close")
    .addEventListener("click", () => closeModal("service-modal"));
  document
    .getElementById("portfolio-modal-close")
    .addEventListener("click", () => closeModal("portfolio-modal"));

  // ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal("service-modal");
      closeModal("portfolio-modal");
      if (isMenuOpen) closeMobileMenu();
    }
  });

  function openMobileMenu() {
    isMenuOpen = true;
    mobileMenu.classList.add("open");
    menuToggle.classList.add("menu-open");
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
  }
}

/* =================== ACTIVE NAV =================== */
// Reads layout only: the last section whose top has passed the navbar
function activeSection() {
  const sections = ["hero", "about", "services", "portfolio", "faq", "contact"];
  let current = "";
  sections.forEach((id) => {
    const section = document.getElementById(id);
    // A hidden section (portfolio with no projects) reports top 0, so skip it
    if (section && !section.hidden && section.getBoundingClientRect().top <= 100) current = id;
  });
  return current;
}

// Writes only
function setActiveNav(current) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === current);
  });
}

/* =================== REVEAL ON SCROLL =================== */
function observeReveal() {
  const elements = document.querySelectorAll(".reveal-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  elements.forEach((el) => observer.observe(el));
}

/* =================== CONFIG =================== */
// Admin WhatsApp number (with country code, no + sign)
const ADMIN_WHATSAPP = "923157558885";

// Email API endpoint (serverless function, same on Netlify and Vercel)
const MAIL_API = "/api/send";

/* =================== SPAM PROTECTION (Cloudflare Turnstile) =================== */
// Turnstile is heavy (most of the page's JavaScript time on a phone), so it
// is only loaded when a form is about to be used, not with the page.
const turnstileWidgets = {};
let turnstileRequested = false;

function loadTurnstile() {
  if (turnstileRequested || !(window.NEXYRA_CONFIG || {}).TURNSTILE_SITE_KEY) return;
  turnstileRequested = true;
  const s = document.createElement("script");
  s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=nxTurnstileReady";
  s.async = true;
  document.head.appendChild(s);
}

function initTurnstileLoader() {
  const forms = document.querySelectorAll("#book-meeting, #contact");
  // Someone typing in a form needs it right away
  forms.forEach((f) => f.addEventListener("focusin", loadTurnstile, { once: true }));
  if (!("IntersectionObserver" in window)) return loadTurnstile();
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      loadTurnstile();
    }
  }, { rootMargin: "800px 0px" });
  forms.forEach((f) => io.observe(f));
}

// The Turnstile script calls this once it has loaded

window.nxTurnstileReady = function () {
  const key = (window.NEXYRA_CONFIG || {}).TURNSTILE_SITE_KEY;
  if (!key || !window.turnstile) return;
  document.querySelectorAll(".form-turnstile").forEach((el) => {
    turnstileWidgets[el.dataset.form] = window.turnstile.render(el, {
      sitekey: key,
      theme: document.body.classList.contains("dark-mode") ? "dark" : "light",
    });
  });
};

function turnstileToken(formType) {
  const id = turnstileWidgets[formType];
  return id !== undefined && window.turnstile ? window.turnstile.getResponse(id) || "" : "";
}

function resetTurnstile(formType) {
  const id = turnstileWidgets[formType];
  if (id !== undefined && window.turnstile) window.turnstile.reset(id);
}

/* =================== FORM SUBMISSION =================== */
// Sends a booking/contact form, then moves to the thank-you page.
// Spam-check and consent failures stay on the form with a message.
async function submitLead(form, type, payload, whatsappURL, details) {
  const btn = form.querySelector('button[type="submit"]');
  const errorEl = form.querySelector(".form-error");
  const idleHTML = btn.innerHTML;

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }
  errorEl.hidden = true;

  const token = turnstileToken(type);
  const needsCheck = !!(window.NEXYRA_CONFIG || {}).TURNSTILE_SITE_KEY;
  if (needsCheck && !token) {
    // Covers a very quick submit before the check has finished loading
    loadTurnstile();
    showError("Please complete the security check above the button.");
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split mr-2" aria-hidden="true"></i> Sending...';

  let res = {};
  try {
    const resp = await fetch(MAIL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, type, consent: form.consent.checked, turnstileToken: token }),
    });
    res = await resp.json().catch(() => ({}));
  } catch (err) {
    console.warn("Mail failed:", err);
  }

  if (res.code === "captcha" || res.code === "consent") {
    showError(res.error);
    btn.disabled = false;
    btn.innerHTML = idleHTML;
    resetTurnstile(type);
    return;
  }

  try {
    sessionStorage.setItem(
      "nx-thanks",
      JSON.stringify({ type, ...details, whatsappURL, emailSent: !!res.success })
    );
  } catch (e) { /* the thank-you page falls back to a generic message */ }
  location.href = "/thank-you";
}

/* =================== BOOKING FORM =================== */
function handleBooking(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim() || "N/A";
  const company = form.company.value.trim() || "N/A";
  const service = form.service.value;
  const date = form.date.value;
  const tz = BOOKING_TIMEZONES[form.timezone.value] || BOOKING_TIMEZONES["Asia/Karachi"];
  // e.g. "10:00 AM ET"; the Pakistan Time equivalent goes in the WhatsApp note
  const time = `${form.time.value} ${tz.abbr}`;
  const pkTime = pakistanTimeFor(date, form.time.value, form.timezone.value);
  const message = form.message.value.trim() || "N/A";

  const whatsappMsg =
    `*New Meeting Booking!*\n\n` +
    `*Name:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Phone:* ${phone}\n` +
    `*Company:* ${company}\n` +
    `*Service:* ${service}\n` +
    `*Date:* ${date}\n` +
    `*Time:* ${time}${pkTime ? ` (${pkTime})` : ""}\n` +
    `*Details:* ${message}`;

  const whatsappURL = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`;

  submitLead(
    form,
    "booking",
    { name, email, phone, company, service, date, time, message: pkTime ? `${message}\n\n[Pakistan Time: ${pkTime}]` : message },
    whatsappURL,
    { name, email, date, time }
  );
}

function initBookingDate() {
  const dateInput = document.getElementById("book-date");
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }
}

/* =================== BOOKING TIMEZONE =================== */
// Slots are picked in the visitor's chosen timezone; for zones other than
// PKT the hint shows the matching Pakistan Time, which is what our team works in.
const BOOKING_TIMEZONES = {
  "America/New_York": { abbr: "ET", label: "US Eastern (ET)" },
  "America/Chicago": { abbr: "CT", label: "US Central (CT)" },
  "America/Los_Angeles": { abbr: "PT", label: "US Pacific (PT)" },
  "Europe/London": { abbr: "UK time", label: "UK time (GMT/BST)" },
  "Europe/Berlin": { abbr: "CET/CEST", label: "Central European Time (CET/CEST)" },
  "Asia/Dubai": { abbr: "GST", label: "Gulf Standard Time (GST)" },
  "Asia/Karachi": { abbr: "PKT", label: "Pakistan Time (PKT)" },
};

// Minutes a zone is ahead of UTC at a given instant
function zoneOffsetMinutes(zone, instant) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: zone, hourCycle: "h23",
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
    }).formatToParts(instant).map((p) => [p.type, p.value])
  );
  const asUTC = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  return (asUTC - instant.getTime()) / 60000;
}

// "2026-11-03", "10:00 AM", "America/New_York" → "8:00 PM PKT, Tue 3 Nov"
function pakistanTimeFor(date, slot, zone) {
  if (!date || !slot || zone === "Asia/Karachi") return "";
  const m = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(slot);
  const [y, mo, d] = date.split("-").map(Number);
  if (!m || !y) return "";
  const hour = (Number(m[1]) % 12) + (m[3] === "PM" ? 12 : 0);
  const wall = Date.UTC(y, mo - 1, d, hour, Number(m[2]));
  let instant = new Date(wall - zoneOffsetMinutes(zone, new Date(wall)) * 60000);
  instant = new Date(wall - zoneOffsetMinutes(zone, instant) * 60000); // settle DST edges
  const fmt = (opts) => instant.toLocaleString("en-GB", { timeZone: "Asia/Karachi", ...opts });
  return `${fmt({ hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase()} PKT, ${fmt({ weekday: "short", day: "numeric", month: "short" })}`;
}

function initBookingTimezone() {
  const select = document.getElementById("book-tz");
  const hint = document.getElementById("book-tz-hint");
  if (!select || !hint) return;

  // Start on the visitor's own zone when it is one we offer
  try {
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (BOOKING_TIMEZONES[local]) select.value = local;
  } catch (e) { /* keep Pakistan Time */ }

  const update = () => {
    const tz = BOOKING_TIMEZONES[select.value];
    const pk = pakistanTimeFor(
      document.getElementById("book-date").value,
      document.getElementById("book-time").value,
      select.value
    );
    hint.textContent = `Time slots are in ${tz.label}.` + (pk ? ` That is ${pk} for our team.` : "");
  };
  ["book-tz", "book-date", "book-time"].forEach((id) =>
    document.getElementById(id).addEventListener("change", update)
  );
  update();
}

/* Pick a service in the booking dropdown, e.g. from a service card or
   a link like /?service=Business%20Automation#book-meeting */
function preselectService(title) {
  const select = document.getElementById("book-service");
  if (!select || !title) return;
  const option = [...select.options].find((o) => o.value === title);
  if (option) select.value = option.value;
}

/* =================== CONTACT FORM =================== */
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim() || "N/A";
  const subject = form.subject.value;
  const message = form.message.value.trim();

  const whatsappMsg =
    `*New Contact Message!*\n\n` +
    `*Name:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Phone:* ${phone}\n` +
    `*Subject:* ${subject}\n` +
    `*Message:* ${message}`;

  const whatsappURL = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`;

  submitLead(form, "contact", { name, email, phone, subject, message }, whatsappURL, { name, email });
}

/* =================== INIT =================== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderWhy();
  renderBenefits();
  renderServices();
  loadPortfolio();   // fetches projects, then shows the section if there are any
  initNavbar();
  initBookingDate();
  initBookingTimezone();
  preselectService(new URLSearchParams(location.search).get("service"));
  initTurnstileLoader();
  observeReveal();
});
