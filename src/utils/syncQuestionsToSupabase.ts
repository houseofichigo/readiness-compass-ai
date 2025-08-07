// src/utils/syncQuestionsToSupabase.ts

import { supabase } from "@/integrations/supabase/client";
import { assessmentSections } from "@/data/assessmentQuestions";

interface QuestionRow {
  id: string;
  assessment_id: string;
  section_id: string;
  text: string;
  type: string;
  helper?: string;
  required?: boolean;
  sequence: number;
  options?: any;
  rows?: any;
  columns?: any;
  groups?: any;
  show_if?: any;
  hide_if?: any;
  max_rank?: number;
  max_select?: number;
  score_map_by_bucket?: any;
  is_add_on?: boolean;
}

export async function syncQuestionsToSupabase() {
  try {
    console.log("Starting questions sync to Supabase...");
    
    const questionsToInsert: QuestionRow[] = [];
    
    // Process all sections and questions
    assessmentSections.forEach((section, sectionIndex) => {
      console.log(`Processing section: ${section.id} with ${section.questions.length} questions`);
      section.questions.forEach((question, questionIndex) => {
        const questionRow: QuestionRow = {
          id: question.id,
          assessment_id: "ai-readiness-v2",
          section_id: section.id,
          text: question.text,
          type: question.type,
          helper: question.helper,
          required: question.required ?? true,
          sequence: questionIndex + 1,
          is_add_on: false,
        };

        // Add essential question properties only (removed obsolete scoring fields)
        if (question.options) questionRow.options = question.options;
        if (question.rows) questionRow.rows = question.rows;
        if (question.columns) questionRow.columns = question.columns;
        if (question.groups) questionRow.groups = question.groups;
        if (question.showIf) questionRow.show_if = question.showIf;
        if (question.hideIf) questionRow.hide_if = question.hideIf;
        if (question.maxRank) questionRow.max_rank = question.maxRank;
        if (question.maxSelect) questionRow.max_select = question.maxSelect;
        if (question.scoreMapByBucket) questionRow.score_map_by_bucket = question.scoreMapByBucket;

        questionsToInsert.push(questionRow);
      });
    });

    // Delete existing questions for this assessment
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .eq('assessment_id', 'ai-readiness-v2');

    if (deleteError) {
      console.error("Error deleting existing questions:", deleteError);
      return { success: false, error: deleteError };
    }

    // Insert new questions in batches
    const batchSize = 50;
    for (let i = 0; i < questionsToInsert.length; i += batchSize) {
      const batch = questionsToInsert.slice(i, i + batchSize);
      
      const { error: insertError } = await supabase
        .from('questions')
        .insert(batch);

      if (insertError) {
        console.error(`Error inserting questions batch ${i / batchSize + 1}:`, insertError);
        return { success: false, error: insertError };
      }
    }

    console.log(`Successfully synced ${questionsToInsert.length} questions to Supabase`);
    return { success: true, count: questionsToInsert.length };

  } catch (error) {
    console.error("Error syncing questions:", error);
    return { success: false, error };
  }
}

// Function to sync sections as well
export async function syncSectionsToSupabase() {
  try {
    console.log("Starting sections sync to Supabase...");
    
    const sectionsToInsert = assessmentSections.map((section, index) => ({
      id: section.id,
      assessment_id: "ai-readiness-v2",
      title: section.title,
      purpose: section.purpose,
      category: section.category || null,
      sequence: index + 1,
      pillar_score: section.pillar_score || null,
    }));

    // Delete existing sections for this assessment
    const { error: deleteError } = await supabase
      .from('sections')
      .delete()
      .eq('assessment_id', 'ai-readiness-v2');

    if (deleteError) {
      console.error("Error deleting existing sections:", deleteError);
      return { success: false, error: deleteError };
    }

    // Insert new sections
    const { error: insertError } = await supabase
      .from('sections')
      .insert(sectionsToInsert);

    if (insertError) {
      console.error("Error inserting sections:", insertError);
      return { success: false, error: insertError };
    }

    console.log(`Successfully synced ${sectionsToInsert.length} sections to Supabase`);
    return { success: true, count: sectionsToInsert.length };

  } catch (error) {
    console.error("Error syncing sections:", error);
    return { success: false, error };
  }
}

// Main sync function
export async function syncAssessmentDataToSupabase() {
  console.log("Starting full assessment data sync...");
  
  const sectionsResult = await syncSectionsToSupabase();
  if (!sectionsResult.success) {
    return sectionsResult;
  }

  const questionsResult = await syncQuestionsToSupabase();
  if (!questionsResult.success) {
    return questionsResult;
  }

  return {
    success: true,
    sections: sectionsResult.count,
    questions: questionsResult.count,
  };
}