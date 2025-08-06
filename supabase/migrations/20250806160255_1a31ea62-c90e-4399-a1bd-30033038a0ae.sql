-- Add remaining questions from sections 7 and 8 to reach 87 total

-- Section 7 (Governance) - Add G2-G10 (9 questions)
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
 NULL, true, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false)
ON CONFLICT (id) DO NOTHING;

-- Section 8 (Implementation) - Add P2-P7 (6 questions)
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('P2', 'ai-readiness-assessment', 'section_8', 'What level of risk are you comfortable taking on AI projects?', 'single', 
 'Risk tolerance means how much you''re willing to try new AI ideas, knowing minor setbacks (e.g., small budget overruns or model hiccups) can happen.',
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
 NULL, true, 7, '[0, 25, 50, 75, 100]'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false)
ON CONFLICT (id) DO NOTHING;