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
