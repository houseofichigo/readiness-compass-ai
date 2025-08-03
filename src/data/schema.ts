import yaml from 'js-yaml';

// Since we can't import YAML directly in all environments, we'll define the schema structure
export interface AssessmentSchema {
  meta: {
    locale_default: string;
    size_breakpoints: Record<string, string>;
    max_visible_questions: number;
    tracks: Record<string, string>;
    track_detection: {
      precedence: Array<{ if: string }>;
    };
  };
  track_weights: Record<string, Record<string, number>>;
  weight_vectors?: Record<string, Record<string, number>>;
  sections: Record<string, Section>;
}

export interface Section {
  title: string;
  purpose: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'single' | 'multi' | 'rank' | 'checkbox';
  options?: string[];
  required?: boolean;
  show_if?: ConditionRule;
  hide_if?: ConditionRule;
  score_map?: Record<string, number> | number[];
  helper_text?: string;
}

export interface ConditionRule {
  field: string;
  operator?: string;
  value?: any;
  track?: string;
}

// For now, we'll create a mock schema to test the app
export const mockSchema: AssessmentSchema = {
  meta: {
    locale_default: 'en',
    size_breakpoints: {
      micro: '1-9',
      small: '10-49',
      medium: '50-249',
      large: '250-999',
      enterprise: '1000+'
    },
    max_visible_questions: 60,
    tracks: {
      TECH: 'Technical / Data-Lead',
      REG: 'Regulated / Compliance',
      GEN: 'General Business'
    },
    track_detection: {
      precedence: []
    }
  },
  track_weights: {
    TECH: {},
    REG: {},
    GEN: {}
  },
  weight_vectors: {
    TECH: {},
    REG: {},
    GEN: {}
  },
  sections: {
    'section_0': {
      title: 'Organization Profile',
      purpose: 'Detect persona & gather context. All always shown; M10 consent required.',
      questions: [
        {
          id: 'M1',
          text: 'Full name',
          type: 'text',
          required: true
        },
        {
          id: 'M2', 
          text: 'Work email',
          type: 'text',
          required: true
        },
        {
          id: 'M3',
          text: 'Role/Position',
          type: 'single',
          required: true,
          options: [
            'Founder/CEO', 'C-level', 'CIO/CTO', 'Head Marketing', 'Head Sales', 
            'Head Finance', 'Head Ops', 'Legal/Compliance', 'IT Manager', 
            'Data/AI Lead', 'Product Lead', 'HR Lead', 'Customer Support Lead', 'Other'
          ]
        },
        {
          id: 'M4',
          text: 'Department',
          type: 'single',
          required: true,
          options: [
            'Marketing', 'Sales', 'Finance', 'Operations/Logistics', 'IT', 
            'HR', 'Product', 'Customer Support', 'General management', 'Multiple', 'Other'
          ]
        },
        {
          id: 'M5',
          text: 'Industry & Sub-sector',
          type: 'single',
          required: true,
          options: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Other']
        },
        {
          id: 'M6',
          text: 'Country',
          type: 'single',
          required: true,
          options: ['United States', 'United Kingdom', 'Germany', 'France', 'Other']
        },
        {
          id: 'M7',
          text: 'Company size (FTE)',
          type: 'single',
          required: true,
          options: ['1–9', '10–49', '50–249', '250–999', '≥ 1,000']
        },
        {
          id: 'M8',
          text: 'Annual revenue',
          type: 'single',
          required: true,
          options: ['< €250k', '€250k–1M', '1–5M', '5–20M', '20–100M', '> 100M', 'Prefer not to say']
        },
        {
          id: 'M9',
          text: 'Regulated industry?',
          type: 'single',
          required: true,
          options: ['Yes', 'No', 'Not sure']
        },
        {
          id: 'M10',
          text: 'I agree to processing my data for the readiness report and related communications',
          type: 'checkbox',
          required: true
        }
      ]
    },
    'section_1': {
      title: 'Strategy & Use-Case Readiness',
      purpose: 'Validate AI strategy alignment; use-case planning; leadership buy-in.',
      questions: [
        {
          id: 'S1',
          text: 'AI opportunity inventory - List AI opportunities for next 12 months',
          type: 'single',
          required: true,
          options: ['None', 'Idea list only', '1–2 documented', '3–5 prioritised w/owners', '≥ 6 w/owner & timeline'],
          score_map: [0, 25, 50, 75, 100]
        },
        {
          id: 'S2',
          text: 'What prioritization approach does your organization use?',
          type: 'single',
          required: true,
          options: ['No formal process', 'Ad-hoc based on perceived value', 'Impact × Effort matrix', 'Impact × Effort + resource capacity', 'ROI-driven financial model'],
          show_if: { field: 'S1', operator: 'not_in', value: ['None', 'Idea list only'] }
        }
      ]
    },
    'section_2': {
      title: 'Financial Commitment & Compliance Context',
      purpose: 'Gauge budgets, runway, board support & compliance requirements.',
      questions: [
        {
          id: 'F1',
          text: 'Current monthly AI + data budget',
          type: 'single',
          required: true,
          options: ['< €100', '€100–500', '€500–2k', '€2–15k', '> €15k'],
          score_map: [0, 25, 50, 75, 100]
        }
      ]
    },
    'section_3': {
      title: 'Data Foundation & Governance',
      purpose: 'Evaluate data storage, governance, security & audit readiness.',
      questions: [
        {
          id: 'D1',
          text: 'Critical data storage locations',
          type: 'multi',
          required: true,
          options: ['Files & Spreadsheets', 'Databases', 'Cloud & SaaS', 'Internal Tools/Legacy', 'Analytics & BI', 'Other']
        }
      ]
    },
    'section_4': {
      title: 'Tool Inventory & Integration',
      purpose: 'Assess tool usage breadth & integration maturity.',
      questions: [
        {
          id: 'T1',
          text: 'System integration level',
          type: 'single',
          required: true,
          options: ['Siloed', 'CSV exports/imports', 'Batch sync', 'API-platform', 'Real-time data mesh'],
          score_map: [0, 25, 50, 75, 100]
        }
      ]
    },
    'section_5': {
      title: 'AI Agents & Automation Assessment',
      purpose: 'Measure automation maturity, AI agent adoption, monitoring & governance.',
      questions: [
        {
          id: 'A1',
          text: 'Task pain-point ranking',
          type: 'rank',
          required: true,
          options: ['Reporting', 'Scheduling', 'Data entry', 'FAQ answering', 'Ticket triage', 'Contract generation']
        }
      ]
    },
    'section_6': {
      title: 'People & Skills Assessment',
      purpose: 'Gauge team capability, learning culture & psychological safety.',
      questions: [
        {
          id: 'C1',
          text: 'AI tool usage frequency',
          type: 'single',
          required: true,
          options: ['Never', 'Rarely', 'Monthly', 'Weekly', 'Daily'],
          score_map: [0, 25, 50, 75, 100]
        }
      ]
    },
    'section_7': {
      title: 'Governance, Risk & Ethics',
      purpose: 'Evaluate risk management, transparency & oversight.',
      questions: [
        {
          id: 'G1',
          text: 'AI risk & bias management maturity',
          type: 'single',
          required: true,
          options: ['None', 'Ad-hoc fixes', 'Model checks', 'Formal framework', 'AI-Act compliant'],
          score_map: [0, 25, 50, 75, 100]
        }
      ]
    },
    'section_8': {
      title: 'Implementation & Roadmap Planning',
      purpose: 'Define timeline, risk appetite, success metrics, resource mix & change readiness.',
      questions: [
        {
          id: 'P1',
          text: 'Desired implementation timeframe',
          type: 'single',
          required: true,
          options: ['< 3 months', '3–6 months', '6–12 months', '> 12 months'],
          score_map: [100, 75, 50, 25]
        },
        {
          id: 'P2',
          text: 'Risk appetite',
          type: 'single',
          required: true,
          options: ['Conservative', 'Balanced', 'Progressive', 'Aggressive'],
          score_map: [0, 33, 66, 100]
        }
      ]
    }
  }
};

export const schema = mockSchema;