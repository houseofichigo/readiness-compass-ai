// src/types/assessment.ts

export type Track = "TECH" | "REG" | "GEN";

export type QuestionType =
  | "text"
  | "email"
  | "single"
  | "multi"
  | "rank"
  | "checkbox"
  | "industry_dropdown"
  | "country_dropdown"
  | "multi_group";

export interface QuestionOption {
  value: string;
  label: string;
  score?: number;
}

/** A piece of logic declared in YAML to compute a derived field */
export interface ComputedField {
  /** the computed field’s id (e.g. "regulated") */
  id: string;
  /** the code snippet (as string) to evaluate at runtime */
  logic: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  /** for grouped questions (multi_group or multi) */
  groups?: Array<{
    label: string;
    show_if?: Record<string, any>;
    options: QuestionOption[];
  }>;
  required?: boolean;
  helper?: string;
  show_if?: Record<string, any>;
  hide_if?: Record<string, any>;
  max_rank?: number;
  weight?: number[];
  score_map?: number[];
  score_by_count?: Record<string, number>;
  score_per?: number;
  cap?: number;
  max_select?: number;
  label?: string;
  tooltip_each?: boolean;
}

export interface Section {
  id: string;
  title: string;
  purpose: string;
  questions: Question[];
  /** any YAML-declared computed logic to run at form-runtime */
  computed?: ComputedField[];
}

export interface OrganizationProfile {
  M0: string;              // Organization name
  M1: string;              // Full name
  M2: string;              // Business email
  M3: string;              // Primary role
  M3_other?: string;
  M4_industry: string;     // Industry
  M4_sub?: string;         // Industry (other)
  M5_country: string;      // Country
  M6_size: string;         // Company size
  M7_revenue: string;      // Annual revenue
  M8_consent: boolean;     // Consent
}

export interface AssessmentResponse {
  questionId: string;
  value: string | string[] | number | boolean;
  sectionId: string;
  score?: number;
}

export interface AssessmentData {
  id: string;
  profile: OrganizationProfile;
  track: Track;
  responses: AssessmentResponse[];
  completedSections: string[];
  totalScore: number;
  sectionScores: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeightVector {
  Strategy: number;
  Data: number;
  Tools: number;
  Automation: number;
  People: number;
  Governance: number;
}

export const TRACK_WEIGHTS: Record<Track, WeightVector> = {
  TECH: { Strategy: 20, Data: 30, Tools: 20, Automation: 15, People: 5, Governance: 10 },
  REG:  { Strategy: 10, Data: 20, Tools: 10, Automation: 10, People: 5, Governance: 45 },
  GEN:  { Strategy: 25, Data: 15, Tools: 15, Automation: 15, People: 15, Governance: 15 }
};
