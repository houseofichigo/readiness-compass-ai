-- First let's insert the missing assessment record
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

-- Now insert the missing questions with the correct assessment_id
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
 NULL, true, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);

-- Add the remaining 85 questions as one comprehensive migration 
-- This includes all missing questions from sections 4-8 and add-ons