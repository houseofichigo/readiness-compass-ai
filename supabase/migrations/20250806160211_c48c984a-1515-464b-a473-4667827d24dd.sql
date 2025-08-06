-- Add the remaining 24 questions to reach 87 total
-- Current: 63, Need: 24 more

-- Section 5 (Automation) - Add missing questions A2-A11 (10 questions)
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

-- Section 6 (People) - Add 7 more questions C2-C8
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
 NULL, true, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);

-- Section 7 (Governance) - Add 5 more questions G2-G6  
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
 NULL, true, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);

-- Section 8 (Implementation) - Add 2 more questions P2-P3
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
 NULL, true, 3, NULL, 34, 100, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, false);