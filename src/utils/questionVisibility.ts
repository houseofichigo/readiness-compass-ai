import { Question } from "@/types/assessment";
import { assessmentMeta } from "@/data/assessmentQuestions";

/** Context for evaluating conditions */
interface EvalContext {
  responses: Record<string, unknown>;
  track: string;
  computed: Record<string, unknown>;
}

/** Determine if a question should be visible based on conditions and total visible count */
export function isQuestionVisible(
  question: Question,
  responses: Record<string, unknown>,
  detectedTrack: string,
  totalVisibleQuestions: number,
  computed: Record<string, unknown> = {}
): boolean {
  const ctx: EvalContext = { responses, track: detectedTrack, computed };
  
  // Check auto-hide rules from YAML meta
  const autoHideQuestions = (assessmentMeta.question_cap as { auto_hide?: string[] })?.auto_hide || [];
  if (autoHideQuestions.includes(question.id)) {
    const maxQuestions = (assessmentMeta.question_cap as { max_questions?: number })?.max_questions || 60;
    if (totalVisibleQuestions >= maxQuestions) {
      return false;
    }
  }
  
  // Check hideIf conditions first (takes precedence)
  if (question.hideIf && evaluateCondition(question.hideIf, ctx)) {
    return false;
  }
  
  // Check showIf conditions
  if (question.showIf && !evaluateCondition(question.showIf, ctx)) {
    return false;
  }
  
  return true;
}

/** Enhanced condition evaluation supporting YAML track precedence syntax */
function evaluateCondition(cond: unknown, ctx: EvalContext): boolean {
  if (!cond || typeof cond !== 'object') return false;
  
  const condObj = cond as Record<string, unknown>;
  
  // Handle string conditions like "role in [CIO / CTO, IT Lead, ...]"
  if (typeof cond === 'string') {
    return evaluateStringCondition(cond, ctx);
  }
  
  // Handle logical operators
  if ('every' in condObj) {
    const arr = Array.isArray(condObj.every) ? condObj.every : [];
    return arr.every((subcond) => evaluateCondition(subcond, ctx));
  }
  
  if ('some' in condObj) {
    const arr = Array.isArray(condObj.some) ? condObj.some : [];
    return arr.some((subcond) => evaluateCondition(subcond, ctx));
  }
  
  // Handle field-level conditions
  for (const [field, rule] of Object.entries(condObj)) {
    const source = getFieldValue(field, ctx);
    if (!matchValue(source, rule)) {
      return false;
    }
  }
  
  return true;
}

/** Evaluate string conditions like "role in [CIO / CTO, IT Lead]" or "computed.regulated" */
function evaluateStringCondition(condition: string, ctx: EvalContext): boolean {
  // Handle "field in [value1, value2, ...]" syntax
  const inMatch = condition.match(/(\w+(?:\.\w+)?)\s+in\s+\[(.*?)\]/);
  if (inMatch) {
    const fieldPath = inMatch[1];
    const valuesList = inMatch[2]
      .split(',')
      .map(v => v.trim().replace(/['"]/g, ''));
    
    const fieldValue = getFieldValue(fieldPath, ctx);
    return valuesList.includes(String(fieldValue));
  }
  
  // Handle simple field references like "computed.regulated"
  const fieldValue = getFieldValue(condition, ctx);
  return Boolean(fieldValue);
}

/** Get field value supporting dot notation (e.g., "computed.regulated") */
function getFieldValue(fieldPath: string, ctx: EvalContext): unknown {
  if (fieldPath.startsWith('computed.')) {
    const computedField = fieldPath.replace('computed.', '');
    return ctx.computed[computedField];
  }
  
  if (fieldPath === 'track') {
    return ctx.track;
  }
  
  // Simple field access
  return ctx.responses[fieldPath];
}

/** Enhanced value matching with better type handling */
function matchValue(source: unknown, rule: unknown): boolean {
  if (rule === null || rule === undefined) {
    return source === rule;
  }
  
  if (typeof rule === "object" && !Array.isArray(rule)) {
    const ruleObj = rule as Record<string, unknown>;
    
    // Handle "in" operator
    if ("in" in ruleObj && Array.isArray(ruleObj.in)) {
      return ruleObj.in.includes(source);
    }
    
    // Handle "not_in" operator
    if ("not_in" in ruleObj && Array.isArray(ruleObj.not_in)) {
      return !ruleObj.not_in.includes(source);
    }
    
    // Handle "subset_of" for array sources
    if ("subset_of" in ruleObj && Array.isArray(ruleObj.subset_of) && Array.isArray(source)) {
      return (source as unknown[]).every(item => (ruleObj.subset_of as unknown[]).includes(item));
    }
    
    // Handle comparison operators
    if ("gt" in ruleObj) return Number(source) > Number(ruleObj.gt);
    if ("gte" in ruleObj) return Number(source) >= Number(ruleObj.gte);
    if ("lt" in ruleObj) return Number(source) < Number(ruleObj.lt);
    if ("lte" in ruleObj) return Number(source) <= Number(ruleObj.lte);
    if ("eq" in ruleObj) return source === ruleObj.eq;
    if ("ne" in ruleObj) return source !== ruleObj.ne;
  }
  
  return source === rule;
}

/** Get regulated industries from assessment data */
function getRegulatedIndustries(): string[] {
  try {
    const computed = assessmentMeta.computed_fields as Record<string, { logic?: string }>;
    const regulatedField = computed?.regulated;
    
    if (regulatedField?.logic) {
      const match = regulatedField.logic.match(/\[(.*?)\]/);
      if (match) {
        return match[1]
          .split(',')
          .map(industry => industry.trim().replace(/['"]/g, ''));
      }
    }
  } catch (error) {
    // YAML parse failed; fall back to default regulated industries list
  }
  
  // Fallback list
  return [
    'Finance & Insurance',
    'Health Care & Social Assistance',
    'Utilities (Electricity, Gas, Water & Waste)',
    'Transportation & Warehousing',
    'Manufacturing',
    'Information & Communication Technology',
    'Professional, Scientific & Technical Services',
    'Administrative & Support & Waste Management Services',
    'Accommodation & Food Services'
  ];
}

/** Get tech roles from YAML or fallback */
function getTechRoles(): string[] {
  return [
    'CIO / CTO',
    'IT Lead',
    'Data / AI Lead',
    'ML Engineer',
    'Data Engineer',
    'DevOps Engineer',
    'Security Architect',
    'Infrastructure Manager'
  ];
}

const TECH_ROLES = getTechRoles();
const REG_INDUSTRIES = getRegulatedIndustries();
const LEGAL_ROLE = 'Legal / Compliance Lead';

/** Enhanced track detection using YAML precedence rules */
export function detectTrack(
  responses: Record<string, unknown>,
  computed: Record<string, unknown> = {}
): string {
  const ctx: EvalContext = { responses, track: 'unknown', computed };
  
  // Apply YAML precedence rules first
  const precedence =
    (assessmentMeta.track_detection as {
      precedence?: Array<Record<string, unknown>>;
    } | undefined)?.precedence;
    
  if (Array.isArray(precedence)) {
    for (const rule of precedence) {
      const { then: track, if: cond, else: elseTrack } = rule;
      
      // Handle 'else' rule (no condition) - this should be last
      if (elseTrack && !cond) {
        return elseTrack as string;
      }
      
      // Handle conditional rules with proper string evaluation
      if (cond && track) {
        if (evaluateCondition(cond, ctx)) {
          return track as string;
        }
      }
    }
  }
  
  // Fallback to simple logic if no YAML rules matched
  const role = responses.M3 as string;
  const industry = responses.M4_industry as string;
  
  if (TECH_ROLES.includes(role)) return 'TECH';
  if (industry && (REG_INDUSTRIES.includes(industry) || role === LEGAL_ROLE)) {
    return 'REG';
  }
  return 'GEN';
}