import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AssessmentValue, OrganizationProfile, Track } from '@/types/assessment';
import { useToast } from '@/hooks/use-toast';

export interface AssessmentSubmission {
  id: string;
  assessment_id: string;
  created_at: string;
  updated_at: string;
  track: Track;
  regulated?: boolean;
  completed: boolean;
  organization_name?: string;
  full_name?: string;
  email?: string;
  role?: string;
  role_other?: string;
  industry?: string;
  industry_other?: string;
  country?: string;
  company_size?: string;
  revenue?: string;
}

export interface AssessmentAnswer {
  submission_id: string;
  question_id: string;
  value: any;
  answered_at: string;
}

export function useAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const saveAssessment = async (
    responses: Record<string, AssessmentValue>,
    profile: OrganizationProfile,
    assessmentId: string = 'ai_readiness_v2'
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Save assessment responses to Supabase
      
      // Create submission record
      const submissionData = {
        assessment_id: assessmentId,
        track: profile.track || 'GEN',
        regulated: profile.regulated || false,
        completed: true,
        organization_name: profile.M0 || '',
        full_name: profile.M1 || '',
        email: profile.M2 || '',
        role: profile.M3 || '',
        role_other: profile.M3_other || '',
        industry: profile.M4_industry || '',
        industry_other: profile.M4_sub || '',
        country: profile.M5_country || '',
        company_size: profile.M6_size || '',
        revenue: profile.M7_revenue || ''
      };

      

      

      const { data: submission, error: submissionError } = await supabase
        .from('submissions')
        .insert([submissionData])
        .select()
        .single();

      if (submissionError) {
        // Error creating submission
        throw submissionError;
      }
      
      // Submission created successfully, now save individual answers

      // Save individual answers
      const answers = Object.entries(responses)
        .filter(([key, value]) => {
          // Filter out empty responses, but be more specific about what constitutes "empty"
          if (value === undefined || value === null) return false;
          if (typeof value === 'string' && value.trim() === '') return false;
          if (Array.isArray(value) && value.length === 0) return false;
          return true;
        })
        .map(([questionId, value]) => ({
          submission_id: submission.id,
          question_id: questionId,
          value: value // Store the value directly as JSONB can handle any type
        }));

      // Prepared answers for database insertion

      if (answers.length > 0) {
        const { error: answersError } = await supabase
          .from('answers')
          .insert(answers);

        if (answersError) {
          // Error inserting answers
          throw answersError;
        }
        
        // All answers inserted successfully
      } else {
        // No valid answers to save
      }

      toast({
        title: "Assessment saved successfully!",
        description: "Your assessment results have been saved to the database.",
      });

      return submission.id;
    } catch (err: any) {
      // Error occurred during assessment save process
      
      const errorMessage = err.message || 'Failed to save assessment';
      setError(errorMessage);
      toast({
        title: "Error saving assessment",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const loadAssessment = async (submissionId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Load submission
      const { data: submission, error: submissionError } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', submissionId)
        .single();

      if (submissionError) throw submissionError;

      // Load answers
      const { data: answers, error: answersError } = await supabase
        .from('answers')
        .select('*')
        .eq('submission_id', submissionId);

      if (answersError) throw answersError;

      // Convert answers back to responses format
      const responses = answers.reduce((acc, answer) => {
        try {
          // Parse JSON value back to original format
          acc[answer.question_id] = JSON.parse(String(answer.value));
        } catch {
          // Fallback for non-JSON values
          acc[answer.question_id] = answer.value as AssessmentValue;
        }
        return acc;
      }, {} as Record<string, AssessmentValue>);

      const profile: OrganizationProfile = {
        M0: submission.organization_name || '',
        M1: submission.full_name || '',
        M2: submission.email || '',
        M3: submission.role || '',
        M3_other: submission.role_other || '',
        M4_industry: submission.industry || '',
        M4_sub: submission.industry_other || '',
        M5_country: submission.country || '',
        M6_size: submission.company_size || '',
        M7_revenue: submission.revenue || '',
        track: submission.track as Track,
        regulated: submission.regulated || false
      };

      return { submission, responses, profile };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load assessment';
      setError(errorMessage);
      toast({
        title: "Error loading assessment",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getRecentAssessments = async (limit: number = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: submissions, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('completed', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return submissions;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load assessments';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveAssessment,
    loadAssessment,
    getRecentAssessments,
    isLoading,
    error
  };
}