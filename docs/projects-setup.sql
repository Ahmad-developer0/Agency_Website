-- ============================================
--  Nexyra Studio — Portfolio projects
--  Run once in: Supabase Dashboard > SQL Editor > New query > Run
-- ============================================

create table if not exists public.projects (
  id            bigserial primary key,
  slug          text        not null unique,
  title         text        not null,
  category      text        not null default 'Web Dev',
  emoji         text,                       -- fallback when there is no cover image

  summary       text,                       -- short line shown on the card
  description   text,                       -- full story shown in the modal

  tags          text[]      not null default '{}',

  cover_url     text,                       -- card + modal hero image
  gallery       text[]      not null default '{}',   -- extra images in the modal

  client        text,
  project_date  date,
  results       jsonb       not null default '[]',   -- [{label, value}, ...]

  live_url      text,
  featured      boolean     not null default false,
  sort_order    integer     not null default 0,
  published     boolean     not null default true,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- The public list is ordered by these
create index if not exists projects_order_idx
  on public.projects (published, featured desc, sort_order asc, created_at desc);

create index if not exists projects_slug_idx
  on public.projects (slug);

-- ── Keep slug tidy and updated_at fresh ──
create or replace function public.projects_before_write()
returns trigger as $$
begin
  new.slug := lower(trim(new.slug));
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_before_write_trg on public.projects;
create trigger projects_before_write_trg
  before insert or update on public.projects
  for each row execute function public.projects_before_write();

-- ── Security ──
-- RLS on. The site reads projects through the serverless function
-- (service role), exactly like the interns table.
alter table public.projects enable row level security;

-- ============================================
--  Storage bucket for project images
--  If this fails, create the bucket by hand:
--  Storage > New bucket > name "project-images" > tick Public
-- ============================================
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

-- ============================================
--  Sample project — delete once you add your own
-- ============================================
insert into public.projects
  (slug, title, category, emoji, summary, description, tags, client, project_date, results, live_url, featured, sort_order)
values
  (
    'sample-shopify-store',
    'Archipelago Retail E-commerce',
    'Web Dev',
    '🌐',
    'Shopify rebuild focused on speed and conversions.',
    'Complete e-commerce redesign and rebuild for Archipelago Retail on Shopify. Focused on conversion rate optimization, mobile-first design, and lightning-fast performance across every template.',
    array['Shopify', 'UI/UX Design', 'CRO', 'Performance'],
    'Archipelago Retail',
    '2025-04-15',
    '[{"label":"PageSpeed score","value":"99/100"},{"label":"Cart abandonment","value":"-34%"},{"label":"Average order value","value":"+28%"}]'::jsonb,
    '',
    true,
    1
  )
on conflict (slug) do nothing;
