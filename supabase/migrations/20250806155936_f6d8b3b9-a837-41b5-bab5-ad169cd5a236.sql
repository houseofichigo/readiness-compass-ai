-- Insert all remaining missing questions to reach 87 total

-- Section 4 (Tools) - Add missing questions T0_tools, T2-T8 and T9 (add-on)
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('T0_tools', 'ai-readiness-assessment', 'section_4', 'Which tools are actively used by you and your team?', 'multi_group', 
 'Select all tools your team uses—this drives tailored workflow and AI agent suggestions.',
 NULL, NULL, true, 0, NULL, NULL, NULL, NULL, NULL, 
 '{"1": 0, "2-3": 25, "4-6": 50, "7-9": 75, ">=10": 100}'::jsonb, NULL, NULL, NULL, NULL, 
 '[
   {
     "label": "Performance Monitoring",
     "show_if": {"track": "TECH"},
     "options": ["New Relic", "Datadog", "Dynatrace", "AppDynamics", "Elastic APM", "Sentry", "Splunk APM", "Pingdom", "Bubble", "Mistral", "Other performance monitoring tool (please specify)"]
   },
   {
     "label": "Email Marketing & Communication",
     "show_if": {"track": "GEN"},
     "options": ["Mailchimp", "Constant Contact", "SendGrid", "Campaign Monitor", "ConvertKit", "ActiveCampaign", "GetResponse", "Cordial", "Brevo (Sendinblue)", "AWeber", "Other email marketing tool (please specify)"]
   }
 ]'::jsonb, NULL, false),

('T2', 'ai-readiness-assessment', 'section_4', 'How often do data connections fail or cause issues?', 'single', NULL,
 '["Weekly – frequent failures", "Monthly – occasional errors", "Quarterly – rare problems", "Almost never – very stable", "Never – fully reliable"]'::jsonb,
 NULL, true, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T3', 'ai-readiness-assessment', 'section_4', 'Who owns and maintains your system integrations?', 'single', NULL,
 '["No clear owner", "External agency/freelancer", "Ops/Product team", "Internal tech team", "Dedicated integration team"]'::jsonb,
 NULL, true, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T4', 'ai-readiness-assessment', 'section_4', 'How well are you connected to external AI services and LLMs?', 'single', 
 'Indicates which large-language models (LLMs) you''re allowed to use and any internal models you access.Examples: OpenAI (ChatGPT), Anthropic Claude, Mistral, GitHub Copilot, or your own on-premise LLM.',
 '["Not allowed to use any external LLMs", "Exploratory tests only (e.g., trying ChatGPT, Claude, Mistral in sandbox)", "Pilot deployments (small projects using APIs)", "One API in production (e.g., ChatGPT or Copilot embedded in a workflow)", "Multiple APIs in production + internal LLM access"]'::jsonb,
 NULL, true, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T5', 'ai-readiness-assessment', 'section_4', 'What access do you have to GPU/TPU compute?', 'single', NULL,
 '["None", "Colab only", "On-demand cloud GPUs/TPUs", "Dedicated GPU/TPU budget", "Managed AI compute cluster"]'::jsonb,
 '{"track": ["TECH", "REG"]}'::jsonb, true, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T6', 'ai-readiness-assessment', 'section_4', 'How well is your technical or data architecture documented?', 'single', NULL,
 '["None", "High-level sketches", "Critical systems mapped", "Full architecture diagrams", "Auto-generated & maintained docs"]'::jsonb,
 '{"track": ["TECH", "REG"]}'::jsonb, true, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T7', 'ai-readiness-assessment', 'section_4', 'What level of disaster recovery planning exists for data & AI?', 'single', NULL,
 '["No plan", "Backups only", "Manual failover", "Automated failover", "AI-aware recovery playbook"]'::jsonb,
 '{"track": ["TECH", "REG"]}'::jsonb, true, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T8', 'ai-readiness-assessment', 'section_4', 'Which low-code or no-code platforms do you use for automation?', 'multi', 
 'Select all platforms you actively use; choose None if you don''t use any.',
 '["None – no low-code/no-code tools", "Zapier – connect apps with workflows", "Make – multi-step automation builder", "n8n – self-hosted workflow automation", "Power Automate – Microsoft flow automation", "UiPath – RPA for desktop & web", "Workato – enterprise integration platform", "Airbyte – ELT data pipelines", "Fivetran – automated data connectors", "dbt – analytics engineering"]'::jsonb,
 NULL, true, 8, NULL, 10, 100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T9', 'ai-readiness-assessment', 'section_4', 'How do you deploy ML models and monitor them in production?', 'single', 
 'Deployment and monitoring ensure reliability and fast issue detection.',
 '["No deployment – models not in production", "Manual scripts – ad-hoc launches", "CI/CD pipeline – automated builds & deploys", "MLOps platform (e.g. Kubeflow, MLflow) with monitoring", "Fully automated blue/green deployments + rollback"]'::jsonb,
 '{"track": "TECH"}'::jsonb, true, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true);

-- Section 5 (Automation) - Add missing questions A2-A11
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('A2', 'ai-readiness-assessment', 'section_5', 'How mature are your current automation efforts?', 'single', 
 'Choose the description that best fits how automated your processes are, from no automation to fully autonomous.',
 '["None – no automation", "1 – ad-hoc scripts only", "2 – basic tools with manual oversight", "3 – integrated workflows across functions", "4 – continuous automation with monitoring", "5 – fully autonomous processes"]'::jsonb,
 NULL, true, 2, '[0,25,50,75,100]'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('A3', 'ai-readiness-assessment', 'section_5', 'What is the current status of AI agents in your operations?', 'single', 
 'Helps us recommend the right agent training modules.',
 '["None implemented – no AI agents", "Prototype built – early proof of concept", "One agent in production – single live agent", "Multiple agents live – several agents running", "Organization-wide deployment – agents across teams"]'::jsonb,
 NULL, true, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('A4', 'ai-readiness-assessment', 'section_5', 'Which tasks are you considering for AI-agent automation?', 'multi', 
 'Select all that apply to identify your first agent use cases.',
 '["Customer support – automated responses", "Report generation – auto-create summaries", "Email drafting – compose routine emails", "Lead scoring – prioritize prospects", "Meeting summaries – automated notes", "Market research – gather insights", "Quality control – flag issues"]'::jsonb,
 NULL, true, 4, NULL, 10, 100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('A5', 'ai-readiness-assessment', 'section_5', 'What level of autonomy do you want for your AI agents?', 'single', 
 'Define how independent your agents should be.',
 '["Suggest only", "Require human approval", "Semi-automated", "Fully automated"]'::jsonb,
 NULL, true, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
 '{"all_of": [{"A3": "None implemented"}, {"P2": "Conservative – preferring pilot tests before scaling"}]}'::jsonb, false),

('A6', 'ai-readiness-assessment', 'section_5', 'How do you monitor and alert on your automated processes?', 'single', 
 'Ensures reliability and rapid issue resolution.',
 '["No monitoring", "Manual checks", "KPI dashboards", "Automated alerts", "Full observability & logging"]'::jsonb,
 NULL, true, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('A7', 'ai-readiness-assessment', 'section_5', 'What are the main blockers to automating tasks and deploying AI agents?', 'multi', 
 'Select all that apply.',
 '["Data silos", "Lack of technical resources", "Insufficient buy-in", "Compliance concerns", "Unclear ROI", "Budget constraints", "Integration complexity"]'::jsonb,
 NULL, true, 7, NULL, NULL, NULL, NULL, NULL, NULL, '100 - 10 * count', NULL, NULL, NULL, NULL, NULL, false),

('A8', 'ai-readiness-assessment', 'section_5', 'Which interface do you prefer for interacting with AI agents?', 'multi', 
 'Helps tailor agent UI recommendations.',
 '["Chatbot (Slack/Teams)", "Embedded widget", "Dashboard", "Email assistant", "API/CLI", "Voice assistant", "Need guidance"]'::jsonb,
 NULL, true, 8, NULL, 10, 100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('A9', 'ai-readiness-assessment', 'section_5', 'What governance processes do you have for AI agents?', 'single', 
 'Ensures safe, compliant agent operations.',
 '["None", "Ad-hoc spot checks", "Formal review process", "Logging with oversight", "Continuous auditing"]'::jsonb,
 NULL, true, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
 '{"A3": "None implemented"}'::jsonb, false),

('A10', 'ai-readiness-assessment', 'section_5', 'What recovery or rollback strategy exists for failed automations or AI agents?', 'single', 
 'Defines resilience and business continuity.',
 '["No plan", "Manual rollback steps", "Pre-defined failover procedures", "Automated rollback", "Self-healing loops"]'::jsonb,
 NULL, true, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
 '{"A3": "None implemented"}'::jsonb, false),

('A11', 'ai-readiness-assessment', 'section_5', 'How do you track the accuracy and quality of AI agent outputs?', 'single', 
 'Drives training on output validation and testing.',
 '["No tracking", "Manual spot checks", "Release testing", "Ongoing tests + spot checks", "Continuous accuracy monitoring"]'::jsonb,
 NULL, true, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
 '{"A3": "None implemented"}'::jsonb, false);

-- Section 6 (People) - Add missing questions C2-C11
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('C2', 'ai-readiness-assessment', 'section_6', 'How confident are you and your team at these prompt-writing skills?', 'matrix', NULL, NULL, NULL, true, 2,
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
 '["Writing basic prompts", "Using few-shot examples", "Formatting structured prompts", "Designing multi-step prompt chains"]'::jsonb,
 '["No confidence", "Some confidence", "Confident", "Very confident"]'::jsonb, NULL, NULL, false),

('C3', 'ai-readiness-assessment', 'section_6', 'How do you and your team share AI learnings internally?', 'single', NULL,
 '["None – no sharing", "Informal tips & tricks", "Dedicated chat channel", "Regular workshops", "Active Community of Practice"]'::jsonb,
 NULL, true, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C3a', 'ai-readiness-assessment', 'section_6', 'Which AI training topics should you and your team prioritize? (Rank top 3)', 'rank', NULL,
 '["Prompt engineering", "AI tool mastery", "Data literacy", "Model fine-tuning", "Retrieval-augmented generation", "Agent orchestration", "Ethics & governance"]'::jsonb,
 NULL, true, 4, NULL, NULL, NULL, '[50, 30, 20]'::jsonb, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C4', 'ai-readiness-assessment', 'section_6', 'What annual budget do you and your team allocate per person for AI upskilling?', 'single', NULL,
 '["0 €", "< 200 €", "200–500 €", "500–1 000 €", "> 1 000 €"]'::jsonb,
 NULL, true, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C5', 'ai-readiness-assessment', 'section_6', 'How many hours per month can you and your team dedicate to AI training?', 'single', NULL,
 '["None", "< 1 hr", "1–3 hrs", "3–5 hrs", "> 5 hrs"]'::jsonb,
 NULL, true, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C6', 'ai-readiness-assessment', 'section_6', 'What format do you and your team prefer for AI training delivery?', 'single', NULL,
 '["Text guides", "Short videos", "Live workshops", "Self-paced courses", "Mixed formats"]'::jsonb,
 NULL, true, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C7', 'ai-readiness-assessment', 'section_6', 'How often do you and your team engage external AI experts?', 'single', NULL,
 '["None – no external support", "Occasional advice", "Regular advisory sessions", "Access to expert network", "Dedicated AI advisory board"]'::jsonb,
 NULL, true, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C8', 'ai-readiness-assessment', 'section_6', 'What stops you and your team from piloting more AI projects?', 'multi', NULL,
 '["Budget constraints", "Lack of skills", "Data silos", "Compliance concerns", "Unclear ROI", "Tech complexity"]'::jsonb,
 NULL, true, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C9', 'ai-readiness-assessment', 'section_6', 'How open are you and your team to piloting new AI projects?', 'single', NULL,
 '["Resistant", "Cautious", "Interested", "Proactive", "Active pilots"]'::jsonb,
 NULL, true, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C10', 'ai-readiness-assessment', 'section_6', 'How frequently do you and your team collaborate across functions on AI initiatives?', 'single', NULL,
 '["Never", "Occasionally", "Quarterly", "In squads", "Embedded practice"]'::jsonb,
 NULL, true, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('C11', 'ai-readiness-assessment', 'section_6', 'How safe do you and your team feel to experiment and fail with AI?', 'single', 
 'Everyone makes small mistakes (e.g. minor bugs, wrong outputs)—how safe do you feel experimenting and learning with AI?',
 '["No safety – fear of repercussions", "Low safety – rarely comfortable", "Moderate safety – sometimes comfortable", "High safety – often comfortable", "Full safety – always encouraged"]'::jsonb,
 NULL, true, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);

-- Section 7 (Governance) - Add missing questions G2-G10
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('G2', 'ai-readiness-assessment', 'section_7', 'How well can you explain and audit AI model decisions?', 'single', 
 'Explanation means you can trace why a model made a decision (e.g. feature importances, logs);auditing means you can review records later. For example, logging inputs/outputs for each prediction.',
 '["None – no logging or explanations", "High-risk only – explain critical models", "Audit logs – structured logs for scripts", "All models – explanations for every model", "Audit-ready – tools & docs for compliance audits"]'::jsonb,
 NULL, true, 2, '[0,25,50,75,100]'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G3', 'ai-readiness-assessment', 'section_7', 'How transparent are you with users and stakeholders about AI use?', 'single', NULL,
 '["None – no communication", "Policy only – AI mentioned in policies", "Docs & FAQs – published guides and FAQs", "Explain button – users can request details", "Full disclosure – proactive dashboards and alerts"]'::jsonb,
 NULL, true, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G4', 'ai-readiness-assessment', 'section_7', 'What level of incident response planning exists for AI failures or harms?', 'single', NULL,
 '["None – no response plan", "General IT plan – covers all incidents", "Manual rollback – human-driven recovery", "Automated rollback – system-driven recovery", "Playbook – comprehensive AI incident response"]'::jsonb,
 NULL, true, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G5', 'ai-readiness-assessment', 'section_7', 'What level of human oversight do you enforce on AI outputs?', 'single', NULL,
 '["None – AI runs without checks", "Final review – humans review before release", "Spot checks – random output audits", "Human-in-loop – humans embedded in workflow", "Escalation – automatic escalation to experts"]'::jsonb,
 NULL, true, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G6', 'ai-readiness-assessment', 'section_7', 'How deeply is privacy built into your AI development process?', 'single', NULL,
 '["Basic compliance – meets minimum legal requirements", "Enhanced controls – best-practice privacy measures", "PETs – uses privacy-enhancing technologies", "By design – privacy embedded in design phases", "Automated – privacy checks in CI/CD pipelines"]'::jsonb,
 NULL, true, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G7', 'ai-readiness-assessment', 'section_7', 'What is the status of independent audits for your AI systems?', 'single', NULL,
 '["None – no audits conducted", "Planned – audit scheduled", "In progress – audit underway", "Completed – initial audit done", "Ongoing – regular audit cycle"]'::jsonb,
 '{"track": ["REG", "TECH"]}'::jsonb, true, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G8', 'ai-readiness-assessment', 'section_7', 'How far along are you in mapping AI risks under the EU AI Act?', 'single', 
 'Mapping means identifying and documenting risks under EU rules (e.g. creating a risk register of AI use cases).',
 '["Not aware – haven''t reviewed requirements", "Aware – know obligations but not mapped", "Mapping started – risk register in progress", "Completed – risk register finished", "Reported – findings shared with leadership"]'::jsonb,
 NULL, true, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G9', 'ai-readiness-assessment', 'section_7', 'How regularly do you test your AI models for fairness?', 'single', NULL,
 '["Never – no fairness tests", "Ad-hoc – tests only after incidents", "Pre-release – tests before each deployment", "Quarterly – scheduled fairness reviews", "Continuous – automated monitoring"]'::jsonb,
 '{"track": ["REG", "TECH"]}'::jsonb, true, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G10', 'ai-readiness-assessment', 'section_7', 'What governance body oversees your AI ethics and compliance?', 'single', 
 'Governance bodies set and enforce rules—e.g. data‐privacy policies, bias‐review processes, acceptable‐use guidelines.   Examples: an internal AI ethics committee that reviews new models, a compliance team enforcing GDPR rules, or an external expert panel.',
 '["None – no oversight body", "Informal – occasional advisor reviews", "Ad-hoc – project-based ethics reviews", "Scheduled – regular ethics committee meetings", "External – includes independent ethics experts"]'::jsonb,
 NULL, true, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);

-- Section 8 (Implementation) - Add missing questions P2-P7
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('P2', 'ai-readiness-assessment', 'section_8', 'What level of risk are you comfortable taking on AI projects?', 'single', 
 'Risk tolerance means how much you''re willing to try new AI ideas, knowing minor setbacks (e.g., small budget overruns or model hiccups) can happen.For example, "Cautious" means you''ll run a small pilot first; "Bold" means you''ll launch a larger experiment with clear rollback plans.',
 '["Conservative – pilot tests before scaling", "Cautious – open to small experiments", "Balanced – willing to try new approaches with oversight", "Bold – ready for larger experiments with safeguards"]'::jsonb,
 NULL, true, 2, '[0,33,66,100]'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('P3', 'ai-readiness-assessment', 'section_8', 'Which success metrics are most important for your AI work? (Select up to 3)', 'multi', 
 'We''ll recommend training that drives these outcomes.',
 '["Return on Investment (ROI)", "Cost reduction", "Operational efficiency", "Customer experience", "Employee productivity", "Innovation outcomes", "Regulatory compliance", "Sustainability impact"]'::jsonb,
 NULL, true, 3, NULL, 34, 100, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, false),

('P4', 'ai-readiness-assessment', 'section_8', 'What is your preferred resource strategy for AI projects?', 'single', 
 'Determines focus on internal skill-building vs. external support.',
 '["Fully in-house build", "Hybrid – in-house + external", "Fully outsourced"]'::jsonb,
 NULL, true, 4, '[100, 50, 0]'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('P5', 'ai-readiness-assessment', 'section_8', 'Which technology architectures do you prefer for AI solutions? (Select all)', 'multi', 
 'Guides technical workshops on relevant platforms.',
 '["Cloud-native", "Hybrid/on-premise", "API-first", "Low-code/no-code", "Open-source frameworks", "Enterprise software suites"]'::jsonb,
 NULL, true, 5, NULL, 17, 100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('P6', 'ai-readiness-assessment', 'section_8', 'What level of external support do you expect for AI implementation?', 'single', 
 'Helps determine consultant-led vs. self-paced learning.',
 '["None – fully self-service", "Occasional consulting", "Ongoing advisory", "Managed services", "Full outsourcing"]'::jsonb,
 NULL, true, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
 '{"total_questions": ">60"}'::jsonb, false),

('P7', 'ai-readiness-assessment', 'section_8', 'How significant of an organizational change are you prepared for to adopt AI?', 'single', 
 'Matches change-management training to readiness level.',
 '["Minimal changes", "Minor tweaks", "Moderate transformation", "Major transformation", "Continuous evolution"]'::jsonb,
 NULL, true, 7, '[0, 25, 50, 75, 100]'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);

-- Add-ons section - Add F8
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('F8', 'ai-readiness-assessment', 'section_2', 'Which mechanisms do you use for cross-border data transfers?', 'single', 
 'GDPR requires lawful transfer—select your standard approach.',
 '["No cross-border transfers", "Ad-hoc contracts", "Standard Contractual Clauses (SCCs)", "Binding Corporate Rules (BCRs)", "Adequacy decision + continuous monitoring"]'::jsonb,
 '{"track": "REG"}'::jsonb, true, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true);