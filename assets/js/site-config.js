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
  // Put your real site key in the empty string below, and set the matching
  // TURNSTILE_SECRET_KEY on the server. Until then the live site shows no
  // spam check. On localhost, Cloudflare's always-pass test key is used.
  TURNSTILE_SITE_KEY: location.hostname === "localhost" ? "1x00000000000000000000AA" : "",
};
