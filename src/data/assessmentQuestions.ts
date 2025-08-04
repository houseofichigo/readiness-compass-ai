// src/data/assessmentQuestions.ts

import yaml from "js-yaml";
import schemaRaw from "@/ai-readiness-assessment.yaml?raw";
import type { Section, Question, QuestionOption, ComputedField } from "@/types/assessment";

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

interface RawQuestion extends Omit<Question, "options"> {
  options?: Array<string | QuestionOption>;
  groups?: Array<{
    label: string;
    show_if?: Record<string, unknown>;
    options: Array<string | QuestionOption>;
  }>;
}

interface RawSection {
  purpose?: string;
  questions?: RawQuestion[];
  computed?: ComputedField[];
}

interface AssessmentYaml {
  meta?: Record<string, unknown>;
  add_ons?: RawQuestion[];
  [key: `section_${number}`]: RawSection | undefined;
}

const schema = yaml.load(schemaRaw) as AssessmentYaml;

// Turn string-or-object into QuestionOption[]
const normalizeOptions = (
  options?: Array<string | QuestionOption>
): QuestionOption[] | undefined =>
  options?.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

// Build Section[] from YAML
const assessmentSections: Section[] = Object.entries(schema)
  .filter(([key]): key is `section_${string}` => key.startsWith("section_"))
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  .map(([id, raw]) => {
    const { purpose = "", questions = [], computed = [] } = raw ?? {};
    const normalizedQuestions: Question[] = questions.map((q) => {
      const base: any = { ...q };
      if (q.options) {
        base.options = normalizeOptions(q.options);
      }
      if (q.groups) {
        base.groups = q.groups.map((g) => ({
          label: g.label,
          show_if: g.show_if,
          options: normalizeOptions(g.options),
        }));
      }
      return base as Question;
    });

    return {
      id,
      title: SECTION_TITLES[id] ?? id,
      purpose,
      questions: normalizedQuestions,
      computed,
    };
  });

// Top-level add-ons (if any)
const assessmentAddOns: Question[] = (schema.add_ons ?? []).map((q) => ({
  ...q,
  options: normalizeOptions(q.options),
}));

export { assessmentSections };
export const assessmentMeta = schema.meta ?? {};
export { assessmentAddOns };
export const assessmentData = { sections: assessmentSections };
