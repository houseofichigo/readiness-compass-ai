-- Update seed_assessment to preserve existing choice scores when incoming is NULL
create or replace function public.seed_assessment(_sections jsonb, _add_ons jsonb default '[]'::jsonb)
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
  -- ensure add_ons section exists
  insert into public.sections (id, category, purpose, sequence)
  values ('add_ons', null, 'Additional optional questions', 999)
  on conflict (id) do nothing;

  -- regular sections
  for s in select jsonb_array_elements(coalesce(_sections, '[]'::jsonb)) loop
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
            score = coalesce(excluded.score, public.question_choices.score),
            reasoning = coalesce(excluded.reasoning, public.question_choices.reasoning),
            model_input_context = coalesce(excluded.model_input_context, public.question_choices.model_input_context),
            sequence = excluded.sequence,
            updated_at = now();

          opt_seq := opt_seq + 1;
        end loop;
      end if;

      seq := seq + 1;
    end loop;
  end loop;

  -- add_ons into the dedicated section
  for q in select jsonb_array_elements(coalesce(_add_ons, '[]'::jsonb)) loop
    insert into public.questions (
      id, section_id, text, type, helper, required, sequence,
      show_if, hide_if, score_map, score_map_by_bucket, score_per, cap,
      score_formula, weight, max_rank, max_select, score_by_count
    ) values (
      (q->>'id'),
      'add_ons',
      (q->>'text'),
      (q->>'type'),
      nullif(q->>'helper',''),
      case when q ? 'required' then (q->>'required')::boolean else null end,
      coalesce(nullif(q->>'sequence','')::int, 0),
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

    -- choices for add_ons
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
          score = coalesce(excluded.score, public.question_choices.score),
          reasoning = coalesce(excluded.reasoning, public.question_choices.reasoning),
          model_input_context = coalesce(excluded.model_input_context, public.question_choices.model_input_context),
          sequence = excluded.sequence,
          updated_at = now();

        opt_seq := opt_seq + 1;
      end loop;
    end if;
  end loop;
end;
$$;

-- Also update the single-arg variant if it exists
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
            score = coalesce(excluded.score, public.question_choices.score),
            reasoning = coalesce(excluded.reasoning, public.question_choices.reasoning),
            model_input_context = coalesce(excluded.model_input_context, public.question_choices.model_input_context),
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