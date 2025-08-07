import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { assessmentSections } from "@/data/assessmentQuestions";

export function ManualSyncTrigger() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleManualSync = async () => {
    setIsRunning(true);
    setResults(null);
    
    try {
      console.log("🔍 Step 1: Checking YAML data extraction...");
      
      // Step 1: Check if YAML data is properly extracted
      const firstSection = assessmentSections.find(s => s.id === 'section_1');
      console.log("First section data:", firstSection);
      
      if (!firstSection?.pillar_scores) {
        throw new Error("YAML data extraction failed - no pillar_scores found");
      }
      
      console.log("✅ YAML data properly extracted");
      
      // Step 2: Import and run sync
      console.log("🔄 Step 2: Running database sync...");
      const { syncAssessmentDataToSupabase } = await import("@/utils/syncQuestionsToSupabase");
      const syncResult = await syncAssessmentDataToSupabase();
      
      if (!syncResult.success) {
        throw new Error(`Sync failed: ${'error' in syncResult ? syncResult.error : 'Unknown error'}`);
      }
      
      console.log("✅ Database sync completed");
      
      // Step 3: Verify database population
      console.log("🔍 Step 3: Verifying database...");
      
      const { data: questions, error: qError } = await supabase
        .from('questions')
        .select('id, category, purpose, pillar_scores')
        .eq('assessment_id', 'ai-readiness-v2')
        .limit(5);
      
      if (qError) throw qError;
      
      const { data: sections, error: sError } = await supabase
        .from('sections')
        .select('id, category, purpose')
        .eq('assessment_id', 'ai-readiness-v2');
      
      if (sError) throw sError;
      
      console.log("✅ Database verification completed");
      
      const testResults = {
        yamlExtraction: {
          sectionsCount: assessmentSections.length,
          hasPillarData: !!firstSection?.pillar_scores,
          samplePillarData: firstSection?.pillar_scores
        },
        databaseSync: syncResult,
        databaseVerification: {
          questionsCount: questions?.length || 0,
          sectionsCount: sections?.length || 0,
          sampleQuestion: questions?.[0],
          sampleSection: sections?.[0]
        },
        success: true
      };
      
      setResults(testResults);
      
      toast({
        title: "✅ Manual Sync Successful",
        description: `Synced ${sections?.length} sections and ${questions?.length} questions`,
      });
      
      console.log("🎉 Manual sync completed successfully!");
      console.log("Results:", testResults);
      
    } catch (error: any) {
      console.error("💥 Manual sync failed:", error);
      
      const errorResults = {
        error: error.message,
        success: false,
        yamlExtraction: {
          sectionsCount: assessmentSections.length,
          hasPillarData: !!assessmentSections.find(s => s.pillar_scores)
        }
      };
      
      setResults(errorResults);
      
      toast({
        title: "❌ Manual Sync Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Manual Sync Test
          <Badge variant="outline">Debug Tool</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleManualSync} 
          disabled={isRunning}
          className="w-full"
          variant="default"
        >
          {isRunning ? "Running Manual Sync..." : "Run Manual Sync Test"}
        </Button>
        
        {results && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">
              {results.success ? "✅ Success" : "❌ Failed"}
            </h3>
            <pre className="text-sm overflow-auto max-h-96 whitespace-pre-wrap">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}