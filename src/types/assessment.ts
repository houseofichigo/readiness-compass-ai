export type Track = "TECH" | "REG" | "GEN";

export type QuestionType =
  | "text"
  | "email"
  | "single"
  | "multi"
  | "rank"
  | "checkbox"
  | "multi_group"
  | "matrix";

export interface QuestionOption {
  value: string;
  label: string;
  score?: number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  groups?: {
    label: string;
    options: QuestionOption[];
    show_if?: Record<string, unknown>;
  }[];
  rows?: string[];
  columns?: string[];
  required?: boolean;
  helper?: string;
  show_if?: Record<string, unknown>;
  hide_if?: Record<string, unknown>;
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
}

export interface OrganizationProfile {
  M0: string; // Organization name
  M1: string; // Full name
  M2: string; // Business e-mail
  M3: string; // Primary role
  M3_other?: string;
  M4_industry: string; // Industry & sub-sector
  M4_sub?: string; // Industry (other)
  M5_country: string; // Country
  M6_size: string; // Company size (FTE)
  M7_revenue: string; // Annual revenue
  M8_consent: boolean; // Consent
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
  REG: { Strategy: 10, Data: 20, Tools: 10, Automation: 10, People: 5, Governance: 45 },
  GEN: { Strategy: 25, Data: 15, Tools: 15, Automation: 15, People: 15, Governance: 15 }
};
