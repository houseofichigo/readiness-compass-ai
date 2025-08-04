// src/data/assessmentQuestions.ts
import yaml from "js-yaml";
import schemaRaw from "@/ai-readiness-assessment.yaml?raw";
import type {
  Section,
  Question,
  QuestionOption,
  ConsentBanner,
  ComputedField
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
  section_8: "Implementation Horizon & Vision"
};

interface RawQuestion extends Omit<Question, "options"> {
  options?: Array<string | QuestionOption>;
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
  [key: `section_${number}`]: RawSection | Record<string, unknown> | undefined;
}

const schema = yaml.load(schemaRaw) as AssessmentYaml;

const normalizeOptions = (
  options?: Array<string | QuestionOption>
): QuestionOption[] | undefined =>
  options?.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

// Extract section_* entries and map to application Section objects
const sectionConsentBanners: Record<string, ConsentBanner> = {};
const sectionComputed: Record<string, ComputedField[]> = {};

const assessmentSections: Section[] = Object.entries(schema)
  .filter(([key]): key is `section_${string}` => key.startsWith("section_"))
  .map(([id, value]) => {
    const {
      purpose = "",
      questions = [],
      consent_banner,
      computed
    } = (value as RawSection) ?? {};
    const normalizedQuestions: Question[] = questions.map((q) => ({
      ...q,
      options: normalizeOptions(q.options)
    }));

    if (consent_banner) sectionConsentBanners[id] = consent_banner;
    if (computed) sectionComputed[id] = computed;

    return {
      id,
      title: SECTION_TITLES[id] ?? id,
      purpose,
      questions: normalizedQuestions,
      consent_banner,
      computed
    };
  });

const assessmentAddOns: Question[] = (schema.add_ons ?? []).map((q) => ({
  ...q,
  options: normalizeOptions(q.options)
}));

export { assessmentSections };
export const assessmentConsentBanners = sectionConsentBanners;
export const assessmentComputed = sectionComputed;
export const assessmentMeta = schema.meta ?? {};
export { assessmentAddOns };
export const assessmentData = {
  sections: assessmentSections,
  consent_banner: assessmentConsentBanners,
  computed: sectionComputed
};
