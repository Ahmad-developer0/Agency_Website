# Adding intern records — two ways

There are two ways to put an intern into the database. Both write to the same
place, so use whichever is convenient.

---

# Way 1 — The admin panel (easiest)

Open **`/staff-portal`** on the site, type the admin password, and manage
everything from there. No Supabase login needed.

```
Local:       http://localhost:3000/staff-portal
Production:  https://your-site.com/staff-portal
```

### Add an intern

1. Click **Add Intern**
2. Fill the form:

| Field | Example | Required |
|---|---|---|
| Certificate Number | `NXS-2025-014` | **Yes** — must be unique |
| Full Name | `Ali Raza` | **Yes** |
| Role | `Web Development Intern` | no |
| Department | `Engineering` | no |
| Start Date | pick from calendar | no |
| End Date | leave empty if ongoing | no |
| Issue Date | pick from calendar | no |
| Status | Completed / Ongoing / Revoked | defaults to Completed |
| Photo URL | `https://...jpg` | no — initials shown if empty |

3. Click **Save Intern**

The record is live immediately. Test it at `verify.html` with that number.

### Edit or delete

Every row has **Edit** and **Delete** buttons. Edit reopens the form with the
values filled in; Delete asks for confirmation first and cannot be undone —
after deleting, that certificate stops verifying.

### Search

The search box filters by name, certificate number, role or department as you type.

### Notes

- The password lives in `sessionStorage`, so closing the tab logs you out.
- Certificate numbers are saved in upper case automatically — typing
  `nxs-2025-014` stores `NXS-2025-014`.
- Saving an existing certificate number updates that record rather than
  creating a duplicate.

---

# Way 2 — Supabase dashboard

Useful for bulk work, or if you ever want to look at the raw data.

### Add one row

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → your project
2. Left sidebar → **Table Editor**
3. Pick the **`interns`** table
4. Click **Insert** → **Insert row**
5. Fill the columns (same fields as the table above)
6. Click **Save**

Leave `id` and `created_at` empty — they fill themselves.

### Add many at once

Left sidebar → **SQL Editor** → **New query**, then adapt this:

```sql
insert into public.interns
  (certificate_no, full_name, role, department, start_date, end_date, issue_date, status)
values
  ('NXS-2025-014', 'Ali Raza',   'Web Development Intern', 'Engineering', '2025-06-01', '2025-08-31', '2025-09-05', 'Completed'),
  ('NXS-2025-015', 'Sara Khan',  'Graphic Design Intern',  'Design',      '2025-07-01', '2025-09-30', '2025-10-04', 'Completed'),
  ('NXS-2025-016', 'Usman Tariq','SEO Intern',             'Marketing',   '2025-08-01', null,         null,        'Ongoing');
```

Press **Run**. `Success. No rows returned` means it worked.

### Import from a spreadsheet

Table Editor → `interns` → **Insert** → **Import data from CSV**. Your CSV column
headers must match the column names exactly:

```csv
certificate_no,full_name,role,department,start_date,end_date,issue_date,status
NXS-2025-014,Ali Raza,Web Development Intern,Engineering,2025-06-01,2025-08-31,2025-09-05,Completed
```

Dates must be in `YYYY-MM-DD` format.

---

## Intern photos

The photo is optional — without one the page shows the intern's initials in a
coloured tile, which looks fine.

To add one:

1. Supabase dashboard → **Storage** → **New bucket**
2. Name it `intern-photos` and tick **Public bucket** → Save
3. Upload the image → click it → **Copy URL**
4. Paste that URL into the Photo URL field

Square images look best. Any public image URL works, not just Supabase.

---

## Status meanings

| Status | How the verification page shows it |
|---|---|
| `Completed` | Green — "Certificate Verified" |
| `Ongoing` | Verified, with an amber "Ongoing" badge |
| `Revoked` | Red — "Certificate Revoked", record still shown |

Use **Revoked** rather than deleting when a certificate was issued but should no
longer count — deleting makes it look like it never existed, revoking says
plainly that it is no longer valid.

---

## Certificate numbering

Any format works as long as it is unique and uses only letters, numbers, `-` and `/`.
A readable convention:

```
NXS-2025-001    NXS = Nexyra Studio, 2025 = year, 001 = counter
```

Put the number on the printed certificate, and optionally a QR code pointing to:

```
https://your-site.com/verify.html?cert=NXS-2025-001
```

That link verifies the certificate the moment it opens — no typing needed.

---

## Changing the admin password

The password is the `ADMIN_PASSWORD` environment variable.

- **Local:** edit `.env.local`, then restart `npm run dev`
- **Production:** Vercel → Settings → Environment Variables → edit
  `ADMIN_PASSWORD` → Save → redeploy

Pick something long. Anyone with this password can add, edit and delete records.

---

## Security notes

- The panel is protected by the password check inside the API, not by hiding the
  page — it shows nothing until the API accepts the password.
- The page carries `noindex, nofollow`, so search engines will not list it.
- A wrong password is delayed by about half a second, which makes guessing at
  scale impractical.
- The Supabase `service_role` key never reaches the browser. All database access
  happens inside the serverless functions.
