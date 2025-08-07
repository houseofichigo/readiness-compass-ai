begin;

-- Populate missing reasoning texts across assessment choices without overwriting specific existing values
-- Safeguard: only set when reasoning is NULL/blank or placeholder patterns like 'qid=%'

-- Helper temp table for placeholder detection (optional list to expand later)
create temporary table tmp_reasoning_placeholders(p text);
insert into tmp_reasoning_placeholders(p) values ('qid=%');

-- Macro predicate reused via CTEs per update

-- Strategy S1
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No use-cases = ad-hoc maturity'
  when score = 2 then 'Brainstormed but not formalised'
  when score = 3 then 'A few pilots = exploratory'
  when score = 4 then 'Prioritised projects with owners = defined roadmap'
  when score = 5 then 'Portfolio with owners & timelines = integrated strategy'
end
where qc.question_id = 'S1'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S2 (label-aware for the two score-5 variants)
update public.question_choices qc
set reasoning = 'Quantitative ROI = mature planning'
where qc.question_id = 'S2' and (qc.label = 'ROI-driven financial model' or qc.value = 'ROI-driven financial model')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc
set reasoning = 'Weighs risk + return = best practice'
where qc.question_id = 'S2' and (qc.label = 'Risk-adjusted prioritisation' or qc.value = 'Risk-adjusted prioritisation')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc
set reasoning = case
  when score = 1 then 'No process = ad-hoc'
  when score = 2 then 'Some value thought but informal'
  when score = 3 then 'Simple impact–effort scoring'
  when score = 4 then 'Adds resource awareness'
  when score = 5 then coalesce(reasoning, 'Weighs risk + return = best practice')
end
where qc.question_id = 'S2'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S3
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No KPIs = no alignment to goals'
  when score = 2 then 'Metrics exist but aren''t measured'
  when score = 3 then 'Monitored but isolated'
  when score = 4 then 'Some functional linkage'
  when score = 5 then 'Executive-level integration = highest maturity'
end
where qc.question_id = 'S3'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S4
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No ROI modelling = immature'
  when score = 2 then 'Informal estimates = low rigour'
  when score = 3 then 'Basic structured analysis'
  when score = 4 then 'ROI tied to performance metrics'
  when score = 5 then 'Advanced modelling = best practice'
end
where qc.question_id = 'S4'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S5
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Slow impact = slow execution'
  when score = 2 then 'Moderate timeframe'
  when score = 3 then 'Standard pilot timeframe'
  when score = 4 then 'Rapid for pilots/plug-and-play'
  when score = 5 then 'Very agile; off-the-shelf'
end
where qc.question_id = 'S5'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S6
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No trend monitoring = low awareness'
  when score = 2 then 'Sporadic benchmarking'
  when score = 3 then 'Scheduled but infrequent'
  when score = 4 then 'Regular updates'
  when score = 5 then 'Real-time monitoring = high awareness'
end
where qc.question_id = 'S6'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S7 (rank) - generic reasoning on all options
update public.question_choices qc
set reasoning = 'Innovation/compliance goals score highest; productivity/cost near-term'
where qc.question_id = 'S7'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S8
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No exec support = low maturity'
  when score = 2 then 'Minimal exec engagement'
  when score = 3 then 'Interest but no budget'
  when score = 4 then 'Financial commitment'
  when score = 5 then 'Exec champions = highest maturity'
end
where qc.question_id = 'S8'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S9 (multi-select)
update public.question_choices qc
set reasoning = 'More functions involved = higher maturity'
where qc.question_id = 'S9'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S10
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No readiness framework'
  when score = 2 then 'Unstructured readiness'
  when score = 3 then 'Partial readiness'
  when score = 4 then 'Standardised readiness'
  when score = 5 then 'Proactive culture'
end
where qc.question_id = 'S10'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S11
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No metrics = no direction'
  when score = 2 then 'Goals exist but unmeasured'
  when score = 3 then 'Partial measurement'
  when score = 4 then 'Broad measurement'
  when score = 5 then 'Full measurement'
end
where qc.question_id = 'S11'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Strategy S12
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Controlled POCs only = very cautious'
  when score = 2 then 'Limited pilots'
  when score = 3 then 'Individual security reviews'
  when score = 4 then 'Governed fast iterations'
  when score = 5 then 'Production-grade agility with risk controls'
end
where qc.question_id = 'S12'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Financial F1
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Very low budget → minimal experimentation'
  when score = 2 then 'Small budget → basic tool coverage'
  when score = 3 then 'Moderate budget → supports a few pilots'
  when score = 4 then 'Significant investment → multiple pilots'
  when score = 5 then 'Substantial investment → scaling potential'
end
where qc.question_id = 'F1'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Financial F3
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Short runway → financial fragility'
  when score = 2 then 'Limited runway → risk of interruptions'
  when score = 3 then 'Sufficient for pilot phases'
  when score = 4 then 'Longer runway → supports scaling'
  when score = 5 then 'Stable long-term funding'
end
where qc.question_id = 'F3'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Financial F4
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No support → undermines projects'
  when score = 2 then 'Conversations but no resources'
  when score = 3 then 'Willingness to explore'
  when score = 4 then 'Financial backing in place'
  when score = 5 then 'Executives champion AI → high maturity'
end
where qc.question_id = 'F4'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Financial F5 (multi-select)
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No awareness of regulations'
  when score = 2 then 'Basic compliance awareness'
  when score = 3 then 'Broader compliance coverage'
  when score = 4 then 'Strong regulatory oversight'
  when score = 5 then 'Comprehensive compliance'
end
where qc.question_id = 'F5'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Financial F6
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Isolation limits expertise and resources'
  when score = 2 then 'Early-stage outreach'
  when score = 3 then 'Single collaboration'
  when score = 4 then 'Networked approach'
  when score = 5 then 'Deep strategic collaborations'
end
where qc.question_id = 'F6'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Financial F7
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No allocation = compliance risk'
  when score = 2 then 'Intention to fund ethics later'
  when score = 3 then 'Modest funding supports basic ethics activities'
  when score = 4 then 'Dedicated ethics funding acknowledges risk'
  when score = 5 then 'Significant investment → strong ethical commitment'
end
where qc.question_id = 'F7'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Financial F8
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Avoids complexity but limits data access'
  when score = 2 then 'One-off arrangements'
  when score = 3 then 'Approved contractual basis'
  when score = 4 then 'Group-wide privacy rules'
  when score = 5 then 'Highest maturity → automated compliance'
end
where qc.question_id = 'F8'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D1 (multi-select)
update public.question_choices qc
set reasoning = 'More source types = broader integration'
where qc.question_id = 'D1'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D2
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No awareness → poor data management'
  when score = 2 then 'Tiny datasets constrain AI'
  when score = 3 then 'Limited data may inhibit model training'
  when score = 4 then 'Moderate volume supports basic models'
  when score = 5 then 'Large datasets enable sophisticated AI'
end
where qc.question_id = 'D2'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D3
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No standards → inconsistent & risky data'
  when score = 2 then 'Minimal structure; manual processes'
  when score = 3 then 'Standards exist but lack automation'
  when score = 4 then 'Automated lineage → strong governance'
  when score = 5 then 'End-to-end versioning & governance'
end
where qc.question_id = 'D3'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D4
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Poor quality yields unreliable AI'
  when score = 2 then 'Some QC but error-prone'
  when score = 3 then 'Regular tests improve trust'
  when score = 4 then 'Proactive alerting'
  when score = 5 then 'Continuous validation = best practice'
end
where qc.question_id = 'D4'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D5 (multi-select)
update public.question_choices qc
set reasoning = 'More controls = stronger security'
where qc.question_id = 'D5'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D6
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No steward → neglect'
  when score = 2 then 'Sporadic maintenance'
  when score = 3 then 'Basic stewardship'
  when score = 4 then 'Regular maintenance'
  when score = 5 then 'Ongoing oversight'
end
where qc.question_id = 'D6'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D7
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No audit capability → low trust'
  when score = 2 then 'Minimal traceability'
  when score = 3 then 'Key-system traceability'
  when score = 4 then 'Explainability built into logs'
  when score = 5 then 'Fully automated audits'
end
where qc.question_id = 'D7'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D8
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No labels → hampers supervised learning'
  when score = 2 then 'Unstructured labels'
  when score = 3 then 'Standard guidelines'
  when score = 4 then 'Unified taxonomy'
  when score = 5 then 'Automated enrichment'
end
where qc.question_id = 'D8'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D9
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No synthetic data → limits modelling'
  when score = 2 then 'Considering but not using'
  when score = 3 then 'Initial experiments'
  when score = 4 then 'Mature usage'
  when score = 5 then 'Best practice'
end
where qc.question_id = 'D9'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Data D10
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No policies → compliance risk'
  when score = 2 then 'Principles exist but lack detail'
  when score = 3 then 'Guidelines exist but not enforced'
  when score = 4 then 'Training + oversight fosters adoption'
  when score = 5 then 'Regular audits & updates = best practice'
end
where qc.question_id = 'D10'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T0 (multi-select)
update public.question_choices qc
set reasoning = 'More tool categories = higher maturity'
where qc.question_id = 'T0'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T1
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Disconnected tools → poor scaling'
  when score = 2 then 'Labour-intensive error-prone'
  when score = 3 then 'Regular but delayed syncs'
  when score = 4 then 'Modern architecture'
  when score = 5 then 'Event-driven real-time mesh = highest maturity'
end
where qc.question_id = 'T1'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T2
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Frequent failures → low trust'
  when score = 2 then 'Some reliability issues'
  when score = 3 then 'Fairly stable'
  when score = 4 then 'High reliability'
  when score = 5 then 'No failures → best practice'
end
where qc.question_id = 'T2'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T3
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No ownership → accountability gaps'
  when score = 2 then 'Outsourced limited internal capacity'
  when score = 3 then 'Internal but shared responsibility'
  when score = 4 then 'Dedicated internal capability'
  when score = 5 then 'Specialised team → high maturity'
end
where qc.question_id = 'T3'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T4
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Bans LLMs → stifles innovation'
  when score = 2 then 'Sandbox tests'
  when score = 3 then 'Small-scale pilots'
  when score = 4 then 'Single integration'
  when score = 5 then 'Broad integration'
end
where qc.question_id = 'T4'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T5
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No compute → restricts AI'
  when score = 2 then 'Free/shared resources → early stage'
  when score = 3 then 'Pay-as-you-go → moderate maturity'
  when score = 4 then 'Budgeted hardware → scaling capability'
  when score = 5 then 'Best practice compute cluster'
end
where qc.question_id = 'T5'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T6
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No diagrams → ad-hoc systems'
  when score = 2 then 'Rough mapping'
  when score = 3 then 'Key components documented'
  when score = 4 then 'Comprehensive documentation'
  when score = 5 then 'Automated up-to-date docs'
end
where qc.question_id = 'T6'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T7
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No plan → high risk'
  when score = 2 then 'Limited resilience'
  when score = 3 then 'Manual recovery'
  when score = 4 then 'Quick recovery'
  when score = 5 then 'Includes AI failure scenarios → highest maturity'
end
where qc.question_id = 'T7'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T8 (multi-select)
update public.question_choices qc
set reasoning = 'More automation tools = higher maturity'
where qc.question_id = 'T8'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Tools T9
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No production deployment'
  when score = 2 then 'Manual processes'
  when score = 3 then 'Automates builds/deployments'
  when score = 4 then 'Reproducibility & monitoring'
  when score = 5 then 'Sophisticated deployment strategy'
end
where qc.question_id = 'T9'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A1 (label based)
update public.question_choices qc
set reasoning = 'Only basic tasks → ad-hoc focus'
where qc.question_id = 'A1' and (qc.label = 'Simple tasks only' or qc.value = 'Simple tasks only')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');
update public.question_choices qc
set reasoning = 'Some strategic thinking'
where qc.question_id = 'A1' and (qc.label = 'Mixed simple and moderate tasks' or qc.value = 'Mixed simple and moderate tasks')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');
update public.question_choices qc
set reasoning = 'High-value process focus'
where qc.question_id = 'A1' and (qc.label = 'Strategic and complex processes' or qc.value = 'Strategic and complex processes')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A2
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No automation = initial stage'
  when score = 2 then 'Scripted but unmanaged automation'
  when score = 3 then 'Tools exist but require human checks'
  when score = 4 then 'Cross-functional workflows'
  when score = 5 then 'Fully monitored continuous processes'
end
where qc.question_id = 'A2'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A3
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No agents → no adoption'
  when score = 2 then 'Prototype only'
  when score = 3 then 'First production agent'
  when score = 4 then 'Several agents deployed'
  when score = 5 then 'Enterprise-wide agent deployment'
end
where qc.question_id = 'A3'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A4 (multi-select)
update public.question_choices qc
set reasoning = case
  when score in (1,2) then 'Basic agent applications'
  when score in (3,4) then 'Growing agent sophistication'
  when score = 5 then 'Full-spectrum agent use'
end
where qc.question_id = 'A4'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A6
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No visibility → risk'
  when score = 2 then 'Reactive monitoring'
  when score = 3 then 'Basic observability'
  when score = 4 then 'Proactive management'
  when score = 5 then 'Comprehensive monitoring'
end
where qc.question_id = 'A6'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A7 (multi-select)
update public.question_choices qc
set reasoning = case
  when score in (1,2) then 'High blockers → low readiness'
  when score in (3,4) then 'Some specific challenges'
  when score = 5 then 'High automation readiness'
end
where qc.question_id = 'A7'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A8 (multi-select)
update public.question_choices qc
set reasoning = case
  when score in (1,2) then 'Basic access channels'
  when score in (3,4) then 'Growing accessibility'
  when score = 5 then 'Omni-channel high maturity'
end
where qc.question_id = 'A8'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A9
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No reviews → unchecked risks'
  when score = 2 then 'Random reviews → limited oversight'
  when score = 3 then 'Structured but periodic'
  when score = 4 then 'Continuous audit capability'
  when score = 5 then 'Automated continuous compliance'
end
where qc.question_id = 'A9'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A10
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No fallback → high risk'
  when score = 2 then 'Reactive recovery'
  when score = 3 then 'Documented plans'
  when score = 4 then 'Rapid recovery'
  when score = 5 then 'Agents self-recover → best practice'
end
where qc.question_id = 'A10'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Automation A11
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No accuracy metrics'
  when score = 2 then 'Occasional checks → low confidence'
  when score = 3 then 'Pre-deployment QA'
  when score = 4 then 'Continuous QA'
  when score = 5 then 'Real-time quality assurance'
end
where qc.question_id = 'A11'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C1
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No exposure → no adoption'
  when score = 2 then 'Minimal exposure'
  when score = 3 then 'Occasional use'
  when score = 4 then 'Regular use builds familiarity'
  when score = 5 then 'Frequent use → strong adoption'
end
where qc.question_id = 'C1'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C2 (matrix)
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No skill → low maturity'
  when score = 2 then 'Limited skill'
  when score = 3 then 'Adequate skill'
  when score = 4 then 'High proficiency'
end
where qc.question_id = 'C2'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C3
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No sharing → impedes learning'
  when score = 2 then 'Unstructured exchange'
  when score = 3 then 'Centralised communication'
  when score = 4 then 'Formal training events'
  when score = 5 then 'Sustained broad engagement'
end
where qc.question_id = 'C3'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C3a (rank)
update public.question_choices qc
set reasoning = case
  when score in (1,2) then 'Early-stage training needs'
  when score in (3,4) then 'Balanced training approach'
  when score = 5 then 'Sophisticated training needs'
end
where qc.question_id = 'C3a'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C4
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No budget → no training'
  when score = 2 then 'Minimal investment'
  when score = 3 then 'Modest investment'
  when score = 4 then 'Significant investment'
  when score = 5 then 'High investment → strong commitment'
end
where qc.question_id = 'C4'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C5
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No time → no training'
  when score = 2 then 'Very limited training'
  when score = 3 then 'Some training'
  when score = 4 then 'Moderate training'
  when score = 5 then 'Extensive training'
end
where qc.question_id = 'C5'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C6 (multi-select)
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Limited delivery options'
  when score in (2,3) then 'Moderate format variety'
  when score in (4,5) then 'Comprehensive delivery options'
end
where qc.question_id = 'C6'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C7
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No external expertise → isolation'
  when score = 2 then 'Ad-hoc guidance'
  when score = 3 then 'Ongoing guidance'
  when score = 4 then 'Broad network → higher maturity'
  when score = 5 then 'Formal governance'
end
where qc.question_id = 'C7'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C8 (multi-select)
update public.question_choices qc
set reasoning = case
  when score in (1,2) then 'Multiple adoption obstacles'
  when score in (3,4) then 'Some specific challenges'
  when score = 5 then 'Minimal adoption obstacles'
end
where qc.question_id = 'C8'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C9
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Active resistance → low engagement'
  when score = 2 then 'Hesitant but not opposed'
  when score = 3 then 'Willing to learn'
  when score = 4 then 'Actively exploring'
  when score = 5 then 'Leading pilots → high engagement'
end
where qc.question_id = 'C9'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C10
update public.question_choices qc
set reasoning = case
  when score = 1 then 'No collaboration → siloed work'
  when score = 2 then 'Sporadic collaboration'
  when score = 3 then 'Scheduled but infrequent'
  when score = 4 then 'Project-based squads'
  when score = 5 then 'Collaboration is the norm'
end
where qc.question_id = 'C10'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Adoption C11
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Experimentation discouraged'
  when score = 2 then 'Minimal comfort'
  when score = 3 then 'Mixed comfort'
  when score = 4 then 'Strong comfort culture'
  when score = 5 then 'Best-in-class safety culture'
end
where qc.question_id = 'C11'
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Governance G1..G10
update public.question_choices qc set reasoning = case
  when score = 1 then 'No bias controls → fails upcoming regulations'
  when score = 2 then 'Only reactive → immature'
  when score = 3 then 'Basic pre-deployment tests → moderate maturity'
  when score = 4 then 'Structured processes → high maturity'
  when score = 5 then 'Full compliance with EU AI Act → best practice'
end where qc.question_id = 'G1' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'Zero transparency → no trust'
  when score = 2 then 'Limited coverage → risky'
  when score = 3 then 'Structured logging → moderate maturity'
  when score = 4 then 'Broad explainability → high maturity'
  when score = 5 then 'Comprehensive audit readiness → best practice'
end where qc.question_id = 'G2' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'No transparency → erodes trust'
  when score = 2 then 'Minimal transparency'
  when score = 3 then 'Provides basic documentation'
  when score = 4 then 'On-demand transparency'
  when score = 5 then 'Proactive transparency → highest maturity'
end where qc.question_id = 'G3' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'No plan → high risk'
  when score = 2 then 'Generic not AI-specific'
  when score = 3 then 'Manual recovery → moderate maturity'
  when score = 4 then 'Automated recovery → high maturity'
  when score = 5 then 'Full playbook → best practice'
end where qc.question_id = 'G4' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'No oversight → high risk'
  when score = 2 then 'Human review → minimal oversight'
  when score = 3 then 'Random checks → moderate maturity'
  when score = 4 then 'Continuous human oversight → high maturity'
  when score = 5 then 'Auto-escalation of high-risk outputs → best practice'
end where qc.question_id = 'G5' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'Only baseline → limited protection'
  when score = 2 then 'Beyond baseline → moderate maturity'
  when score = 3 then 'Advanced techniques → high maturity'
  when score = 4 then 'Proactive design → stronger governance'
  when score = 5 then 'Continuous compliance → best practice'
end where qc.question_id = 'G6' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'No audits → non-compliance risk'
  when score = 2 then 'Audit planned → initial maturity'
  when score = 3 then 'Audit ongoing → moderate maturity'
  when score = 4 then 'Completed one audit → high maturity'
  when score = 5 then 'Continuous audits → best practice'
end where qc.question_id = 'G7' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'No awareness → no risk register'
  when score = 2 then 'Knowledge without action → limited maturity'
  when score = 3 then 'Partial mapping → moderate maturity'
  when score = 4 then 'Risk register done → high maturity'
  when score = 5 then 'Leadership reporting → best practice'
end where qc.question_id = 'G8' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'No fairness tests → high risk'
  when score = 2 then 'Reactive testing → low maturity'
  when score = 3 then 'Proactive testing → moderate maturity'
  when score = 4 then 'Regular reviews → high maturity'
  when score = 5 then 'Continuous monitoring → best practice'
end where qc.question_id = 'G9' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

update public.question_choices qc set reasoning = case
  when score = 1 then 'No ethics committee → low maturity'
  when score = 2 then 'Informal reviews → limited governance'
  when score = 3 then 'Project-based only → moderate maturity'
  when score = 4 then 'Regular governance → high maturity'
  when score = 5 then 'Independent experts → best practice'
end where qc.question_id = 'G10' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Vision & Risk Appetite P1
update public.question_choices qc
set reasoning = case
  when score = 5 then 'Aggressive timeline indicates high ambition'
  when score = 4 then 'Moderately ambitious'
  when score = 3 then 'Longer timeframe; moderate ambition'
  when score = 2 then 'Slow adoption signals cautiousness'
end
where qc.question_id = 'P1' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- P2
update public.question_choices qc
set reasoning = case
  when score = 2 then 'Conservative → low risk appetite'
  when score = 3 then 'Some willingness to experiment'
  when score = 4 then 'Mix of experiment and control'
  when score = 5 then 'High risk appetite → aggressive experimentation'
end
where qc.question_id = 'P2' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- P3 (multi-select)
update public.question_choices qc
set reasoning = case
  when score in (1,2,3) then 'Limited success measurement'
  when score in (4,5) then 'Comprehensive success measurement'
end
where qc.question_id = 'P3' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- P4
update public.question_choices qc
set reasoning = case
  when score = 5 then 'In-house → high capability and commitment'
  when score = 4 then 'Balanced internal/external mix'
  when score = 2 then 'Outsourcing → limited internal expertise'
end
where qc.question_id = 'P4' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- P5 (multi-select)
update public.question_choices qc
set reasoning = case
  when score in (1,2) then 'Legacy architecture preferences'
  when score in (3,4) then 'Balanced architecture approach'
  when score = 5 then 'Advanced architecture maturity'
end
where qc.question_id = 'P5' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- P6 (label-aware)
update public.question_choices qc
set reasoning = 'No external help → growth constrained'
where qc.question_id = 'P6' and (qc.label = 'None' or qc.value = 'None')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');
update public.question_choices qc
set reasoning = 'Ad-hoc guidance only'
where qc.question_id = 'P6' and (qc.label = 'Occasional consulting' or qc.value = 'Occasional consulting')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');
update public.question_choices qc
set reasoning = 'Regular guidance'
where qc.question_id = 'P6' and (qc.label = 'Ongoing advisory' or qc.value = 'Ongoing advisory')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');
update public.question_choices qc
set reasoning = 'Outsourced management → higher maturity'
where qc.question_id = 'P6' and (qc.label = 'Managed services' or qc.value = 'Managed services')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');
update public.question_choices qc
set reasoning = 'Dependency indicates lower internal capacity'
where qc.question_id = 'P6' and (qc.label = 'Full outsourcing' or qc.value = 'Full outsourcing')
  and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- P7
update public.question_choices qc
set reasoning = case
  when score = 1 then 'Prefers status quo → low transformation impact'
  when score = 2 then 'Small adjustments only'
  when score = 3 then 'Moderate level of change'
  when score = 4 then 'Significant change across processes'
  when score = 5 then 'Continuous adaptation → highest maturity'
end
where qc.question_id = 'P7' and (qc.reasoning is null or trim(qc.reasoning) = '' or qc.reasoning like 'qid=%');

-- Cleanup
drop table if exists tmp_reasoning_placeholders;

commit;