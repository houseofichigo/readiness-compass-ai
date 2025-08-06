-- Add remaining questions to reach 87 total

-- Section 5 (Automation) - Add A2-A11 (10 questions)
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
 '{"A3": "None implemented"}'::jsonb, false)
ON CONFLICT (id) DO NOTHING;

-- Section 6 (People) - Add C2-C11 (10 questions)
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
 NULL, true, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false)
ON CONFLICT (id) DO NOTHING;

-- Add-ons - Add T9 and F8 (2 questions)
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('T9', 'ai-readiness-assessment', 'section_4', 'How do you deploy ML models and monitor them in production?', 'single', 
 'Deployment and monitoring ensure reliability and fast issue detection.',
 '["No deployment – models not in production", "Manual scripts – ad-hoc launches", "CI/CD pipeline – automated builds & deploys", "MLOps platform (e.g. Kubeflow, MLflow) with monitoring", "Fully automated blue/green deployments + rollback"]'::jsonb,
 '{"track": "TECH"}'::jsonb, true, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true),

('F8', 'ai-readiness-assessment', 'section_2', 'Which mechanisms do you use for cross-border data transfers?', 'single', 
 'GDPR requires lawful transfer—select your standard approach.',
 '["No cross-border transfers", "Ad-hoc contracts", "Standard Contractual Clauses (SCCs)", "Binding Corporate Rules (BCRs)", "Adequacy decision + continuous monitoring"]'::jsonb,
 '{"track": "REG"}'::jsonb, true, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true)
ON CONFLICT (id) DO NOTHING;