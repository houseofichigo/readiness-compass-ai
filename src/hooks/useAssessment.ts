import { useState } from 'react';
import { toast } from "sonner";
import type { AssessmentValue, OrganizationProfile } from '@/types/assessment';
import { supabase } from '@/integrations/supabase/client';
import { assessmentSections, assessmentAddOns } from '@/data/assessmentQuestions';
import { safeUuidV4 } from '@/utils/uuid';

export function useAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAssessment = async (
    responses: Record<string, AssessmentValue>,
    profile: OrganizationProfile,
    assessmentId: string = 'ai_readiness_v2'
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Robust, valid UUID v4 for submission id across browsers
      const submissionId = safeUuidV4();
      console.log('[saveAssessment] Generated submissionId:', submissionId);

      // Track UTM params from URL
      const params = new URLSearchParams(window.location.search);

      // Extract organization and contact info for direct storage
      const orgName = (profile?.M0 || (responses['M0'] as string) || '').toString();
      const contactName = (profile?.M1 || (responses['M1'] as string) || '').toString();
      const contactEmail = (profile?.M2 || (responses['M2'] as string) || '').toString();

      console.log('[saveAssessment] Inserting submission...');
      const { error: subErr } = await supabase
        .from('submissions')
        .insert({
          id: submissionId,
          completed: true,
          organization_name: orgName || null,
          contact_name: contactName || null,
          contact_email: contactEmail || null,
          user_agent: navigator.userAgent,
          referrer_url: document.referrer || null,
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
        });

      if (subErr) {
        console.error('[saveAssessment] Submission insert failed:', {
          message: subErr.message,
          code: (subErr as any).code,
          details: (subErr as any).details,
          hint: (subErr as any).hint,
        });
        setError(subErr.message || 'Failed to create submission');
        toast.error('Failed to create submission');
        return null;
      }

      // Build set of valid question IDs to avoid FK violations
      const sectionQuestionIds = assessmentSections.flatMap(s => (s.questions || []).map(q => q.id));
      const addOnIds = (assessmentAddOns || []).map(q => q.id);
      const validIds = new Set<string>([...sectionQuestionIds, ...addOnIds]);

      const answers = Object.entries(responses)
        .filter(([questionId]) => validIds.has(questionId))
        .map(([questionId, value]) => ({
          submission_id: submissionId,
          question_id: questionId,
          raw_response: value ?? null,
          chosen_value: typeof value === 'string' ? (value as string) : null,
        }));

      console.log('[saveAssessment] Prepared answers count:', answers.length);

      if (answers.length > 0) {
        console.log('[saveAssessment] Inserting answers batch...');
        const { error: ansErr } = await supabase
          .from('answers')
          .insert(answers);

        if (ansErr) {
          console.error('[saveAssessment] Answers insert failed:', {
            message: ansErr.message,
            code: (ansErr as any).code,
            details: (ansErr as any).details,
            hint: (ansErr as any).hint,
            firstAnswer: answers[0],
          });
          setError(ansErr.message || 'Failed to save answers');
          toast.error('Failed to save answers');
          return null;
        }
      } else {
        console.warn('[saveAssessment] No valid answers to insert (all filtered or empty).');
      }

      // Populate organization, sessions, and analytics via secure RPCs (won't block on failure)
      try {
        const orgName = (profile?.M0 || (responses['M0'] as string) || '').toString();
        const { error: orgErr } = await supabase.rpc('ensure_organization_and_attach_submission', {
          _submission_id: submissionId,
          _name: orgName,
          _industry: (profile?.M4_industry || (responses['M4_industry'] as string) || null) as string | null,
          _country: (profile?.M5_country || (responses['M5_country'] as string) || null) as string | null,
          _size_bucket: (profile?.M6_size || (responses['M6_size'] as string) || null) as string | null,
          _revenue_bucket: (profile?.M7_revenue || (responses['M7_revenue'] as string) || null) as string | null,
          _track: (profile?.track || null) as any,
        });
        if (orgErr) console.warn('[saveAssessment] ensure_organization RPC failed:', orgErr.message);

        const { error: sessErr } = await supabase.rpc('record_assessment_session', {
          _submission_id: submissionId,
        });
        if (sessErr) console.warn('[saveAssessment] record_assessment_session RPC failed:', sessErr.message);

        const { error: evtErr } = await supabase.rpc('record_analytics_event', {
          _submission_id: submissionId,
          _event_name: 'assessment_submitted',
          _event_category: 'assessment',
          _event_data: {
            utm_source: params.get('utm_source'),
            utm_medium: params.get('utm_medium'),
            utm_campaign: params.get('utm_campaign'),
          },
        });
        if (evtErr) console.warn('[saveAssessment] record_analytics_event RPC failed:', evtErr.message);
      } catch (rpcErr) {
        console.warn('[saveAssessment] Non-blocking RPC error:', rpcErr);
      }

      toast.success('Assessment submitted');
      console.log('[saveAssessment] Completed OK for submission:', submissionId);
      return submissionId;
    } catch (e: any) {
      console.error('[saveAssessment] Unexpected error:', e);
      setError(e?.message || 'Unexpected error');
      toast.error('Unexpected error submitting assessment');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const loadAssessment = async (submissionId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('[loadAssessment] Loading submission via RPC:', submissionId);
      
      // Use secure RPC to load submission data (bypasses RLS issues)
      const { data: submissionData, error: rpcErr } = await supabase
        .rpc('load_submission_data', { _submission_id: submissionId });

      if (rpcErr) {
        console.error('[loadAssessment] RPC failed:', rpcErr.message);
        setError(rpcErr.message);
        return null;
      }

      if (!submissionData) {
        console.warn('[loadAssessment] No submission found for ID:', submissionId);
        return null;
      }

      // Type-safe data access with proper casting
      const submissionObj = submissionData as any;
      
      // Convert answers array to responses object
      const responses: Record<string, any> = {};
      if (submissionObj.answers && Array.isArray(submissionObj.answers)) {
        submissionObj.answers.forEach((answer: any) => {
          responses[answer.question_id] = answer.raw_response;
        });
      }

      // Build profile from responses (M0, M1, etc.)
      const profile: any = {};
      Object.entries(responses).forEach(([questionId, value]) => {
        if (questionId.startsWith('M')) {
          profile[questionId] = value;
        }
      });

      console.log('[loadAssessment] Loaded successfully via RPC:', {
        submissionId,
        answersCount: submissionObj.answers?.length || 0,
        profileKeys: Object.keys(profile),
        totalScore: submissionObj.total_score,
        percentageScore: submissionObj.percentage_score
      });

      return {
        submissionId,
        profile,
        responses,
        totalScore: submissionObj.total_score,
        pillarScores: submissionObj.pillar_scores,
        percentageScore: submissionObj.percentage_score
      };
    } catch (e: any) {
      console.error('[loadAssessment] Unexpected error:', e);
      setError(e?.message || 'Failed to load assessment');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getRecentAssessments = async (limit: number = 10) => {
    return [];
  };

  return {
    saveAssessment,
    loadAssessment,
    getRecentAssessments,
    isLoading,
    error,
  };
}
