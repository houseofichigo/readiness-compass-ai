-- Seed function to upsert sections and questions from JSON
create or replace function public.seed_assessment(_sections jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  s jsonb;
  q jsonb;
  seq int;
begin
  for s in select jsonb_array_elements(_sections) loop
    insert into public.sections (id, category, purpose, sequence)
    values (
      (s->>'id'),
      nullif(s->>'category', ''),
      nullif(s->>'purpose', ''),
      nullif(s->>'sequence','')::int
    )
    on conflict (id) do update
      set category = excluded.category,
          purpose = excluded.purpose,
          sequence = excluded.sequence,
          updated_at = now();

    seq := 1;
    for q in select jsonb_array_elements(coalesce(s->'questions', '[]'::jsonb)) loop
      insert into public.questions (
        id, section_id, text, type, helper, required, sequence,
        show_if, hide_if, score_map, score_map_by_bucket, score_per, cap,
        score_formula, weight, max_rank, max_select, score_by_count
      )
      values (
        (q->>'id'),
        (s->>'id'),
        (q->>'text'),
        (q->>'type'),
        nullif(q->>'helper',''),
        case when q ? 'required' then (q->>'required')::boolean else null end,
        coalesce(nullif(q->>'sequence','')::int, seq),
        q->'showIf',
        q->'hideIf',
        to_jsonb(q->'scoreMap'),
        q->'score_map_by_bucket',
        nullif(q->>'scorePer','')::int,
        nullif(q->>'cap','')::int,
        nullif(q->>'scoreFormula',''),
        case when q ? 'weight' then (select array_agg((elem)::int) from jsonb_array_elements_text(q->'weight') as elem) else null end,
        nullif(q->>'maxRank','')::int,
        nullif(q->>'maxSelect','')::int,
        q->'scoreByCount'
      )
      on conflict (id) do update set
        section_id = excluded.section_id,
        text = excluded.text,
        type = excluded.type,
        helper = excluded.helper,
        required = excluded.required,
        sequence = excluded.sequence,
        show_if = excluded.show_if,
        hide_if = excluded.hide_if,
        score_map = excluded.score_map,
        score_map_by_bucket = excluded.score_map_by_bucket,
        score_per = excluded.score_per,
        cap = excluded.cap,
        score_formula = excluded.score_formula,
        weight = excluded.weight,
        max_rank = excluded.max_rank,
        max_select = excluded.max_select,
        score_by_count = excluded.score_by_count,
        updated_at = now();

      seq := seq + 1;
    end loop;
  end loop;
end;
$$;

-- Allow public execution (used only for initial seeding from client)
GRANT EXECUTE ON FUNCTION public.seed_assessment(jsonb) TO anon;
GRANT EXECUTE ON FUNCTION public.seed_assessment(jsonb) TO authenticated;