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
      purpose: 'Detect persona & gather context',
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
            'Founder/CEO',
            'C-level',
            'CIO/CTO',
            'Head Marketing',
            'Head Sales',
            'Head Finance',
            'Head Ops',
            'Legal/Compliance',
            'IT Manager',
            'Data/AI Lead',
            'Product Lead',
            'HR Lead',
            'Customer Support Lead',
            'Other'
          ]
        }
      ]
    },
    'section_1': {
      title: 'Strategy & Use-Case Readiness',
      purpose: 'Validate AI strategy alignment',
      questions: [
        {
          id: 'S1',
          text: 'AI opportunity inventory - List AI opportunities for next 12 months',
          type: 'single',
          required: true,
          options: [
            'None',
            'Idea list only', 
            '1–2 documented',
            '3–5 prioritised w/owners',
            '≥ 6 w/owner & timeline'
          ],
          score_map: [0, 25, 50, 75, 100]
        }
      ]
    }
  }
};

export const schema = mockSchema;