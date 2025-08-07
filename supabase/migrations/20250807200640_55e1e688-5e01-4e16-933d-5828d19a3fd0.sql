-- Fix compute_submission_scores: cast to numeric in round()
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
  select jsonb_object_agg(cat,
    case when max_total>0 then round(((total/max_total)::numeric * 100::numeric), 2) else 0 end
  )
  into pillar
  from per_cat;

  update public.submissions set pillar_scores = coalesce(pillar, '{}'::jsonb) where id = _submission_id;
end;
$$;