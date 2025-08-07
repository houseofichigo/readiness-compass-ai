-- Auto-populate answer score/label/max based on selected value
create or replace function public.set_answer_scoring()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare lbl text; sc double precision; mx double precision;
begin
  if new.chosen_value is not null then
    select qc.label, qc.score into lbl, sc
    from public.question_choices qc
    where qc.question_id = new.question_id and qc.value = new.chosen_value;

    if lbl is not null then new.chosen_label := lbl; end if;
    if sc is not null then new.score := sc; end if;
  end if;

  select max(qc.score) into mx from public.question_choices qc where qc.question_id = new.question_id;
  if mx is not null then new.max_possible_score := mx; end if;

  return new;
end;
$$;

drop trigger if exists trg_answers_set_scoring on public.answers;
create trigger trg_answers_set_scoring
before insert or update on public.answers
for each row execute procedure public.set_answer_scoring();