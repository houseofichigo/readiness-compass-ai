// TEMPORARY STUB - Phase 1 Cleanup
// This file contains stub implementations to prevent TypeScript errors
// Will be replaced with full implementation in Phase 2

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AdminAnalytics {
  total_submissions: number;
  completed_submissions: number;
  active_organizations: number;
  completion_rate: number;
  today_submissions: number;
  week_submissions: number;
}

export interface SubmissionDetails {
  id: string;
  assessment_id: string;
  created_at: string;
  updated_at: string;
  submission_status: string;
  full_name: string;
  email: string;
  organization_name: string;
  industry: string;
  country: string;
  organization_size: string;
  revenue_range: string;
  [key: string]: any;
}

export function useAdminData() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Analytics fetch
  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      // Parallel queries
      const [totalRes, completedRes, todayRes, weekRes, orgsRes] = await Promise.all([
        supabase.from('submissions').select('id', { count: 'exact', head: true }),
        supabase.from('submissions').select('id', { count: 'exact', head: true }).eq('completed', true),
        supabase
          .from('submissions')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', startOfToday.toISOString()),
        supabase
          .from('submissions')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString()),
        supabase
          .from('organizations')
          .select('id')
      ]);

      const total = totalRes.count ?? 0;
      const completed = completedRes.count ?? 0;
      const today = todayRes.count ?? 0;
      const week = weekRes.count ?? 0;

      // Unique orgs with at least one submission
      const activeOrgIds = new Set<string>();
      if (orgsRes.data) {
        // Fallback: we compute based on submissions in next block if needed
      }
      const subsForOrgs = await supabase
        .from('submissions')
        .select('organization_id')
        .not('organization_id', 'is', null);
      subsForOrgs.data?.forEach((row: any) => {
        if (row.organization_id) activeOrgIds.add(row.organization_id);
      });

      const analyticsData: AdminAnalytics = {
        total_submissions: total,
        completed_submissions: completed,
        active_organizations: activeOrgIds.size,
        completion_rate: total > 0 ? Math.round((completed / total) * 100) : 0,
        today_submissions: today,
        week_submissions: week,
      };
      setAnalytics(analyticsData);
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubmissions = async (filters: any = {}) => {
    try {
      setIsLoading(true);
      setError(null);

      // Base submissions query
      let subQuery = supabase
        .from('submissions')
        .select('id, created_at, updated_at, completed, percentage_score, organization_id')
        .order('created_at', { ascending: false });

      // Date filter
      if (filters?.dateFilter) {
        const now = new Date();
        let start: Date | null = null;
        if (filters.dateFilter === 'today') {
          start = new Date();
          start.setHours(0, 0, 0, 0);
        } else if (filters.dateFilter === '7d') {
          start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (filters.dateFilter === '30d') {
          start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }
        if (start) subQuery = subQuery.gte('created_at', start.toISOString());
      }

      // Status filter
      if (filters?.statusFilter === 'completed') subQuery = subQuery.eq('completed', true);
      if (filters?.statusFilter === 'incomplete') subQuery = subQuery.eq('completed', false);

      const subsRes = await subQuery;
      if (subsRes.error) throw subsRes.error;
      const subs = subsRes.data || [];
      setSubmissions([]); // reset while enriching

      if (subs.length === 0) return [] as SubmissionDetails[];

      const submissionIds = subs.map((s: any) => s.id);
      const orgIds = [...new Set(subs.map((s: any) => s.organization_id).filter(Boolean))];

      // Organizations (optionally filter by track)
      let orgQuery = supabase.from('organizations').select('id, name, track, industry, country, size_bucket, revenue_bucket');
      if (filters?.trackFilter) {
        orgQuery = orgQuery.eq('track', filters.trackFilter);
      }
      if (orgIds.length > 0) {
        orgQuery = orgQuery.in('id', orgIds as string[]);
      } else {
        orgQuery = orgQuery.in('id', ['00000000-0000-0000-0000-000000000000']); // force empty set
      }
      const orgRes = await orgQuery;
      if (orgRes.error) throw orgRes.error;
      const orgMap = new Map<string, any>();
      orgRes.data?.forEach((o: any) => orgMap.set(o.id, o));

      // If track filter applied, drop submissions not in filtered orgs
      let filteredSubs = subs as any[];
      if (filters?.trackFilter) {
        const allowedIds = new Set(Array.from(orgMap.keys()));
        filteredSubs = subs.filter((s: any) => s.organization_id && allowedIds.has(s.organization_id));
      }

      // Answers for full name (M1) and email (M2)
      const ansRes = await supabase
        .from('answers')
        .select('submission_id, question_id, raw_response')
        .in('submission_id', filteredSubs.map((s) => s.id))
        .in('question_id', ['M1', 'M2']);
      if (ansRes.error) throw ansRes.error;
      const nameMap = new Map<string, string>();
      const emailMap = new Map<string, string>();
      ansRes.data?.forEach((a: any) => {
        const v = a.raw_response ? (typeof a.raw_response === 'string' ? a.raw_response : (a.raw_response as any)['']) : '';
        if (a.question_id === 'M1') nameMap.set(a.submission_id, v ?? '');
        if (a.question_id === 'M2') emailMap.set(a.submission_id, v ?? '');
      });

      // Build results
      const rows: SubmissionDetails[] = filteredSubs.map((s: any) => {
        const org = s.organization_id ? orgMap.get(s.organization_id) : null;
        const item: SubmissionDetails = {
          id: s.id,
          assessment_id: s.id,
          created_at: s.created_at,
          updated_at: s.updated_at,
          submission_status: s.completed ? 'Completed' : 'In Progress',
          full_name: nameMap.get(s.id) || '',
          email: emailMap.get(s.id) || '',
          organization_name: org?.name || '',
          industry: org?.industry || '',
          country: org?.country || '',
          organization_size: org?.size_bucket || '',
          revenue_range: org?.revenue_bucket || '',
          track: org?.track || '',
          percentage_score: s.percentage_score ?? null,
        };
        return item;
      });

      // Search filter (client-side across org/name/email)
      if (filters?.searchTerm) {
        const q = String(filters.searchTerm).toLowerCase();
        setSubmissions(
          rows.filter((r) =>
            [r.organization_name, r.full_name, r.email, r.track]
              .filter(Boolean)
              .some((f) => String(f).toLowerCase().includes(q))
          )
        );
      } else {
        setSubmissions(rows);
      }

      return rows;
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch submissions');
      return [] as SubmissionDetails[];
    } finally {
      setIsLoading(false);
    }
  };

  const getSubmissionDetails = async (submissionId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch submission
      const subRes = await supabase
        .from('submissions')
        .select('id, created_at, updated_at, completed, percentage_score, organization_id')
        .eq('id', submissionId)
        .maybeSingle();
      if (subRes.error) throw subRes.error;
      const s = subRes.data;
      if (!s) return null;

      // Fetch org (if any)
      let org: any = null;
      if (s.organization_id) {
        const orgRes = await supabase
          .from('organizations')
          .select('id, name, track, industry, country, size_bucket, revenue_bucket')
          .eq('id', s.organization_id)
          .maybeSingle();
        if (orgRes.error) throw orgRes.error;
        org = orgRes.data;
      }

      // Fetch contact answers
      const ansRes = await supabase
        .from('answers')
        .select('question_id, raw_response')
        .eq('submission_id', submissionId)
        .in('question_id', ['M1', 'M2', 'M3']);
      if (ansRes.error) throw ansRes.error;
      const val = (r: any) => (typeof r === 'string' ? r : (r as any)?.[''] ?? '');
      const full_name = val(ansRes.data?.find((a: any) => a.question_id === 'M1')?.raw_response);
      const email = val(ansRes.data?.find((a: any) => a.question_id === 'M2')?.raw_response);
      const role_answer = val(ansRes.data?.find((a: any) => a.question_id === 'M3')?.raw_response);

      const details: SubmissionDetails = {
        id: s.id,
        assessment_id: s.id,
        created_at: s.created_at,
        updated_at: s.updated_at,
        submission_status: s.completed ? 'Completed' : 'In Progress',
        full_name,
        email,
        organization_name: org?.name || '',
        industry: org?.industry || '',
        country: org?.country || '',
        organization_size: org?.size_bucket || '',
        revenue_range: org?.revenue_bucket || '',
        track: org?.track || '',
        percentage_score: s.percentage_score ?? null,
        role_answer,
      };
      return details;
    } catch (e: any) {
      setError(e.message ?? 'Failed to get submission details');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubmission = async (submissionId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { error } = await supabase.from('submissions').delete().eq('id', submissionId);
      if (error) throw error;
      setSubmissions((prev) => prev.filter((s) => s.id !== submissionId));
    } catch (e: any) {
      setError(e.message ?? 'Failed to delete submission');
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = (rows: SubmissionDetails[]) => {
    const headers = [
      'id',
      'organization_name',
      'full_name',
      'email',
      'track',
      'submission_status',
      'created_at',
      'percentage_score',
      'industry',
      'country',
      'organization_size',
      'revenue_range',
    ];

    const escape = (val: any) => {
      const s = val === null || val === undefined ? '' : String(val);
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };

    const csv = [
      headers.join(','),
      ...rows.map((r) => headers.map((h) => escape((r as any)[h])).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `submissions_${new Date().toISOString().slice(0,19)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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