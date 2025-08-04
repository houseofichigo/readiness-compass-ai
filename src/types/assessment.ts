export type Track = "TECH" | "REG" | "GEN";

export type QuestionType =
  | "text"
  | "email"
  | "number"
  | "single"
  | "multi"
  | "multi_group"
  | "rank"
  | "checkbox"
  | "matrix"
  | "industry_dropdown"
  | "country_dropdown";

export interface QuestionOption {
  value: string;
  label: string;
  score?: number;
}

export interface QuestionGroup {
  label: string;
  options: QuestionOption[];
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  groups?: QuestionGroup[];
  rows?: string[];
  columns?: string[];
  required?: boolean;
  helper?: string;
  show_if?: Record<string, any>;
  hide_if?: Record<string, any>;
  max_rank?: number;
  weight?: number[];
  score_map?: number[];
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
  M0: string; // Company name
  M1: string; // Full name
  M2: string; // Work email
  M3: string; // Role/Position
  M3_other?: string;
  M4: string; // Department
  M4_other?: string;
  M5: string; // Industry
  M6: string; // Country
  M7: string; // Company size
  M8: string; // Annual revenue
  M9: string; // Regulated industry
  M10: boolean; // Consent
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
