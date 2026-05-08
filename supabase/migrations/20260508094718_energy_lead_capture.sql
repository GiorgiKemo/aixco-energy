create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;
revoke all on schema private from public;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.energy_contact_submissions (
  id uuid primary key default extensions.gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source text not null default 'energy_contact_form',
  name text not null,
  email text not null,
  email_normalized text generated always as (lower(email)) stored,
  interest text,
  message text not null,
  locale text,
  page_path text,
  referrer text,
  user_agent text,
  status text not null default 'new',
  metadata jsonb not null default '{}'::jsonb,
  constraint energy_contact_submissions_source_check check (source = 'energy_contact_form'),
  constraint energy_contact_submissions_name_length check (length(trim(name)) between 2 and 100),
  constraint energy_contact_submissions_email_length check (length(email) <= 255),
  constraint energy_contact_submissions_email_format check (email ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$'),
  constraint energy_contact_submissions_interest_length check (interest is null or length(interest) <= 255),
  constraint energy_contact_submissions_message_length check (length(trim(message)) between 10 and 1500),
  constraint energy_contact_submissions_status_check check (status in ('new', 'contacted', 'qualified', 'archived')),
  constraint energy_contact_submissions_metadata_object_check check (jsonb_typeof(metadata) = 'object')
);

create table public.energy_intent_events (
  id uuid primary key default extensions.gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'aixco_energy_site',
  event_type text not null,
  label text not null,
  target_url text not null,
  locale text,
  page_path text,
  referrer text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  constraint energy_intent_events_source_check check (source = 'aixco_energy_site'),
  constraint energy_intent_events_type_check check (
    event_type in (
      'bluerock_click',
      'email_click',
      'pdf_open',
      'project_focus_click',
      'news_article_click'
    )
  ),
  constraint energy_intent_events_label_length check (length(trim(label)) between 2 and 160),
  constraint energy_intent_events_target_url_length check (length(target_url) <= 2048),
  constraint energy_intent_events_target_url_format check (target_url ~ '^(https://|mailto:|/)'),
  constraint energy_intent_events_metadata_object_check check (jsonb_typeof(metadata) = 'object')
);

create trigger energy_contact_submissions_set_updated_at
before update on public.energy_contact_submissions
for each row execute function private.set_updated_at();

alter table public.energy_contact_submissions enable row level security;
alter table public.energy_contact_submissions force row level security;
alter table public.energy_intent_events enable row level security;
alter table public.energy_intent_events force row level security;

create policy energy_contact_submissions_insert_public
on public.energy_contact_submissions
for insert
to anon, authenticated
with check (
  source = 'energy_contact_form'
  and status = 'new'
  and length(trim(name)) between 2 and 100
  and length(trim(message)) between 10 and 1500
  and email ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$'
);

create policy energy_intent_events_insert_public
on public.energy_intent_events
for insert
to anon, authenticated
with check (
  source = 'aixco_energy_site'
  and event_type in (
    'bluerock_click',
    'email_click',
    'pdf_open',
    'project_focus_click',
    'news_article_click'
  )
  and length(trim(label)) between 2 and 160
  and target_url ~ '^(https://|mailto:|/)'
);

revoke all on public.energy_contact_submissions from anon, authenticated;
revoke all on public.energy_intent_events from anon, authenticated;

grant insert on public.energy_contact_submissions to anon, authenticated;
grant insert on public.energy_intent_events to anon, authenticated;

grant all on public.energy_contact_submissions to service_role;
grant all on public.energy_intent_events to service_role;

create index energy_contact_submissions_created_at_idx
on public.energy_contact_submissions (created_at desc);

create index energy_contact_submissions_email_normalized_idx
on public.energy_contact_submissions (email_normalized);

create index energy_contact_submissions_status_created_at_idx
on public.energy_contact_submissions (status, created_at desc);

create index energy_intent_events_created_at_idx
on public.energy_intent_events (created_at desc);

create index energy_intent_events_type_created_at_idx
on public.energy_intent_events (event_type, created_at desc);

comment on table public.energy_contact_submissions is 'Lead form submissions from the AIXCO Energy website.';
comment on table public.energy_intent_events is 'Anonymous investor intent and outbound handoff events from the AIXCO Energy website.';
