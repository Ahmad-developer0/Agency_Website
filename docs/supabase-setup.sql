-- ============================================
--  Nexyra Studio — Internship certificate database
--  Run this once in: Supabase Dashboard > SQL Editor > New query > Run
-- ============================================

create table if not exists public.interns (
  id             bigserial primary key,
  certificate_no text        not null unique,
  full_name      text        not null,
  role           text,
  department     text,
  start_date     date,
  end_date       date,
  issue_date     date        default current_date,
  status         text        not null default 'Completed',
  photo_url      text,
  created_at     timestamptz not null default now()
);

-- Lookups are always by certificate number
create index if not exists interns_certificate_no_idx
  on public.interns (certificate_no);

-- Certificate numbers are compared in upper case by the API,
-- so store them in upper case too.
create or replace function public.interns_normalize_cert()
returns trigger as $$
begin
  new.certificate_no := upper(trim(new.certificate_no));
  return new;
end;
$$ language plpgsql;

drop trigger if exists interns_normalize_cert_trg on public.interns;
create trigger interns_normalize_cert_trg
  before insert or update on public.interns
  for each row execute function public.interns_normalize_cert();

-- ── Security ──
-- RLS on with no public policy: the table is unreachable from the browser.
-- Only the serverless function (which uses the service role key) can read it.
alter table public.interns enable row level security;

-- ============================================
--  Sample rows — replace with your real interns
-- ============================================
insert into public.interns
  (certificate_no, full_name, role, department, start_date, end_date, issue_date, status, photo_url)
values
  ('NXS-2025-001', 'Ali Raza',    'Web Development Intern', 'Engineering', '2025-06-01', '2025-08-31', '2025-09-05', 'Completed', null),
  ('NXS-2025-002', 'Sara Khan',   'Graphic Design Intern',  'Design',      '2025-07-01', '2025-09-30', '2025-10-04', 'Completed', null),
  ('NXS-2025-003', 'Bilal Ahmed', 'Digital Marketing Intern','Marketing',  '2025-09-01', null,         null,        'Ongoing',   null)
on conflict (certificate_no) do nothing;
