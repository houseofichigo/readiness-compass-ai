import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { syncAssessmentDataToSupabase } from '@/utils/syncQuestionsToSupabase';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Rocket } from 'lucide-react';

interface DeploymentCheck {
  name: string;
  status: 'success' | 'warning' | 'error' | 'pending' | 'not-run';
  message: string;
  critical: boolean;
  details?: any;
}

export function DeploymentReadinessPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [checks, setChecks] = useState<DeploymentCheck[]>([
    { name: 'Database Schema', status: 'not-run', message: 'Not checked', critical: true },
    { name: 'Questions Population', status: 'not-run', message: 'Not checked', critical: true },
    { name: 'Answer Metadata', status: 'not-run', message: 'Not checked', critical: true },
    { name: 'Security Configuration', status: 'not-run', message: 'Not checked', critical: false },
    { name: 'End-to-End Test', status: 'not-run', message: 'Not checked', critical: true },
  ]);
  const { toast } = useToast();

  const updateCheck = (name: string, status: DeploymentCheck['status'], message: string, details?: any) => {
    setChecks(prev => prev.map(check => 
      check.name === name ? { ...check, status, message, details } : check
    ));
  };

  const runDeploymentChecks = async () => {
    setIsRunning(true);
    
    try {
      // Check 1: Database Schema
      updateCheck('Database Schema', 'pending', 'Checking database tables...');
      
      const { count: questionsCount } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true });
      
      const { count: sectionsCount } = await supabase
        .from('sections')
        .select('*', { count: 'exact', head: true });

      if ((questionsCount || 0) < 87 || (sectionsCount || 0) < 8) {
        updateCheck('Database Schema', 'error', 
          `Missing data: ${questionsCount || 0}/87 questions, ${sectionsCount || 0}/8 sections`);
        
        // Auto-fix: Run sync
        updateCheck('Questions Population', 'pending', 'Running data sync...');
        const syncResult = await syncAssessmentDataToSupabase();
        
        if (syncResult.success) {
          const questionsCount = 'questions' in syncResult ? syncResult.questions : syncResult.count;
          const sectionsCount = 'sections' in syncResult ? syncResult.sections : 0;
          updateCheck('Questions Population', 'success', 
            `Synced ${questionsCount} questions and ${sectionsCount} sections`);
          updateCheck('Database Schema', 'success', 'Database properly populated');
        } else {
          const error = 'error' in syncResult ? syncResult.error : 'Unknown error';
          updateCheck('Questions Population', 'error', 'Sync failed', error);
          updateCheck('Database Schema', 'error', 'Cannot populate database');
          return;
        }
      } else {
        updateCheck('Database Schema', 'success', 
          `✓ ${questionsCount} questions, ${sectionsCount} sections`);
        updateCheck('Questions Population', 'success', 'Data already populated');
      }

      // Check 2: Answer Metadata
      updateCheck('Answer Metadata', 'pending', 'Checking answer metadata...');
      
      const { count: totalAnswers } = await supabase
        .from('answers')
        .select('*', { count: 'exact', head: true });

      const { count: answersWithMetadata } = await supabase
        .from('answers')
        .select('*', { count: 'exact', head: true })
        .not('option_score', 'is', null);

      if ((totalAnswers || 0) > 0 && (answersWithMetadata || 0) < (totalAnswers || 0) * 0.8) {
        updateCheck('Answer Metadata', 'warning', 
          `Only ${answersWithMetadata}/${totalAnswers} answers have metadata. Running backfill...`);
        
        // Auto-fix: Run backfill
        const { data: backfillResult } = await supabase.rpc('backfill_answer_option_metadata');
        if (backfillResult && backfillResult.length > 0) {
          updateCheck('Answer Metadata', 'success', 
            `Backfilled ${backfillResult[0].updated_count}/${backfillResult[0].total_processed} answers`);
        }
      } else {
        updateCheck('Answer Metadata', 'success', 
          `✓ ${answersWithMetadata}/${totalAnswers} answers have metadata`);
      }

      // Check 3: Security Configuration
      updateCheck('Security Configuration', 'pending', 'Checking security settings...');
      // Simplified check - just mark as warning for manual review
      updateCheck('Security Configuration', 'warning', 
        'Manual review recommended for RLS policies and auth settings');

      // Check 4: End-to-End Test
      updateCheck('End-to-End Test', 'pending', 'Running system test...');
      
      // Create test submission
      const { data: testSubmission, error: submissionError } = await supabase
        .from('submissions')
        .insert({
          assessment_id: 'ai-readiness-v2',
          full_name: 'Deployment Test',
          email: 'test@deployment.com'
        })
        .select()
        .single();

      if (submissionError) {
        updateCheck('End-to-End Test', 'error', 'Cannot create test submission', submissionError);
      } else {
        // Test answer creation
        const { data: testAnswer, error: answerError } = await supabase
          .from('answers')
          .insert({
            submission_id: testSubmission.id,
            question_id: 'q1_1',
            value: JSON.stringify("Expert")
          })
          .select()
          .single();

        if (answerError) {
          updateCheck('End-to-End Test', 'error', 'Cannot create test answer', answerError);
        } else {
          // Clean up and mark success  
          await supabase.from('answers').delete().eq('question_id', testAnswer.question_id);
          await supabase.from('submissions').delete().eq('id', testSubmission.id);
          
          updateCheck('End-to-End Test', 'success', 
            '✓ Submission and answer creation working');
        }
      }

      // Final assessment
      const criticalFailures = checks.filter(c => c.critical && c.status === 'error').length;
      
      if (criticalFailures === 0) {
        toast({
          title: "🚀 Deployment Ready!",
          description: "All critical checks passed. System is ready for production.",
          variant: "default"
        });
      } else {
        toast({
          title: "⚠️ Deployment Blocked",
          description: `${criticalFailures} critical issues must be resolved first.`,
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Deployment check error:', error);
      toast({
        title: "Check Failed",
        description: "An unexpected error occurred during deployment checks",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: DeploymentCheck['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'not-run': return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusBadge = (status: DeploymentCheck['status']) => {
    const variants = {
      'success': 'default',
      'warning': 'secondary', 
      'error': 'destructive',
      'pending': 'outline',
      'not-run': 'outline'
    } as const;
    
    return <Badge variant={variants[status]}>{status.replace('-', ' ')}</Badge>;
  };

  const criticalIssues = checks.filter(c => c.critical && c.status === 'error').length;
  const allChecksRun = checks.every(c => c.status !== 'not-run');
  const isDeploymentReady = criticalIssues === 0 && allChecksRun;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Production Deployment Readiness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Button 
            onClick={runDeploymentChecks}
            disabled={isRunning}
            size="lg"
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Running Checks...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                Run Deployment Checks
              </>
            )}
          </Button>

          {allChecksRun && (
            <div className="flex items-center gap-2">
              {isDeploymentReady ? (
                <Badge variant="default" className="bg-green-500">
                  ✓ Ready for Deployment
                </Badge>
              ) : (
                <Badge variant="destructive">
                  ⚠️ {criticalIssues} Critical Issues
                </Badge>
              )}
            </div>
          )}
        </div>

        {checks.some(c => c.status !== 'not-run') && (
          <div className="space-y-3">
            <h4 className="font-medium">Deployment Checks:</h4>
            {checks.map((check, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium flex items-center gap-2">
                      {check.name}
                      {check.critical && (
                        <Badge variant="outline" className="text-xs">CRITICAL</Badge>
                      )}
                    </div>
                    {getStatusBadge(check.status)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{check.message}</div>
                  {check.details && (
                    <pre className="text-xs mt-2 p-2 bg-muted rounded max-h-32 overflow-auto">
                      {JSON.stringify(check.details, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isDeploymentReady && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-medium text-green-800 mb-2">🎉 System Ready for Production!</h5>
            <p className="text-sm text-green-700">
              All critical checks have passed. Your assessment platform is ready for deployment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}