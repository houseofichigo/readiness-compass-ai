// src/utils/syncQuestionsToSupabase.ts

import { supabase } from "@/integrations/supabase/client";
import { assessmentSections } from "@/data/assessmentQuestions";

interface QuestionRow {
  id: string;
  assessment_id: string;
  section_id: string;
  text: string;
  type: string;
  helper: string;
  required: boolean;
  sequence: number;
  options: any;
  rows?: any;
  columns?: any;
  groups?: any;
  show_if: any;
  hide_if: any;
  max_rank: number;
  max_select: number;
  score_map_by_bucket: any;
  is_add_on: boolean;
  // New database columns - all required by schema
  category: string;
  purpose: string;
  pillar_scores: any;
  pillar_options: any;
  pillar_logic: any;
  reasoning?: any;
  model_input_context?: any;
  weight?: number[];
  score_per?: number;
  cap?: number;
  score_formula?: string;
}

export async function syncQuestionsToSupabase() {
  try {
    console.log("Starting comprehensive questions sync to Supabase...");
    console.log(`Total sections to process: ${assessmentSections.length}`);
    
    const questionsToInsert: QuestionRow[] = [];
    
    // Process all sections and questions with detailed logging
    assessmentSections.forEach((section, sectionIndex) => {
      console.log(`Processing section ${sectionIndex + 1}: ${section.id} - "${section.title}"`);
      console.log(`  Category: ${section.category || 'none'}, Purpose: ${section.purpose || 'none'}, Questions: ${section.questions.length}`);
      
      section.questions.forEach((question, questionIndex) => {
        console.log(`  Processing question ${questionIndex + 1}: ${question.id} - ${question.type}`);
        
        const questionRow: QuestionRow = {
          id: question.id,
          assessment_id: "ai-readiness-v2",
          section_id: section.id,
          text: question.text,
          type: question.type,
          helper: question.helper || "",
          required: question.required ?? true,
          sequence: questionIndex + 1,
          is_add_on: false,
          // Required fields with defaults
          options: question.options || {},
          show_if: question.showIf || {},
          hide_if: question.hideIf || {},
          max_rank: question.maxRank || 0,
          max_select: question.maxSelect || 0,
          score_map_by_bucket: question.scoreMapByBucket || {},
          // Populate from section data - CRITICAL FIX
          category: section.category || "",
          purpose: section.purpose || "",
          // Populate pillar data from section (these come from YAML)
          pillar_scores: section.pillar_scores || {},
          pillar_options: section.pillar_options || {},
          pillar_logic: section.pillar_logic || {},
          // Initialize question-level fields
          reasoning: {},
          model_input_context: {},
          weight: question.weight || null,
          score_per: question.score_per || null,
          cap: question.cap || null,
          score_formula: question.score_formula || null,
        };

        // Validate question structure and log any issues
        console.log(`  Question validation:`, {
          hasOptions: !!question.options,
          optionsCount: question.options?.length || 0,
          hasScoreMap: !!question.scoreMapByBucket,
          hasConditionalLogic: !!(question.showIf || question.hideIf)
        });

        // Log if this question has enriched option data
        if (question.options && question.options.length > 0) {
          const enrichedOptions = question.options.filter(opt => 
            opt.score !== undefined || opt.reasoning || opt.model_input_context
          );
          if (enrichedOptions.length > 0) {
            console.log(`    ✓ Found ${enrichedOptions.length}/${question.options.length} enriched options`);
          }
        }

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