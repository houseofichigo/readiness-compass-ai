-- Batch 1: Core lookup tables and infrastructure
-- 1) Common updated_at trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 2) tracks table
create table if not exists public.tracks (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tracks enable row level security;

-- Read-only for everyone (public metadata)
create policy if not exists "Tracks are publicly readable"
  on public.tracks
  for select
  using (true);

-- updated_at trigger
create trigger if not exists trg_tracks_updated_at
before update on public.tracks
for each row execute function public.update_updated_at_column();

-- Realtime support
alter table public.tracks replica identity full;
-- Add to realtime publication (ignore error if already added)
do $$ begin
  if not exists (
    select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'tracks'
  ) then
    execute 'alter publication supabase_realtime add table public.tracks';
  end if;
end $$;

-- Seed default track codes
insert into public.tracks (id, name) values
  ('TECH', 'Technology'),
  ('REG', 'Regulatory'),
  ('GEN', 'General')
on conflict (id) do nothing;

-- 3) sections table
create table if not exists public.sections (
  id text primary key,
  category text,
  purpose text,
  sequence integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sections enable row level security;

-- Publicly readable (assessment structure is public)
create policy if not exists "Sections are publicly readable"
  on public.sections
  for select
  using (true);

-- updated_at trigger
create trigger if not exists trg_sections_updated_at
before update on public.sections
for each row execute function public.update_updated_at_column();

-- Optional helpful index for ordering
create index if not exists idx_sections_sequence on public.sections (sequence);

-- Realtime support
alter table public.sections replica identity full;
do $$ begin
  if not exists (
    select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'sections'
  ) then
    execute 'alter publication supabase_realtime add table public.sections';
  end if;
end $$;