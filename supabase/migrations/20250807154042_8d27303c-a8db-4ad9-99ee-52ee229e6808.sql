-- Complete the remaining profile questions (M6_size and M7_revenue) with proper scoring

-- Update M6_size (Company size) with enhanced scoring structure
UPDATE questions 
SET options = '[
  {"value": "1-10", "label": "1-10 employees", "score": 2, "reasoning": "Very small company, limited AI resources", "model_input_context": "Micro business - basic AI adoption potential"},
  {"value": "11-50", "label": "11-50 employees", "score": 3, "reasoning": "Small company, growing AI interest", "model_input_context": "Small business - selective AI tool adoption"},
  {"value": "51-200", "label": "51-200 employees", "score": 3, "reasoning": "Medium company, structured AI exploration", "model_input_context": "Medium business - departmental AI initiatives"},
  {"value": "201-1000", "label": "201-1,000 employees", "score": 4, "reasoning": "Large company, dedicated AI teams", "model_input_context": "Large business - enterprise AI strategy"},
  {"value": "1001-5000", "label": "1,001-5,000 employees", "score": 4, "reasoning": "Enterprise scale, significant AI investment", "model_input_context": "Large enterprise - comprehensive AI programs"},
  {"value": "5000+", "label": "5,000+ employees", "score": 5, "reasoning": "Large enterprise, sophisticated AI capabilities", "model_input_context": "Enterprise scale - advanced AI maturity"}
]'::jsonb
WHERE id = 'M6_size';

-- Update M7_revenue (Annual revenue) with enhanced scoring structure
UPDATE questions 
SET options = '[
  {"value": "under_1m", "label": "Under $1M", "score": 2, "reasoning": "Limited budget for AI investment", "model_input_context": "Startup/small revenue - basic AI tools only"},
  {"value": "1m_10m", "label": "$1M - $10M", "score": 3, "reasoning": "Growing revenue, selective AI adoption", "model_input_context": "Small business revenue - targeted AI solutions"},
  {"value": "10m_50m", "label": "$10M - $50M", "score": 3, "reasoning": "Established business, increasing AI investment", "model_input_context": "Medium business revenue - departmental AI initiatives"},
  {"value": "50m_100m", "label": "$50M - $100M", "score": 4, "reasoning": "Significant revenue, dedicated AI budget", "model_input_context": "Large business revenue - enterprise AI strategy"},
  {"value": "100m_500m", "label": "$100M - $500M", "score": 4, "reasoning": "Large enterprise, substantial AI investment", "model_input_context": "Large enterprise revenue - comprehensive AI programs"},
  {"value": "500m_1b", "label": "$500M - $1B", "score": 5, "reasoning": "Major enterprise, advanced AI capabilities", "model_input_context": "Major enterprise revenue - sophisticated AI ecosystem"},
  {"value": "over_1b", "label": "Over $1B", "score": 5, "reasoning": "Global enterprise, cutting-edge AI innovation", "model_input_context": "Global enterprise revenue - leading AI innovation"}
]'::jsonb
WHERE id = 'M7_revenue';