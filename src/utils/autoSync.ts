// src/utils/autoSync.ts

import { supabase } from "@/integrations/supabase/client";
import { syncAssessmentDataToSupabase } from "./syncQuestionsToSupabase";

let syncPromise: Promise<any> | null = null;

export async function ensureQuestionsExist() {
  // Prevent multiple simultaneous sync attempts
  if (syncPromise) {
    return syncPromise;
  }

  try {
    // Check if questions already exist
    const { data: questionCount, error } = await supabase
      .from('questions')
      .select('id', { count: 'exact' })
      .eq('assessment_id', 'ai-readiness-v2')
      .limit(1);

    if (error) {
      console.warn("Could not check question count:", error);
      return;
    }

    // If no questions exist, sync from YAML
    if (!questionCount || questionCount.length === 0) {
      console.log("No questions found in database, syncing from YAML...");
      
      syncPromise = syncAssessmentDataToSupabase();
      const result = await syncPromise;
      
      if (result.success) {
        console.log("Auto-sync completed successfully");
      } else {
        console.warn("Auto-sync failed:", result.error);
      }
      
      syncPromise = null;
      return result;
    }

    console.log("Questions already exist in database");
    return { success: true, existing: true };

  } catch (error) {
    console.error("Error in ensureQuestionsExist:", error);
    syncPromise = null;
    return { success: false, error };
  }
}