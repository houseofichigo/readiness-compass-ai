-- Seed minimal sections ids to ensure baseline data (will be enriched by RPC)
insert into public.sections (id, category, purpose, sequence)
values
  ('section_0', null, null, 1),
  ('section_1', null, null, 2),
  ('section_2', null, null, 3),
  ('section_3', null, null, 4),
  ('section_4', null, null, 5),
  ('section_5', null, null, 6),
  ('section_6', null, null, 7),
  ('section_7', null, null, 8),
  ('section_8', null, null, 9)
on conflict (id) do nothing;