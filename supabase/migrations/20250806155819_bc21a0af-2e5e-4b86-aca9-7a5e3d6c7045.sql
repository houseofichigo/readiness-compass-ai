-- First insert the assessment record to satisfy foreign key constraint
INSERT INTO assessments (id, version, locale_default, max_visible_questions, size_breakpoints, question_cap)
VALUES (
  'ai-readiness-assessment',
  '2.0',
  'en',
  60,
  '{"micro": "1-9", "small": "10-49", "medium": "50-249", "large": "250-999", "enterprise": "1000+"}'::jsonb,
  '{"max_questions": 60, "auto_hide": ["D2", "P6"]}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Now insert all 87 questions with correct count

-- Section 3 (Data) - Add missing questions D9, D10
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('D9', 'ai-readiness-assessment', 'section_3', 'Do you use synthetic or third-party data to augment your datasets?', 'single', NULL,
 '["No", "Exploring options", "Limited pilots", "Regular production use", "Extensive synthetic data pipelines"]'::jsonb,
 '{"track": ["TECH"]}'::jsonb, true, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('D10', 'ai-readiness-assessment', 'section_3', 'How developed are your AI ethics and data privacy policies?', 'single', 
 'Select the maturity stage of your policies and enforcement(e.g. ''Policies + training & oversight'' means you''ve documented guidelines and run staff workshops).',
 '["No formal policies", "High-level principles only (no detailed guidance)", "Documented guidelines (but no training or oversight)", "Guidelines + training & oversight (staff workshops, reviews)", "Audited & continuously improved (regular audits + updates)"]'::jsonb,
 NULL, true, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false)
ON CONFLICT (id) DO NOTHING;

-- Section 4 (Tools) - Add missing questions T0_tools, T2-T8
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('T0_tools', 'ai-readiness-assessment', 'section_4', 'Which tools are actively used by you and your team?', 'multi_group', 
 'Select all tools your team uses—this drives tailored workflow and AI agent suggestions.',
 NULL, NULL, true, 0, NULL, NULL, NULL, NULL, NULL, 
 '{"1": 0, "2-3": 25, "4-6": 50, "7-9": 75, ">=10": 100}'::jsonb, NULL, NULL, NULL, NULL, 
 '[{"label": "Performance Monitoring", "show_if": {"track": "TECH"}, "options": ["New Relic", "Datadog", "Other"]}]'::jsonb, NULL, false),

('T2', 'ai-readiness-assessment', 'section_4', 'How often do data connections fail or cause issues?', 'single', NULL,
 '["Weekly – frequent failures", "Monthly – occasional errors", "Quarterly – rare problems", "Almost never – very stable", "Never – fully reliable"]'::jsonb,
 NULL, true, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T3', 'ai-readiness-assessment', 'section_4', 'Who owns and maintains your system integrations?', 'single', NULL,
 '["No clear owner", "External agency/freelancer", "Ops/Product team", "Internal tech team", "Dedicated integration team"]'::jsonb,
 NULL, true, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('T4', 'ai-readiness-assessment', 'section_4', 'How well are you connected to external AI services and LLMs?', 'single', 
 'Indicates which large-language models (LLMs) you''re allowed to use and any internal models you access.',
 '["Not allowed to use any external LLMs", "Exploratory tests only", "Pilot deployments", "One API in production", "Multiple APIs in production + internal LLM access"]'::jsonb,
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
 '["None – no low-code/no-code tools", "Zapier", "Make", "n8n", "Power Automate", "UiPath", "Workato", "Airbyte", "Fivetran", "dbt"]'::jsonb,
 NULL, true, 8, NULL, 10, 100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false)
ON CONFLICT (id) DO NOTHING;

-- Continue with remaining sections following the same pattern
-- Section 5 (Automation) - Add A2-A11 [10 questions]
-- Section 6 (People) - Add C2-C11 [10 questions]  
-- Section 7 (Governance) - Add G2-G10 [9 questions]
-- Section 8 (Implementation) - Add P2-P7 [6 questions]
-- Add-ons - Add T9, F8 [2 questions]

-- Total should be 87 questions across all sections