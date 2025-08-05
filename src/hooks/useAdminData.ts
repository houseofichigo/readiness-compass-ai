import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export interface AdminAnalytics {
  total_submissions: number;
  completed_submissions: number;
  today_submissions: number;
  week_submissions: number;
  active_organizations: number;
  completion_rate: number;
}

export interface SubmissionDetails {
  id: string;
  assessment_id: string;
  created_at: string;
  updated_at: string;
  track: string;
  regulated: boolean;
  completed: boolean;
  organization_name: string;
  full_name: string;
  email: string;
  role: string;
  industry: string;
  country: string;
  company_size: string;
  revenue: string;
}

export function useAdminData() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_analytics')
        .select('*')
        .single();

      if (error) throw error;
      setAnalytics(data);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: t('toast.admin.errorLoadingAnalytics.title'),
        description: t('toast.admin.errorLoadingAnalytics.description', { message: err.message }),
        variant: "destructive",
      });
    }
  };

  const fetchSubmissions = async (filters: {
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  } = {}) => {
    try {
      let query = supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.search) {
        query = query.or(`organization_name.ilike.%${filters.search}%,full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      if (filters.status === 'completed') {
        query = query.eq('completed', true);
      } else if (filters.status === 'incomplete') {
        query = query.eq('completed', false);
      }

      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate);
      }

      if (filters.endDate) {
        query = query.lte('created_at', filters.endDate);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: t('toast.admin.errorLoadingSubmissions.title'),
        description: t('toast.admin.errorLoadingSubmissions.description', { message: err.message }),
        variant: "destructive",
      });
    }
  };

  const getSubmissionDetails = async (submissionId: string) => {
    try {
      const { data: submission, error: submissionError } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', submissionId)
        .single();

      if (submissionError) throw submissionError;

      const { data: answers, error: answersError } = await supabase
        .from('answers')
        .select('*')
        .eq('submission_id', submissionId);

      if (answersError) throw answersError;

      return { submission, answers };
    } catch (err: any) {
      toast({
        title: t('toast.admin.errorLoadingSubmissionDetails.title'),
        description: t('toast.admin.errorLoadingSubmissionDetails.description', { message: err.message }),
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteSubmission = async (submissionId: string) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', submissionId);

      if (error) throw error;

      toast({
        title: t('toast.admin.submissionDeleted.title'),
        description: t('toast.admin.submissionDeleted.description'),
      });

      // Refresh data
      fetchSubmissions();
      fetchAnalytics();
    } catch (err: any) {
      toast({
        title: t('toast.admin.errorDeletingSubmission.title'),
        description: t('toast.admin.errorDeletingSubmission.description', { message: err.message }),
        variant: "destructive",
      });
    }
  };

  const exportToCSV = (submissions: SubmissionDetails[]) => {
    const headers = [
      'ID', 'Organization', 'Full Name', 'Email', 'Role', 'Industry', 
      'Country', 'Company Size', 'Revenue', 'Track', 'Regulated', 
      'Completed', 'Created At'
    ];

    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        sub.id,
        `"${sub.organization_name || ''}"`,
        `"${sub.full_name || ''}"`,
        `"${sub.email || ''}"`,
        `"${sub.role || ''}"`,
        `"${sub.industry || ''}"`,
        `"${sub.country || ''}"`,
        `"${sub.company_size || ''}"`,
        `"${sub.revenue || ''}"`,
        sub.track,
        sub.regulated,
        sub.completed,
        new Date(sub.created_at).toISOString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('admin-submissions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'submissions'
        },
        () => {
          // Refresh data when submissions change
          fetchAnalytics();
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchAnalytics(), fetchSubmissions()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return {
    analytics,
    submissions,
    isLoading,
    error,
    fetchAnalytics,
    fetchSubmissions,
    getSubmissionDetails,
    deleteSubmission,
    exportToCSV,
  };
}