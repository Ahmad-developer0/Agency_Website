# Nexyra Studio — Agency Website

Static site with a Supabase back end: contact/booking emails, internship
certificate verification, and a dynamic portfolio — all managed from one admin
panel.

## Running locally

```bash
npm install
npm run dev
```

| | |
|---|---|
| Site | http://localhost:3000/ |
| Verify a certificate | http://localhost:3000/verify |
| Admin panel | http://localhost:3000/staff-portal |

Keys are read from `.env.local` (gitignored). See [DEPLOY.md](DEPLOY.md) for the
four variables the site needs.

## Documentation

| Document | What it covers |
|---|---|
| [DEPLOY.md](DEPLOY.md) | Deploying to Netlify or Vercel, environment variables, live URLs |
| [docs/VERIFY-SETUP.md](docs/VERIFY-SETUP.md) | First-time Supabase setup for certificate verification |
| [docs/ADMIN-GUIDE.md](docs/ADMIN-GUIDE.md) | Adding interns — admin panel and Supabase dashboard |
| [docs/PROJECTS-GUIDE.md](docs/PROJECTS-GUIDE.md) | Adding portfolio projects, images and results |
| [docs/supabase-setup.sql](docs/supabase-setup.sql) | Interns table, run once in the Supabase SQL editor |
| [docs/projects-setup.sql](docs/projects-setup.sql) | Projects table + image bucket, run once |

## Layout

```
index.html          Main site
verify.html         Public certificate verification  → /verify
admin.html          Intern records admin             → /staff-portal

lib/                Logic, shared by both platforms
  verify-core.js      certificate lookup
  admin-core.js       add / edit / delete intern records
  projects-core.js    portfolio list, CRUD and image upload
  send-core.js        contact & booking emails

api/                Vercel wrappers        → /api/<name>
netlify/functions/  Netlify wrappers       → /api/<name> via netlify.toml

assets/             CSS and page scripts
dev-server.mjs      Local server; mirrors the production routes
```

Behaviour changes go in `lib/`. The wrappers only translate between each
platform's request format and the shared core.
