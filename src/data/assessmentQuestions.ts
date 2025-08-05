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

type Language = 'en' | 'fr';

// Store current language
let currentLanguage: Language = 'en';

// Function to set current language
export function setLanguage(language: Language): void {
  currentLanguage = language;
}

// Function to get current language
export function getCurrentLanguage(): Language {
  return currentLanguage;
}

// Titles for each section
const SECTION_TITLES_EN: Record<string, string> = {
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

const SECTION_TITLES_FR: Record<string, string> = {
  section_0: "Profil de l'organisation",
  section_1: "Stratégie et préparation des cas d'usage",
  section_2: "Budget, trésorerie et conformité", 
  section_3: "Fondation des données et sécurité",
  section_4: "Architecture d'outils et intégration",
  section_5: "Automatisation et agents IA",
  section_6: "Capacités de l'équipe et culture",
  section_7: "Gouvernance, risques et éthique",
  section_8: "Horizon et vision de mise en œuvre",
};

interface RawQuestion {
  id: string;
  text: string;
  type: string;
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
  category?: keyof WeightVector | string;
  purpose?: string;
  questions?: RawQuestion[];
  consent_banner?: ConsentBanner;
  computed?: ComputedField[];
}

interface AssessmentYaml {
  meta?: Record<string, unknown>;
  app_title?: string;
  locale_fr?: {
    app_title?: string;
    meta?: Record<string, unknown>;
    [key: `section_${number}`]: RawSection | undefined;
  };
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

// Get content based on current language
function getLocalizedContent(questionId: string, property: string, fallback: any = ""): any {
  if (currentLanguage === 'fr' && schema.locale_fr) {
    // Try to find the question in the French locale
    for (const [sectionKey, sectionData] of Object.entries(schema.locale_fr)) {
      if (sectionKey.startsWith('section_') && sectionData && typeof sectionData === 'object' && 'questions' in sectionData) {
        const rawSection = sectionData as RawSection;
        if (rawSection.questions) {
          const question = rawSection.questions.find(q => q.id === questionId);
          if (question && typeof question === 'object' && property in question) {
            return (question as any)[property];
          }
        }
      }
    }
  }
  return fallback;
}

function getLocalizedSectionContent(sectionId: string, property: string, fallback: any = ""): any {
  if (currentLanguage === 'fr' && schema.locale_fr) {
    const sectionData = schema.locale_fr[sectionId as keyof typeof schema.locale_fr];
    if (sectionData && typeof sectionData === 'object' && property in sectionData) {
      return (sectionData as any)[property];
    }
  }
  return fallback;
}

// Function to build sections with current language
function buildSections(): Section[] {
  const titleMap = currentLanguage === 'fr' ? SECTION_TITLES_FR : SECTION_TITLES_EN;
  
  return Object.entries(schema)
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
        const localizedText = getLocalizedContent(q.id, 'text', q.text);
        const localizedHelper = getLocalizedContent(q.id, 'helper', q.helper);
        const localizedOptions = getLocalizedContent(q.id, 'options', q.options);
        
        const base: Partial<Question> = {
          id: q.id,
          text: localizedText,
          type: q.type as QuestionType,
          helper: localizedHelper,
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

        if (localizedOptions) base.options = normalizeOptions(localizedOptions);
        if (q.rows) base.rows = [...q.rows];
        if (q.columns) base.columns = [...q.columns];

        if (q.groups) {
          base.groups = q.groups.map((g) => ({
            label: g.label,
            showIf: g.show_if,
            options: normalizeOptions(g.options) || [],
          }));
        }

        return base as Question;
      });

      const localizedPurpose = getLocalizedSectionContent(id, 'purpose', purpose);
      const localizedConsentBanner = getLocalizedSectionContent(id, 'consent_banner', consent_banner);

      return {
        id,
        title: titleMap[id] ?? id,
        purpose: localizedPurpose,
        ...(category ? { category } : {}),
        questions: normalizedQuestions,
        ...(localizedConsentBanner ? { consentBanner: localizedConsentBanner } : {}),
        ...(computed.length ? { computed } : {}),
      };
    });
}

// Function to build add-ons with current language
function buildAddOns(): Question[] {
  return (schema.add_ons ?? []).map((q) => {
    const localizedText = getLocalizedContent(q.id, 'text', q.text);
    const localizedHelper = getLocalizedContent(q.id, 'helper', q.helper);
    const localizedOptions = getLocalizedContent(q.id, 'options', q.options);
    
    const base: Partial<Question> = {
      id: q.id,
      text: localizedText,
      type: q.type as QuestionType,
      helper: localizedHelper,
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

    if (localizedOptions) base.options = normalizeOptions(localizedOptions);
    if (q.rows) base.rows = [...q.rows];
    if (q.columns) base.columns = [...q.columns];

    if (q.groups) {
      base.groups = q.groups.map((g) => ({
        label: g.label,
        showIf: g.show_if,
        options: normalizeOptions(g.options) || [],
      }));
    }

    return base as Question;
  });
}

// Functions to get current data
export function getAssessmentSections(): Section[] {
  return buildSections();
}

export function getAssessmentAddOns(): Question[] {
  return buildAddOns();
}

export function getAssessmentMeta(): Record<string, unknown> {
  const baseMeta = schema.meta ?? {};
  if (currentLanguage === 'fr' && schema.locale_fr?.meta) {
    return { ...baseMeta, ...schema.locale_fr.meta };
  }
  return baseMeta;
}

export function getAppTitle(): string {
  if (currentLanguage === 'fr' && schema.locale_fr?.app_title) {
    return schema.locale_fr.app_title;
  }
  return schema.app_title || (schema.meta?.app_title as string) || "AI Readiness Assessment v2.0";
}

// Legacy exports for backward compatibility
export const assessmentSections = buildSections();
export const assessmentAddOns = buildAddOns();
export const assessmentMeta = schema.meta ?? {};
export const assessmentConsentBanners: Record<string, ConsentBanner> = {};
export const assessmentComputed: Record<string, ComputedField[]> = {};