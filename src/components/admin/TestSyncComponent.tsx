import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { syncAssessmentDataToSupabase } from "@/utils/syncQuestionsToSupabase";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TestSyncComponent() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const { toast } = useToast();

  const handleComprehensiveTest = async () => {
    setIsSyncing(true);
    setTestResults(null);
    
    try {
      console.log("🔄 Phase 1: Syncing YAML data to database...");
      
      // Phase 1: Sync YAML data
      const syncResult = await syncAssessmentDataToSupabase();
      
      if (!syncResult.success) {
        throw new Error(`Sync failed: ${'error' in syncResult ? syncResult.error : 'Unknown error'}`);
      }
      
      console.log("✅ Phase 1 complete - YAML synced to database");
      
      // Phase 2: Verify questions table population
      console.log("🔍 Phase 2: Verifying questions table...");
      
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('id, category, purpose, pillar_scores, options')
        .eq('assessment_id', 'ai-readiness-v2')
        .limit(3);
      
      if (questionsError) throw questionsError;
      
      // Phase 3: Test answer metadata population
      console.log("🧪 Phase 3: Testing answer metadata population...");
      
      // Create a test submission and answer
      const { data: testSubmission, error: submissionError } = await supabase
        .from('submissions')
        .insert({
          assessment_id: 'ai-readiness-v2',
          completed: false,
          organization_name: 'Test Sync Organization'
        })
        .select()
        .single();
      
      if (submissionError) throw submissionError;
      
      // Insert a test answer to trigger the metadata population
      const { data: testAnswer, error: answerError } = await supabase
        .from('answers')
        .insert({
          submission_id: testSubmission.id,
          question_id: 'S1',
          value: '"6 or more with owners and timelines"'
        })
        .select()
        .single();
      
      if (answerError) throw answerError;
      
      // Phase 4: Verify the trigger populated metadata correctly
      console.log("🔍 Phase 4: Verifying answer metadata population...");
      
      const { data: answerWithMetadata, error: metadataError } = await supabase
        .from('answers')
        .select('*')
        .eq('submission_id', testSubmission.id)
        .eq('question_id', 'S1')
        .single();
      
      if (metadataError) throw metadataError;
      
      // Clean up test data
      await supabase.from('answers').delete().eq('submission_id', testSubmission.id);
      await supabase.from('submissions').delete().eq('id', testSubmission.id);
      
      const results = {
        syncResult,
        questionsCount: questionsData?.length || 0,
        sampleQuestion: questionsData?.[0],
        testAnswer: answerWithMetadata,
        success: true
      };
      
      setTestResults(results);
      
      toast({
        title: "✅ Comprehensive Test Successful",
        description: `Synced and verified data. Questions populated: ${questionsData?.length}, Answer metadata working: ${answerWithMetadata?.option_score ? 'Yes' : 'No'}`,
      });
      
      console.log("🎉 All phases completed successfully!");
      console.log("Results:", results);
      
    } catch (error) {
      console.error("💥 Test failed:", error);
      setTestResults({ error: error.message, success: false });
      
      toast({
        title: "❌ Test Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Comprehensive Data Sync Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleComprehensiveTest} 
          disabled={isSyncing}
          className="w-full"
        >
          {isSyncing ? "Testing..." : "Run Comprehensive Test"}
        </Button>
        
        {testResults && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <pre className="text-sm overflow-auto max-h-96">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}