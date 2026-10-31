-- ============================================
--  Failed-attempt tracking (admin lockout + certificate lookup limit)
--  Run once in Supabase → SQL Editor → New query → Run.
--
--  Used by lib/attempt-guard.js:
--    admin:<ip>   5 wrong admin passwords  → blocked for 1 hour
--    verify:<ip>  10 failed certificate checks → blocked for 1 hour
-- ============================================

create table if not exists public.security_attempts (
  id            text primary key,          -- "<scope>:<ip address>"
  failures      integer      not null default 0,
  last_failure  timestamptz,
  locked_until  timestamptz
);

-- Row Level Security on, with no policies: only the server
-- (which uses the service_role key) can read or write this table.
alter table public.security_attempts enable row level security;

-- To unblock someone early, delete their row, e.g.:
--   delete from public.security_attempts where id like 'admin:%';

-- ============================================
--  Row Level Security check — run any time.
--  Every table below must show rls_enabled = true. With RLS on and
--  no policies, the browser (anon key) can't read or write anything;
--  only the server functions, which use the service_role key, can.
-- ============================================
alter table if exists public.interns           enable row level security;
alter table if exists public.projects          enable row level security;
alter table if exists public.security_attempts enable row level security;

select c.relname as table_name,
       c.relrowsecurity as rls_enabled,
       (select count(*) from pg_policies p
         where p.schemaname = 'public' and p.tablename = c.relname) as policies
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r'
order by 1;
-- "policies" should be 0 for these tables. If a table shows a policy you
-- didn't add on purpose, remove it in Supabase > Authentication > Policies.
