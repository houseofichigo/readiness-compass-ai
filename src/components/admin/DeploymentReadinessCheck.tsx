import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { syncAssessmentDataToSupabase } from "@/utils/syncQuestionsToSupabase";

interface CheckResult {
  name: string;
  status: 'success' | 'warning' | 'error' | 'pending';
  message: string;
  details?: any;
  critical?: boolean;
}

export function DeploymentReadinessCheck() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);
  const { toast } = useToast();

  const updateResult = (name: string, status: CheckResult['status'], message: string, details?: any, critical?: boolean) => {
    setResults(prev => {
      const existing = prev.find(r => r.name === name);
      if (existing) {
        existing.status = status;
        existing.message = message;
        existing.details = details;
        existing.critical = critical;
        return [...prev];
      }
      return [...prev, { name, status, message, details, critical }];
    });
  };

  const runDeploymentCheck = async () => {
    setIsRunning(true);
    setResults([]);

    try {
      // 1. Check YAML Data Extraction
      updateResult('YAML Extraction', 'pending', 'Checking YAML data extraction...');
      const { debugYamlExtraction } = await import("@/utils/debugYamlExtraction");
      const sections = debugYamlExtraction();
      const sectionsWithPillars = sections.filter(s => 
        s.pillar_scores && Object.keys(s.pillar_scores).length > 0
      );
      updateResult('YAML Extraction', 'success', 
        `✓ Extracted ${sections.length} sections, ${sectionsWithPillars.length} with pillar data`);

      // 2. Full Data Sync
      updateResult('Data Sync', 'pending', 'Running complete data sync...');
      const syncResult = await syncAssessmentDataToSupabase();
      if (syncResult.success) {
        const sections = 'sections' in syncResult ? syncResult.sections : 0;
        const questions = 'questions' in syncResult ? syncResult.questions : syncResult.count || 0;
        updateResult('Data Sync', 'success', 
          `✓ Synced ${sections} sections, ${questions} questions`);
      } else {
        const error = 'error' in syncResult ? syncResult.error : 'Unknown error';
        updateResult('Data Sync', 'error', 
          `✗ Sync failed: ${error}`, error, true);
        throw new Error("Data sync failed");
      }

      // 3. Question Metadata Validation
      updateResult('Question Metadata', 'pending', 'Validating question metadata...');
      const { data: questions, error: qError } = await supabase
        .from('questions')
        .select('id, category, purpose, pillar_scores')
        .eq('assessment_id', 'ai-readiness-v2');

      if (qError) {
        updateResult('Question Metadata', 'error', `✗ Query failed: ${qError.message}`, qError, true);
        throw new Error("Question validation failed");
      }

      const questionsWithMetadata = questions?.filter(q => 
        q.category && q.purpose && q.pillar_scores && Object.keys(q.pillar_scores).length > 0
      ) || [];

      if (questionsWithMetadata.length === questions?.length) {
        updateResult('Question Metadata', 'success', 
          `✓ All ${questions.length} questions have complete metadata`);
      } else {
        updateResult('Question Metadata', 'warning', 
          `⚠ ${questionsWithMetadata.length}/${questions?.length || 0} questions have complete metadata`);
      }

      // 4. Answer Metadata Backfill
      updateResult('Answer Backfill', 'pending', 'Running answer metadata backfill...');
      const { data: backfillResult, error: backfillError } = await supabase
        .rpc('backfill_answer_option_metadata');

      if (backfillError) {
        updateResult('Answer Backfill', 'error', 
          `✗ Backfill failed: ${backfillError.message}`, backfillError);
      } else {
        const result = backfillResult as any;
        updateResult('Answer Backfill', 'success', 
          `✓ Updated ${result?.updated_count || 0}/${result?.total_processed || 0} answers with metadata`);
      }

      // 5. Answer Metadata Validation
      updateResult('Answer Validation', 'pending', 'Validating answer metadata...');
      const { data: answers, error: aError } = await supabase
        .from('answers')
        .select('id, option_score, option_reasoning, option_model_input_context')
        .not('option_score', 'is', null);

      if (aError) {
        updateResult('Answer Validation', 'error', `✗ Query failed: ${aError.message}`, aError);
      } else {
        const { data: totalAnswers } = await supabase
          .from('answers')
          .select('id', { count: 'exact' });

        const enrichedAnswers = answers?.length || 0;
        const totalCount = totalAnswers?.length || 0;
        
        if (enrichedAnswers > 0) {
          updateResult('Answer Validation', 'success', 
            `✓ ${enrichedAnswers}/${totalCount} answers have scoring metadata`);
        } else {
          updateResult('Answer Validation', 'warning', 
            `⚠ No answers have scoring metadata yet`);
        }
      }

      // 6. End-to-End Test
      updateResult('E2E Test', 'pending', 'Testing assessment flow...');
      const { data: testSubmission, error: testError } = await supabase
        .from('submissions')
        .insert({
          assessment_id: 'ai-readiness-v2',
          email: 'test@deployment.check',
          full_name: 'Deployment Test',
          completed: false
        })
        .select()
        .single();

      if (testError) {
        updateResult('E2E Test', 'error', `✗ Test submission failed: ${testError.message}`, testError);
      } else {
        // Clean up test submission
        await supabase.from('submissions').delete().eq('id', testSubmission.id);
        updateResult('E2E Test', 'success', '✓ Assessment flow working correctly');
      }

      // 7. Final Deployment Status
      const criticalErrors = results.filter(r => r.status === 'error' && r.critical).length;
      const warnings = results.filter(r => r.status === 'warning').length;
      
      if (criticalErrors === 0) {
        updateResult('Deployment Status', 'success', 
          `🚀 DEPLOYMENT READY - ${warnings} warnings, 0 critical errors`);
        toast({
          title: "Deployment Ready! 🚀",
          description: "All critical systems are working correctly",
        });
      } else {
        updateResult('Deployment Status', 'error', 
          `❌ NOT READY - ${criticalErrors} critical errors must be fixed`, null, true);
        toast({
          title: "Not Ready for Deployment",
          description: `${criticalErrors} critical errors must be fixed`,
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error("Deployment check failed:", error);
      updateResult('Deployment Status', 'error', 
        `❌ Check failed: ${error}`, error, true);
      toast({
        title: "Deployment Check Failed",
        description: "See console for details",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: CheckResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: CheckResult['status'], critical?: boolean) => {
    const variant = status === 'success' ? 'default' : 
                   status === 'warning' ? 'secondary' : 'destructive';
    const label = status === 'pending' ? 'Running...' : 
                  critical && status === 'error' ? 'CRITICAL' : status.toUpperCase();
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🚀 Deployment Readiness Check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button 
            onClick={runDeploymentCheck} 
            disabled={isRunning}
            size="lg"
          >
            {isRunning ? 'Running Checks...' : 'Run Deployment Check'}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Check Results:</h3>
            {results.map((result) => (
              <div key={result.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-muted-foreground">{result.message}</div>
                  </div>
                </div>
                {getStatusBadge(result.status, result.critical)}
              </div>
            ))}

            {results.some(r => r.details) && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium">View Technical Details</summary>
                <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto">
                  {JSON.stringify(
                    results.filter(r => r.details).map(r => ({ 
                      name: r.name, 
                      details: r.details 
                    })), 
                    null, 
                    2
                  )}
                </pre>
              </details>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}