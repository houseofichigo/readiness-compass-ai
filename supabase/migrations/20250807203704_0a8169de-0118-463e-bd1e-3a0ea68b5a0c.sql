-- Integrate curated reasoning texts for choices (phase: Reasoning only)
-- Strategy:
-- 1) Specific per-option mappings by question_id + label (normalized)
-- 2) Generic per-question reasoning applied to all choices for some questions
-- 3) Do not alter scores; only overwrite previous template reasonings

begin;

-- Helper CTE: curated per-option mappings
with mappings as (
  select * from (
    values
      -- S1 – Number of use cases identified
      ('S1','None','No use-cases = ad-hoc maturity'),
      ('S1','Ideas listed only','Brainstormed but not formalised'),
      ('S1','1-2 documented use cases','A few pilots = exploratory'),
      ('S1','3-5 prioritised with owners','Prioritised projects with owners = defined roadmap'),
      ('S1','6+ with owners and timelines','Portfolio with owners & timelines = integrated strategy'),

      -- S2 – Project prioritisation method
      ('S2','No formal process','No process = ad-hoc'),
      ('S2','Ad hoc based on perceived value','Some value thought but informal'),
      ('S2','Impact × effort matrix','Simple impact–effort scoring'),
      ('S2','Impact x effort + capacity weighting','Adds resource awareness'),
      ('S2','ROI-driven financial model','Quantitative ROI = mature planning'),
      ('S2','Risk-adjusted prioritisation','Weighs risk + return = best practice'),

      -- S3 – AI KPIs/OKRs defined
      ('S3','None','No KPIs = no alignment to goals'),
      ('S3','KPIs drafted but not tracked','Metrics exist but aren\'t measured'),
      ('S3','KPIs tracked but not linked to corporate OKRs','Monitored but isolated'),
      ('S3','Partially aligned with departmental OKRs','Some functional linkage'),
      ('S3','Fully embedded in executive OKRs','Executive-level integration = highest maturity'),

      -- S4 – ROI estimation
      ('S4','Don\'t estimate','No ROI modelling = immature'),
      ('S4','Rough experience-based estimates','Informal estimates = low rigour'),
      ('S4','Simple cost–benefit analysis','Basic structured analysis'),
      ('S4','Linked ROI to clear KPIs and goals','ROI tied to performance metrics'),
      ('S4','Detailed financial or risk-adjusted models','Advanced modelling = best practice'),

      -- S5 – Time to impact
      ('S5','Over 12 months','Slow impact = slow execution'),
      ('S5','6–12 months','Moderate timeframe'),
      ('S5','3–6 months','Standard pilot timeframe'),
      ('S5','1–3 months','Rapid for pilots/plug-and-play'),
      ('S5','Under 30 days','Very agile; off-the-shelf'),

      -- S6 – Competitive/industry monitoring
      ('S6','Not tracked','No trend monitoring = low awareness'),
      ('S6','Occasional ad hoc research','Sporadic benchmarking'),
      ('S6','Annual review','Scheduled but infrequent'),
      ('S6','Quarterly reporting','Regular updates'),
      ('S6','Continuous dashboard or feed','Real-time monitoring = high awareness'),

      -- S8 – Executive alignment
      ('S8','No alignment','No exec support = low maturity'),
      ('S8','Occasional discussions','Minimal exec engagement'),
      ('S8','Executive interest without action','Interest but no budget'),
      ('S8','Budget approved','Financial commitment'),
      ('S8','Active executive sponsorship','Exec champions = highest maturity'),

      -- S10 – Organisational readiness
      ('S10','Not prepared','No readiness framework'),
      ('S10','Ad hoc readiness','Unstructured readiness'),
      ('S10','Formal process for some projects','Partial readiness'),
      ('S10','Organisation-wide framework','Standardised readiness'),
      ('S10','Continuous improvement culture','Proactive culture'),

      -- S11 – Goal clarity & metrics
      ('S11','No clear goals','No metrics = no direction'),
      ('S11','Goals defined with no metrics','Goals exist but unmeasured'),
      ('S11','Some metrics tracked','Partial measurement'),
      ('S11','Most goals with metrics','Broad measurement'),
      ('S11','All goals have metrics & thresholds','Full measurement'),

      -- S12 – Deployment approach
      ('S12','POC only with strict compliance checks','Controlled POCs only = very cautious'),
      ('S12','Small pilots with controlled access','Limited pilots'),
      ('S12','Case-by-case security review','Individual security reviews'),
      ('S12','Agile testing with integrated oversight','Governed fast iterations'),
      ('S12','Fast iterations with production readiness & risk mgmt','Production-grade agility with risk controls'),

      -- F1 – Monthly AI/analytics budget
      ('F1','< €100','Very low budget → minimal experimentation'),
      ('F1','€100–500','Small budget → basic tool coverage'),
      ('F1','€500–2 000','Moderate budget → supports a few pilots'),
      ('F1','€2 000–15 000','Significant investment → multiple pilots'),
      ('F1','Over €15 000','Substantial investment → scaling potential'),

      -- F3 – Funding runway
      ('F3','Less than 3 months','Short runway → financial fragility'),
      ('F3','3–6 months','Limited runway → risk of interruptions'),
      ('F3','6–12 months','Sufficient for pilot phases'),
      ('F3','12–24 months','Longer runway → supports scaling'),
      ('F3','Over 24 months','Stable long-term funding'),

      -- F4 – Board/investor support
      ('F4','Not supportive','No support → undermines projects'),
      ('F4','Discussion only no commitments','Conversations but no resources'),
      ('F4','Open to AI initiatives','Willingness to explore'),
      ('F4','Budget approved','Financial backing in place'),
      ('F4','Active championing','Executives champion AI → high maturity'),

      -- F6 – Partnerships
      ('F6','None','Isolation limits expertise and resources'),
      ('F6','Exploratory discussions','Early-stage outreach'),
      ('F6','One active partnership','Single collaboration'),
      ('F6','Multiple partnerships','Networked approach'),
      ('F6','Ecosystem collaboration (R&D + vendors)','Deep strategic collaborations'),

      -- F7 – Ethics & bias budget
      ('F7','None','No allocation = compliance risk'),
      ('F7','Planned next fiscal year','Intention to fund ethics later'),
      ('F7','Under 5 % of AI budget','Modest funding supports basic ethics activities'),
      ('F7','5–15 % of AI budget','Dedicated ethics funding acknowledges risk'),
      ('F7','Over 15 % of AI budget','Significant investment → strong ethical commitment'),

      -- F8 – Cross-border data transfers
      ('F8','No cross-border transfers','Avoids complexity but limits data access'),
      ('F8','Ad-hoc contracts','One-off arrangements'),
      ('F8','Standard Contractual Clauses (SCCs)','Approved contractual basis'),
      ('F8','Binding Corporate Rules (BCRs)','Group-wide privacy rules'),
      ('F8','Adequacy decision + continuous monitoring','Highest maturity → automated compliance'),

      -- D2 – Data volume
      ('D2','Don\'t know','No awareness → poor data management'),
      ('D2','< 1 GB','Tiny datasets constrain AI'),
      ('D2','1–10 GB','Limited data may inhibit model training'),
      ('D2','10–100 GB','Moderate volume supports basic models'),
      ('D2','≥ 100 GB','Large datasets enable sophisticated AI'),

      -- D3 – Data management maturity
      ('D3','No standards or visibility','No standards → inconsistent & risky data'),
      ('D3','Basic naming conventions & partial docs','Minimal structure; manual processes'),
      ('D3','Defined standards with manual processes','Standards exist but lack automation'),
      ('D3','Schema tools & automated tracking','Automated lineage → strong governance'),
      ('D3','Version-controlled models & full lineage','End-to-end versioning & governance'),

      -- D4 – Data quality
      ('D4','Low (outdated/unreliable)','Poor quality yields unreliable AI'),
      ('D4','Medium (manual checks)','Some QC but error-prone'),
      ('D4','High (periodic tests)','Regular tests improve trust'),
      ('D4','Very high (automated alerts)','Proactive alerting'),
      ('D4','Excellent (real-time monitoring)','Continuous validation = best practice'),

      -- D6 – Data stewardship
      ('D6','No owner','No steward → neglect'),
      ('D6','Occasional clean-ups','Sporadic maintenance'),
      ('D6','Assigned owner with periodic review','Basic stewardship'),
      ('D6','Dedicated steward with monthly routines','Regular maintenance'),
      ('D6','Continuous stewardship & monitoring','Ongoing oversight'),

      -- D7 – Audit readiness
      ('D7','None','No audit capability → low trust'),
      ('D7','Basic logs only','Minimal traceability'),
      ('D7','Audit trail for critical systems','Key-system traceability'),
      ('D7','Explainability logs + scripts','Explainability built into logs'),
      ('D7','Automated compliance checks','Fully automated audits'),

      -- D8 – Data labelling
      ('D8','None','No labels → hampers supervised learning'),
      ('D8','Ad-hoc manual labelling','Unstructured labels'),
      ('D8','Defined guidelines','Standard guidelines'),
      ('D8','Standard taxonomy across datasets','Unified taxonomy'),
      ('D8','Automated labelling & ontology management','Automated enrichment'),

      -- D9 – Synthetic data usage
      ('D9','No','No synthetic data → limits modelling'),
      ('D9','Exploring options','Considering but not using'),
      ('D9','Limited pilots','Initial experiments'),
      ('D9','Regular production use','Mature usage'),
      ('D9','Extensive synthetic pipelines','Best practice'),

      -- D10 – Data policies & training
      ('D10','No formal policies','No policies → compliance risk'),
      ('D10','High-level principles only','Principles exist but lack detail'),
      ('D10','Documented guidelines (no training/oversight)','Guidelines exist but not enforced'),
      ('D10','Guidelines + training & oversight','Training + oversight fosters adoption'),
      ('D10','Audited & continuously improved','Regular audits & updates = best practice'),

      -- T1 – Integration approach
      ('T1','Siloed – no connections','Disconnected tools → poor scaling'),
      ('T1','Manual – CSV imports/exports','Labour-intensive error-prone'),
      ('T1','Batch – scheduled syncs','Regular but delayed syncs'),
      ('T1','API – platform integrations','Modern architecture'),
      ('T1','Real-time – event-driven mesh','Event-driven real-time mesh = highest maturity'),

      -- T2 – System reliability
      ('T2','Weekly – frequent failures','Frequent failures → low trust'),
      ('T2','Monthly – occasional errors','Some reliability issues'),
      ('T2','Quarterly – rare problems','Fairly stable'),
      ('T2','Almost never – very stable','High reliability'),
      ('T2','Never – fully reliable','No failures → best practice'),

      -- T3 – Integration ownership
      ('T3','No clear owner','No ownership → accountability gaps'),
      ('T3','External agency/freelancer','Outsourced limited internal capacity'),
      ('T3','Ops/Product team','Internal but shared responsibility'),
      ('T3','Internal tech team','Dedicated internal capability'),
      ('T3','Dedicated integration team','Specialised team → high maturity'),

      -- T4 – External LLM usage
      ('T4','Not allowed','Bans LLMs → stifles innovation'),
      ('T4','Exploratory tests only','Sandbox tests'),
      ('T4','Pilot deployments (small projects)','Small-scale pilots'),
      ('T4','One API in production','Single integration'),
      ('T4','Multiple APIs in production + internal LLM access','Broad integration'),

      -- T5 – Compute resources
      ('T5','None','No compute → restricts AI'),
      ('T5','Colab only','Free/shared resources → early stage'),
      ('T5','On-demand cloud GPUs/TPUs','Pay-as-you-go → moderate maturity'),
      ('T5','Dedicated GPU/TPU budget','Budgeted hardware → scaling capability'),
      ('T5','Managed AI compute cluster','Best practice compute cluster'),

      -- T6 – Architecture documentation
      ('T6','None','No diagrams → ad-hoc systems'),
      ('T6','High-level sketches','Rough mapping'),
      ('T6','Critical systems mapped','Key components documented'),
      ('T6','Full architecture diagrams','Comprehensive documentation'),
      ('T6','Auto-generated & maintained docs','Automated up-to-date docs'),

      -- T7 – Disaster recovery plan
      ('T7','No plan','No plan → high risk'),
      ('T7','Backups only','Limited resilience'),
      ('T7','Manual failover','Manual recovery'),
      ('T7','Automated failover','Quick recovery'),
      ('T7','AI-aware recovery playbook','Includes AI failure scenarios → highest maturity'),

      -- T9 – Deployment infrastructure
      ('T9','No deployment – models not in production','No production deployment'),
      ('T9','Manual scripts – ad-hoc launches','Manual processes'),
      ('T9','CI/CD pipeline – automated builds & deploys','Automates builds/deployments'),
      ('T9','MLOps platform with monitoring','Reproducibility & monitoring'),
      ('T9','Fully automated blue/green deployments + rollback','Sophisticated deployment strategy'),

      -- A2 – Automation maturity level
      ('A2','None – no automation','No automation = initial stage'),
      ('A2','1 – ad-hoc scripts only','Scripted but unmanaged automation'),
      ('A2','2 – basic tools with manual oversight','Tools exist but require human checks'),
      ('A2','3 – integrated workflows across functions','Cross-functional workflows'),
      ('A2','4 – continuous automation with monitoring','Fully monitored continuous processes'),
      ('A2','5 – fully autonomous processes','Agents run without human intervention'),

      -- A3 – AI agent deployment
      ('A3','None implemented – no AI agents','No agents → no adoption'),
      ('A3','Prototype built – early proof of concept','Prototype only'),
      ('A3','One agent in production – single live agent','First production agent'),
      ('A3','Multiple agents live – several agents running','Several agents deployed'),
      ('A3','Organisation-wide deployment – agents across teams','Enterprise-wide agent deployment'),

      -- A6 – Monitoring of agents
      ('A6','No monitoring','No visibility → risk'),
      ('A6','Manual checks','Reactive monitoring'),
      ('A6','KPI dashboards','Basic observability'),
      ('A6','Automated alerts','Proactive management'),
      ('A6','Full observability & logging','Comprehensive monitoring'),

      -- A9 – Review process for agents
      ('A9','None','No reviews → unchecked risks'),
      ('A9','Ad-hoc spot checks','Random reviews → limited oversight'),
      ('A9','Formal review process','Structured but periodic'),
      ('A9','Logging with oversight','Continuous audit capability'),
      ('A9','Continuous auditing','Automated continuous compliance'),

      -- A10 – Rollback & recovery
      ('A10','No plan','No fallback → high risk'),
      ('A10','Manual rollback steps','Reactive recovery'),
      ('A10','Pre-defined failover procedures','Documented plans'),
      ('A10','Automated rollback','Rapid recovery'),
      ('A10','Self-healing loops','Agents self-recover → best practice'),

      -- A11 – Accuracy monitoring
      ('A11','No tracking','No accuracy metrics'),
      ('A11','Manual spot checks','Occasional checks → low confidence'),
      ('A11','Release testing','Pre-deployment QA'),
      ('A11','Ongoing tests + spot checks','Continuous QA'),
      ('A11','Continuous accuracy monitoring','Real-time quality assurance'),

      -- C1 – Frequency of AI tool usage
      ('C1','Never','No exposure → no adoption'),
      ('C1','Rarely','Minimal exposure'),
      ('C1','Monthly','Occasional use'),
      ('C1','Weekly','Regular use builds familiarity'),
      ('C1','Daily','Frequent use → strong adoption'),

      -- C2 – Prompt confidence (matrix)
      ('C2','No confidence','No skill → low maturity'),
      ('C2','Some confidence','Limited skill'),
      ('C2','Confident','Adequate skill'),
      ('C2','Very confident','High proficiency'),

      -- C3 – Knowledge sharing
      ('C3','None','No sharing → impedes learning'),
      ('C3','Informal tips & tricks','Unstructured exchange'),
      ('C3','Dedicated chat channel','Centralised communication'),
      ('C3','Regular workshops','Formal training events'),
      ('C3','Active Community of Practice','Sustained broad engagement'),

      -- C4 – Annual training budget per employee
      ('C4','€0','No budget → no training'),
      ('C4','< €200','Minimal investment'),
      ('C4','€200–500','Modest investment'),
      ('C4','€500–1 000','Significant investment'),
      ('C4','> €1 000','High investment → strong commitment'),

      -- C5 – Training hours per employee
      ('C5','None','No time → no training'),
      ('C5','< 1 hr','Very limited training'),
      ('C5','1–3 hrs','Some training'),
      ('C5','3–5 hrs','Moderate training'),
      ('C5','> 5 hrs','Extensive training'),

      -- C7 – External support
      ('C7','None','No external expertise → isolation'),
      ('C7','Occasional advice','Ad-hoc guidance'),
      ('C7','Regular advisory sessions','Ongoing guidance'),
      ('C7','Access to expert network','Broad network → higher maturity'),
      ('C7','Dedicated AI advisory board','Formal governance'),

      -- C9 – Employee attitude to AI
      ('C9','Resistant','Active resistance → low engagement'),
      ('C9','Cautious','Hesitant but not opposed'),
      ('C9','Interested','Willing to learn'),
      ('C9','Proactive','Actively exploring'),
      ('C9','Active pilots','Leading pilots → high engagement'),

      -- C10 – Cross-functional collaboration
      ('C10','Never','No collaboration → siloed work'),
      ('C10','Occasionally','Sporadic collaboration'),
      ('C10','Quarterly','Scheduled but infrequent'),
      ('C10','In squads','Project-based squads'),
      ('C10','Embedded practice','Collaboration is the norm'),

      -- C11 – Psychological safety
      ('C11','No safety','Experimentation discouraged'),
      ('C11','Low safety','Minimal comfort'),
      ('C11','Moderate safety','Mixed comfort'),
      ('C11','High safety','Strong comfort culture'),
      ('C11','Full safety','Best-in-class safety culture'),

      -- G1 – Risk & bias management
      ('G1','None','No bias controls → fails upcoming regulations'),
      ('G1','Reactive fixes','Only reactive → immature'),
      ('G1','Pre-release checks','Basic pre-deployment tests → moderate maturity'),
      ('G1','Formal framework','Structured processes → high maturity'),
      ('G1','AI-Act–compliant','Full compliance with EU AI Act → best practice'),

      -- G2 – Explainability and logging
      ('G2','None','Zero transparency → no trust'),
      ('G2','High-risk only','Limited coverage → risky'),
      ('G2','Audit logs','Structured logging → moderate maturity'),
      ('G2','All models','Broad explainability → high maturity'),
      ('G2','Audit-ready','Comprehensive audit readiness → best practice'),

      -- G3 – Transparency & user communication
      ('G3','None','No transparency → erodes trust'),
      ('G3','Policy only','Minimal transparency'),
      ('G3','Docs & FAQs','Provides basic documentation'),
      ('G3','Explain button','On-demand transparency'),
      ('G3','Full disclosure','Proactive transparency → highest maturity'),

      -- G4 – Incident response
      ('G4','None','No plan → high risk'),
      ('G4','General IT plan','Generic not AI-specific'),
      ('G4','Manual rollback','Manual recovery → moderate maturity'),
      ('G4','Automated rollback','Automated recovery → high maturity'),
      ('G4','Playbook','Full playbook → best practice'),

      -- G5 – Human oversight
      ('G5','None','No oversight → high risk'),
      ('G5','Final review','Human review → minimal oversight'),
      ('G5','Spot checks','Random checks → moderate maturity'),
      ('G5','Human-in-loop','Continuous human oversight → high maturity'),
      ('G5','Escalation','Auto-escalation of high-risk outputs → best practice'),

      -- G6 – Privacy by design
      ('G6','Basic compliance','Only baseline → limited protection'),
      ('G6','Enhanced controls','Beyond baseline → moderate maturity'),
      ('G6','PETs','Advanced techniques → high maturity'),
      ('G6','By design','Proactive design → stronger governance'),
      ('G6','Automated','Continuous compliance → best practice'),

      -- G7 – Audits
      ('G7','None','No audits → non-compliance risk'),
      ('G7','Planned','Audit planned → initial maturity'),
      ('G7','In progress','Audit ongoing → moderate maturity'),
      ('G7','Completed','Completed one audit → high maturity'),
      ('G7','Ongoing','Continuous audits → best practice'),

      -- G8 – Risk mapping
      ('G8','Not aware','No awareness → no risk register'),
      ('G8','Aware','Knowledge without action → limited maturity'),
      ('G8','Mapping started','Partial mapping → moderate maturity'),
      ('G8','Completed','Risk register done → high maturity'),
      ('G8','Reported','Leadership reporting → best practice'),

      -- G9 – Fairness testing
      ('G9','Never','No fairness tests → high risk'),
      ('G9','Ad-hoc','Reactive testing → low maturity'),
      ('G9','Pre-release','Proactive testing → moderate maturity'),
      ('G9','Quarterly','Regular reviews → high maturity'),
      ('G9','Continuous','Continuous monitoring → best practice'),

      -- G10 – Ethics oversight body
      ('G10','None','No ethics committee → low maturity'),
      ('G10','Informal','Informal reviews → limited governance'),
      ('G10','Ad-hoc','Project-based only → moderate maturity'),
      ('G10','Scheduled','Regular governance → high maturity'),
      ('G10','External','Independent experts → best practice'),

      -- P1 – Timeline for AI adoption
      ('P1','Within 3 months','Aggressive timeline indicates high ambition'),
      ('P1','3–6 months','Moderately ambitious'),
      ('P1','6–12 months','Longer timeframe; moderate ambition'),
      ('P1','Over 12 months','Slow adoption signals cautiousness'),

      -- P2 – Risk appetite
      ('P2','Conservative','Conservative → low risk appetite'),
      ('P2','Cautious','Some willingness to experiment'),
      ('P2','Balanced','Mix of experiment and control'),
      ('P2','Bold','High risk appetite → aggressive experimentation'),

      -- P4 – Build vs buy
      ('P4','Fully in-house build','In-house → high capability and commitment'),
      ('P4','Hybrid','Balanced internal/external mix'),
      ('P4','Fully outsourced','Outsourcing → limited internal expertise'),

      -- P6 – External support
      ('P6','None','No external help → growth constrained'),
      ('P6','Occasional consulting','Ad-hoc guidance only'),
      ('P6','Ongoing advisory','Regular guidance'),
      ('P6','Managed services','Outsourced management → higher maturity'),
      ('P6','Full outsourcing','Dependency indicates lower internal capacity'),

      -- P7 – Change impact
      ('P7','Minimal changes','Prefers status quo → low transformation impact'),
      ('P7','Minor tweaks','Small adjustments only'),
      ('P7','Moderate transformation','Moderate level of change'),
      ('P7','Major transformation','Significant change across processes'),
      ('P7','Continuous evolution','Continuous adaptation → highest maturity')
  ) as t(question_id, label, reasoning)
),
-- Normalize strings for matching (fold special dashes/apostrophes and whitespace)
normalized as (
  select m.*, lower(regexp_replace(replace(replace(m.label,'–','-'),'’',''''),'\s+',' ','g')) as n_label
  from mappings m
)
update public.question_choices qc
set reasoning = n.reasoning,
    updated_at = now()
from normalized n
where qc.question_id = n.question_id
  and lower(regexp_replace(replace(replace(coalesce(qc.label,qc.value),'–','-'),'’',''''),'\s+',' ','g')) = n.n_label;

-- Generic reasoning applied to all options for questions with count/rank/multi-select logic
-- Only replace older template-style reasonings starting with "Selected " or blanks
update public.question_choices qc
set reasoning = 'More functions involved = higher maturity'
where qc.question_id in ('S9','D1','D5','T0','T8','P3','C6','C8','P5','C3a')
  and (qc.reasoning is null or qc.reasoning like 'Selected %');

commit;