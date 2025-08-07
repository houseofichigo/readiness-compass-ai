// src/components/admin/DataSyncButton.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { syncAssessmentDataToSupabase } from "@/utils/syncQuestionsToSupabase";
import { RefreshCw } from "lucide-react";

export function DataSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      console.log("🔄 Starting comprehensive YAML to DB sync...");
      const result = await syncAssessmentDataToSupabase();
      
      if (result.success) {
        const sections = 'sections' in result ? result.sections : 0;
        const questions = 'questions' in result ? result.questions : 0;
        
        console.log("✅ Sync completed successfully!");
        console.log(`📊 Synced ${sections} sections and ${questions} questions`);
        
        toast({
          title: "✅ Comprehensive Sync Successful",
          description: `Synced ${sections} sections and ${questions} questions with full YAML data including scores, reasoning, and model context`,
        });
      } else {
        console.error("❌ Sync failed:", 'error' in result ? result.error : 'Unknown error');
        toast({
          title: "❌ Sync Failed", 
          description: "Failed to sync data to Supabase. Check console for details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("💥 Sync error:", error);
      toast({
        title: "💥 Sync Error",
        description: "An error occurred while syncing data. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Button 
      onClick={handleSync} 
      disabled={isSyncing}
      variant="outline"
      size="sm"
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
      {isSyncing ? "Syncing..." : "Sync YAML to DB"}
    </Button>
  );
}