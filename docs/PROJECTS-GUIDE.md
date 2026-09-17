# Portfolio projects — setup and daily use

The Portfolio section of the website is filled from the database. You add
projects in the admin panel; the site picks them up on the next page load.

---

## One-time setup

1. Supabase dashboard → **SQL Editor** → **New query**
2. Paste all of [projects-setup.sql](projects-setup.sql) and press **Run**
3. You should see `Success. No rows returned`

That creates the `projects` table, the ordering index, and a public storage
bucket called `project-images` for the pictures you upload.

### If the bucket was not created

Some Supabase projects block creating buckets from SQL. Check
**Storage** in the sidebar — if `project-images` is not listed:

1. **Storage** → **New bucket**
2. Name: `project-images`
3. Tick **Public bucket**
4. **Save**

---

## Adding a project

Open `/staff-portal`, log in, and click the **Projects** tab → **Add Project**.

### Basics

| Field | What it does |
|---|---|
| **Project Title** | The heading. Also becomes the project's web address. |
| **Category** | Drives the filter buttons above the portfolio grid. Reuse the same spelling so related projects group together. |
| **Emoji** | Shown only when there is no cover image. |
| **Short Description** | One line on the card. Keep it under about 100 characters. |
| **Full Description** | The story, shown when someone opens the project. Line breaks are preserved. |
| **Tags** | Comma separated. The card shows the first three, the rest appear inside. |

### Images

**Cover image** is the picture on the card and the banner inside. Drop a file on
the box or click to choose one — it uploads to Supabase and fills the URL for
you. You can also paste a URL from elsewhere instead.

**Gallery** images appear as a grid inside the project, and open full-size when
clicked. Add several at once.

Both accept PNG, JPG, WebP, AVIF and GIF up to 5MB each. Landscape images around
1200×800 look best as covers.

### Client & Results

Client name and project date appear in a small strip under the title.

**Results** are the numbers you want to show off — each one is a label and a
value, displayed as a row of tiles:

| Label | Value |
|---|---|
| `PageSpeed score` | `99/100` |
| `Cart abandonment` | `-34%` |
| `Average order value` | `+28%` |

Leave it empty and the block is hidden. Three or four reads best.

### Publishing

| Control | Effect |
|---|---|
| **Live Project URL** | Adds a "View Live Project" button. Leave empty to hide it. |
| **Display Order** | Lower numbers come first. Projects sharing a number fall back to newest first. |
| **Featured** | Pins the project to the top of the grid and adds a badge. |
| **Published** | Untick to keep a project as a draft — it stays in the admin panel but is invisible on the site. |

Click **Save Project**. Refresh the website and it is there.

---

## Editing and deleting

Each card in the admin panel has **Edit** and **Delete**.

Deleting also removes that project's uploaded images from storage, and cannot be
undone. To take a project off the site without losing it, untick **Published**
instead.

---

## What visitors see

Clicking a project opens a case-study view:

```
   cover image
   category · featured badge
   Title
   short description
   ┌──────────────────────────┐
   │ Client        Delivered  │
   └──────────────────────────┘
   About this project
   Results   [99/100] [-34%] [+28%]
   Gallery   ▢ ▢ ▢ ▢
   What we did   chips
   ─────────────────────────────
   [View Live Project]  [Book a Meeting]
```

**Book a Meeting** closes the project, scrolls down to the booking form, writes
the project name into the message box, and selects a matching service in the
dropdown when one fits — so the enquiry arrives knowing which work prompted it.

---

## If the portfolio looks empty

The site falls back to a single placeholder project when it cannot reach the
database. If that is what you see:

- The `projects` table does not exist yet → run the SQL above
- The environment variables are missing → see [../DEPLOY.md](../DEPLOY.md)
- Every project is unpublished → tick **Published** on at least one

Open the browser console (F12) — the fetch error is logged there with the reason.

---

## Notes

- Images are served straight from Supabase storage, which is a CDN, so no extra
  setup is needed for speed.
- Text from the database is escaped before it reaches the page, so quotes,
  angle brackets and apostrophes in a project title are safe.
- The public endpoint only returns published projects, and only the fields the
  page needs. Drafts never leave the server.
