// src/data/assessmentQuestions.ts

import yaml from "js-yaml";
import schemaRaw from "@/ai-readiness-assessment.yaml?raw";
import type {
  Section,
  Question,
  QuestionOption,
  ConsentBanner,
  ComputedField,
  QuestionType,
  WeightVector,
} from "@/types/assessment";

// Titles for each section derived from the assessment YAML
const SECTION_TITLES: Record<string, string> = {
  section_0: "Organization Profile",
  section_1: "Strategy & Use-Case Readiness",
  section_2: "Budget, Runway & Compliance",
  section_3: "Data Foundation & Security",
  section_4: "Tool Stack & Integration",
  section_5: "Automation & AI Agents",
  section_6: "Team Capability & Culture",
  section_7: "Governance, Risk & Ethics",
  section_8: "Implementation Horizon & Vision",
};

interface RawChoice {
  value: string;
  score?: number;
  reasoning?: string;
  model_input_context?: string;
}

interface RawQuestion {
  id: string;
  text: string;
  type: string;
  helper?: string;
  required?: boolean;
  options?: Array<string | QuestionOption>;
  choices?: Array<string | RawChoice>;
  rows?: string[];
  columns?: string[];
  groups?: Array<{
    label?: string;
    value?: string; // YAML uses 'value' field for group label
    show_if?: Record<string, unknown>;
    options?: Array<string | QuestionOption>;
    choices?: Array<string | RawChoice>; // YAML uses 'choices' for group options
  }>;
  show_if?: Record<string, unknown>;
  hide_if?: Record<string, unknown>;
  score_map?: number[];
  score_map_by_bucket?: Record<string, string[]>;
  score_per?: number;
  cap?: number;
  weight?: number[];
  max_rank?: number;
  max_select?: number;
  score_formula?: string;
  score_by_count?: Record<string, number>;
}

interface RawSection {
  category?: keyof WeightVector | string;
  purpose?: string;
  questions?: RawQuestion[];
  consent_banner?: ConsentBanner;
  computed?: ComputedField[];
}

interface AssessmentYaml {
  meta?: Record<string, unknown>;
  add_ons?: RawQuestion[];
  [key: `section_${number}`]: RawSection | undefined;
}

let schema: AssessmentYaml;
try {
  schema = yaml.load(schemaRaw) as AssessmentYaml;
  if (!schema || typeof schema !== 'object') {
    throw new Error('Invalid YAML structure');
  }
} catch (error) {
  // Keep this as console.error since this is a critical loading error that should always be visible
  console.error('Failed to load assessment YAML:', error);
  // Fallback to minimal schema to prevent app crash
  schema = {
    meta: { title: "Assessment unavailable" },
    section_0: {
      purpose: "Basic profile information",
      questions: [
        {
          id: "M0",
          text: "Organization Name",
          type: "text",
          required: true
        }
      ]
    }
  };
}

// Normalize a mixed array of strings or objects into QuestionOption[]
function normalizeOptions(
  opts?: Array<string | QuestionOption>
): QuestionOption[] | undefined {
  return opts?.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
}

// Normalize choices from new YAML structure
function normalizeChoices(
  choices?: Array<string | RawChoice>
): QuestionOption[] | undefined {
  return choices?.map((choice) => {
    if (typeof choice === "string") {
      return { value: choice, label: choice };
    } else {
      return {
        value: choice.value,
        label: choice.value,
        score: choice.score,
        reasoning: choice.reasoning,
        model_input_context: choice.model_input_context,
      };
    }
  });
}

// Handle score_map_by_bucket for country-like questions
function normalizeScoreMapByBucket(
  choices?: Array<string | RawChoice>,
  scoreMapByBucket?: Record<string, string[]>
): QuestionOption[] | undefined {
  if (!choices || !scoreMapByBucket) {
    return normalizeChoices(choices);
  }

  return choices.map((choice) => {
    const value = typeof choice === "string" ? choice : choice.value;
    
    // Find which bucket this value belongs to
    for (const [score, countries] of Object.entries(scoreMapByBucket)) {
      if (countries.includes(value) || countries.includes("*")) {
        return {
          value,
          label: value,
          score: parseInt(score),
          reasoning: `Score ${score} based on country classification`,
          model_input_context: `Respondent's country has score level ${score}`,
        };
      }
    }
    
    // Default fallback
    return {
      value,
      label: value,
      score: scoreMapByBucket["2"] ? 2 : 0,
    };
  });
}

// Top-level maps for consent banners & computed logic
const assessmentConsentBanners: Record<string, ConsentBanner> = {};
const assessmentComputed: Record<string, ComputedField[]> = {};

// Build Section[] from YAML
const assessmentSections: Section[] = Object.entries(schema)
  .filter(([key]) => key.startsWith("section_"))
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  .map(([id, rawSec]) => {
    const {
      category,
      purpose = "",
      questions = [],
      consent_banner,
      computed = [],
    } = rawSec ?? {};

    const normalizedQuestions: Question[] = questions.map((q) => {
      const base: Partial<Question> = {
        id: q.id,
        text: q.text,
        type: q.type as QuestionType,
        helper: q.helper,
        required: q.required,
        showIf: q.show_if,
        hideIf: q.hide_if,
        scoreMap: q.score_map,
        scorePer: q.score_per,
        cap: q.cap,
        weight: q.weight,
        maxRank: q.max_rank,
        maxSelect: q.max_select,
        scoreFormula: q.score_formula,
        scoreByCount: q.score_by_count,
      };

      // Handle new choices structure or legacy options
      if (q.choices) {
        if (q.score_map_by_bucket) {
          base.options = normalizeScoreMapByBucket(q.choices, q.score_map_by_bucket);
        } else {
          base.options = normalizeChoices(q.choices);
        }
      } else if (q.options) {
        base.options = normalizeOptions(q.options);
      }
      
      if (q.rows)      base.rows    = [...q.rows];
      if (q.columns)   base.columns = [...q.columns];

      if (q.groups) {
        base.groups = q.groups.map((g) => ({
          label: g.value || g.label, // Handle YAML using 'value' field for group label
          showIf: g.show_if,
          options: normalizeChoices(g.choices || g.options) || [], // Handle YAML using 'choices' for group options
        }));
      }

      return base as Question;
    });

    if (consent_banner) {
      assessmentConsentBanners[id] = consent_banner;
    }
    if (computed.length) {
      assessmentComputed[id] = computed;
    }

    return {
      id,
      title: SECTION_TITLES[id] ?? id,
      purpose,
      ...(category ? { category } : {}),
      questions: normalizedQuestions,
      ...(consent_banner ? { consentBanner: consent_banner } : {}),
      ...(computed.length ? { computed } : {}),
    };
  });

// Top-level “add_ons” questions
const assessmentAddOns: Question[] = (schema.add_ons ?? []).map((q) => {
  const base: Partial<Question> = {
    id: q.id,
    text: q.text,
    type: q.type as QuestionType,
    helper: q.helper,
    required: q.required,
    showIf: q.show_if,
    hideIf: q.hide_if,
    scoreMap: q.score_map,
    scorePer: q.score_per,
    cap: q.cap,
    weight: q.weight,
    maxRank: q.max_rank,
    maxSelect: q.max_select,
    scoreFormula: q.score_formula,
    scoreByCount: q.score_by_count,
  };

  // Handle new choices structure or legacy options
  if (q.choices) {
    if (q.score_map_by_bucket) {
      base.options = normalizeScoreMapByBucket(q.choices, q.score_map_by_bucket);
    } else {
      base.options = normalizeChoices(q.choices);
    }
  } else if (q.options) {
    base.options = normalizeOptions(q.options);
  }
  
  if (q.rows)     base.rows     = [...q.rows];
  if (q.columns)  base.columns  = [...q.columns];

  if (q.groups) {
    base.groups = q.groups.map((g) => ({
      label: g.value || g.label, // Handle YAML using 'value' field for group label
      showIf: g.show_if,
      options: normalizeChoices(g.choices || g.options) || [], // Handle YAML using 'choices' for group options
    }));
  }

  return base as Question;
});

// Process computed fields from meta
const computedFields: Record<string, ComputedField> = {};
if (schema.meta?.computed_fields) {
  Object.entries(schema.meta.computed_fields).forEach(([id, field]) => {
    computedFields[id] = {
      id,
      type: 'computed',
      logic: (field as any)?.logic || field,
      formula: (field as any)?.formula,
      conditions: (field as any)?.conditions,
    };
  });
}

export {
  assessmentSections,
  assessmentConsentBanners,
  assessmentComputed,
  assessmentAddOns,
  computedFields,
};
export const assessmentMeta = schema.meta ?? {};
