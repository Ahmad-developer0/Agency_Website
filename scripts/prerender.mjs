/* ============================================
   Pre-renders the JS-built sections of index.html

   The Why / Benefits / Services / Testimonials cards are built by
   assets/js/script.js from its data arrays. This script runs those
   same render functions in Node and writes the resulting HTML into
   index.html, so the text is in the page Google downloads and is
   visible before any JavaScript runs. In the browser, script.js
   re-renders the same markup, so nothing changes for visitors.

   Run after editing the data in script.js:   npm run prerender
============================================ */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SECTIONS = ["why-grid", "benefits-grid", "services-grid", "testi-row-1", "testi-row-2"];

// Minimal stand-in for the browser: the render functions only
// look up elements by id and set innerHTML.
const elements = Object.fromEntries(SECTIONS.map((id) => [id, { innerHTML: "" }]));
const sandbox = {
  document: { getElementById: (id) => elements[id] || null, addEventListener() {} },
  window: {},
  console,
};
vm.createContext(sandbox);
vm.runInContext(await readFile(join(ROOT, "assets/js/script.js"), "utf8"), sandbox);
vm.runInContext("renderWhy(); renderBenefits(); renderServices(); renderTestimonials();", sandbox);

let html = await readFile(join(ROOT, "index.html"), "utf8");
for (const id of SECTIONS) {
  // Replace whatever is inside <div ... id="ID">…</div> (these containers hold no nested markup of their own)
  const open = new RegExp(`(<div[^>]*\\bid="${id}"[^>]*>)`);
  const match = html.match(open);
  if (!match) throw new Error(`#${id} not found in index.html`);
  const start = match.index + match[0].length;
  const end = findClosingDiv(html, start);
  html = html.slice(0, start) + `<!-- pre-rendered by scripts/prerender.mjs -->${elements[id].innerHTML}` + html.slice(end);
}
await writeFile(join(ROOT, "index.html"), html);
console.log(`Pre-rendered ${SECTIONS.length} sections into index.html`);

/* Index of the </div> that closes the element whose content starts at `from`. */
function findClosingDiv(src, from) {
  const tag = /<div\b|<\/div>/g;
  tag.lastIndex = from;
  let depth = 1;
  for (let m; (m = tag.exec(src)); ) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) return m.index;
  }
  throw new Error("Unbalanced <div> in index.html");
}
