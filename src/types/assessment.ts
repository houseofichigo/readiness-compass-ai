// src/types/assessment.ts

// Type of question inputs
export type QuestionType =
  | "text"
  | "email"
  | "single"
  | "multi"
  | "multi_group"
  | "rank"
  | "matrix"
  | "checkbox"
  | "dropdown"
  | "industry_dropdown";

// Option for single/multi/etc questions
export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
  score?: number;
  reasoning?: string;
  model_input_context?: string;
}

// Group of options
export interface QuestionGroup {
  label: string;
  showIf?: Record<string, unknown>;
  options: QuestionOption[];
}

// Core question shape
export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  helper?: string;
  required?: boolean;

  // For single/multi/dropdown etc.
  options?: QuestionOption[];

  // For matrix
  rows?: (string | QuestionOption)[];
  columns?: (string | QuestionOption)[];

  // For grouped checkboxes
  groups?: QuestionGroup[];

  // Conditional visibility
  showIf?: Record<string, unknown>;
  hideIf?: Record<string, unknown>;

  // Scoring
  scoreMap?: number[];
  scorePer?: number;
  cap?: number;
  weight?: number[];
  maxRank?: number;
  maxSelect?: number;
  scoreByCount?: Record<string, number>;
  scoreFormula?: string;
  scoreMapByBucket?: Record<string, string[]>;
}

// Banner shown in certain sections
export interface ConsentBanner {
  title?: string;
  description?: string;
  text?: string;
  consent_text?: string;
  required: boolean;
}

// Computed (derived) field definition
export interface ComputedField {
  id: string;
  type?: string;
  logic?: string | Record<string, unknown>;
  formula?: string;
  conditions?: Record<string, unknown>;
}

// A quiz or survey section
export interface Section {
  id: string;
  title: string;
  purpose: string;
  /**
   * Category used for scoring. Optional because some sections
   * (e.g. demographic or informational sections) are not scored.
   */
  category?: keyof WeightVector;
  questions: Question[];
  consentBanner?: ConsentBanner;
  computed?: ComputedField[];
  pillar_score?: number;
}

// Overall assessment data
export interface AssessmentData {
  id?: string;
  sections: Section[];
  responses?: Record<string, AssessmentResponse>;
  profile?: OrganizationProfile;
  track?: Track;
  completedSections?: string[];
  totalScore?: number;
  sectionScores?: Record<string, number>;
  createdAt?: Date;
  updatedAt?: Date;
}

// Which track the org falls into
export type Track = "TECH" | "REG" | "GEN";

// Value types answers can take
export type AssessmentValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | null;

// Basic profile fields
export interface OrganizationProfile {
  M0?: string;               // organization name
  M1?: string;               // full name
  M2?: string;               // email
  M3?: string;               // primary role
  M3_other?: string;
  M4_industry?: string;
  M4_sub?: string;
  M5_country?: string;
  M6_size?: string;
  M7_revenue?: string;
  M8_consent?: boolean;
  track?: Track;
  regulated?: boolean;
  [key: string]: unknown;
}

// Individual answer record
export interface AssessmentResponse {
  questionId: string;
  value: AssessmentValue;
  sectionId: string;
}

// Weight vector for scoring by category (per track)
export interface WeightVector {
  strategy: number;
  data: number;
  tools: number;
  automation: number;
  people: number;
  governance: number;
}

// Final scoring results
export interface ScoreResult {
  totalScore: number;
  maxScore?: number;
  percentage?: number;
  sectionScores: Record<string, number>;
  track: Track;
  organizationProfile: OrganizationProfile;
}
