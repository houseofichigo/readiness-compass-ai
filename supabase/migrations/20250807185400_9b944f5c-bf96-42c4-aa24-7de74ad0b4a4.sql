-- Batch 1 (retry): Core lookup tables and infrastructure
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

-- Read-only for everyone (public metadata) - create policy if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'tracks' AND policyname = 'Tracks are publicly readable'
  ) THEN
    EXECUTE 'CREATE POLICY "Tracks are publicly readable" ON public.tracks FOR SELECT USING (true)';
  END IF;
END $$;

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_tracks_updated_at ON public.tracks;
CREATE TRIGGER trg_tracks_updated_at
BEFORE UPDATE ON public.tracks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime support
alter table public.tracks replica identity full;
-- Add to realtime publication (ignore error if already added)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'tracks'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.tracks';
  END IF;
END $$;

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

-- Publicly readable (assessment structure is public) - create policy if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'sections' AND policyname = 'Sections are publicly readable'
  ) THEN
    EXECUTE 'CREATE POLICY "Sections are publicly readable" ON public.sections FOR SELECT USING (true)';
  END IF;
END $$;

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_sections_updated_at ON public.sections;
CREATE TRIGGER trg_sections_updated_at
BEFORE UPDATE ON public.sections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Optional helpful index for ordering
create index if not exists idx_sections_sequence on public.sections (sequence);

-- Realtime support
alter table public.sections replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'sections'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.sections';
  END IF;
END $$;