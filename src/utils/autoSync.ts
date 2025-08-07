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
    // Check if questions already exist with proper count
    const { count: questionCount, error } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('assessment_id', 'ai_readiness_v2');

    if (error) {
      console.warn("Could not check question count:", error);
      return { success: false, error };
    }

    // Only sync if we have fewer than expected questions (87 expected)
    if (!questionCount || questionCount < 87) {
      console.log(`Found ${questionCount || 0} questions, expected 87. Running sync...`);
      
      syncPromise = syncAssessmentDataToSupabase();
      const result = await syncPromise;
      
      if (result.success) {
        console.log("Auto-sync completed successfully - all data populated");
      } else {
        console.warn("Auto-sync failed:", result.error);
      }
      
      syncPromise = null;
      return result;
    }

    console.log(`Questions already exist in database (${questionCount} found)`);
    return { success: true, existing: true, count: questionCount };

  } catch (error) {
    console.error("Error in ensureQuestionsExist:", error);
    syncPromise = null;
    return { success: false, error };
  }
}