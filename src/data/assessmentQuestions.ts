// src/data/assessmentQuestions.ts

import yaml from "js-yaml";
import schemaRaw from "@/ai-readiness-assessment.yaml?raw";
import i18n from "@/lib/i18n";
import type {
  Section,
  Question,
  QuestionOption,
  ConsentBanner,
  ComputedField,
  QuestionType,
  WeightVector,
} from "@/types/assessment";

// Titles for each section in both supported locales
const SECTION_TITLES: Record<string, { en: string; fr: string }> = {
  section_0: {
    en: "Organization Profile",
    fr: "Profil de l'organisation",
  },
  section_1: {
    en: "Strategy & Use-Case Readiness",
    fr: "Stratégie et préparation des cas d'utilisation",
  },
  section_2: {
    en: "Budget, Runway & Compliance",
    fr: "Budget, échéancier et conformité",
  },
  section_3: {
    en: "Data Foundation & Security",
    fr: "Fondation des données et sécurité",
  },
  section_4: {
    en: "Tool Stack & Integration",
    fr: "Pile d'outils et intégration",
  },
  section_5: {
    en: "Automation & AI Agents",
    fr: "Automatisation et agents IA",
  },
  section_6: {
    en: "Team Capability & Culture",
    fr: "Capacités de l'équipe et culture",
  },
  section_7: {
    en: "Governance, Risk & Ethics",
    fr: "Gouvernance, risque et éthique",
  },
  section_8: {
    en: "Implementation Horizon & Vision",
    fr: "Horizon d'implémentation et vision",
  },
};

// Get current language from i18n
const lang = i18n.language?.startsWith("fr") ? "fr" : "en";

function pickLang<T extends Record<string, unknown>>(obj: T, key: string): string {
  const result = (
    obj?.[`${key}_${lang}` as keyof T] ??
    obj?.[`${key}_en` as keyof T] ??
    (obj as Record<string, unknown>)[key]
  );
  return typeof result === 'string' ? result : '';
}

interface RawQuestion {
  id: string;
  type: string;
  // Localized text & helper fields
  text?: string;
  text_en?: string;
  text_fr?: string;
  helper?: string;
  helper_en?: string;
  helper_fr?: string;
  required?: boolean;
  // Options/rows/columns may already be objects with localized labels
  options?: Array<string | Record<string, unknown>>;
  rows?: Array<string | Record<string, unknown>>;
  columns?: Array<string | Record<string, unknown>>;
  groups?: Array<{
    label?: string;
    label_en?: string;
    label_fr?: string;
    show_if?: Record<string, unknown>;
    options: Array<string | Record<string, unknown>>;
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
  purpose_en?: string;
  purpose_fr?: string;
  questions?: RawQuestion[];
  consent_banner?: Record<string, unknown>;
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
  opts?: Array<string | Record<string, unknown>>
): QuestionOption[] | undefined {
  return opts?.map((o) => {
    if (typeof o === "string") return { value: o, label: o };
    const obj = o as Record<string, unknown>;
    return {
      value: obj.value as string,
      label: (pickLang(obj, "label") as string) ?? (obj.value as string),
      ...(pickLang(obj, "description")
        ? { description: pickLang(obj, "description") as string }
        : {}),
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
      questions = [],
      consent_banner,
      computed = [],
    } = rawSec ?? {};

    const purpose = pickLang((rawSec ?? {}) as Record<string, unknown>, "purpose");

    const normalizedQuestions: Question[] = questions.map((q) => {
      const base: Partial<Question> = {
        id: q.id,
        text: pickLang(q as Record<string, unknown>, "text"),
        type: q.type as QuestionType,
        helper: pickLang(q as Record<string, unknown>, "helper"),
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

      if (q.options)   base.options = normalizeOptions(q.options);
      if (q.rows)      base.rows    = normalizeOptions(q.rows);
      if (q.columns)   base.columns = normalizeOptions(q.columns);

      if (q.groups) {
        base.groups = q.groups.map((g) => ({
          label: pickLang(g as Record<string, unknown>, "label"),
          showIf: g.show_if,
          options: normalizeOptions(g.options) || [],
        }));
      }

      return base as Question;
    });

    let localizedConsent: ConsentBanner | undefined;
    if (consent_banner) {
      localizedConsent = {
        ...consent_banner,
        ...(pickLang(consent_banner, "title")
          ? { title: pickLang(consent_banner, "title") }
          : {}),
        ...(pickLang(consent_banner, "description")
          ? { description: pickLang(consent_banner, "description") }
          : {}),
        ...(pickLang(consent_banner, "text")
          ? { text: pickLang(consent_banner, "text") }
          : {}),
        ...(pickLang(consent_banner, "consent_text")
          ? { consent_text: pickLang(consent_banner, "consent_text") }
          : {}),
      } as ConsentBanner;
      assessmentConsentBanners[id] = localizedConsent;
    }
    if (computed.length) {
      assessmentComputed[id] = computed;
    }

    return {
      id,
      title: SECTION_TITLES[id]?.[lang] ?? SECTION_TITLES[id]?.en ?? id,
      purpose,
      ...(category ? { category } : {}),
      questions: normalizedQuestions,
      ...(localizedConsent ? { consentBanner: localizedConsent } : {}),
      ...(computed.length ? { computed } : {}),
    };
  });

// Top-level “add_ons” questions
const assessmentAddOns: Question[] = (schema.add_ons ?? []).map((q) => {
  const base: Partial<Question> = {
    id: q.id,
    text: pickLang(q as unknown as Record<string, unknown>, "text"),
    type: q.type as QuestionType,
    helper: pickLang(q as unknown as Record<string, unknown>, "helper"),
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

  if (q.options)  base.options  = normalizeOptions(q.options);
  if (q.rows)     base.rows     = normalizeOptions(q.rows);
  if (q.columns)  base.columns  = normalizeOptions(q.columns);

  if (q.groups) {
    base.groups = q.groups.map((g) => ({
      label: pickLang(g as Record<string, unknown>, "label"),
      showIf: g.show_if,
      options: normalizeOptions(g.options) || [],
    }));
  }

  return base as Question;
});

export {
  assessmentSections,
  assessmentConsentBanners,
  assessmentComputed,
  assessmentAddOns,
};
const rawMeta = schema.meta ?? {};
const localizedMeta: Record<string, unknown> = { ...rawMeta };
if (rawMeta.tracks && typeof rawMeta.tracks === "object") {
    localizedMeta.tracks = Object.fromEntries(
      Object.entries(rawMeta.tracks as Record<string, unknown>).map(([k, v]) => [
      k,
      typeof v === "object" && v !== null
        ? ((v as Record<string, unknown>)[lang] ?? (v as Record<string, unknown>).en ?? "")
        : v,
    ])
  );
}

export const assessmentMeta = localizedMeta;
