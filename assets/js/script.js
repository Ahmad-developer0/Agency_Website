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
      "Brand guidelines & style guide",
      "Typography & color system",
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
    icon: "💰",
    title: "Paid Advertising (PPC)",
    description:
      "Performance-driven paid campaigns across Google, Meta, and programmatic channels that maximize ROI and minimize wasted spend.",
    keypoints: [
      "Google Ads search & display campaigns",
      "Meta & Instagram advertising",
      "YouTube & video advertising",
      "Retargeting & remarketing strategies",
      "Landing page optimization (CRO)",
      "Budget management & bid optimization",
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
    title: "Email Marketing & CRM",
    description:
      "Automated email journeys and CRM strategies that nurture leads, retain customers, and drive repeat revenue on autopilot.",
    keypoints: [
      "Email strategy & sequence architecture",
      "Template design & copywriting",
      "Marketing automation (Klaviyo, HubSpot)",
      "List segmentation & personalization",
      "A/B testing & deliverability optimization",
      "CRM integration & workflow setup",
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

const portfolioData = [
  {
    emoji: "🛍️",
    title: "Glow Skincare Rebrand",
    category: "Branding",
    tags: ["Brand Identity", "Logo Design", "Packaging", "Social Media"],
    description:
      "A comprehensive rebrand for Glow Skincare Co., transforming their visual identity from an outdated look to a modern, premium aesthetic. We developed a complete brand system including logo, typography, color palette, packaging design, and social media templates. The rebrand resulted in a 156% increase in brand recognition surveys and opened doors to major retail partnerships.",
    link: "#",
  },
  {
    emoji: "📊",
    title: "NovaTech SEO Campaign",
    category: "SEO",
    tags: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"],
    description:
      "A 12-month SEO overhaul for NovaTech Indonesia — a B2B SaaS company. We conducted a full technical audit, rebuilt their content architecture, and launched an aggressive link-building campaign. Results: Page 1 rankings for 47 target keywords, 280% increase in organic traffic, and a 340% growth in inbound demo requests.",
    link: "#",
  },
  {
    emoji: "📱",
    title: "Kopi Rimba Social Launch",
    category: "Social Media",
    tags: [
      "Social Strategy",
      "Content Creation",
      "Influencer Marketing",
      "Meta Ads",
    ],
    description:
      "Zero-to-hero social media launch for Kopi Rimba, an artisan coffee brand. We built their entire content strategy, managed influencer partnerships with 15 micro-influencers, and ran targeted Meta campaigns. Within 90 days: 45K Instagram followers, 1M+ content impressions, and sold-out launch inventory.",
    link: "#",
  },
  {
    emoji: "🌐",
    title: "Archipelago Retail E-com",
    category: "Web Dev",
    tags: ["Shopify", "UI/UX Design", "CRO", "Performance"],
    description:
      "Complete e-commerce redesign and rebuild for Archipelago Retail on Shopify. Focused on conversion rate optimization, mobile-first design, and lightning-fast performance. Achieved 99/100 PageSpeed score, reduced cart abandonment by 34%, and increased average order value by 28%.",
    link: "#",
  },
  {
    emoji: "💰",
    title: "Logistik Nusantara PPC",
    category: "Paid Ads",
    tags: ["Google Ads", "LinkedIn Ads", "Remarketing", "B2B"],
    description:
      "A comprehensive paid advertising strategy for Logistik Nusantara targeting enterprise B2B clients. We built layered Google Search and LinkedIn campaigns with precision audience targeting. Achieved 3.8x ROAS in month 1, reducing cost-per-qualified-lead by 62% vs. their previous campaigns.",
    link: "#",
  },
  {
    emoji: "📧",
    title: "Garuda Finance Email System",
    category: "Email",
    tags: ["HubSpot", "Email Automation", "CRM", "Lead Nurture"],
    description:
      "End-to-end email marketing automation for Garuda Finance using HubSpot. We architected a 14-touch nurture sequence, built behavioral segmentation, and created dynamic templates. The system now generates 30% of monthly revenue, with a 42% average open rate — 3x the industry average.",
    link: "#",
  },
];

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
  grid.innerHTML = portfolioData
    .map(
      (item, i) => `
    <div class="portfolio-card reveal-up ${filter !== "all" && item.category !== filter ? "hidden" : ""}" 
         data-category="${item.category}" 
         style="transition-delay: ${i * 0.08}s"
         onclick="openPortfolioModal(${i})">
      <div class="portfolio-img-placeholder overflow-hidden">
        <span>${item.emoji}</span>
      </div>
      <div class="p-5">
        <div class="flex items-center justify-between mb-2">
          <span class="chip">${item.category}</span>
        </div>
        <h3 class="font-display font-bold text-lg mb-3">${item.title}</h3>
        <div class="flex flex-wrap gap-1.5">
          ${item.tags.map((t) => `<span class="chip">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `,
    )
    .join("");
  observeReveal();
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
  document.getElementById("portfolio-modal-content").innerHTML = `
    <div class="portfolio-img-placeholder rounded-2xl mb-6" style="height:180px; border-radius: 1rem;">
      <span style="font-size:4rem">${item.emoji}</span>
    </div>
    <div class="flex flex-wrap gap-2 mb-3">
      <span class="chip">${item.category}</span>
    </div>
    <h2 class="font-display font-extrabold text-2xl mb-4">${item.title}</h2>
    <p class="body-muted leading-relaxed mb-6">${item.description}</p>
    <div>
      <h4 class="font-semibold text-sm mb-3" style="color:var(--accent)">TAGS</h4>
      <div class="flex flex-wrap gap-2 mb-6">
        ${item.tags.map((t) => `<span class="chip">${t}</span>`).join("")}
      </div>
    </div>
    <a href="${item.link}" class="btn-primary px-6 py-3 rounded-xl font-semibold text-sm inline-block transition-all duration-300 hover:scale-105">View Live Project →</a>
  `;
  openModal("portfolio-modal");
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
  renderPortfolioFilters();
  renderPortfolio();
  initNavbar();
  initBookingDate();
  observeReveal();

  // Stagger reveal on first load
  setTimeout(observeReveal, 100);
});
