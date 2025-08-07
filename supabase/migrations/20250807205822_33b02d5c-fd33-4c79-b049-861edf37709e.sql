begin;

-- Safeguard list of previously set generic placeholders we can overwrite with specific contexts
create temporary table tmp_generic_ctx(txt text);
insert into tmp_generic_ctx(txt) values
  ('AI success metrics coverage. Number and breadth of metrics indicate measurement maturity.'),
  ('Training priorities mapping. Ranked choices reveal current skill focus.'),
  ('Adoption barrier profile. Selected barriers indicate obstacles to AI adoption.'),
  ('Architecture preference profile. Indicates orientation across traditional, hybrid, and cloud-native approaches.'),
  ('Training format breadth. Multiple formats improve accessibility and engagement.'),
  ('Psychological safety climate. Comfort with experimentation drives innovation.'),
  ('Employee training investment band. Budget indicates organizational commitment to AI skills.'),
  ('External support maturity. Level of external expert involvement.'),
  ('Deployment maturity. Automation and reliability of model deployment processes.'),
  ('AI agent deployment stage across the organization.');

-- Helper condition reused
-- (qc.model_input_context is null/blank or a placeholder we previously set)
-- Note: trim handles strings of only spaces

-- 1) Generic, question-level contexts for multi-select or rank/count-based questions
update public.question_choices qc
set model_input_context = 'Strategic priority mapping. Reveals organizational focus areas through ranked objectives.'
where qc.question_id = 'S7'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Cross-functional engagement breadth. Number of departments indicates organizational AI integration maturity.'
where qc.question_id = 'S9'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Regulatory coverage breadth. Number of frameworks indicates compliance maturity.'
where qc.question_id = 'F5'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Data integration breadth. Number of source types indicates data ecosystem complexity and integration maturity.'
where qc.question_id = 'D1'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Security control coverage. Number of implemented controls indicates data security maturity and risk management.'
where qc.question_id = 'D5'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Tool ecosystem breadth. Number of tool categories indicates technological sophistication and integration capability.'
where qc.question_id = 'T0'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Automation tool adoption. Number of low-code tools indicates automation maturity and operational efficiency.'
where qc.question_id = 'T8'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Agent use case breadth. Number of use cases indicates scope and maturity of agent adoption.'
where qc.question_id = 'A4'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Barrier profile. Number and severity of barriers indicate automation readiness.'
where qc.question_id = 'A7'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Interface breadth. Number of interfaces indicates agent accessibility and adoption potential.'
where qc.question_id = 'A8'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'AI success metrics coverage. Number and breadth of metrics indicate measurement maturity.'
where qc.question_id = 'P3'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Training priorities mapping. Ranked choices reveal current skill focus.'
where qc.question_id = 'C3a'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Training format breadth. Multiple formats improve accessibility and engagement.'
where qc.question_id = 'C6'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

-- 2) Per-question, per-score mappings for single-choice questions
-- Strategy S1
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Pre-exploration stage. No documented AI opportunities. Lacks structured evaluation process.'
  when score = 2 then 'Early ideation stage. Has informal AI discussions but no formal documentation.'
  when score = 3 then 'Initial documentation stage. Has moved from ideas to formal use-case documentation.'
  when score = 4 then 'Structured planning stage. Has systematic approach with clear accountability.'
  when score = 5 then 'Portfolio management stage. Treats AI as strategic capability with formal project management.'
end
where qc.question_id = 'S1'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%'
    or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

-- S2 has two distinct labels with score=5. Handle label-specific first, then fill the rest by score.
update public.question_choices qc
set model_input_context = 'Financial discipline. Requires quantitative business cases.'
where qc.question_id = 'S2' and (qc.label = 'ROI-driven financial model' or qc.value = 'ROI-driven financial model')
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = 'Advanced methodology. Integrates multiple decision factors including risk assessment.'
where qc.question_id = 'S2' and (qc.label = 'Risk-adjusted prioritisation' or qc.value = 'Risk-adjusted prioritisation')
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Ad-hoc selection. Project choices driven by individual preferences. No systematic evaluation framework.'
  when score = 2 then 'Intuitive prioritization. Uses business judgment but lacks structured criteria.'
  when score = 3 then 'Basic framework adoption. Uses standard 2x2 prioritization matrix.'
  when score = 4 then 'Resource-aware planning. Considers team capacity and realistic delivery constraints.'
  when score = 5 then coalesce(model_input_context, 'Advanced methodology. Integrates multiple decision factors including risk assessment.')
end
where qc.question_id = 'S2'
  and (
    qc.model_input_context is null or trim(qc.model_input_context) = ''
    or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
  );

-- S3
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No measurement framework. Launches AI initiatives without defined success criteria.'
  when score = 2 then 'Measurement design without execution. Has created metrics but lacks monitoring systems.'
  when score = 3 then 'Isolated measurement. Monitors AI performance but disconnected from broader business objectives.'
  when score = 4 then 'Functional integration. AI metrics connected to some department goals.'
  when score = 5 then 'Strategic integration. AI performance directly tied to top-level organizational objectives.'
end
where qc.question_id = 'S3' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- S4
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No financial analysis. Makes AI investments without return calculations.'
  when score = 2 then 'Informal financial planning. Uses historical experience and intuition for cost-benefit estimates.'
  when score = 3 then 'Basic financial discipline. Compares costs against expected benefits using structured approach.'
  when score = 4 then 'Performance-linked ROI. Connects financial returns to specific measurable outcomes.'
  when score = 5 then 'Advanced financial modeling. Uses sophisticated analysis including risk factors and scenarios.'
end
where qc.question_id = 'S4' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- S5
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Long-term delivery approach. Plans major transformations or complex implementations.'
  when score = 2 then 'Standard enterprise timeline. Follows conventional project delivery schedules.'
  when score = 3 then 'Moderate delivery expectations. Balanced timeline showing practical scope management.'
  when score = 4 then 'Rapid delivery capability. Fast execution through simple use cases or existing platforms.'
  when score = 5 then 'Ultra-fast implementation. Very agile organization or leveraging plug-and-play solutions.'
end
where qc.question_id = 'S5' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- S6
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No external awareness. Operates without industry intelligence or competitive benchmarking.'
  when score = 2 then 'Sporadic intelligence gathering. Conducts irregular research without systematic approach.'
  when score = 3 then 'Periodic benchmarking. Has structured but infrequent review cycle.'
  when score = 4 then 'Regular market intelligence. Maintains consistent monitoring with structured reporting.'
  when score = 5 then 'Real-time market intelligence. Has automated monitoring systems and continuous awareness.'
end
where qc.question_id = 'S6' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- S8
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No executive engagement. Leadership operates without AI strategy or awareness.'
  when score = 2 then 'Minimal executive awareness. Leadership has informal interest but no systematic engagement.'
  when score = 3 then 'Executive interest without commitment. Leadership understands importance but has not allocated resources.'
  when score = 4 then 'Financial commitment. Leadership has moved from interest to resource allocation.'
  when score = 5 then 'Executive championship. Leadership actively drives AI strategy and removes barriers.'
end
where qc.question_id = 'S8' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- S10
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No change management. Organization operates without AI adoption framework or preparation processes.'
  when score = 2 then 'Informal change management. Occasional preparation activities but no systematic approach.'
  when score = 3 then 'Selective change management. Structured preparation for specific initiatives only.'
  when score = 4 then 'Systematic change management. Enterprise-wide framework for AI adoption.'
  when score = 5 then 'Adaptive change culture. Continuously evolves AI adoption practices with learning-based improvement.'
end
where qc.question_id = 'S10' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- S11
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No goal definition. Operates AI initiatives without clear objectives or success criteria.'
  when score = 2 then 'Goal definition without measurement. Objectives articulated but no quantitative success criteria.'
  when score = 3 then 'Partial measurement framework. Quantitative tracking for subset of AI objectives.'
  when score = 4 then 'Comprehensive measurement. Quantitative tracking for majority of AI objectives.'
  when score = 5 then 'Complete measurement framework. Quantitative success criteria and thresholds for all AI objectives.'
end
where qc.question_id = 'S11' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- S12
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Highly controlled deployment. Restricts AI to proof-of-concept stage with extensive governance.'
  when score = 2 then 'Limited pilot deployment. Small-scale tests with restricted access and controlled environments.'
  when score = 3 then 'Individual deployment review. Each AI implementation evaluated separately for security and compliance.'
  when score = 4 then 'Governed agile deployment. Rapid iteration with integrated oversight and control frameworks.'
  when score = 5 then 'Production-ready agility. Rapid deployment with production-grade risk management and compliance.'
end
where qc.question_id = 'S12' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- Financial F1
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Minimal investment stage. Spends under €100 monthly indicating exploratory commitment level.'
  when score = 2 then 'Basic investment stage. Allocates modest budget supporting limited tool usage and experimentation.'
  when score = 3 then 'Moderate investment stage. Budget supports multiple pilot projects and basic tool infrastructure.'
  when score = 4 then 'Significant investment stage. Budget enables multiple concurrent projects and advanced tooling.'
  when score = 5 then 'Strategic investment stage. Budget indicates serious commitment and scaling capability.'
end
where qc.question_id = 'F1' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- F3
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Financial constraint stage. Limited runway indicates immediate funding pressure and project risk.'
  when score = 2 then 'Short-term planning stage. Runway covers immediate initiatives but limits medium-term planning.'
  when score = 3 then 'Stable planning stage. Runway supports complete pilot cycles and iterative development.'
  when score = 4 then 'Strategic planning stage. Extended runway enables scaling decisions and multi-phase initiatives.'
  when score = 5 then 'Long-term commitment stage. Extended runway indicates sustainable AI investment and strategic priority.'
end
where qc.question_id = 'F3' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- F4
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No stakeholder alignment. Board/investors lack AI understanding or commitment to initiatives.'
  when score = 2 then 'Awareness without commitment. Board discusses AI but has not committed resources or priority.'
  when score = 3 then 'Conditional support stage. Board shows interest but requires business case justification.'
  when score = 4 then 'Financial commitment stage. Board has approved AI budget indicating concrete support.'
  when score = 5 then 'Strategic championship stage. Board actively promotes AI initiatives and removes organizational barriers.'
end
where qc.question_id = 'F4' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- F6
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Isolated development stage. Organization operates without external AI partnerships or ecosystem connections.'
  when score = 2 then 'Partnership exploration stage. Engages in preliminary discussions with potential AI partners.'
  when score = 3 then 'Initial partnership stage. Maintains one active AI collaboration or vendor relationship.'
  when score = 4 then 'Multi-partner strategy. Maintains several AI partnerships across vendors and institutions.'
  when score = 5 then 'Strategic ecosystem integration. Collaborates across research institutions and commercial vendors.'
end
where qc.question_id = 'F6' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- F7
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No ethics investment. Allocates no budget for AI ethics or bias mitigation activities.'
  when score = 2 then 'Future ethics planning. Intends to budget for ethics but has not allocated current resources.'
  when score = 3 then 'Basic ethics investment. Allocates minimal percentage of AI budget to ethics activities.'
  when score = 4 then 'Substantial ethics investment. Dedicates meaningful percentage of AI budget to ethics and fairness.'
  when score = 5 then 'Strategic ethics commitment. Prioritizes ethics through significant budget allocation.'
end
where qc.question_id = 'F7' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- F8
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Domestic data strategy. Restricts data flows to avoid cross-border compliance complexity.'
  when score = 2 then 'Case-by-case approach. Handles international transfers through individual contract arrangements.'
  when score = 3 then 'Structured transfer approach. Uses standardized contractual mechanisms for cross-border data flows.'
  when score = 4 then 'Enterprise transfer framework. Maintains comprehensive rules for intra-group international data transfers.'
  when score = 5 then 'Advanced transfer management. Leverages adequacy decisions with continuous compliance monitoring.'
end
where qc.question_id = 'F8' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- Data D2
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Data volume blindness. Organization lacks awareness of total data holdings indicating poor data management.'
  when score = 2 then 'Minimal data environment. Holds limited data volumes constraining AI model development potential.'
  when score = 3 then 'Small data environment. Maintains modest data volumes supporting basic AI applications.'
  when score = 4 then 'Moderate data environment. Holds sufficient data for standard AI model development.'
  when score = 5 then 'Large data environment. Maintains substantial data volumes enabling advanced AI applications.'
end
where qc.question_id = 'D2' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- D3
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Ad-hoc data management. Operates without documented standards or data management processes.'
  when score = 2 then 'Basic data organization. Applies simple conventions but lacks comprehensive management processes.'
  when score = 3 then 'Structured data management. Maintains standards but relies on manual implementation processes.'
  when score = 4 then 'Automated data management. Uses schema tools and automated tracking for data governance.'
  when score = 5 then 'Advanced data management. Maintains comprehensive version control and full data lineage tracking.'
end
where qc.question_id = 'D3' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- D4
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Poor data quality. Outdated or unreliable data affecting AI reliability.'
  when score = 2 then 'Basic quality control. Occasional manual data quality checks with limited coverage.'
  when score = 3 then 'Structured quality management. Scheduled data quality tests with systematic approach.'
  when score = 4 then 'Automated quality monitoring. Automated systems for proactive data quality alerting.'
  when score = 5 then 'Real-time quality assurance. Continuously monitors and validates data quality in real time.'
end
where qc.question_id = 'D4' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- D6
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No data ownership. Lacks designated data stewards resulting in poor data maintenance.'
  when score = 2 then 'Reactive data maintenance. Performs irregular data clean-up activities without systematic approach.'
  when score = 3 then 'Basic data stewardship. Assigns owners who conduct periodic data review activities.'
  when score = 4 then 'Systematic data stewardship. Dedicated stewards with regular maintenance routines.'
  when score = 5 then 'Advanced data stewardship. Continuous data stewardship and monitoring processes.'
end
where qc.question_id = 'D6' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- D7
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No audit preparation. Lacks audit trails or compliance documentation for data processes.'
  when score = 2 then 'Basic audit capability. Maintains simple logs providing minimal traceability.'
  when score = 3 then 'Selective audit readiness. Comprehensive audit trails for critical data systems.'
  when score = 4 then 'Advanced audit capability. Explainability logs and documentation maintained.'
  when score = 5 then 'Automated audit readiness. Uses automated compliance checking across all data processes.'
end
where qc.question_id = 'D7' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- D8
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No data labeling. Lacks labeling processes limiting supervised machine learning capabilities.'
  when score = 2 then 'Manual labeling approach. Labels data manually without standardized processes or guidelines.'
  when score = 3 then 'Structured labeling process. Formal guidelines for consistent data labeling activities.'
  when score = 4 then 'Standardized labeling framework. Consistent taxonomy across datasets and labeling activities.'
  when score = 5 then 'Advanced labeling automation. Automated labeling with sophisticated ontology management.'
end
where qc.question_id = 'D8' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- D9
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No synthetic data capability. Does not use synthetic data limiting modeling options and privacy protection.'
  when score = 2 then 'Synthetic data exploration. Evaluates approaches but has not implemented solutions.'
  when score = 3 then 'Pilot synthetic data usage. Conducts small-scale experiments with synthetic data generation.'
  when score = 4 then 'Production synthetic data. Regularly uses synthetic data in production workflows and modeling.'
  when score = 5 then 'Advanced synthetic data operations. Robust synthetic data pipelines and generation workflows.'
end
where qc.question_id = 'D9' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- D10
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No policy framework. Operates without formal data policies or staff training programs.'
  when score = 2 then 'Basic policy principles. Maintains high-level data principles without detailed guidance.'
  when score = 3 then 'Policy documentation stage. Documents data policies but lacks training or oversight mechanisms.'
  when score = 4 then 'Policy implementation stage. Provides comprehensive training and oversight for policy compliance.'
  when score = 5 then 'Advanced policy management. Audits data policies and continuously improves practices.'
end
where qc.question_id = 'D10' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- Tools T1
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Siloed systems architecture. Tools operate independently without integration.'
  when score = 2 then 'Manual integration approach. Relies on CSV imports/exports creating labor-intensive, error-prone processes.'
  when score = 3 then 'Batch integration approach. Synchronizes systems on scheduled intervals.'
  when score = 4 then 'API-driven integration. Integrates systems through APIs enabling modern, flexible architecture.'
  when score = 5 then 'Real-time integration architecture. Event-driven mesh providing real-time data synchronization.'
end
where qc.question_id = 'T1' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- T2
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Poor system reliability. Weekly failures undermine user trust and stability.'
  when score = 2 then 'Moderate reliability issues. Monthly errors indicate reliability challenges.'
  when score = 3 then 'Good system reliability. Rare problems on quarterly basis indicate stability.'
  when score = 4 then 'High system reliability. Almost never fails.'
  when score = 5 then 'Perfect operational stability. Never experiences failures.'
end
where qc.question_id = 'T2' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- T3
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No integration ownership. Lacks clear accountability for integration maintenance and development.'
  when score = 2 then 'External integration management. Relies on external resources for integration work.'
  when score = 3 then 'Shared integration responsibility. Ops/Product teams handle integration alongside other responsibilities.'
  when score = 4 then 'Internal integration capability. Technical team owns integration development and maintenance.'
  when score = 5 then 'Specialized integration team. Dedicated team for integration architecture and operations.'
end
where qc.question_id = 'T3' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- T4
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'LLM usage prohibited. Bans external large language model usage.'
  when score = 2 then 'LLM exploration stage. Tests LLMs in controlled sandbox environments.'
  when score = 3 then 'LLM pilot implementation. Runs small-scale pilots with LLM integration.'
  when score = 4 then 'Production LLM usage. Uses one large language model API in production.'
  when score = 5 then 'Advanced LLM integration. Multiple external APIs and internal LLM capabilities.'
end
where qc.question_id = 'T4' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- T5
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI compute resources. Lacks computational resources for AI development and deployment.'
  when score = 2 then 'Basic compute access. Relies on free shared resources like Google Colab.'
  when score = 3 then 'Cloud compute usage. Uses on-demand cloud GPU/TPU resources.'
  when score = 4 then 'Dedicated compute budget. Maintains budget for GPU/TPU enabling scaling.'
  when score = 5 then 'Advanced compute infrastructure. Managed AI compute cluster for optimal performance.'
end
where qc.question_id = 'T5' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- T6
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No architecture documentation. Lacks system diagrams or technical documentation.'
  when score = 2 then 'Basic architecture documentation. High-level sketches only.'
  when score = 3 then 'Selective architecture documentation. Critical system components documented.'
  when score = 4 then 'Comprehensive architecture documentation. Detailed diagrams of complete architecture.'
  when score = 5 then 'Automated architecture documentation. Tooling auto-generates and maintains docs.'
end
where qc.question_id = 'T6' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- T7
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No disaster recovery planning. High risk exposure.'
  when score = 2 then 'Basic backup strategy. Backups only, lacks comprehensive failover capabilities.'
  when score = 3 then 'Manual recovery procedures. Manual disaster recovery and failover.'
  when score = 4 then 'Automated recovery systems. Automated failover and disaster recovery.'
  when score = 5 then 'AI-specific recovery planning. Comprehensive recovery playbooks for AI failures.'
end
where qc.question_id = 'T7' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- T9
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No model deployment. Does not deploy AI models to production environments.'
  when score = 2 then 'Manual deployment approach. Deploys models using manual scripts and ad-hoc processes.'
  when score = 3 then 'Automated deployment pipeline. CI/CD pipelines for AI model deployment automation.'
  when score = 4 then 'MLOps platform usage. Reproducibility and monitoring capabilities.'
  when score = 5 then 'Advanced deployment automation. Blue/green deployments with automated rollback.'
end
where qc.question_id = 'T9' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- Automation A1 (label-based categories)
update public.question_choices qc
set model_input_context = 'Basic automation focus. Organization targets only simple low-value processes for automation.'
where qc.question_id = 'A1' and (qc.label = 'Simple tasks only' or qc.value = 'Simple tasks only')
  and (qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx));

update public.question_choices qc
set model_input_context = 'Moderate automation scope. Organization balances simple tasks with moderately complex process automation.'
where qc.question_id = 'A1' and (qc.label = 'Mixed simple and moderate tasks' or qc.value = 'Mixed simple and moderate tasks')
  and (qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx));

update public.question_choices qc
set model_input_context = 'Strategic automation approach. Prioritizes complex high-value processes for automation.'
where qc.question_id = 'A1' and (qc.label = 'Strategic and complex processes' or qc.value = 'Strategic and complex processes')
  and (qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx));

-- A2
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No automation implementation. Has not implemented any automation processes or tools.'
  when score = 2 then 'Basic scripting automation. Uses isolated scripts without integrated management or monitoring.'
  when score = 3 then 'Tool-assisted automation. Uses basic automation tools requiring manual oversight and intervention.'
  when score = 4 then 'Integrated automation workflows. End-to-end automation spanning multiple functions.'
  when score = 5 then 'Advanced automation maturity. Continuous automation with comprehensive monitoring or fully autonomous processes.'
end
where qc.question_id = 'A2' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- A3
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI agent implementation. Does not use AI agents in any capacity.'
  when score = 2 then 'AI agent prototyping. Built prototypes but not deployed to production.'
  when score = 3 then 'Single production agent. Operates one AI agent in live production.'
  when score = 4 then 'Multiple agent deployment. Several AI agents across different functions.'
  when score = 5 then 'Enterprise agent deployment. Agents deployed broadly across teams and departments.'
end
where qc.question_id = 'A3' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- A6
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No agent monitoring. Does not monitor AI agent performance creating operational risk.'
  when score = 2 then 'Manual agent oversight. Ad-hoc manual checks of agent outputs and performance.'
  when score = 3 then 'Dashboard-based monitoring. Tracks agent performance through KPI dashboards.'
  when score = 4 then 'Automated agent monitoring. Automated alerts for agent anomalies and performance issues.'
  when score = 5 then 'Complete agent observability. Comprehensive logging and monitoring of all agent activities.'
end
where qc.question_id = 'A6' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- A9
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No agent review process. Lacks review procedures creating compliance risk.'
  when score = 2 then 'Minimal agent oversight. Random spot checks provide limited governance.'
  when score = 3 then 'Structured agent review. Formal periodic review processes for agent performance.'
  when score = 4 then 'Comprehensive agent oversight. Logs with continuous management oversight.'
  when score = 5 then 'Automated agent auditing. Continuous automated auditing of agent decisions and outputs.'
end
where qc.question_id = 'A9' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- A10
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No agent recovery planning. Lacks rollback procedures for agent failures creating operational risk.'
  when score = 2 then 'Manual agent recovery. Manual rollback procedures for agent failure scenarios.'
  when score = 3 then 'Structured agent recovery. Documented failover procedures for agent failures.'
  when score = 4 then 'Automated agent recovery. Implements automated rollback capabilities.'
  when score = 5 then 'Self-healing agent systems. Self-healing loops enabling automatic recovery from failures.'
end
where qc.question_id = 'A10' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- A11
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No agent accuracy tracking. Does not monitor accuracy of AI agent outputs or decisions.'
  when score = 2 then 'Manual accuracy assessment. Manually samples outputs for occasional evaluation.'
  when score = 3 then 'Pre-deployment accuracy testing. Tests accuracy before each release or deployment.'
  when score = 4 then 'Ongoing accuracy monitoring. Continuously tests and spot-checks outputs.'
  when score = 5 then 'Real-time accuracy monitoring. Monitors agent accuracy continuously in real-time.'
end
where qc.question_id = 'A11' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- Adoption & Engagement C1
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI tool usage. Employees have no exposure to AI tools.'
  when score = 2 then 'Minimal AI tool usage. Employees rarely use AI tools.'
  when score = 3 then 'Occasional AI tool usage. Employees use AI tools monthly.'
  when score = 4 then 'Regular AI tool usage. Employees use AI tools weekly.'
  when score = 5 then 'Daily AI tool usage. Strong adoption and integration.'
end
where qc.question_id = 'C1' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- C3
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI knowledge sharing. Lacks channels for sharing AI learnings and best practices.'
  when score = 2 then 'Informal AI knowledge sharing. Unstructured informal channels.'
  when score = 3 then 'Structured AI knowledge sharing. Dedicated channels for AI topics and discussions.'
  when score = 4 then 'Formal AI knowledge sharing. Regular workshops and training events.'
  when score = 5 then 'Advanced AI knowledge sharing. Active community of practice for sustained engagement.'
end
where qc.question_id = 'C3' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- C4
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No training investment. Zero budget for employee AI training and development.'
  when score = 2 then 'Minimal training investment. Under €200 per employee annually.'
  when score = 3 then 'Modest training investment. €200–500 per employee for AI skills.'
  when score = 4 then 'Significant training investment. €500–1 000 per employee annually.'
  when score = 5 then 'Strategic training investment. Over €1 000 per employee demonstrating strong commitment.'
end
where qc.question_id = 'C4' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- C5
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No training time allocation. No dedicated hours for AI training and development.'
  when score = 2 then 'Minimal training time. Less than 1 hour per employee annually.'
  when score = 3 then 'Moderate training time. 1–3 hours per employee annually.'
  when score = 4 then 'Substantial training time. 3–5 hours per employee annually.'
  when score = 5 then 'Extensive training time. Over 5 hours per employee annually.'
end
where qc.question_id = 'C5' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- C7 (External support)
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No external AI support. Operates without external AI expertise or advisory support.'
  when score = 2 then 'Minimal external support. Occasional consultation with AI experts.'
  when score = 3 then 'Regular external support. Ongoing advisory relationships with AI experts.'
  when score = 4 then 'Network-based support. Access to broad network of AI experts and advisors.'
  when score = 5 then 'Formal external governance. Dedicated AI advisory board with external experts.'
end
where qc.question_id = 'C7' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- C8 (multi-select count based) already set above as generic in A7 block? We also handle specific adoption barriers generically:
update public.question_choices qc
set model_input_context = 'Adoption barrier profile. Selected barriers indicate obstacles to AI adoption.'
where qc.question_id = 'C8'
  and (qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx));

-- C9
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'AI resistance. Staff actively resist AI initiatives.'
  when score = 2 then 'AI caution. Employees show hesitation about AI but are not actively opposed.'
  when score = 3 then 'AI interest. Employees willing to learn about AI and participate in initiatives.'
  when score = 4 then 'AI proactivity. Employees actively explore AI applications and experiment.'
  when score = 5 then 'AI leadership. Staff lead AI pilot projects demonstrating strong engagement and innovation.'
end
where qc.question_id = 'C9' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- C10
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI collaboration. Teams never collaborate on AI initiatives creating siloed approach.'
  when score = 2 then 'Minimal AI collaboration. Occasional collaboration without systematic approach.'
  when score = 3 then 'Periodic AI collaboration. Regular but infrequent interaction.'
  when score = 4 then 'Project-based AI collaboration. Dedicated squads for AI projects.'
  when score = 5 then 'Embedded AI collaboration. Cross-functional collaboration is standard practice.'
end
where qc.question_id = 'C10' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- C11
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No psychological safety. Employees fear repercussions limiting AI experimentation and learning.'
  when score = 2 then 'Low psychological safety. Employees rarely feel comfortable experimenting with AI or sharing failures.'
  when score = 3 then 'Moderate psychological safety. Staff sometimes feel safe experimenting depending on context.'
  when score = 4 then 'High psychological safety. Employees often feel safe experimenting and sharing learnings.'
  when score = 5 then 'Complete psychological safety. Organization fully encourages experimentation and learning from failures.'
end
where qc.question_id = 'C11' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- Governance G1..G10
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No risk management. Does not manage AI risks or biases creating compliance vulnerability.'
  when score = 2 then 'Reactive risk management. Addresses AI bias issues only after they occur.'
  when score = 3 then 'Proactive risk management. Runs bias tests before deploying AI models.'
  when score = 4 then 'Systematic risk management. Maintains formal frameworks for AI bias management.'
  when score = 5 then 'Comprehensive risk management. Meets EU AI Act requirements for risk management.'
end
where qc.question_id = 'G1' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI explainability. No logs or explanations for AI model decisions.'
  when score = 2 then 'Selective AI explainability. Explains only high-risk models leaving coverage gaps.'
  when score = 3 then 'Basic AI explainability. Structured logs for AI model scripts and decisions.'
  when score = 4 then 'Comprehensive AI explainability. Explanations for all AI models and decisions.'
  when score = 5 then 'Advanced AI explainability. Audit-ready documentation for all AI systems.'
end
where qc.question_id = 'G2' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI transparency. Does not communicate AI usage to users or stakeholders.'
  when score = 2 then 'Minimal AI transparency. Mentions AI only in policy documents without user communication.'
  when score = 3 then 'Basic AI transparency. Publishes guides and FAQs about AI usage and decisions.'
  when score = 4 then 'Interactive AI transparency. Explain buttons to understand AI decisions.'
  when score = 5 then 'Comprehensive AI transparency. Proactively shares dashboards and alerts about AI usage.'
end
where qc.question_id = 'G3' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI incident response. Lacks response plans for AI failures creating operational risk.'
  when score = 2 then 'Generic incident response. Uses general IT incident plans without AI-specific procedures.'
  when score = 3 then 'Manual AI incident response. Human-driven recovery for AI incidents.'
  when score = 4 then 'Automated AI incident response. Implements automated rollback for AI system failures.'
  when score = 5 then 'Comprehensive AI incident response. Detailed playbooks for AI incident management.'
end
where qc.question_id = 'G4' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No human oversight. AI systems operate without human review creating accountability gaps.'
  when score = 2 then 'Minimal human oversight. Humans review AI outputs before deployment with limited monitoring.'
  when score = 3 then 'Selective human oversight. Random audits of AI outputs and decisions.'
  when score = 4 then 'Integrated human oversight. Humans embedded in AI workflows for continuous oversight.'
  when score = 5 then 'Automated human oversight. AI systems automatically escalate high-risk outputs to human experts.'
end
where qc.question_id = 'G5' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Minimal privacy protection. Meets only basic legal privacy requirements for AI systems.'
  when score = 2 then 'Basic privacy enhancement. Implements controls beyond minimum legal requirements.'
  when score = 3 then 'Advanced privacy protection. Uses PETs like differential privacy.'
  when score = 4 then 'Proactive privacy design. Embeds privacy considerations in design phases.'
  when score = 5 then 'Automated privacy compliance. Integrates privacy checks into CI/CD pipelines.'
end
where qc.question_id = 'G6' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI auditing. Does not conduct audits of AI systems creating compliance risk.'
  when score = 2 then 'Planned AI auditing. Scheduled future AI audits not yet conducted.'
  when score = 3 then 'Active AI auditing. Currently conducts AI system audits and assessments.'
  when score = 4 then 'Completed AI auditing. Finished comprehensive AI system audits.'
  when score = 5 then 'Continuous AI auditing. Regular ongoing audit cycles.'
end
where qc.question_id = 'G7' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI risk awareness. Has not reviewed AI risk requirements or obligations.'
  when score = 2 then 'AI risk awareness without action. Knows obligations but has not mapped specific risks.'
  when score = 3 then 'Active AI risk mapping. Compiles comprehensive AI risk register.'
  when score = 4 then 'Completed AI risk mapping. Finished comprehensive AI risk assessment.'
  when score = 5 then 'Strategic AI risk reporting. Reports AI risk findings to executive leadership.'
end
where qc.question_id = 'G8' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI fairness testing. Does not test AI systems for bias or fairness.'
  when score = 2 then 'Reactive AI fairness testing. Tests fairness only after incidents or complaints.'
  when score = 3 then 'Proactive AI fairness testing. Tests fairness before deploying AI systems.'
  when score = 4 then 'Regular AI fairness testing. Scheduled quarterly fairness reviews.'
  when score = 5 then 'Continuous AI fairness monitoring. Automatically monitors fairness in real-time.'
end
where qc.question_id = 'G9' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No AI ethics oversight. Lacks any formal AI ethics oversight body.'
  when score = 2 then 'Informal AI ethics oversight. Occasional external advisor consultation.'
  when score = 3 then 'Project-based AI ethics review. Ethics reviews for specific projects.'
  when score = 4 then 'Regular AI ethics oversight. Scheduled ethics committee meetings.'
  when score = 5 then 'Independent AI ethics oversight. Includes external experts in oversight body.'
end
where qc.question_id = 'G10' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- Vision & Risk Appetite P1
update public.question_choices qc
set model_input_context = case
  when score = 5 then 'Aggressive AI timeline. Plans rapid AI implementation within three months.'
  when score = 4 then 'Moderate AI timeline. Plans AI adoption over 3–6 months.'
  when score = 3 then 'Standard AI timeline. Plans AI implementation over 6–12 months.'
  when score = 2 then 'Conservative AI timeline. Plans AI adoption over extended 12+ month period.'
end
where qc.question_id = 'P1' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- P2
update public.question_choices qc
set model_input_context = case
  when score = 2 then 'Conservative AI approach. Prefers pilots and extensive testing before scaling.'
  when score = 3 then 'Cautious AI approach. Willingness for small AI experiments with oversight.'
  when score = 4 then 'Balanced AI approach. Balances experimentation with governance and control.'
  when score = 5 then 'Bold AI approach. Ready for large AI experiments with appropriate safeguards.'
end
where qc.question_id = 'P2' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- P4
update public.question_choices qc
set model_input_context = case
  when score = 5 then 'Internal AI development. Builds AI solutions using internal capabilities and resources.'
  when score = 4 then 'Hybrid AI development. Combines internal development with external partnerships.'
  when score = 2 then 'External AI development. Outsources AI development to external providers.'
end
where qc.question_id = 'P4' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- P6 has duplicate score=2 with different labels. Handle labels specifically.
update public.question_choices qc
set model_input_context = 'Minimal external AI support. Uses consultants occasionally for specific guidance.'
where qc.question_id = 'P6' and (qc.label = 'Occasional consulting' or qc.value = 'Occasional consulting')
  and (qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx));

update public.question_choices qc
set model_input_context = 'Complete AI outsourcing. Outsources all AI operations and development.'
where qc.question_id = 'P6' and (qc.label = 'Full outsourcing' or qc.value = 'Full outsourcing')
  and (qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx));

update public.question_choices qc
set model_input_context = case
  when score = 1 then 'No external AI support. Plans completely self-service AI implementation.'
  when score = 3 then 'Regular external AI support. Maintains ongoing advisory relationships.'
  when score = 4 then 'Managed AI services. Uses external providers for AI operations management.'
end
where qc.question_id = 'P6' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- P7
update public.question_choices qc
set model_input_context = case
  when score = 1 then 'Minimal AI change impact. Expects minimal organizational changes.'
  when score = 2 then 'Minor AI change impact. Expects small operational adjustments.'
  when score = 3 then 'Moderate AI change impact. Expects moderate transformation from AI implementation.'
  when score = 4 then 'Major AI change impact. Anticipates significant AI-driven transformation.'
  when score = 5 then 'Continuous AI evolution. Plans ongoing adaptation and evolution with AI.'
end
where qc.question_id = 'P7' and (
  qc.model_input_context is null or trim(qc.model_input_context) = '' or qc.model_input_context like 'qid=%' or qc.model_input_context in (select txt from tmp_generic_ctx)
);

-- Clean up temp table
drop table if exists tmp_generic_ctx;

commit;