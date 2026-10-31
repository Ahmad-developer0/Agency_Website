/* ============================================
   Site-wide settings for the browser.
   Both values are public by design, so they live here
   rather than in environment variables.
============================================ */

window.NEXYRA_CONFIG = {
  // Google Analytics 4 "Measurement ID" (Admin → Data streams → Web).
  // Looks like "G-ABC123XYZ". Leave empty to turn analytics off.
  GA_MEASUREMENT_ID: "",

  // Cloudflare Turnstile "Site Key" (Cloudflare dashboard → Turnstile).
  // Set the matching TURNSTILE_SECRET_KEY on the server too: without it the
  // server skips the check. On localhost, Cloudflare's always-pass test key
  // is used.
  TURNSTILE_SITE_KEY: location.hostname === "localhost" ? "1x00000000000000000000AA" : "0x4AAAAAAFt6nOFpQzYJRYA9",
};

/* ============================================
   Footer copyright year.
   The HTML carries the year as well, so it is already
   correct before this runs and stays correct without JS.
   This only saves the yearly edit on every page.
============================================ */
(function () {
  function setYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = year;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setYear);
  } else {
    setYear();
  }
})();
