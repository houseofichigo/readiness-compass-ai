// Type definitions for the AI Readiness Assessment

export type QuestionType = 
  | "single" 
  | "multi" 
  | "rank" 
  | "matrix" 
  | "text" 
  | "number"
  | "boolean"
  | "email"
  | "checkbox"
  | "multi_group";

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface QuestionGroup {
  label: string;
  showIf?: Record<string, unknown>;
  options: QuestionOption[];
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  helper?: string;
  required?: boolean;
  options?: QuestionOption[];
  rows?: string[] | QuestionOption[];
  columns?: string[] | QuestionOption[];
  groups?: QuestionGroup[];
  showIf?: Record<string, unknown>;
  hideIf?: Record<string, unknown>;
  scoreMap?: number[];
  scorePer?: number;
  cap?: number;
  weight?: number[];
  maxRank?: number;
  maxSelect?: number;
  scoreByCount?: Record<string, number>;
}

export interface ConsentBanner {
  title: string;
  description: string;
  consent_text: string;
  text?: string;
  required: boolean;
}

export interface ComputedField {
  id: string;
  type: string;
  formula?: string;
  logic?: Record<string, unknown>;
  conditions?: Record<string, unknown>;
}

export interface Section {
  id: string;
  title: string;
  purpose: string;
  questions: Question[];
  consentBanner?: ConsentBanner;
  computed?: ComputedField[];
}

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

export type Track = "TECH" | "REG" | "GEN";

export interface OrganizationProfile {
  name?: string;
  role?: string;
  industry?: string;
  country?: string;
  size?: string;
  revenue?: string;
  track?: Track;
  regulated?: boolean;
  M0?: string;
  M1?: string;
  M3?: string;
  [key: string]: unknown;
}

export interface AssessmentResponse {
  questionId: string;
  value: string | string[] | number | boolean;
  sectionId: string;
}

export interface WeightVector {
  strategy: number;
  finance: number;
  data: number;
  tools: number;
  automation: number;
  people: number;
  governance: number;
  planning: number;
}

export interface ScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  categoryScores: Record<string, number>;
  track: Track;
  organizationProfile: OrganizationProfile;
}