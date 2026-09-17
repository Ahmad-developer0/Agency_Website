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
| Direct verify (QR codes) | `https://your-site.com/verify?cert=NXS-2025-014` | opens already verified |

`/admin.html` and `/admin` both redirect to the home page, so the panel is only
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

The same four values are already in `.env.local` for local development. That file
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
