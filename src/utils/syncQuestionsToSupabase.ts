import { supabase } from '@/integrations/supabase/client';
import { assessmentSections, assessmentMeta } from '@/data/assessmentQuestions';
import { Question, Section } from '@/types/assessment';

export async function syncQuestionsToSupabase() {
  try {
    console.log('Starting sync process...');
    
    // First, sync assessment metadata
    const { error: assessmentError } = await supabase
      .from('assessments')
      .upsert({
        id: assessmentMeta.id,
        version: assessmentMeta.version,
        locale_default: assessmentMeta.locale_default || 'en',
        question_cap: assessmentMeta.question_cap || {},
        max_visible_questions: assessmentMeta.max_visible_questions || null,
        size_breakpoints: assessmentMeta.size_breakpoints || {}
      });

    if (assessmentError) {
      console.error('Error syncing assessment metadata:', assessmentError);
      throw assessmentError;
    }

    // Sync sections
    for (const section of assessmentSections) {
      const { error: sectionError } = await supabase
        .from('sections')
        .upsert({
          id: section.id,
          assessment_id: assessmentMeta.id,
          sequence: parseInt(section.id.replace('section', '')) || 0,
          title: section.title,
          purpose: section.purpose || '',
          category: section.category || null
        });

      if (sectionError) {
        console.error(`Error syncing section ${section.id}:`, sectionError);
        throw sectionError;
      }

      // Sync questions for this section
      for (let i = 0; i < section.questions.length; i++) {
        const question = section.questions[i];
        
        const { error: questionError } = await supabase
          .from('questions')
          .upsert({
            id: question.id,
            assessment_id: assessmentMeta.id,
            section_id: section.id,
            sequence: i + 1,
            text: question.text,
            type: question.type,
            helper: question.helper || '',
            required: question.required || false,
            options: question.options || [],
            rows: question.rows || null,
            columns: question.columns || null,
            groups: question.groups || null,
            show_if: question.showIf || {},
            hide_if: question.hideIf || {},
            category: section.category || '',
            purpose: section.purpose || '',
            score_per: question.scorePer || null,
            cap: question.cap || null,
            weight: question.weight || null,
            max_rank: question.maxRank || 0,
            max_select: question.maxSelect || 0,
            score_map_by_bucket: question.scoreMap || {},
            pillar_scores: {},
            pillar_options: {},
            pillar_logic: {},
            score_formula: question.scoreFormula || null
          });

        if (questionError) {
          console.error(`Error syncing question ${question.id}:`, questionError);
          throw questionError;
        }
      }
    }

    console.log('Sync completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, error };
  }
}

// Helper function to run sync from browser console
(window as any).syncQuestions = syncQuestionsToSupabase;