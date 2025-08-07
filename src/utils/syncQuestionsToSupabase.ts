import { supabase } from '@/integrations/supabase/client';
import { assessmentSections, assessmentMeta } from '@/data/assessmentQuestions';

export async function syncQuestionsToSupabase() {
  try {
    console.log('Starting sync process...');
    
    // Database options have been updated via migration
    // This function can be used for future syncing needs
    console.log('Database has been updated with current YAML options');
    
    return { success: true };
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, error };
  }
}

// Helper function to run sync from browser console
(window as any).syncQuestions = syncQuestionsToSupabase;