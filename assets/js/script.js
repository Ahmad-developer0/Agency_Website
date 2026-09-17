/* =================== DATA =================== */
const whyData = [
  {
    icon: "🎯",
    title: "Strategy-First Approach",
    description:
      "Every campaign begins with rigorous market research and audience analysis. We don't guess — we build on data, insights, and proven frameworks tailored to your unique business context.",
  },
  {
    icon: "⚡",
    title: "Agile & Fast Execution",
    description:
      "We move at the speed of digital. Our agile team ships campaigns, tests rapidly, and iterates based on real-time performance data — so you never miss a market opportunity.",
  },
  {
    icon: "📊",
    title: "Transparent Reporting",
    description:
      "No vanity metrics. You get clear, honest dashboards showing exactly what's working, what's not, and how we're evolving strategy to maximize your return on investment.",
  },
];

const benefitsData = [
  {
    icon: "🚀",
    title: "Accelerated Growth",
    description:
      "Our proven frameworks scale brands from zero to market leaders, compressing years of organic growth into targeted, accelerated campaigns.",
  },
  {
    icon: "🔒",
    title: "Brand Safety",
    description:
      "Your reputation is sacred. Every piece of content, every placement, every campaign protects and elevates your brand identity.",
  },
  {
    icon: "💡",
    title: "Creative Excellence",
    description:
      "Award-winning creative team producing content that stops the scroll, sparks emotion, and drives meaningful action from your audience.",
  },
  {
    icon: "🤝",
    title: "Dedicated Partnership",
    description:
      "We work as an extension of your team — not just a vendor. Your goals are our goals, and we're committed to your long-term success.",
  },
];

const servicesData = [
  {
    icon: "🎨",
    title: "Brand Identity Design",
    description:
      "We craft comprehensive visual identities that communicate your brand's essence, values, and personality across every touchpoint.",
    keypoints: [
      "Logo & visual identity system",
      "Branding Video Ads",
      "Frontend Development",
      "Brand voice & messaging framework",
      "Stationery & collateral design",
      "Brand audit & refresh consulting",
    ],
  },
  {
    icon: "📱",
    title: "Social Media Marketing",
    description:
      "Data-driven social strategies that build communities, drive engagement, and convert followers into loyal brand advocates.",
    keypoints: [
      "Platform strategy & content calendar",
      "Content creation & copywriting",
      "Community management & engagement",
      "Paid social advertising (Meta, TikTok, LinkedIn)",
      "Influencer partnership coordination",
      "Social analytics & monthly reporting",
    ],
  },
  {
    icon: "🔍",
    title: "SEO & Content Marketing",
    description:
      "Dominate search results with technical SEO excellence and compelling content that attracts, educates, and converts your target audience.",
    keypoints: [
      "Technical SEO audit & optimization",
      "Keyword research & competitor analysis",
      "Content strategy & editorial planning",
      "Long-form blog & article writing",
      "Link building & authority campaigns",
      "Local SEO for multi-location brands",
    ],
  },
  {
    icon: "🛍️",
    title: "Shopify Store Development",
    description:
      "Conversion-focused Shopify stores built to sell — custom themes, seamless checkout, and the integrations your business runs on.",
    keypoints: [
      "Custom Shopify theme design & development",
      "Store setup, migration & product catalog",
      "Payment gateway & shipping configuration",
      "Shopify app integration & customization",
      "Speed optimization & mobile experience",
      "Conversion rate optimization (CRO)",
    ],
  },
  {
    icon: "🌐",
    title: "Web Design & Development",
    description:
      "High-performance, conversion-optimized websites and landing pages built with cutting-edge technology and stunning design.",
    keypoints: [
      "UX/UI design & prototyping",
      "Responsive web development",
      "E-commerce development (Shopify, WooCommerce)",
      "Landing page & funnel building",
      "Website speed & core web vitals",
      "CMS setup & team training",
    ],
  },
  {
    icon: "📧",
    title: "App Development",
    description:
      "High-performance Android applications designed to deliver exceptional user experiences and scalable business solutions.",
    keypoints: [
      "Requirement analysis & project planning",
      "UI/UX design & prototyping",
      "Kotlin & Java development",
      "API integration & backend setup",
      "Testing & performance optimization",
      "Bug fixing & app optimization",
    ],
  },
];

const testimonialsData = [
  {
    image: "https://i.pravatar.cc/150?img=32",
    name: "Sarah Widyaningrum",
    title: "CEO, NovaTech Indonesia",
    description:
      "Art Developer transformed our digital presence. Within 6 months, organic traffic grew 280% and leads tripled. Their strategic approach is unlike any agency we've worked with.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=12",
    name: "Marcus Chen",
    title: "Marketing Director, Archipelago Retail",
    description:
      "The ROI from their PPC campaigns is remarkable — 4x our previous agency. The team is responsive, creative, and genuinely invested in our growth.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=47",
    name: "Diva Ramadhani",
    title: "Founder, Glow Skincare Co.",
    description:
      "Our brand identity was completely reimagined. The new visual system is stunning and our brand recognition in the market has skyrocketed. Truly exceptional work.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=5",
    name: "James Hartono",
    title: "COO, Logistik Nusantara",
    description:
      "Professional, creative, data-driven. Their social media strategy grew us from 2K to 85K followers under a year while dramatically improving lead quality.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=25",
    name: "Rini Susanti",
    title: "Head of Digital, Garuda Finance",
    description:
      "Art Developer feels like part of our internal team. Their email automation system alone generates 30% of our monthly revenue. Absolutely outstanding.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=15",
    name: "Kevin Wijaya",
    title: "Founder, Kopi Rimba",
    description:
      "Launched our D2C brand from scratch with Art Developer. Within 3 months we hit 1,000 subscribers and the brand looks world-class. Best investment ever.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=60",
    name: "Anastasia Putri",
    title: "CMO, Kencana Property Group",
    description:
      "We saw a 5x increase in qualified leads within the first quarter. Their SEO and content strategy is meticulous, well-researched, and incredibly effective.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=8",
    name: "Budi Santoso",
    title: "CEO, Maju Bersama UMKM",
    description:
      "Before Art Developer, our digital presence was basically non-existent. Now we rank on page 1 for our main keywords and get 50+ inbound inquiries monthly.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=44",
    name: "Linda Christiani",
    title: "Brand Manager, Toko Emas Cahaya",
    description:
      "The rebranding project was flawless — delivered on time, on budget, and exceeded every expectation. Our customers literally stopped us to compliment our new look.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=20",
    name: "Rizky Firmansyah",
    title: "Director, Edu Prima Institute",
    description:
      "Our enrollment rates increased 67% after Art Developer redesigned our website and launched our Google Ads campaigns. The results speak for themselves.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=38",
    name: "Mega Lestari",
    title: "Co-Founder, Bumbu Nusantara",
    description:
      "TikTok strategy by Art Developer went viral — one campaign hit 8M views and we sold out our entire stock in 48 hours. Unbelievable team.",
    stars: 5,
  },
  {
    image: "https://i.pravatar.cc/150?img=52",
    name: "Theo Hartawan",
    title: "VP Marketing, Indocement Digital",
    description:
      "Extremely professional and creative. They delivered a complete brand refresh and digital campaign that completely repositioned us in a very competitive market.",
    stars: 5,
  },
];

/* ===================================================
   PORTFOLIO
   Loaded from the database (/api/projects). The array
   below is only what shows if that request fails.
=================================================== */

let portfolioData = [];

const PORTFOLIO_FALLBACK = [
  {
    emoji: "\ud83c\udf10",
    title: "Archipelago Retail E-commerce",
    category: "Web Dev",
    tags: ["Shopify", "UI/UX Design", "CRO", "Performance"],
    summary: "Shopify rebuild focused on speed and conversions.",
    description:
      "Complete e-commerce redesign and rebuild for Archipelago Retail on Shopify. Focused on conversion rate optimization, mobile-first design, and lightning-fast performance.",
    cover: "",
    gallery: [],
    client: "",
    date: "",
    results: [],
    liveUrl: "",
    featured: false,
  },
];

async function loadPortfolio() {
  try {
    const resp = await fetch("/api/projects");
    const json = await resp.json();
    if (json && json.success && Array.isArray(json.projects) && json.projects.length) {
      portfolioData = json.projects;
    } else {
      portfolioData = PORTFOLIO_FALLBACK;
    }
  } catch (err) {
    console.warn("Could not load projects, showing fallback:", err);
    portfolioData = PORTFOLIO_FALLBACK;
  }

  renderPortfolioFilters();
  renderPortfolio();
}

/* =================== RENDER FUNCTIONS =================== */

function renderWhy() {
  const grid = document.getElementById("why-grid");
  grid.innerHTML = whyData
    .map(
      (item, i) => `
    <div class="feature-card reveal-up" style="transition-delay: ${i * 0.1}s">
      <div class="card-icon">${item.icon}</div>
      <h3 class="font-display font-bold text-xl mb-3">${item.title}</h3>
      <p class="body-muted text-sm leading-relaxed">${item.description}</p>
    </div>
  `,
    )
    .join("");
}

function renderBenefits() {
  const grid = document.getElementById("benefits-grid");
  grid.innerHTML = benefitsData
    .map(
      (item, i) => `
    <div class="feature-card reveal-up" style="transition-delay: ${i * 0.1}s">
      <div class="card-icon">${item.icon}</div>
      <h3 class="font-display font-bold text-lg mb-2">${item.title}</h3>
      <p class="body-muted text-sm leading-relaxed">${item.description}</p>
    </div>
  `,
    )
    .join("");
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = servicesData
    .map(
      (item, i) => `
    <div class="feature-card reveal-up" style="transition-delay: ${i * 0.08}s; cursor: pointer;" onclick="openServiceModal(${i})">
      <div class="card-icon">${item.icon}</div>
      <h3 class="font-display font-bold text-xl mb-3">${item.title}</h3>
      <p class="body-muted text-sm leading-relaxed mb-4">${item.description.substring(0, 100)}...</p>
      <div class="inline-flex items-center gap-1 text-sm font-semibold" style="color: var(--accent)">
        Learn more <span>→</span>
      </div>
    </div>
  `,
    )
    .join("");
}

function buildTestiCard(item) {
  return `
    <div class="testi-card">
      <div class="flex gap-1 mb-3">
        ${'<span class="star" aria-hidden="true">★</span>'.repeat(item.stars)}
      </div>
      <p class="text-sm leading-relaxed body-muted mb-5 italic">"${item.description}"</p>
      <div class="flex items-center gap-3">
        <img src="${item.image}" alt="${item.name}" class="testi-avatar" loading="lazy"/>
        <div>
          <div class="font-semibold text-sm">${item.name}</div>
          <div class="text-xs body-muted">${item.title}</div>
        </div>
      </div>
    </div>
  `;
}

function renderTestimonials() {
  // Split into two halves
  const half = Math.ceil(testimonialsData.length / 2);
  const row1Data = testimonialsData.slice(0, half);
  const row2Data = testimonialsData.slice(half);

  // Duplicate each row (seamless loop needs 2 copies)
  const row1HTML = [...row1Data, ...row1Data].map(buildTestiCard).join("");
  const row2HTML = [...row2Data, ...row2Data].map(buildTestiCard).join("");

  document.getElementById("testi-row-1").innerHTML = row1HTML;
  document.getElementById("testi-row-2").innerHTML = row2HTML;
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
      const emoji = item.emoji || "\ud83d\uddbc\ufe0f";

      const media = item.cover
        ? `<img src="${esc(item.cover)}" alt="${esc(item.title)}" class="portfolio-img"
                loading="lazy" data-emoji="${esc(emoji)}" onerror="portfolioImgFallback(this)">`
        : `<div class="portfolio-img-placeholder overflow-hidden"><span>${esc(emoji)}</span></div>`;

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

/* A cover image that fails to load falls back to the emoji tile */
function portfolioImgFallback(img) {
  const box = document.createElement("div");
  box.className = "portfolio-img-placeholder overflow-hidden";
  const span = document.createElement("span");
  span.textContent = img.dataset.emoji || "\ud83d\uddbc\ufe0f";
  box.appendChild(span);
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
    <button class="filter-btn ${cat === "all" ? "active" : ""} px-5 py-2 rounded-full text-sm font-medium transition-all duration-300" data-filter="${cat}">
      ${cat.charAt(0).toUpperCase() + cat.slice(1)}
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
    <div class="text-4xl mb-5">${item.icon}</div>
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
    <a href="#contact" class="btn-primary mt-8 px-6 py-3 rounded-xl font-semibold text-sm inline-block transition-all duration-300 hover:scale-105" onclick="closeModal('service-modal')">Get This Service →</a>
  `;
  openModal("service-modal");
}

function openPortfolioModal(index) {
  const item = portfolioData[index];
  if (!item) return;

  const emoji = item.emoji || "\ud83d\uddbc\ufe0f";

  // ── Hero ──
  const hero = item.cover
    ? `<img src="${esc(item.cover)}" alt="${esc(item.title)}" class="case-hero-img"
            data-emoji="${esc(emoji)}" onerror="caseHeroFallback(this)">`
    : `<div class="case-hero-placeholder"><span>${esc(emoji)}</span></div>`;

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
  const liveBtn = item.liveUrl
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
  const span = document.createElement("span");
  span.textContent = img.dataset.emoji || "\ud83d\uddbc\ufe0f";
  box.appendChild(span);
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

  // Scroll shadow
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
    updateActiveNav();
  });

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
function updateActiveNav() {
  const sections = ["hero", "about", "services", "portfolio", "contact"];
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= 100) current = id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.section === current) link.classList.add("active");
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

// Email API endpoint (Vercel serverless function)
const MAIL_API = "/api/send";

/* =================== BOOKING FORM =================== */
function handleBooking(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById("booking-submit");
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim() || "N/A";
  const company = form.company.value.trim() || "N/A";
  const service = form.service.value;
  const date = form.date.value;
  const time = form.time.value;
  const message = form.message.value.trim() || "N/A";

  // Disable button while submitting
  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split mr-2" aria-hidden="true"></i> Booking...';

  // ── 1. Send Fancy Email (Admin + Customer Auto-Reply) ──
  const emailPromise = fetch(MAIL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "booking",
      name: name,
      email: email,
      phone: phone,
      company: company,
      service: service,
      date: date,
      time: time,
      message: message,
    }),
  }).then((res) => res.json());

  // ── 2. Send WhatsApp to Admin ──
  const whatsappMsg =
    `*New Meeting Booking!*\n\n` +
    `*Name:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Phone:* ${phone}\n` +
    `*Company:* ${company}\n` +
    `*Service:* ${service}\n` +
    `*Date:* ${date}\n` +
    `*Time:* ${time}\n` +
    `*Details:* ${message}`;

  const whatsappURL = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`;

  // Wait for email, then show result
  emailPromise
    .then((res) => {
      showBookingSuccess(form, name, email, date, time, whatsappURL, res.success);
    })
    .catch((err) => {
      console.warn("Mail failed:", err);
      showBookingSuccess(form, name, email, date, time, whatsappURL, false);
    });
}

function showBookingSuccess(form, name, email, date, time, whatsappURL, emailSent) {
  const emailNote = emailSent
    ? `<div class="flex items-center justify-center gap-2 mb-1">
         <i class="bi bi-envelope-check" style="color:var(--accent)"></i>
         <span class="text-sm" style="color:var(--accent)">Email notification sent to admin</span>
       </div>`
    : "";

  form.innerHTML = `
    <div class="booking-success text-center py-8">
      <div class="success-icon">
        <i class="bi bi-check-lg" style="font-size:2rem;color:var(--accent)"></i>
      </div>
      <h3 class="font-display font-extrabold text-2xl mb-3">Meeting Booked!</h3>
      <p class="body-muted mb-2">Thank you, <strong>${name}</strong>.</p>
      <p class="body-muted mb-4 text-sm">We'll confirm your <strong>${time}</strong> slot on <strong>${date}</strong> within 24 hours via email at <strong>${email}</strong>.</p>
      ${emailNote}
      <div class="flex flex-wrap gap-3 justify-center mt-6">
        <a href="${whatsappURL}" target="_blank" class="btn-primary px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105">
          <i class="bi bi-whatsapp mr-2" aria-hidden="true"></i> Confirm on WhatsApp
        </a>
        <button onclick="resetBookingForm()" class="btn-ghost px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105">
          Book Another
        </button>
      </div>
    </div>
  `;

  // Auto-open WhatsApp in new tab so admin gets notified
  window.open(whatsappURL, "_blank");
}

function resetBookingForm() {
  location.hash = "#book-meeting";
  location.reload();
}

function initBookingDate() {
  const dateInput = document.getElementById("book-date");
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }
}

/* =================== CONTACT FORM =================== */
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById("contact-submit");
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim() || "N/A";
  const subject = form.subject.value;
  const message = form.message.value.trim();

  // Disable button
  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split mr-2" aria-hidden="true"></i> Sending...';

  // ── 1. Send Fancy Email (Admin + Customer Auto-Reply) ──
  const emailPromise = fetch(MAIL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "contact",
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
    }),
  }).then((res) => res.json());

  // ── 2. Build WhatsApp message ──
  const whatsappMsg =
    `*New Contact Message!*\n\n` +
    `*Name:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Phone:* ${phone}\n` +
    `*Subject:* ${subject}\n` +
    `*Message:* ${message}`;

  const whatsappURL = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`;

  emailPromise
    .then((res) => {
      showContactSuccess(form, name, whatsappURL, res.success);
    })
    .catch((err) => {
      console.warn("Mail (contact) failed:", err);
      showContactSuccess(form, name, whatsappURL, false);
    });
}

function showContactSuccess(form, name, whatsappURL, emailSent) {
  const emailNote = emailSent
    ? `<div class="flex items-center justify-center gap-2 mb-1">
         <i class="bi bi-envelope-check" style="color:var(--accent)"></i>
         <span class="text-sm" style="color:var(--accent)">Email notification sent to admin</span>
       </div>`
    : "";

  form.innerHTML = `
    <div class="booking-success text-center py-8">
      <div class="success-icon">
        <i class="bi bi-check-lg" style="font-size:2rem;color:var(--accent)"></i>
      </div>
      <h3 class="font-display font-extrabold text-2xl mb-3">Message Sent!</h3>
      <p class="body-muted mb-4">Thank you, <strong>${name}</strong>. We'll get back to you within 24 hours.</p>
      ${emailNote}
      <div class="flex flex-wrap gap-3 justify-center mt-6">
        <a href="${whatsappURL}" target="_blank" class="btn-primary px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105">
          <i class="bi bi-whatsapp mr-2" aria-hidden="true"></i> Chat on WhatsApp
        </a>
        <button onclick="resetContactForm()" class="btn-ghost px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105">
          Send Another
        </button>
      </div>
    </div>
  `;

  window.open(whatsappURL, "_blank");
}

function resetContactForm() {
  location.hash = "#contact";
  location.reload();
}

/* =================== INIT =================== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderWhy();
  renderBenefits();
  renderServices();
  renderTestimonials();
  loadPortfolio();   // fetches projects, then renders filters + grid
  initNavbar();
  initBookingDate();
  observeReveal();

  // Stagger reveal on first load
  setTimeout(observeReveal, 100);
});
