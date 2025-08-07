-- Extend seed_assessment to handle add_ons and ensure add_ons section exists
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
          score = excluded.score,
          reasoning = excluded.reasoning,
          model_input_context = excluded.model_input_context,
          sequence = excluded.sequence,
          updated_at = now();

        opt_seq := opt_seq + 1;
      end loop;
    end if;
  end loop;
end;
$$;

-- 3) Create scoring computation (per submission -> section_scores + pillar_scores)
create or replace function public.compute_submission_scores(_submission_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  pillar jsonb;
begin
  -- Refresh section_scores
  delete from public.section_scores where submission_id = _submission_id;
  insert into public.section_scores (submission_id, section_id, score)
  select _submission_id as submission_id,
         q.section_id,
         case when sum(a.max_possible_score) > 0
              then (sum(a.score) / sum(a.max_possible_score)) * 100
              else 0 end as pct
  from public.answers a
  join public.questions q on q.id = a.question_id
  where a.submission_id = _submission_id
  group by q.section_id;

  -- Overall totals
  update public.submissions s
  set total_score = agg.total,
      max_possible_score = agg.max_total,
      percentage_score = case when agg.max_total > 0 then (agg.total/agg.max_total)*100 else null end
  from (
    select coalesce(sum(a.score),0) as total, coalesce(sum(a.max_possible_score),0) as max_total
    from public.answers a where a.submission_id = _submission_id
  ) as agg
  where s.id = _submission_id;

  -- Pillar scores per section category
  with per_cat as (
    select sec.category as cat,
           coalesce(sum(a.score),0) as total,
           coalesce(sum(a.max_possible_score),0) as max_total
    from public.answers a
    join public.questions q on q.id = a.question_id
    join public.sections sec on sec.id = q.section_id
    where a.submission_id = _submission_id and sec.category is not null
    group by sec.category
  )
  select jsonb_object_agg(cat, case when max_total>0 then round((total/max_total)*100,2) else 0 end)
  into pillar
  from per_cat;

  update public.submissions set pillar_scores = coalesce(pillar, '{}'::jsonb) where id = _submission_id;
end;
$$;

-- 4) Trigger to recompute on answers changes
create or replace function public.trigger_compute_on_answers()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare sid uuid;
begin
  sid := coalesce(new.submission_id, old.submission_id);
  perform public.compute_submission_scores(sid);
  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_answers_compute on public.answers;
create trigger trg_answers_compute
after insert or update or delete on public.answers
for each row execute procedure public.trigger_compute_on_answers();