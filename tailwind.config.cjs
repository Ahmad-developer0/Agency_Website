/*
 * Tailwind build for the site (replaces the cdn.tailwindcss.com script).
 * After adding new Tailwind classes to any page or script, run:
 *   npm run build:css
 */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: { extend: {} },
  plugins: [],
};
