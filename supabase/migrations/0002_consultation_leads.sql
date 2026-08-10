-- ============================================================
-- Evolut — consultation_leads table
-- ============================================================
-- Every lead captured by the /consultation funnel, in ONE table
-- with a `kind` discriminator:
--
--   'onboarding' — the modal that auto-opens on page load. Only ever
--                  has name + email; every qualifier column is null.
--   'qualifier'  — the 5-step BANT form behind "Book your consultation".
--                  Carries the structured step answers.
--
-- The funnel ALSO mirrors each lead into contact_submissions so it
-- shows up in the existing /admin inbox with its status workflow,
-- notes and CSV export. This table is the structured record: query it
-- directly when you want to slice by budget / timing / bottleneck.
--
-- Service-role inserts via /api/consultation. RLS on, no public
-- policies — the anon key can read nothing.
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.consultation_leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  kind          text        not null
                check (kind in ('onboarding', 'qualifier')),

  -- Contact
  name          text        not null,
  email         text        not null,
  phone         text,

  -- Qualifier step answers. Null for 'onboarding' rows.
  -- budget holds the display string (it is already human-readable);
  -- the rest hold stable slugs so analytics survive copy changes.
  budget        text,
  authority     text,       -- solo | partner | team
  need          text,       -- sourcing | listings | ads | brand | exploring
  timing        text,       -- now | soon | later

  -- Full answer record incl. the human labels shown at submit time.
  -- jsonb so extra funnel steps don't need a migration to be captured.
  answers       jsonb       not null default '{}'::jsonb,

  -- Submission metadata (server-derived, never user-provided)
  source_url    text,
  user_agent    text,
  ip_hash       text,       -- sha256(ip + secret) — never store raw IPs

  -- Workflow
  status        text        not null default 'new'
                check (status in ('new', 'in_progress', 'responded', 'archived', 'spam')),
  notes         text
);

create index if not exists consultation_leads_created_at_idx
  on public.consultation_leads (created_at desc);

create index if not exists consultation_leads_kind_idx
  on public.consultation_leads (kind);

create index if not exists consultation_leads_status_idx
  on public.consultation_leads (status);

create index if not exists consultation_leads_email_idx
  on public.consultation_leads (email);

-- Lock it down. Only the service-role key (server-side) may read or
-- write; the anon key used in the browser gets nothing.
alter table public.consultation_leads enable row level security;
