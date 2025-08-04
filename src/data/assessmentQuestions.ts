// src/data/assessmentQuestions.ts

import yaml from "js-yaml";
import schemaRaw from "@/ai-readiness-assessment.yaml?raw";
import type {
  Section,
  Question,
  QuestionOption,
  ConsentBanner,
  ComputedField,
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

interface RawQuestion extends Omit<Question, "options" | "groups" | "rows" | "columns"> {
  options?: Array<string | QuestionOption>;
  rows?: Array<string | QuestionOption>;
  columns?: Array<string | QuestionOption>;
  groups?: Array<{
    label: string;
    show_if?: Record<string, unknown>;
    options: Array<string | QuestionOption>;
  }>;
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

// Containers for section-level extras
const assessmentConsentBanners: Record<string, ConsentBanner> = {};
const assessmentComputed: Record<string, ComputedField[]> = {};

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

    // normalize flat and grouped options
    const normalizedQuestions: Question[] = questions.map((q) => {
      const base = { ...q } as Question;

      if (q.options) {
        base.options = normalizeOptions(q.options);
      }
      if (q.rows) {
        base.rows = normalizeOptions(q.rows);
      }
      if (q.columns) {
        base.columns = normalizeOptions(q.columns);
      }
      if (q.groups) {
        base.groups = q.groups.map((g) => ({
          label: g.label,
          show_if: g.show_if,
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
      section.consent_banner = consent_banner;
      assessmentConsentBanners[id] = consent_banner;
    }
    if (computed.length) {
      section.computed = computed;
      assessmentComputed[id] = computed;
    }

    return section;
  });

// Top-level add-ons (if any)
const assessmentAddOns: Question[] = (schema.add_ons ?? []).map((q) => {
  const base = { ...q } as Question;
  if (q.options) {
    base.options = normalizeOptions(q.options);
  }
  if (q.rows) {
    base.rows = normalizeOptions(q.rows);
  }
  if (q.columns) {
    base.columns = normalizeOptions(q.columns);
  }
  if (q.groups) {
    base.groups = q.groups.map((g) => ({
      label: g.label,
      show_if: g.show_if,
      options: normalizeOptions(g.options) || [],
    }));
  }
  return base;
});

export {
  assessmentSections,
  assessmentConsentBanners,
  assessmentComputed,
  assessmentAddOns,
};
export const assessmentMeta = schema.meta ?? {};
export const assessmentData = { sections: assessmentSections };
