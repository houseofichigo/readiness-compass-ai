// src/utils/testSync.ts
// Temporary file to test the sync functionality

import { syncAssessmentDataToSupabase } from "./syncQuestionsToSupabase";

// This function can be called from the browser console for testing
export async function testSyncFunction() {
  try {
    console.log("Starting test sync...");
    const result = await syncAssessmentDataToSupabase();
    console.log("Sync result:", result);
    return result;
  } catch (error) {
    console.error("Test sync failed:", error);
    return { success: false, error };
  }
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testSync = testSyncFunction;
}