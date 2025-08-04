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

interface RawQuestion {
  id: string;
  text: string;
  type: QuestionType | string;
  helper?: string;
  required?: boolean;
  options?: Array<string | QuestionOption>;
  rows?: string[];
  columns?: string[];
  groups?: Array<{
    label: string;
    show_if?: Record<string, unknown>;
    options: Array<string | QuestionOption>;
  }>;
  show_if?: Record<string, unknown>;
  hide_if?: Record<string, unknown>;
  score_map?: number[];
  score_per?: number;
  cap?: number;
  weight?: number[];
  max_rank?: number;
  max_select?: number;
  score_formula?: string;
  score_by_count?: Record<string, number>;
}

interface RawSection {
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

const schema = yaml.load(schemaRaw) as AssessmentYaml;

// Normalize a mixed array of strings or objects into QuestionOption[]
const normalizeOptions = (
  options?: Array<string | QuestionOption>
): QuestionOption[] | undefined =>
  options?.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

// Build Section[] from YAML
const assessmentSections: Section[] = Object.entries(schema)
  // keep only keys that start with "section_"
  .filter(([key]) => key.startsWith("section_"))
  // sort by the numeric suffix
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  .map(([id, raw]) => {
    const {
      purpose = "",
      questions = [],
      consent_banner,
      computed = [],
    } = raw ?? {};

    // normalize flat and grouped options and convert to camelCase
    const normalizedQuestions: Question[] = questions.map((q) => {
      const base: Question = {
        id: q.id,
        text: q.text,
        type: q.type as QuestionType,
        helper: q.helper,
        required: q.required,
        options: normalizeOptions(q.options),
        rows: q.rows,
        columns: q.columns,
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

      if (q.groups) {
        base.groups = q.groups.map((g) => ({
          label: g.label,
          showIf: g.show_if,
          options: normalizeOptions(g.options) || [],
        }));
      }

      return base;
    });

    // assemble the Section object
    const section: Section = {
      id,
      title: SECTION_TITLES[id] ?? id,
      purpose,
      questions: normalizedQuestions,
    };

    if (consent_banner) {
      section.consentBanner = consent_banner;
    }
    if (computed.length) {
      section.computed = computed;
    }

    return section;
  });

// Top-level add-ons (if any)
const assessmentAddOns: Question[] = (schema.add_ons ?? []).map((q) => {
  const base: Question = {
    id: q.id,
    text: q.text,
    type: q.type as QuestionType,
    helper: q.helper,
    required: q.required,
    options: normalizeOptions(q.options),
    rows: q.rows,
    columns: q.columns,
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
  if (q.groups) {
    base.groups = q.groups.map((g) => ({
      label: g.label,
      showIf: g.show_if,
      options: normalizeOptions(g.options) || [],
    }));
  }
  return base;
});

export { assessmentSections };
export const assessmentMeta = schema.meta ?? {};
export { assessmentAddOns };
export const assessmentData = { sections: assessmentSections };
