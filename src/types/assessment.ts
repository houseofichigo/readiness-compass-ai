// src/types/assessment.ts

export interface QuestionOption {
  value: string;
  label: string;
}

export interface QuestionGroup {
  label: string;
  show_if?: Record<string, unknown>;
  options: QuestionOption[];
}

export interface Question {
  id: string;
  text: string;
  type: string;
  helper?: string;
  required?: boolean;
  options?: QuestionOption[];
  groups?: QuestionGroup[];
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

export interface ConsentBanner {
  text: string;
  type: string;
  required: boolean;
}

export interface ComputedField {
  id: string;
  logic: string;
}

export interface Section {
  id: string;
  title: string;
  purpose: string;
  questions: Question[];
  consent_banner?: ConsentBanner;
  computed?: ComputedField[];
}

export interface WeightVector {
  Strategy: number;
  Data: number;
  Tools: number;
  Automation: number;
  People: number;
  Governance: number;
}

export type Track = "TECH" | "REG" | "GEN";

export interface OrganizationProfile {
  M0: string; // Organization name
  M1: string; // Full name
  M2: string; // Business email
  M3: string; // Primary role
  M3_other: string; // Primary role (other)
  M4_industry: string; // Industry
  M4_sub: string; // Industry sub-sector
  M5_country: string; // Country
  M6_size: string; // Company size
  M7_revenue: string; // Annual revenue
  M8_consent: boolean; // Consent checkbox
}

export interface AssessmentResponse {
  questionId: string;
  value: any;
  sectionId: string;
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