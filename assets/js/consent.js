/* ============================================
   Cookie consent + Google Analytics

   - Shows the consent banner until the visitor chooses.
   - Loads Google Analytics only after "Accept".
   - Any element with [data-cookie-settings] reopens the banner.
   - window.nxTrack(event, params) sends a GA event, and does
     nothing when analytics is off or not accepted.
============================================ */

(function () {
  const STORAGE_KEY = "cookie-consent";
  const config = window.NEXYRA_CONFIG || {};
  const GA_ID = config.GA_MEASUREMENT_ID || "";
  let gaLoaded = false;

  function readChoice() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveChoice(analytics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, date: new Date().toISOString() }));
    } catch (e) { /* private mode: the banner simply shows again next visit */ }
  }

  function loadAnalytics() {
    if (gaLoaded || !GA_ID) return;
    gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.appendChild(s);
  }

  // Removes GA cookies after the visitor withdraws consent
  function clearAnalyticsCookies() {
    const host = location.hostname;
    const domains = ["", host, "." + host, "." + host.replace(/^www\./, "")];
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
        domains.forEach((d) => {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? "; domain=" + d : ""}`;
        });
      }
    });
  }

  window.nxTrack = function (event, params) {
    if (gaLoaded && typeof window.gtag === "function") window.gtag("event", event, params || {});
  };

  /* ── Banner ── */
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Cookie consent");
  banner.innerHTML = `
    <p class="cookie-text">
      We use essential storage to run this site and, with your permission, Google Analytics cookies
      to understand how visitors use it. See our <a href="/cookie-policy">Cookie Policy</a>
      and <a href="/privacy-policy">Privacy Policy</a>.
    </p>
    <div class="cookie-actions">
      <button type="button" class="cookie-btn cookie-reject">Reject</button>
      <button type="button" class="cookie-btn cookie-accept">Accept</button>
    </div>`;

  function showBanner() {
    if (!banner.isConnected) document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add("show"));
  }

  function hideBanner() {
    banner.classList.remove("show");
  }

  banner.querySelector(".cookie-accept").addEventListener("click", () => {
    saveChoice(true);
    hideBanner();
    loadAnalytics();
  });

  banner.querySelector(".cookie-reject").addEventListener("click", () => {
    const wasOn = gaLoaded;
    saveChoice(false);
    hideBanner();
    clearAnalyticsCookies();
    // GA is already running on this page; a reload stops it
    if (wasOn) location.reload();
  });

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-cookie-settings]");
    if (!trigger) return;
    e.preventDefault();
    showBanner();
  });

  function init() {
    const choice = readChoice();
    if (!choice) showBanner();
    else if (choice.analytics) loadAnalytics();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
