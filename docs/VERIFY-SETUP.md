# Internship Certificate Verification — Setup

Page: `verify.html` · API: `api/verify.js` · Database: Supabase (free tier)

---

## 1. Create the database

1. Go to [supabase.com](https://supabase.com) → **New project** (free tier is enough).
   Pick any name and region, and save the database password somewhere safe.
2. Once the project is ready, open **SQL Editor** → **New query**.
3. Paste the whole contents of `docs/supabase-setup.sql` and press **Run**.

This creates the `interns` table, an index on the certificate number, a trigger
that normalises certificate numbers to upper case, and three sample rows.

## 2. Get the keys

In the Supabase dashboard: **Project Settings → API**

| What you need | Where it is | Goes into |
|---|---|---|
| Project URL | "Project URL" | `SUPABASE_URL` |
| `service_role` key | "Project API keys" → `service_role` (click reveal) | `SUPABASE_SERVICE_KEY` |

> The `service_role` key bypasses row-level security. It is only ever used inside
> the serverless function on the server — never put it in HTML or in any file under
> `assets/`. The browser never sees it.

## 3. Add the keys to Vercel

Vercel dashboard → your project → **Settings → Environment Variables**, add both:

```
SUPABASE_URL          = https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_KEY  = eyJhbGciOi...   (the service_role key)
ADMIN_PASSWORD        = a long password of your choice
```

`ADMIN_PASSWORD` is what opens `admin.html`, where interns are added.
See [ADMIN-GUIDE.md](ADMIN-GUIDE.md).

Select **Production**, **Preview** and **Development**, then **Save** and redeploy
(Deployments → latest → ⋯ → Redeploy).

## 4. Try it

Open `https://your-site.com/verify.html` and enter `NXS-2025-001`
(one of the sample rows). You should see the verified record.

A direct link also works, which is handy for a QR code on the certificate:

```
https://your-site.com/verify.html?cert=NXS-2025-001
```

---

## Adding a real intern

Supabase dashboard → **Table Editor** → `interns` → **Insert row**:

| Column | Example | Notes |
|---|---|---|
| `certificate_no` | `NXS-2025-014` | Must be unique. Saved in upper case automatically. |
| `full_name` | `Ali Raza` | |
| `role` | `Web Development Intern` | |
| `department` | `Engineering` | |
| `start_date` | `2025-06-01` | Format `YYYY-MM-DD` |
| `end_date` | `2025-08-31` | Leave empty for an ongoing internship |
| `issue_date` | `2025-09-05` | Defaults to today |
| `status` | `Completed` | `Completed`, `Ongoing`, or `Revoked` |
| `photo_url` | `https://...jpg` | Optional — initials are shown if empty |

Leave the `id` and `created_at` columns alone; they fill themselves.

### Status colours on the page

| Status | Shown as |
|---|---|
| `Completed` (or anything else) | green — "Certificate Verified" |
| `Ongoing` / `In Progress` | amber badge, still verified |
| `Revoked` / `Cancelled` | red — "Certificate Revoked" |

### Intern photos

Easiest route is Supabase **Storage**: create a public bucket (e.g. `intern-photos`),
upload the image, copy its public URL, and paste that into `photo_url`. Any public
image URL works. Square images look best.

---

## Local testing

`verify.html` calls `/api/verify` on the same origin, so Live Server alone cannot
reach the function. Run the whole thing with the Vercel CLI instead:

```bash
npm install
npm run dev
```

Create a `.env.local` in the project root for local runs (it is not committed):

```
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOi...
ADMIN_PASSWORD=your-admin-password
```

## Notes on security

- Row-level security is enabled on `interns` with no public policy, so the table
  cannot be read directly from a browser even if someone finds the project URL.
- The API only returns the fields listed in its `select`, and only for an exact
  certificate-number match. There is no way to list or browse all interns through it.
- Input is length- and character-checked before it reaches the database, and
  values are rendered with `textContent` on the page, so a stored value cannot
  inject markup.
