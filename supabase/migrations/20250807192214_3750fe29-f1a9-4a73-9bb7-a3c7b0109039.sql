-- Add question_choices table and extend seeding to store per-choice context

-- 1) question_choices table
create table if not exists public.question_choices (
  question_id text not null references public.questions(id) on update cascade on delete cascade,
  value text not null,
  label text,
  score double precision,
  reasoning text,
  model_input_context text,
  sequence integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (question_id, value)
);

alter table public.question_choices enable row level security;

-- Public read (to render assessment structure)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='question_choices' AND policyname='Question choices are publicly readable'
  ) THEN
    CREATE POLICY "Question choices are publicly readable" ON public.question_choices
    FOR SELECT USING (true);
  END IF;
END $$;

-- updated_at trigger
drop trigger if exists trg_question_choices_updated_at on public.question_choices;
create trigger trg_question_choices_updated_at
before update on public.question_choices
for each row execute function public.update_updated_at_column();

-- Realtime support
alter table public.question_choices replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'question_choices'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.question_choices';
  END IF;
END $$;

-- 2) Update seed_assessment to also upsert choices with reasoning/model_input_context/score
create or replace function public.seed_assessment(_sections jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  s jsonb;
  q jsonb;
  opt jsonb;
  seq int;
  opt_seq int;
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
        q->'scoreMap',
        q->'score_map_by_bucket',
        nullif(q->>'scorePer','')::int,
        nullif(q->>'cap','')::int,
        nullif(q->>'scoreFormula',''),
        case when q ? 'weight' and jsonb_typeof(q->'weight')='array' then (
          select array_agg((e)::int) from jsonb_array_elements_text(q->'weight') as e
        ) else null end,
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

      -- Upsert choices if provided
      opt_seq := 1;
      if q ? 'options' and jsonb_typeof(q->'options')='array' then
        for opt in select jsonb_array_elements(q->'options') loop
          insert into public.question_choices (
            question_id, value, label, score, reasoning, model_input_context, sequence
          ) values (
            (q->>'id'),
            (opt->>'value'),
            coalesce(nullif(opt->>'label',''), opt->>'value'),
            case when opt ? 'score' then (opt->>'score')::double precision else null end,
            nullif(opt->>'reasoning',''),
            nullif(opt->>'model_input_context',''),
            opt_seq
          )
          on conflict (question_id, value) do update set
            label = excluded.label,
            score = excluded.score,
            reasoning = excluded.reasoning,
            model_input_context = excluded.model_input_context,
            sequence = excluded.sequence,
            updated_at = now();

          opt_seq := opt_seq + 1;
        end loop;
      end if;

      seq := seq + 1;
    end loop;
  end loop;
end;
$$;