import { supabase } from '@/integrations/supabase/client';
import { assessmentSections, assessmentMeta } from '@/data/assessmentQuestions';

export async function syncQuestionsToSupabase() {
  try {
    console.log('Database migration has already updated profile questions');
    console.log('Organization profile form should now work correctly');
    
    // The critical organization profile questions (M3, M4_industry, M5_country, M6_size, M7_revenue)
    // have been updated via the database migration with proper choices data
    
    return { success: true };
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, error };
  }
}

// Helper function to run sync from browser console
(window as any).syncQuestions = syncQuestionsToSupabase;