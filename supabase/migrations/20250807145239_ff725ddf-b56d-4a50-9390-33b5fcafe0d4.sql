-- Fix the null constraint issue by setting default values for required fields
UPDATE questions 
SET max_rank = 0, 
    max_select = 0,
    score_per = NULL,
    cap = NULL,
    weight = NULL
WHERE max_rank IS NULL OR max_select IS NULL;

-- Update M6_size options to match YAML with proper values
UPDATE questions 
SET options = '[
  {"value": "1-10", "label": "1-10 employees"},
  {"value": "11-50", "label": "11-50 employees"},
  {"value": "51-200", "label": "51-200 employees"},
  {"value": "201-500", "label": "201-500 employees"},
  {"value": "501-1000", "label": "501-1000 employees"},
  {"value": "1001-5000", "label": "1001-5000 employees"},
  {"value": "5001+", "label": "5001+ employees"}
]'::jsonb
WHERE id = 'M6_size';

-- Update M7_revenue options to match YAML  
UPDATE questions 
SET options = '[
  {"value": "Under $1M", "label": "Under $1M"},
  {"value": "$1M-$10M", "label": "$1M-$10M"},
  {"value": "$10M-$50M", "label": "$10M-$50M"},
  {"value": "$50M-$100M", "label": "$50M-$100M"},
  {"value": "$100M-$500M", "label": "$100M-$500M"},
  {"value": "$500M-$1B", "label": "$500M-$1B"},
  {"value": "Over $1B", "label": "Over $1B"},
  {"value": "Prefer not to say", "label": "Prefer not to say"}
]'::jsonb
WHERE id = 'M7_revenue';

-- Update M3 (primary role) options to match YAML
UPDATE questions 
SET options = '[
  {"value": "C-level Executive", "label": "C-level Executive"},
  {"value": "Senior Vice President", "label": "Senior Vice President"},
  {"value": "Vice President", "label": "Vice President"},
  {"value": "Director", "label": "Director"},
  {"value": "Manager", "label": "Manager"},
  {"value": "Individual Contributor", "label": "Individual Contributor"},
  {"value": "Consultant", "label": "Consultant"},
  {"value": "Other", "label": "Other"}
]'::jsonb
WHERE id = 'M3';

-- Update M4_industry options to match YAML
UPDATE questions 
SET options = '[
  {"value": "Financial Services", "label": "Financial Services"},
  {"value": "Healthcare", "label": "Healthcare"},
  {"value": "Technology", "label": "Technology"},
  {"value": "Manufacturing", "label": "Manufacturing"},
  {"value": "Retail/E-commerce", "label": "Retail/E-commerce"},
  {"value": "Energy & Utilities", "label": "Energy & Utilities"},
  {"value": "Government/Public Sector", "label": "Government/Public Sector"},
  {"value": "Education", "label": "Education"},
  {"value": "Telecommunications", "label": "Telecommunications"},
  {"value": "Transportation & Logistics", "label": "Transportation & Logistics"},
  {"value": "Media & Entertainment", "label": "Media & Entertainment"},
  {"value": "Real Estate", "label": "Real Estate"},
  {"value": "Professional Services", "label": "Professional Services"},
  {"value": "Non-profit", "label": "Non-profit"},
  {"value": "Other", "label": "Other"}
]'::jsonb
WHERE id = 'M4_industry';