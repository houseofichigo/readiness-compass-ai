// src/utils/visibilityAndTrack.ts

import { Question } from '@/types/assessment';
import { assessmentMeta, assessmentSections } from '@/data/assessmentQuestions';

interface EvalContext {
  responses: Record<string, unknown>;
  track?: string;
  computed?: Record<string, unknown>;
}

/** Determine if a question should be shown */
export function isQuestionVisible(
  question: Question,
  responses: Record<string, unknown>,
  detectedTrack: string,
  totalVisibleQuestions: number,
  computed: Record<string, unknown> = {}
): boolean {
  // auto-hide overflow questions
  if (totalVisibleQuestions >= 60 && (question.id === 'D2' || question.id === 'P6')) {
    return false;
  }

  const ctx: EvalContext = { responses, track: detectedTrack, computed };

  if (question.showIf) {
    return evaluateCondition(question.showIf, ctx);
  }
  if (question.hideIf) {
    return !evaluateCondition(question.hideIf, ctx);
  }
  return true;
}

/** Evaluate complex conditions recursively */
function evaluateCondition(cond: unknown, ctx: EvalContext): boolean {
  if (!cond) return true;
  if (Array.isArray(cond)) {
    return cond.every(c => evaluateCondition(c, ctx));
  }
  if (typeof cond !== 'object') {
    return Boolean(cond);
  }
  const obj = cond as Record<string, unknown>;
  if ('any_of' in obj) {
    return (obj.any_of as unknown[]).some(c => evaluateCondition(c, ctx));
  }
  if ('all_of' in obj) {
    return (obj.all_of as unknown[]).every(c => evaluateCondition(c, ctx));
  }
  // field-level checks
  return Object.entries(obj).every(([field, rule]) => {
    if (field === 'track') {
      return matchValue(ctx.track, rule);
    }
    if (field === 'computed') {
      // top-level computed map
      return Object.entries(rule as Record<string, unknown>).every(([k, v]) =>
        matchValue(ctx.computed?.[k], v)
      );
    }
    if (field.startsWith('computed.')) {
      const key = field.slice('computed.'.length);
      return matchValue(ctx.computed?.[key], rule);
    }
    // response check
    return matchValue(ctx.responses[field], rule);
  });
}

function matchValue(source: unknown, rule: unknown): boolean {
  if (rule === undefined) return true;
  // object-style operators
  if (rule && typeof rule === 'object' && !Array.isArray(rule)) {
    const r = rule as Record<string, unknown>;
    if ('in' in r) {
      const list = r.in as unknown[];
      return Array.isArray(source)
        ? source.some(v => list.includes(v))
        : list.includes(source);
    }
    if ('not_in' in r) {
      const list = r.not_in as unknown[];
      return Array.isArray(source)
        ? !source.some(v => list.includes(v))
        : !list.includes(source);
    }
    if ('subset_of' in r) {
      const list = r.subset_of as unknown[];
      return Array.isArray(source)
        ? source.every(v => list.includes(v))
        : list.includes(source);
    }
    if ('not' in r) {
      const nv = r.not as unknown;
      if (Array.isArray(source)) {
        const arr = Array.isArray(nv) ? nv : [nv];
        return !source.some(v => arr.includes(v));
      }
      return Array.isArray(nv) ? !nv.includes(source) : source !== nv;
    }
    // nested object match
    return Object.entries(r).every(([k, v]) =>
      matchValue((source as any)?.[k], v)
    );
  }
  // array equality
  if (Array.isArray(rule)) {
    return Array.isArray(source)
      ? source.some(v => (rule as unknown[]).includes(v))
      : (rule as unknown[]).includes(source);
  }
  // primitive equality
  return source === rule;
}

/** Parse out list literals like `['A','B']` from YAML code */
const parseListLiteral = (literal: string): string[] => {
  const m = literal.match(/\[(.*?)\]/s);
  if (!m) return [];
  return m[1].split(',').map(s => s.trim().replace(/['"]/g, ''));
};

/** Pull tech-roles from the track_detection rules */
function getTechRoles(): string[] {
  const precedence = (assessmentMeta as any).track_detection?.precedence || [];
  const techRule = (precedence as any[]).find(r =>
    typeof r.if === 'string' && r.if.includes('-> TECH')
  );
  if (!techRule) return [];
  return parseListLiteral((techRule.if as string));
}

/** Pull regulated industries from the computed logic */
function getRegulatedIndustries(): string[] {
  const prof = assessmentSections.find(s => s.id === 'section_0');
  const logic = prof?.computed?.find(c => c.id === 'regulated')?.logic || '';
  return parseListLiteral(logic);
}

const TECH_ROLES = getTechRoles();
const REG_INDUSTRIES = getRegulatedIndustries();
const LEGAL_ROLE = 'Legal / Compliance Lead';

/** Determine the track using YAML precedence (falling back to simple rule) */
export function detectTrack(
  responses: Record<string, unknown>,
  computed: Record<string, unknown> = {}
): string {
  // first, apply any YAML rules
  const precedence = (assessmentMeta as any).track_detection?.precedence as
    | Array<Record<string, unknown>>
    | undefined;
  if (Array.isArray(precedence)) {
    for (const rule of precedence) {
      const { track, if: cond, ...rest } = rule as any;
      const condition = cond ?? rest;
      if (track && evaluateCondition(condition, { responses, computed })) {
        return track as string;
      }
    }
  }
  // fallback simple logic
  const role = responses.M3 as string;
  const industry = responses.M4_industry as string;
  if (TECH_ROLES.includes(role)) return 'TECH';
  if (industry && (REG_INDUSTRIES.includes(industry) || role === LEGAL_ROLE)) {
    return 'REG';
  }
  return 'GEN';
}
