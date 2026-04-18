/**
 * ArtDev — script.js
 * ─────────────────────────────────────────────────────────
 * Sections:
 *  1. CONFIG — i18n strings
 *  2. DATA   — services, portfolio, testimonials, why, process
 *  3. THEME  — dark/light toggle
 *  4. LANG   — language toggle + i18n renderer
 *  5. TOAST  — notification system
 *  6. NAVBAR — scroll shrink + active link
 *  7. MOBILE MENU
 *  8. SCROLL REVEAL — fade-up + stagger
 *  9. RENDER — populate all grids
 * 10. MODALS — service & portfolio
 * 11. MARQUEE — testimonial rows
 * 12. PORTFOLIO FILTER
 * 13. INIT
 * ─────────────────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════════════
   1. CONFIG — i18n strings
══════════════════════════════════════════════════════ */
const i18n = {
  id: {
    /* NAV */
    "nav.about": "Tentang",
    "nav.services": "Layanan",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Kontak",
    "nav.cta": "Mulai Sekarang",
    /* HERO */
    "hero.badge": "Digital Marketing Agency",
    "hero.h1a": "Kami Ciptakan",
    "hero.h1b": "Digital Art",
    "hero.h1c": "yang Konversi",
    "hero.desc":
      "Art Developer mengubah brand menjadi pengalaman digital yang tak terlupakan — memadukan strategi kreatif, desain berani, dan marketing berbasis data.",
    "hero.cta1": "Lihat Layanan",
    "hero.cta2": "Lihat Portfolio →",
    "hero.stat1": "Proyek Selesai",
    "hero.stat2": "Klien Puas",
    "hero.stat3": "Pengalaman",
    "hero.roi": "Campaign ROI",
    "hero.leads": "New Leads",
    /* ABOUT */
    "about.label": "Tentang Kami",
    "about.stat1": "Tahun Berpengalaman",
    "about.stat2": "Anggota Tim",
    "about.stat3": "Penghargaan Industri",
    "about.stat4": "Negara Terjangkau",
    "about.quote":
      '"Kami tidak sekadar menjalankan kampanye — kami merancang narasi yang menggerakkan orang sekaligus metrik."',
    "about.ceo": "Arya Pratama, CEO",
    "about.h2a": "Kami Adalah",
    "about.h2b": "Arsitek Digital",
    "about.h2c": "Pertumbuhan",
    "about.p1":
      "Art Developer adalah full-service digital marketing agency yang didirikan dengan satu misi: membantu brand mendominasi lanskap digital mereka. Sejak 2017, kami memadukan kreativitas dengan analitik untuk menghasilkan hasil yang terukur.",
    "about.p2":
      "Dari startup hingga perusahaan Fortune 500, tim lintas fungsi kami merancang pengalaman digital unik yang memikat audiens dan mempercepat pertumbuhan.",
    "about.cta": "Lihat Layanan Kami",
    /* WHY */
    "why.label": "Mengapa Kami",
    "why.h2a": "Keunggulan",
    /* SERVICES */
    "services.label": "Layanan Kami",
    "services.h2a": "Yang Kami",
    "services.h2b": "Tawarkan",
    "services.desc":
      "Solusi digital komprehensif yang disesuaikan dengan tujuan bisnis unik dan ambisi pertumbuhan Anda.",
    "services.learn": "Pelajari Lebih →",
    /* PROCESS */
    "process.label": "Proses Kami",
    "process.h2a": "Kami Temukan",
    "process.h2b": "Strategi Anda",
    "process.h2c": ", Lalu Eksekusi",
    "process.desc":
      "Setiap kampanye sukses dimulai dari riset mendalam. Kami menganalisis pasar, kompetitor, perilaku audiens, dan DNA brand Anda untuk merancang strategi yang unik — lalu mengeksekusinya tanpa henti.",
    "process.cta": "Mulai Strategi",
    /* TESTIMONIALS */
    "testi.label": "Testimoni",
    "testi.h2a": "Apa Kata",
    "testi.h2b": "Klien Kami",
    "testi.desc":
      "Hasil nyata, orang nyata — inilah yang klien kami katakan tentang bekerja bersama Art Developer.",
    /* PORTFOLIO */
    "portfolio.label": "Portfolio",
    "portfolio.h2a": "Karya",
    "portfolio.h2b": "Terbaik",
    "portfolio.h2c": "Kami",
    "portfolio.desc":
      "Seleksi proyek terkurasi yang menampilkan kemampuan dan pendekatan kreatif kami.",
    "portfolio.all": "Semua",
    "portfolio.view": "Lihat Detail →",
    /* CTA */
    "cta.label": "Ayo Terhubung",
    "cta.h2a": "Siap",
    "cta.h2b": "Kembangkan",
    "cta.h2c": "Brand Anda?",
    "cta.desc":
      "Mari bangun sesuatu yang luar biasa bersama. Jadwalkan konsultasi gratis dengan tim kami hari ini.",
    "cta.email": "✉ Email Kami",
    "cta.wa": "💬 WhatsApp",
    /* FOOTER */
    "footer.tagline":
      "Digital marketing agency yang merancang kampanye berbasis data yang berani — mengubah audiens menjadi pelanggan setia.",
    "footer.nav": "Navigasi",
    "footer.contact": "Kontak",
    "footer.copy": "© 2025 Art Developer. Hak cipta dilindungi.",
    "footer.made": "Dibuat dengan ♥ di Indonesia",
    /* TOAST */
    "toast.dark": "Mode gelap diaktifkan",
    "toast.light": "Mode terang diaktifkan",
    "toast.lang.id": "Bahasa Indonesia aktif",
    "toast.lang.en": "Switched to English",
  },
  en: {
    /* NAV */
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "nav.cta": "Get Started",
    /* HERO */
    "hero.badge": "Digital Marketing Agency",
    "hero.h1a": "We Create",
    "hero.h1b": "Digital Art",
    "hero.h1c": "That Converts",
    "hero.desc":
      "Art Developer transforms brands into unforgettable digital experiences — combining creative strategy, bold design, and data-driven marketing.",
    "hero.cta1": "Explore Services",
    "hero.cta2": "View Portfolio →",
    "hero.stat1": "Projects Done",
    "hero.stat2": "Client Satisfied",
    "hero.stat3": "Experience",
    "hero.roi": "Campaign ROI",
    "hero.leads": "New Leads",
    /* ABOUT */
    "about.label": "About Us",
    "about.stat1": "Years in Business",
    "about.stat2": "Team Members",
    "about.stat3": "Industry Awards",
    "about.stat4": "Countries Reached",
    "about.quote":
      '"We don\'t just run campaigns — we craft narratives that move people and metrics alike."',
    "about.ceo": "Arya Pratama, CEO",
    "about.h2a": "We Are Digital",
    "about.h2b": "Architects",
    "about.h2c": "of Growth",
    "about.p1":
      "Art Developer is a full-service digital marketing agency founded with one mission: to help brands dominate their digital landscape. Since 2017, we've blended creativity with analytics to deliver measurable results.",
    "about.p2":
      "From startups to Fortune 500 companies, our cross-functional team crafts bespoke digital experiences that captivate audiences and accelerate growth.",
    "about.cta": "Discover Our Work",
    /* WHY */
    "why.label": "Why Choose Us",
    "why.h2a": "The Art Dev",
    /* SERVICES */
    "services.label": "Our Services",
    "services.h2a": "What We",
    "services.h2b": "Offer",
    "services.desc":
      "Comprehensive digital solutions tailored to your unique business goals and growth ambitions.",
    "services.learn": "Learn More →",
    /* PROCESS */
    "process.label": "Our Process",
    "process.h2a": "We Find",
    "process.h2b": "Your Strategy",
    "process.h2c": ", Then We Execute",
    "process.desc":
      "Every winning campaign begins with deep research. We analyze your market, competitors, audience behavior, and brand DNA to craft a strategy that's uniquely yours — then execute relentlessly.",
    "process.cta": "Start Your Strategy",
    /* TESTIMONIALS */
    "testi.label": "Testimonials",
    "testi.h2a": "What Our",
    "testi.h2b": "Clients Say",
    "testi.desc":
      "Real results, real people — here's what our clients say about working with Art Developer.",
    /* PORTFOLIO */
    "portfolio.label": "Portfolio",
    "portfolio.h2a": "Our",
    "portfolio.h2b": "Best",
    "portfolio.h2c": "Work",
    "portfolio.desc":
      "A curated selection of projects that showcase our capabilities and creative approach.",
    "portfolio.all": "All",
    "portfolio.view": "View Details →",
    /* CTA */
    "cta.label": "Let's Connect",
    "cta.h2a": "Ready to",
    "cta.h2b": "Grow",
    "cta.h2c": "Your Brand?",
    "cta.desc":
      "Let's build something remarkable together. Schedule a free strategy call with our team today.",
    "cta.email": "✉ Email Us",
    "cta.wa": "💬 WhatsApp",
    /* FOOTER */
    "footer.tagline":
      "Digital marketing agency crafting bold, data-driven campaigns that convert audiences into loyal customers.",
    "footer.nav": "Navigation",
    "footer.contact": "Contact",
    "footer.copy": "© 2025 Art Developer. All rights reserved.",
    "footer.made": "Made with ♥ in Indonesia",
    /* TOAST */
    "toast.dark": "Dark mode enabled",
    "toast.light": "Light mode enabled",
    "toast.lang.id": "Bahasa Indonesia aktif",
    "toast.lang.en": "Switched to English",
  },
};

/* ═══════════════════════════════════════════════════════
   2. DATA — content arrays
══════════════════════════════════════════════════════ */

/** WHY cards */
const whyData = [
  {
    num: "01",
    title: { id: "Berbasis Data", en: "Data-Driven" },
    desc: {
      id: "Setiap keputusan didukung oleh analitik real-time dan insight mendalam tentang audiens Anda.",
      en: "Every decision is backed by real-time analytics and deep insights about your audience.",
    },
  },
  {
    num: "02",
    title: { id: "Tim Spesialis", en: "Specialist Team" },
    desc: {
      id: "Tim kami terdiri dari spesialis SEO, paid media, desainer kreatif, dan developer berpengalaman.",
      en: "Our team consists of SEO specialists, paid media experts, creative designers, and experienced developers.",
    },
  },
  {
    num: "03",
    title: { id: "Hasil Terukur", en: "Measurable Results" },
    desc: {
      id: "Kami tidak percaya pada marketing tanpa hasil. Setiap kampanye memiliki KPI yang jelas dan dilaporkan transparan.",
      en: "We don't believe in marketing without results. Every campaign has clear KPIs and transparent reporting.",
    },
  },
];

/** SERVICES */
const servicesData = [
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/></svg>`,
    title: { id: "SEO & Konten", en: "SEO & Content" },
    short: {
      id: "Dominasi halaman pertama Google dengan strategi konten yang relevan dan teknis SEO terbaik.",
      en: "Dominate Google's first page with relevant content strategy and best-in-class technical SEO.",
    },
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">SEO & Konten</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Strategi SEO end-to-end mulai dari riset kata kunci, optimasi on-page, link building, hingga pembuatan konten berkualitas tinggi yang menarik traffic organik berkelanjutan.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Riset & analisis kata kunci kompetitif</li>
             <li>✓ Technical SEO audit & implementasi</li>
             <li>✓ Pembuatan konten blog & artikel</li>
             <li>✓ Link building & digital PR</li>
             <li>✓ Local SEO untuk bisnis Indonesia</li>
           </ul>`,
      en: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">SEO & Content</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">End-to-end SEO strategy covering keyword research, on-page optimization, link building, and high-quality content creation for sustainable organic traffic growth.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Competitive keyword research & analysis</li>
             <li>✓ Technical SEO audit & implementation</li>
             <li>✓ Blog & article content creation</li>
             <li>✓ Link building & digital PR</li>
             <li>✓ Local SEO for Indonesian businesses</li>
           </ul>`,
    },
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    title: { id: "Web Development", en: "Web Development" },
    short: {
      id: "Website dan landing page berkecepatan tinggi yang dioptimalkan untuk konversi dan pengalaman pengguna terbaik.",
      en: "High-speed websites and landing pages optimized for conversions and the best user experience.",
    },
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Web Development</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Pengembangan website modern menggunakan teknologi terkini yang mengutamakan performa, SEO, dan konversi.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Landing page berkecepatan tinggi</li>
             <li>✓ Website perusahaan & profil bisnis</li>
             <li>✓ E-commerce & toko online</li>
             <li>✓ Optimasi Core Web Vitals</li>
             <li>✓ CMS & integrasi backend</li>
           </ul>`,
      en: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Web Development</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Modern website development using the latest technologies that prioritize performance, SEO, and conversion.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ High-speed landing pages</li>
             <li>✓ Company & business profile websites</li>
             <li>✓ E-commerce & online stores</li>
             <li>✓ Core Web Vitals optimization</li>
             <li>✓ CMS & backend integration</li>
           </ul>`,
    },
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    title: { id: "Iklan Berbayar", en: "Paid Advertising" },
    short: {
      id: "Kampanye Google Ads, Meta Ads, dan TikTok Ads yang dioptimalkan untuk ROAS maksimal.",
      en: "Google Ads, Meta Ads, and TikTok Ads campaigns optimized for maximum ROAS.",
    },
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Iklan Berbayar</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Manajemen iklan berbayar berbasis data di seluruh platform utama untuk memaksimalkan return on ad spend (ROAS).</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Google Ads (Search, Display, Shopping)</li>
             <li>✓ Meta Ads (Facebook & Instagram)</li>
             <li>✓ TikTok Ads</li>
             <li>✓ Retargeting & audience segmentation</li>
             <li>✓ A/B testing & optimasi kreatif</li>
           </ul>`,
      en: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Paid Advertising</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Data-driven paid ad management across major platforms to maximize return on ad spend (ROAS).</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Google Ads (Search, Display, Shopping)</li>
             <li>✓ Meta Ads (Facebook & Instagram)</li>
             <li>✓ TikTok Ads</li>
             <li>✓ Retargeting & audience segmentation</li>
             <li>✓ A/B testing & creative optimization</li>
           </ul>`,
    },
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    title: { id: "Social Media", en: "Social Media" },
    short: {
      id: "Manajemen sosial media yang konsisten, kreatif, dan membangun engagement komunitas yang kuat.",
      en: "Consistent, creative social media management that builds strong community engagement.",
    },
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Social Media</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Pengelolaan akun sosial media end-to-end dari perencanaan konten, desain kreatif, posting terjadwal, hingga community management.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Perencanaan & kalender konten</li>
             <li>✓ Desain visual & copywriting</li>
             <li>✓ Instagram, TikTok, LinkedIn, X</li>
             <li>✓ Community management & reply</li>
             <li>✓ Laporan bulanan & insight</li>
           </ul>`,
      en: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Social Media</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">End-to-end social media account management from content planning, creative design, scheduled posting, to community management.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Content planning & calendar</li>
             <li>✓ Visual design & copywriting</li>
             <li>✓ Instagram, TikTok, LinkedIn, X</li>
             <li>✓ Community management & replies</li>
             <li>✓ Monthly reports & insights</li>
           </ul>`,
    },
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    title: { id: "Branding & Desain", en: "Branding & Design" },
    short: {
      id: "Identitas visual yang kuat dan konsisten — dari logo hingga brand guideline yang profesional.",
      en: "Strong and consistent visual identity — from logo to professional brand guidelines.",
    },
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Branding & Desain</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Membangun identitas visual brand yang kuat, konsisten, dan memorable yang membedakan Anda dari kompetitor.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Logo & brand identity design</li>
             <li>✓ Brand guideline & style guide</li>
             <li>✓ Desain materi pemasaran</li>
             <li>✓ Packaging design</li>
             <li>✓ Desain presentasi & pitch deck</li>
           </ul>`,
      en: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Branding & Design</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Building a strong, consistent, and memorable brand visual identity that differentiates you from competitors.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Logo & brand identity design</li>
             <li>✓ Brand guideline & style guide</li>
             <li>✓ Marketing material design</li>
             <li>✓ Packaging design</li>
             <li>✓ Presentation & pitch deck design</li>
           </ul>`,
    },
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    title: { id: "Analytics & CRO", en: "Analytics & CRO" },
    short: {
      id: "Tracking, analisis funnel, dan optimasi konversi agar setiap klik menghasilkan hasil nyata.",
      en: "Tracking, funnel analysis, and conversion optimization so every click delivers real results.",
    },
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Analytics & CRO</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Setup tracking yang benar, analisis data mendalam, dan optimasi berkelanjutan untuk meningkatkan conversion rate website Anda.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Google Analytics 4 & Tag Manager</li>
             <li>✓ Heatmap & session recording</li>
             <li>✓ Funnel analysis & drop-off audit</li>
             <li>✓ A/B testing landing page</li>
             <li>✓ Dashboard laporan custom</li>
           </ul>`,
      en: `<h3 class="font-display font-bold text-xl mb-3" style="color:var(--text)">Analytics & CRO</h3>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Proper tracking setup, deep data analysis, and continuous optimization to improve your website's conversion rate.</p>
           <ul class="flex flex-col gap-2 text-sm" style="color:var(--text-muted)">
             <li>✓ Google Analytics 4 & Tag Manager</li>
             <li>✓ Heatmap & session recording</li>
             <li>✓ Funnel analysis & drop-off audit</li>
             <li>✓ Landing page A/B testing</li>
             <li>✓ Custom reporting dashboard</li>
           </ul>`,
    },
  },
];

/** PROCESS steps */
const processSteps = [
  {
    num: "01",
    title: { id: "Discovery & Audit", en: "Discovery & Audit" },
    desc: {
      id: "Menyelami brand, pasar, dan kompetitor Anda secara mendalam.",
      en: "Deep dive into your brand, market, and competition.",
    },
  },
  {
    num: "02",
    title: { id: "Pemetaan Strategi", en: "Strategy Blueprinting" },
    desc: {
      id: "Roadmap custom yang selaras dengan KPI dan timeline Anda.",
      en: "Custom roadmap aligned with your KPIs and timeline.",
    },
  },
  {
    num: "03",
    title: { id: "Eksekusi Kreatif", en: "Creative Execution" },
    desc: {
      id: "Kampanye diluncurkan dengan presisi dan keunggulan kreatif.",
      en: "Campaigns launched with precision and creative excellence.",
    },
  },
  {
    num: "04",
    title: { id: "Optimasi & Skalabilitas", en: "Optimize & Scale" },
    desc: {
      id: "Analisis data berkelanjutan dan peningkatan iteratif.",
      en: "Continuous data analysis and iterative improvement.",
    },
  },
];

/** TESTIMONIALS */
const testimonialsData = [
  {
    name: "Budi Santoso",
    role: { id: "CEO, TechNusa", en: "CEO, TechNusa" },
    body: {
      id: "Art Developer mengubah strategi digital kami sepenuhnya. Traffic organik naik 340% dalam 6 bulan.",
      en: "Art Developer completely transformed our digital strategy. Organic traffic grew 340% in 6 months.",
    },
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: {
      id: "Marketing Director, Elevate Brand",
      en: "Marketing Director, Elevate Brand",
    },
    body: {
      id: "Tim yang sangat profesional. Campaign Meta Ads kami menghasilkan ROAS 8x dari budget yang ada.",
      en: "Incredibly professional team. Our Meta Ads campaign delivered 8x ROAS from the existing budget.",
    },
    rating: 5,
  },
  {
    name: "Rizky Aditya",
    role: { id: "Founder, GreenBox", en: "Founder, GreenBox" },
    body: {
      id: "Website baru kami jauh lebih cepat dan konversi meningkat 220%. Worth every rupiah.",
      en: "Our new website is much faster and conversions increased 220%. Worth every penny.",
    },
    rating: 5,
  },
  {
    name: "Maya Putri",
    role: { id: "Brand Manager, Clarisse", en: "Brand Manager, Clarisse" },
    body: {
      id: "Identitas visual brand kami kini jauh lebih kuat. Respons pasar sangat positif sejak rebrand.",
      en: "Our brand visual identity is now much stronger. Market response has been extremely positive since the rebrand.",
    },
    rating: 5,
  },
  {
    name: "Kevin Halim",
    role: { id: "COO, Logistik Prima", en: "COO, Logistik Prima" },
    body: {
      id: "Laporan analytics mereka sangat komprehensif. Akhirnya kami tahu mana channel yang benar-benar konversi.",
      en: "Their analytics reports are incredibly comprehensive. We finally know which channels actually convert.",
    },
    rating: 5,
  },
  {
    name: "Dewi Anggraini",
    role: { id: "Owner, La Maison Beauty", en: "Owner, La Maison Beauty" },
    body: {
      id: "Social media kami berkembang pesat. Engagement naik 5x dan direct message order melonjak.",
      en: "Our social media has grown tremendously. Engagement up 5x and direct message orders skyrocketed.",
    },
    rating: 5,
  },
  {
    name: "Andre Wijaya",
    role: { id: "Direktur, PropertyOne", en: "Director, PropertyOne" },
    body: {
      id: "SEO lokal mereka sangat efektif. Kami sekarang muncul di semua kata kunci utama industri properti.",
      en: "Their local SEO is extremely effective. We now rank for all major keywords in the property industry.",
    },
    rating: 5,
  },
  {
    name: "Siti Rahayu",
    role: {
      id: "E-commerce Manager, Batikku",
      en: "E-commerce Manager, Batikku",
    },
    body: {
      id: "Google Shopping campaign mereka menghasilkan penjualan 3x lebih tinggi dari bulan sebelumnya.",
      en: "Their Google Shopping campaign produced 3x higher sales than the previous month.",
    },
    rating: 5,
  },
];

/** PORTFOLIO */
const portfolioData = [
  {
    emoji: "🏪",
    title: { id: "Rebrand GreenBox", en: "GreenBox Rebrand" },
    cat: { id: "Branding", en: "Branding" },
    catKey: "branding",
    tags: ["Branding", "Identity"],
    desc: {
      id: "Proyek rebrand lengkap untuk startup kemasan ramah lingkungan. Mencakup logo, brand guideline, dan materi pemasaran.",
      en: "Complete rebrand project for an eco-packaging startup. Includes logo, brand guideline, and marketing materials.",
    },
    metrics: [
      { label: { id: "Brand Recall", en: "Brand Recall" }, value: "+68%" },
      { label: { id: "Market Share", en: "Market Share" }, value: "+22%" },
    ],
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">Rebrand GreenBox</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Branding</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Proyek rebrand komprehensif untuk startup kemasan ramah lingkungan terkemuka. Kami mengembangkan identitas visual baru yang mencerminkan nilai keberlanjutan dan inovasi.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+68%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Brand Recall</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+22%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Market Share</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Deliverable: logo baru, brand guideline 40 halaman, template materi marketing, dan panduan tone of voice.</p>`,
      en: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">GreenBox Rebrand</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Branding</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Comprehensive rebrand project for a leading eco-packaging startup. We developed a new visual identity reflecting values of sustainability and innovation.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+68%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Brand Recall</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+22%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Market Share</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Deliverables: new logo, 40-page brand guideline, marketing material templates, and tone of voice guide.</p>`,
    },
  },
  {
    emoji: "📈",
    title: { id: "Kampanye SEO TechNusa", en: "TechNusa SEO Campaign" },
    cat: { id: "SEO", en: "SEO" },
    catKey: "seo",
    tags: ["SEO", "Content"],
    desc: {
      id: "Strategi SEO 6 bulan yang menghasilkan peningkatan traffic organik 340% dan 85 kata kunci di halaman 1.",
      en: "6-month SEO strategy that delivered 340% organic traffic increase and 85 keywords on page 1.",
    },
    metrics: [
      {
        label: { id: "Traffic Organik", en: "Organic Traffic" },
        value: "+340%",
      },
      { label: { id: "Kata Kunci P1", en: "P1 Keywords" }, value: "85" },
    ],
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">Kampanye SEO TechNusa</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">SEO</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Strategi SEO komprehensif selama 6 bulan yang mencakup audit teknis, optimasi konten, dan link building agresif untuk startup teknologi B2B.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+340%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Traffic Organik</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">85</div><div class="text-xs mt-1" style="color:var(--text-muted)">Kata Kunci P1</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Timeline: 6 bulan. Industri: B2B SaaS. Tools: Ahrefs, GSC, Screaming Frog.</p>`,
      en: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">TechNusa SEO Campaign</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">SEO</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Comprehensive 6-month SEO strategy including technical audit, content optimization, and aggressive link building for a B2B tech startup.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+340%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Organic Traffic</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">85</div><div class="text-xs mt-1" style="color:var(--text-muted)">P1 Keywords</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Timeline: 6 months. Industry: B2B SaaS. Tools: Ahrefs, GSC, Screaming Frog.</p>`,
    },
  },
  {
    emoji: "🛒",
    title: { id: "E-commerce Batikku", en: "Batikku E-commerce" },
    cat: { id: "Web Dev", en: "Web Dev" },
    catKey: "webdev",
    tags: ["Web Dev", "E-commerce"],
    desc: {
      id: "Toko online custom untuk brand batik lokal. Core Web Vitals score 98, konversi naik 220%.",
      en: "Custom online store for a local batik brand. Core Web Vitals score 98, conversion up 220%.",
    },
    metrics: [
      { label: { id: "Skor CWV", en: "CWV Score" }, value: "98" },
      { label: { id: "Konversi", en: "Conversion" }, value: "+220%" },
    ],
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">E-commerce Batikku</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Web Dev</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Pengembangan toko online custom dari nol menggunakan Next.js + Laravel API. Fokus pada performa, UX mobile-first, dan integrasi payment gateway lokal.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">98</div><div class="text-xs mt-1" style="color:var(--text-muted)">CWV Score</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+220%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Konversi</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Stack: Next.js, Laravel, Midtrans, Vercel. Fitur: filter produk, wishlist, multi-payment.</p>`,
      en: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">Batikku E-commerce</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Web Dev</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Custom online store development from scratch using Next.js + Laravel API. Focused on performance, mobile-first UX, and local payment gateway integration.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">98</div><div class="text-xs mt-1" style="color:var(--text-muted)">CWV Score</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+220%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Conversion</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Stack: Next.js, Laravel, Midtrans, Vercel. Features: product filters, wishlist, multi-payment.</p>`,
    },
  },
  {
    emoji: "💄",
    title: { id: "Social Media La Maison", en: "La Maison Social Media" },
    cat: { id: "Social Media", en: "Social Media" },
    catKey: "social",
    tags: ["Social Media"],
    desc: {
      id: "Manajemen sosial media 12 bulan untuk brand kecantikan lokal. Engagement naik 500%, followers +18K.",
      en: "12-month social media management for a local beauty brand. Engagement up 500%, followers +18K.",
    },
    metrics: [
      { label: { id: "Engagement", en: "Engagement" }, value: "+500%" },
      { label: { id: "Followers", en: "Followers" }, value: "+18K" },
    ],
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">Social Media La Maison</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Social Media</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Pengelolaan penuh akun Instagram dan TikTok brand kecantikan premium lokal selama 12 bulan, dengan strategi konten yang konsisten dan engagement-driven.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+500%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Engagement Rate</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+18K</div><div class="text-xs mt-1" style="color:var(--text-muted)">New Followers</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Platform: Instagram + TikTok. Output: 90 konten/bulan, 4 video Reels/minggu.</p>`,
      en: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">La Maison Social Media</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Social Media</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Full management of Instagram and TikTok accounts for a premium local beauty brand for 12 months, with a consistent and engagement-driven content strategy.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+500%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Engagement Rate</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+18K</div><div class="text-xs mt-1" style="color:var(--text-muted)">New Followers</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Platform: Instagram + TikTok. Output: 90 contents/month, 4 Reels videos/week.</p>`,
    },
  },
  {
    emoji: "🏢",
    title: { id: "Google Ads PropertyOne", en: "PropertyOne Google Ads" },
    cat: { id: "Iklan Berbayar", en: "Paid Ads" },
    catKey: "ads",
    tags: ["Paid Ads"],
    desc: {
      id: "Kampanye Google Ads properti yang menghasilkan 240 leads qualified per bulan dengan CPL Rp45K.",
      en: "Property Google Ads campaign generating 240 qualified leads per month at Rp45K CPL.",
    },
    metrics: [
      { label: { id: "Leads/Bulan", en: "Leads/Month" }, value: "240" },
      { label: { id: "CPL", en: "CPL" }, value: "Rp45K" },
    ],
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">Google Ads PropertyOne</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Paid Ads</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Manajemen kampanye Google Search & Display Ads untuk developer properti. Fokus pada lead generation berkualitas tinggi dengan CPL yang efisien.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">240</div><div class="text-xs mt-1" style="color:var(--text-muted)">Qualified Leads/Bulan</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">Rp45K</div><div class="text-xs mt-1" style="color:var(--text-muted)">CPL</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Budget bulanan: Rp 50 juta. Channel: Google Search + Display + Remarketing.</p>`,
      en: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">PropertyOne Google Ads</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Paid Ads</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Google Search & Display Ads campaign management for a property developer. Focused on high-quality lead generation with an efficient CPL.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">240</div><div class="text-xs mt-1" style="color:var(--text-muted)">Qualified Leads/Month</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">Rp45K</div><div class="text-xs mt-1" style="color:var(--text-muted)">CPL</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Monthly budget: Rp 50M. Channels: Google Search + Display + Remarketing.</p>`,
    },
  },
  {
    emoji: "📊",
    title: {
      id: "Dashboard Analytics Elevate",
      en: "Elevate Analytics Dashboard",
    },
    cat: { id: "Analytics", en: "Analytics" },
    catKey: "analytics",
    tags: ["Analytics", "CRO"],
    desc: {
      id: "Setup tracking GA4 + custom dashboard Looker Studio untuk brand fashion. Conversion rate naik 45%.",
      en: "GA4 tracking + custom Looker Studio dashboard setup for a fashion brand. Conversion rate up 45%.",
    },
    metrics: [
      { label: { id: "Konversi", en: "Conversion" }, value: "+45%" },
      { label: { id: "Data Akurasi", en: "Data Accuracy" }, value: "99%" },
    ],
    detail: {
      id: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">Dashboard Analytics Elevate</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Analytics</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Setup tracking GA4 komprehensif, migrasi dari UA, dan pembuatan dashboard Looker Studio real-time untuk brand fashion premium.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+45%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Conversion Rate</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">99%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Data Accuracy</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Tools: GA4, GTM, Looker Studio, BigQuery. Output: 3 dashboard real-time.</p>`,
      en: `<h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">Elevate Analytics Dashboard</h3>
           <div class="portfolio-tag mb-4" style="display:inline-block">Analytics</div>
           <p style="color:var(--text-muted)" class="leading-relaxed mb-4">Comprehensive GA4 tracking setup, migration from UA, and real-time Looker Studio dashboard creation for a premium fashion brand.</p>
           <div class="grid grid-cols-2 gap-3 mb-4">
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">+45%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Conversion Rate</div></div>
             <div class="about-stat-card"><div class="font-display font-bold text-2xl" style="color:var(--accent)">99%</div><div class="text-xs mt-1" style="color:var(--text-muted)">Data Accuracy</div></div>
           </div>
           <p style="color:var(--text-muted)" class="text-sm leading-relaxed">Tools: GA4, GTM, Looker Studio, BigQuery. Output: 3 real-time dashboards.</p>`,
    },
  },
];

/* ═══════════════════════════════════════════════════════
   3. THEME — dark / light toggle
══════════════════════════════════════════════════════ */
let currentTheme = localStorage.getItem("theme") || "dark";

function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
  document.body.classList.toggle("light-mode", theme === "light");
  document
    .getElementById("icon-moon")
    .classList.toggle("hidden", theme === "light");
  document
    .getElementById("icon-sun")
    .classList.toggle("hidden", theme === "dark");
}

function initTheme() {
  applyTheme(currentTheme);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
    showToast(t(currentTheme === "dark" ? "toast.dark" : "toast.light"));
  });
}

/* ═══════════════════════════════════════════════════════
   4. LANG — language toggle + i18n renderer
══════════════════════════════════════════════════════ */
let currentLang = localStorage.getItem("lang") || "id";

/** Translate helper */
function t(key) {
  return i18n[currentLang]?.[key] ?? i18n["id"][key] ?? key;
}

/** Re-render all [data-i18n] elements */
function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // Update lang buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  // Re-render dynamic grids (they contain bilingual content)
  renderWhy();
  renderServices();
  renderProcessSteps();
  renderTestimonials();
  renderPortfolio(activeFilter);
}

function initLang() {
  applyLang();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === currentLang) return;
      currentLang = btn.dataset.lang;
      localStorage.setItem("lang", currentLang);
      applyLang();
      const toastKey = currentLang === "id" ? "toast.lang.id" : "toast.lang.en";
      showToast(t(toastKey));
    });
  });
}

/* ═══════════════════════════════════════════════════════
   5. TOAST — notification system
══════════════════════════════════════════════════════ */
let toastTimer = null;

function showToast(message) {
  const container = document.getElementById("toast-container");

  // Remove existing
  const existing = container.querySelector(".toast");
  if (existing) {
    existing.classList.add("out");
    setTimeout(() => existing.remove(), 300);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="toast-dot"></span>${message}`;
  container.appendChild(toast);

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("out");
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ═══════════════════════════════════════════════════════
   6. NAVBAR — scroll + active link
══════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");

  window.addEventListener(
    "scroll",
    () => {
      // Scrolled state
      navbar.classList.toggle("scrolled", window.scrollY > 40);

      // Active section highlight
      let current = "";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.section === current);
      });
    },
    { passive: true },
  );
}

/* ═══════════════════════════════════════════════════════
   7. MOBILE MENU
══════════════════════════════════════════════════════ */
function initMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const toggle = document.getElementById("menu-toggle");
  let isOpen = false;

  function setMenu(open) {
    isOpen = open;
    menu.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => setMenu(!isOpen));

  // Close on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
}

/* ═══════════════════════════════════════════════════════
   8. SCROLL REVEAL
══════════════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal, .stagger-children");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════
   9. RENDER — populate grids
══════════════════════════════════════════════════════ */

/** WHY grid */
function renderWhy() {
  const grid = document.getElementById("why-grid");
  if (!grid) return;
  grid.innerHTML = whyData
    .map(
      (item) => `
    <div class="why-card">
      <div class="why-num mb-3">${item.num}</div>
      <h3 class="font-display font-bold text-lg mb-2" style="color:var(--text)">${item.title[currentLang]}</h3>
      <p class="text-sm leading-relaxed" style="color:var(--text-muted)">${item.desc[currentLang]}</p>
    </div>
  `,
    )
    .join("");
}

/** SERVICES grid */
function renderServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;
  grid.innerHTML = servicesData
    .map(
      (s, idx) => `
    <div class="service-card" data-service="${idx}" role="button" tabindex="0" aria-label="${s.title[currentLang]}">
      <div class="service-icon">${s.icon}</div>
      <h3 class="font-display font-bold text-base mb-2" style="color:var(--text)">${s.title[currentLang]}</h3>
      <p class="text-sm leading-relaxed mb-4" style="color:var(--text-muted)">${s.short[currentLang]}</p>
      <span class="text-xs font-semibold" style="color:var(--accent)">${t("services.learn")}</span>
    </div>
  `,
    )
    .join("");

  // Attach click handlers
  grid.querySelectorAll("[data-service]").forEach((card) => {
    card.addEventListener("click", () =>
      openServiceModal(+card.dataset.service),
    );
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openServiceModal(+card.dataset.service);
    });
  });
}

/** PROCESS steps */
function renderProcessSteps() {
  const container = document.getElementById("process-steps");
  if (!container) return;
  container.innerHTML = processSteps
    .map(
      (step) => `
    <div class="process-card flex items-center gap-4 p-4">
      <div class="step-num">${step.num}</div>
      <div>
        <div class="font-semibold text-sm" style="color:var(--text)">${step.title[currentLang]}</div>
        <div class="text-xs mt-0.5" style="color:var(--text-muted)">${step.desc[currentLang]}</div>
      </div>
    </div>
  `,
    )
    .join("");
}

/** TESTIMONIALS marquee */
function renderTestimonials() {
  const row1 = document.getElementById("testi-row-1");
  const row2 = document.getElementById("testi-row-2");
  if (!row1 || !row2) return;

  function cardHTML(t) {
    const stars = "★".repeat(t.rating);
    return `
      <div class="testi-card">
        <div class="star text-sm mb-3">${stars}</div>
        <p class="text-sm leading-relaxed mb-4" style="color:var(--text-muted)">${t.body[currentLang]}</p>
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style="background:var(--accent)">${t.name[0]}</div>
          <div>
            <div class="text-xs font-semibold" style="color:var(--text)">${t.name}</div>
            <div class="text-xs" style="color:var(--text-muted)">${t.role[currentLang]}</div>
          </div>
        </div>
      </div>
    `;
  }

  const half = Math.ceil(testimonialsData.length / 2);
  const set1 = testimonialsData.slice(0, half);
  const set2 = testimonialsData.slice(half);

  // Duplicate for infinite scroll
  row1.innerHTML = [...set1, ...set1].map(cardHTML).join("");
  row2.innerHTML = [...set2, ...set2].map(cardHTML).join("");
}

/** PORTFOLIO grid */
let activeFilter = "all";

function renderPortfolio(filter = "all") {
  activeFilter = filter;

  // Filters
  const filtersEl = document.getElementById("portfolio-filters");
  const categories = ["all", ...new Set(portfolioData.map((p) => p.catKey))];
  const labels = {
    all: t("portfolio.all"),
    branding: "Branding",
    seo: "SEO",
    webdev: "Web Dev",
    social: "Social Media",
    ads: "Paid Ads",
    analytics: "Analytics",
  };

  filtersEl.innerHTML = categories
    .map(
      (cat) => `
    <button class="filter-btn ${filter === cat ? "active" : ""}" data-filter="${cat}">${labels[cat] || cat}</button>
  `,
    )
    .join("");

  filtersEl.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => renderPortfolio(btn.dataset.filter));
  });

  // Grid
  const grid = document.getElementById("portfolio-grid");
  const items =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((p) => p.catKey === filter);

  grid.innerHTML = items
    .map(
      (p, idx) => `
    <div class="portfolio-card" data-portfolio="${portfolioData.indexOf(p)}" role="button" tabindex="0" aria-label="${p.title[currentLang]}">
      <div class="portfolio-thumb">
        <span>${p.emoji}</span>
      </div>
      <div style="padding:1.25rem;">
        <span class="portfolio-tag">${p.cat[currentLang]}</span>
        <h3 class="font-display font-bold text-base mt-2 mb-1.5" style="color:var(--text)">${p.title[currentLang]}</h3>
        <p class="text-xs leading-relaxed mb-3" style="color:var(--text-muted)">${p.desc[currentLang]}</p>
        <div class="flex gap-4 mb-3">
          ${p.metrics
            .map(
              (m) => `
            <div>
              <div class="font-display font-bold text-sm" style="color:var(--accent)">${m.value}</div>
              <div class="text-xs" style="color:var(--text-muted)">${m.label[currentLang]}</div>
            </div>
          `,
            )
            .join("")}
        </div>
        <span class="text-xs font-semibold" style="color:var(--accent)">${t("portfolio.view")}</span>
      </div>
    </div>
  `,
    )
    .join("");

  grid.querySelectorAll("[data-portfolio]").forEach((card) => {
    card.addEventListener("click", () =>
      openPortfolioModal(+card.dataset.portfolio),
    );
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openPortfolioModal(+card.dataset.portfolio);
    });
  });

  // Re-observe new elements
  grid.querySelectorAll(".portfolio-card").forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.transition = "opacity .4s ease, transform .4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 60);
    });
  });
}

/* ═══════════════════════════════════════════════════════
   10. MODALS
══════════════════════════════════════════════════════ */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

function openServiceModal(idx) {
  const s = servicesData[idx];
  document.getElementById("service-modal-content").innerHTML =
    s.detail[currentLang];
  openModal("service-modal");
}

function openPortfolioModal(idx) {
  const p = portfolioData[idx];
  document.getElementById("portfolio-modal-content").innerHTML =
    p.detail[currentLang];
  openModal("portfolio-modal");
}

function initModals() {
  // Service modal
  document
    .getElementById("service-modal-close")
    .addEventListener("click", () => closeModal("service-modal"));
  document
    .getElementById("service-modal-bg")
    .addEventListener("click", () => closeModal("service-modal"));

  // Portfolio modal
  document
    .getElementById("portfolio-modal-close")
    .addEventListener("click", () => closeModal("portfolio-modal"));
  document
    .getElementById("portfolio-modal-bg")
    .addEventListener("click", () => closeModal("portfolio-modal"));

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal("service-modal");
      closeModal("portfolio-modal");
    }
  });
}

/* ═══════════════════════════════════════════════════════
   13. INIT
══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLang();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  renderWhy();
  renderServices();
  renderProcessSteps();
  renderTestimonials();
  renderPortfolio("all");
  initModals();
});
