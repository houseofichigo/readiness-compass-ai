// Temporary script to run sync
import { syncAssessmentDataToSupabase } from "./syncQuestionsToSupabase";

export async function runSyncNow() {
  console.log("🔄 Running comprehensive YAML to DB sync...");
  try {
    const result = await syncAssessmentDataToSupabase();
    
    if (result.success) {
      const sections = 'sections' in result ? result.sections : 0;
      const questions = 'questions' in result ? result.questions : 0;
      
      console.log("✅ Sync completed successfully!");
      console.log(`📊 Synced ${sections} sections and ${questions} questions`);
      console.log("🎯 All YAML data including scores, reasoning, and model context has been populated");
      
      return result;
    } else {
      console.error("❌ Sync failed:", 'error' in result ? result.error : 'Unknown error');
      return result;
    }
  } catch (error) {
    console.error("💥 Sync error:", error);
    return { success: false, error };
  }
}

// Auto-run sync when this module loads
if (typeof window !== 'undefined') {
  runSyncNow();
}