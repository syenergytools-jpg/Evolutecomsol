-- ============================================================
-- Evolut — contact_submissions table
-- ============================================================
-- One row per /contact form submission. Service-role inserts via
-- the /api/contact route; admin reads with service-role too.
-- RLS is on with NO public policies — anon clients cannot read.
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  -- Form fields
  name          text        not null,
  email         text        not null,
  company       text,
  phone         text,
  service       text,        -- slug from services list, e.g. "trademark"
  reason        text,        -- contact reason picker value
  budget        text,        -- optional budget band
  message       text        not null,
  -- Submission metadata (server-derived, not user-provided)
  source_url    text,        -- which page they came from
  user_agent    text,
  ip_hash       text,        -- sha256(ip + secret) — never store raw IPs
  -- Workflow
  status        text        not null default 'new'
                check (status in ('new', 'in_progress', 'responded', 'archived', 'spam')),
  notes         text,
  responded_at  timestamptz
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

create index if not exists contact_submissions_service_idx
  on public.contact_submissions (service);

-- Lock the table down. Only the service-role key (used server-side)
-- may read or write. The anon key (used in any browser code) gets
-- nothing.
alter table public.contact_submissions enable row level security;

-- No public policies are created. Service-role bypasses RLS by
-- design, which is exactly what we want for the API route + admin.
