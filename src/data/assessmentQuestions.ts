import { Section, Question } from "@/types/assessment";

export const organizationProfileQuestions: Question[] = [
  {
    id: "M1",
    text: "Full name",
    type: "text",
    required: true
  },
  {
    id: "M2",
    text: "Work e-mail",
    type: "email",
    required: true
  },
  {
    id: "M3",
    text: "Role / Position",
    type: "single",
    options: [
      { value: "Founder/CEO", label: "Founder/CEO" },
      { value: "C-level", label: "C-level" },
      { value: "CTO/Tech Lead", label: "CTO/Tech Lead" },
      { value: "Head Marketing", label: "Head Marketing" },
      { value: "Head Sales", label: "Head Sales" },
      { value: "Head Finance", label: "Head Finance" },
      { value: "Head Ops", label: "Head Operations" },
      { value: "Legal/Compliance", label: "Legal/Compliance" },
      { value: "IT Lead", label: "IT Lead" },
      { value: "Data/AI Lead", label: "Data/AI Lead" },
      { value: "Product Lead", label: "Product Lead" },
      { value: "HR Lead", label: "HR Lead" },
      { value: "Customer Support Lead", label: "Customer Support Lead" },
      { value: "Other", label: "Other" }
    ],
    required: true
  },
  {
    id: "M3_other",
    text: "If Other, please specify",
    type: "text",
    show_if: { M3: "Other" },
    required: true
  },
  {
    id: "M4",
    text: "Department",
    type: "single",
    options: [
      { value: "Marketing", label: "Marketing" },
      { value: "Sales", label: "Sales" },
      { value: "Finance", label: "Finance" },
      { value: "Operations/Logistics", label: "Operations/Logistics" },
      { value: "IT", label: "IT" },
      { value: "HR", label: "HR" },
      { value: "Product", label: "Product" },
      { value: "Customer Support", label: "Customer Support" },
      { value: "General management", label: "General management" },
      { value: "Multiple", label: "Multiple" },
      { value: "Other", label: "Other" }
    ],
    required: true
  },
  {
    id: "M4_other",
    text: "If Other, please specify",
    type: "text",
    show_if: { M4: "Other" },
    required: true
  },
  {
    id: "M5",
    text: "Industry & Sub-sector",
    type: "industry_dropdown",
    required: true
  },
  {
    id: "M6",
    text: "Country",
    type: "country_dropdown",
    required: true
  },
  {
    id: "M7",
    text: "Company size (FTE)",
    type: "single",
    options: [
      { value: "1-9", label: "1-9" },
      { value: "10-49", label: "10-49" },
      { value: "50-249", label: "50-249" },
      { value: "250-999", label: "250-999" },
      { value: "≥ 1,000", label: "≥ 1,000" }
    ],
    required: true
  },
  {
    id: "M8",
    text: "Annual revenue",
    type: "single",
    options: [
      { value: "< €250k", label: "< €250k" },
      { value: "€250k–1M", label: "€250k–1M" },
      { value: "1–5M", label: "1–5M" },
      { value: "5–20M", label: "5–20M" },
      { value: "20–100M", label: "20–100M" },
      { value: "> 100M", label: "> 100M" },
      { value: "Prefer not to say", label: "Prefer not to say" }
    ],
    required: true
  },
  {
    id: "M9",
    text: "Is your organisation in a regulated industry?",
    type: "single",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
      { value: "Not sure", label: "Not sure" }
    ],
    required: true
  },
  {
    id: "M10",
    text: "I agree to processing my data for the readiness report and related communications.",
    type: "checkbox",
    required: true
  }
];

export const strategyQuestions: Question[] = [
  {
    id: "S1",
    text: "Have you listed AI opportunities to launch within 12 months?",
    type: "single",
    options: [
      { value: "None", label: "None", score: 0 },
      { value: "Idea list only", label: "Idea list only", score: 25 },
      { value: "1–2 documented use-cases", label: "1–2 documented use-cases", score: 50 },
      { value: "3–5 prioritised w/owners", label: "3–5 prioritised w/owners", score: 75 },
      { value: "≥ 6 with owner & timeline", label: "≥ 6 with owner & timeline", score: 100 }
    ],
    score_map: [0, 25, 50, 75, 100]
  },
  {
    id: "S2",
    text: "What prioritisation approach does your organisation use?",
    type: "single",
    options: [
      { value: "No formal process", label: "No formal process" },
      { value: "Ad-hoc based on perceived value", label: "Ad-hoc based on perceived value" },
      { value: "Impact × Effort matrix", label: "Impact × Effort matrix" },
      { value: "Impact × Effort + capacity weighting", label: "Impact × Effort + capacity weighting" },
      { value: "ROI-driven financial model", label: "ROI-driven financial model" },
      { value: "Risk-adjusted prioritisation model", label: "Risk-adjusted prioritisation model" }
    ],
    show_if: { S1: "not_in:None,Idea list only" }
  },
  {
    id: "S7",
    text: "Rank your top two AI objectives",
    type: "rank",
    max_rank: 2,
    weight: [70, 30],
    options: [
      { value: "Productivity", label: "Productivity" },
      { value: "Cost reduction", label: "Cost reduction" },
      { value: "Revenue growth", label: "Revenue growth" },
      { value: "Customer-experience improvement", label: "Customer-experience improvement" },
      { value: "Innovation", label: "Innovation" },
      { value: "Regulatory compliance", label: "Regulatory compliance" },
      { value: "Investor positioning", label: "Investor positioning" }
    ]
  }
];

export const assessmentSections: Section[] = [
  {
    id: "section_0",
    title: "Organization Profile",
    purpose: "Collect organisation profile for track detection.",
    questions: organizationProfileQuestions
  },
  {
    id: "section_1",
    title: "Strategy & Use-Case Readiness",
    purpose: "Assess strategic alignment & planning maturity.",
    questions: strategyQuestions
  }
];