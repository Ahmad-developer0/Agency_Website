# Deploying — Netlify (and Vercel)

The site runs on either platform without code changes. `netlify.toml` and
`vercel.json` are both committed; each platform reads its own and ignores the
other.

---

## Your links after deploy

Replace `your-site.com` with your real domain (or the
`something.netlify.app` address Netlify gives you).

| What | Link | Who it is for |
|---|---|---|
| Main site | `https://your-site.com/` | everyone |
| **Verify a certificate** | `https://your-site.com/verify` | the public — put this on the certificate |
| **Admin panel** | `https://your-site.com/staff-portal` | you and your team only |
| Direct verify (QR codes) | `https://your-site.com/verify?cert=NXS-2025-014&name=Ali%20Khan` | opens already verified |

`/admin` and `/admin.html` both redirect to the home page, so the panel is only
reachable at `/staff-portal`. That path is also excluded from search engines.

---

## Environment variables (required)

Netlify: **Site configuration → Environment variables → Add a variable**

| Key | Value | Used by |
|---|---|---|
| `SUPABASE_URL` | `https://ypqxutghksbresanxztl.supabase.co` | verification + admin |
| `SUPABASE_SERVICE_KEY` | the `service_role` key from Supabase | verification + admin |
| `ADMIN_PASSWORD` | a long password you choose | admin panel login |
| `RESEND_API_KEY` | your Resend key | contact & booking emails |
| `GROK_API_KEY` | your xAI key (`xai-...`) from console.x.ai, or a Groq key (`gsk_...`) | website chat assistant |
| `TURNSTILE_SECRET_KEY` | the **Secret Key** from Cloudflare → Turnstile | spam check on the contact & booking forms |

The first four values are already in `.env.local` for local development; add
`GROK_API_KEY` there too to test the chat assistant locally. That file
is gitignored and never reaches the server, so they must be entered in the
Netlify dashboard as well.

> **Change `ADMIN_PASSWORD` before going live.** Anyone with it can add, edit and
> delete records.

After adding variables, trigger a redeploy — Netlify only picks them up on a new
build.

---

## Deploying

If the site is already connected to a Git repository, push and Netlify rebuilds:

```bash
git add .
git commit -m "Add certificate verification and admin panel"
git push
```

Otherwise: **Deploys → Drag and drop your site folder**, using the project folder
(without `node_modules`).

### Build settings

Nothing to configure — `netlify.toml` sets them:

```toml
publish   = "."
functions = "netlify/functions"
```

Leave the build command empty. It is a static site; the functions are built
automatically.

---

## Checking it worked

1. Open `https://your-site.com/verify` and enter `NXS-2025-001`
   → Ali Raza's record should appear.
2. Open `https://your-site.com/staff-portal`, log in, and confirm the list loads.
3. Send a test message through the contact form and check the email arrives.

If verification says "The verification service is unavailable", the environment
variables are missing or the site was not redeployed after adding them.

---

## How the two platforms share one codebase

The logic lives once, in `lib/`:

```
lib/verify-core.js   lib/admin-core.js   lib/send-core.js
        │                   │                   │
        ├─ api/*.js ──────── Vercel handlers (req, res)
        └─ netlify/functions/*.mjs ── Netlify handlers (Request → Response)
```

Both platforms serve the functions at `/api/<name>`, which is what the pages
call — on Netlify through the redirect in `netlify.toml`, on Vercel by
convention. Changing behaviour means editing the file in `lib/`; the wrappers
rarely need touching.

---

## Local development

```bash
npm install
npm run dev
```

| | |
|---|---|
| Site | http://localhost:3000/ |
| Verify | http://localhost:3000/verify |
| Admin | http://localhost:3000/staff-portal |

`dev-server.mjs` mirrors the production routes, so links behave locally exactly
as they will once deployed. It reads `.env.local` for the keys.

---

## Moving to Vercel later

Nothing to rewrite. Import the repository into Vercel, add the same four
environment variables, and deploy — `vercel.json` sets up the identical routes.

## Analytics, spam protection and the site address

Two public values live in `assets/js/site-config.js`, not in environment variables:

| Setting | Where to get it |
|---|---|
| `GA_MEASUREMENT_ID` | Google Analytics → Admin → Data streams → Web → Measurement ID (`G-...`). Empty = analytics off. |
| `TURNSTILE_SITE_KEY` | Cloudflare dashboard → Turnstile → add your domain → **Site Key**. Its **Secret Key** goes in `TURNSTILE_SECRET_KEY` above. |

The file ships with Cloudflare's test site key, which always passes. Replace it
and set the real secret before launch. Without `TURNSTILE_SECRET_KEY` the server
skips the spam check.

Google Analytics only loads after a visitor clicks **Accept** on the cookie banner.

The site address `https://nexyrastudio.com` is written into `sitemap.xml`,
`robots.txt`, and the `canonical` / `og:` tags at the top of each page. If the live
domain is different (for example `www.`), search-and-replace it across those files.

## Before every deploy: `npm run build`

The site no longer loads Tailwind from `cdn.tailwindcss.com` (that script built
the CSS in each visitor's browser and was the main cause of slow loading).
The CSS is now compiled into `assets/css/tailwind.css`, and the Why / Benefits /
Services / Testimonials cards are written straight into `index.html` so Google
sees them without running JavaScript.

After changing page markup, Tailwind classes, or the data in `assets/js/script.js`:

```bash
npm run build      # = npm run prerender && npm run build:css
```

Then deploy the updated `index.html` and `assets/css/tailwind.css` with everything else.

## Google Search Console (one-time)

1. Open https://search.google.com/search-console and add a **Domain** property
   for `nexyrastudio.com`.
2. Google shows a `TXT` record. Add it in Namecheap → Domain List → Manage →
   Advanced DNS → Add New Record → TXT, host `@`. Click **Verify** in Search
   Console (it can take a few minutes).
3. In Search Console → **Sitemaps**, submit `https://nexyrastudio.com/sitemap.xml`.
4. In **URL inspection**, enter `https://nexyrastudio.com/` and click
   **Request indexing**. Repeat for `/verify`.

## Admin lockout and certificate privacy (one-time setup)

Run `docs/security-setup.sql` once in Supabase → SQL Editor. It creates the
`security_attempts` table that:

- blocks a device for **1 hour after 5 wrong admin passwords**, and
- blocks a device for **1 hour after 10 failed certificate checks**.

Certificate verification now needs **both the certificate number and the
intern's full name** (as printed), so nobody can browse other interns' records
by trying numbers. QR codes should link to
`/verify?cert=NXS-2025-014&name=Ali%20Khan` to verify in one tap.

Until the table exists, both features let requests through (and log a warning)
rather than locking you out. To unblock a device early, delete its row in that
table.
