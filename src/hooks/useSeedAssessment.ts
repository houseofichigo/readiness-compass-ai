import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { assessmentSections, assessmentAddOns } from '@/data/assessmentQuestions';
import { toast } from 'sonner';


// Seeding logic: idempotent upsert of sections & questions from YAML
export function useSeedAssessment() {
  const seededRef = useRef(false);

  useEffect(() => {
    if (seededRef.current) return;

    const checkAndSeed = async () => {
      try {
        // 1) Skip if already populated
        const [{ count: qCount }, { count: sCount }, { count: cCount }] = await Promise.all([
          supabase.from('questions').select('*', { count: 'exact', head: true }),
          supabase.from('sections').select('*', { count: 'exact', head: true }),
          supabase.from('question_choices').select('*', { count: 'exact', head: true }),
        ]);

        if ((qCount ?? 0) > 0 && (cCount ?? 0) > 0) {
          seededRef.current = true;
          return; // already seeded
        }

        // 2) Build minimal payload expected by the seed_assessment RPC
        const payload = assessmentSections.map((s, sIdx) => ({
          id: s.id,
          category: (s as any).category ?? null,
          purpose: s.purpose ?? null,
          sequence: sIdx + 1,
          questions: (s.questions || []).map((q, qIdx) => ({
            id: q.id,
            text: q.text,
            type: q.type,
            helper: q.helper ?? null,
            required: q.required ?? null,
            sequence: qIdx + 1,
            showIf: (q as any).showIf ?? null,
            hideIf: (q as any).hideIf ?? null,
            scoreMap: (q as any).scoreMap ?? null,
            scorePer: (q as any).scorePer ?? null,
            cap: (q as any).cap ?? null,
            scoreFormula: (q as any).scoreFormula ?? null,
            weight: (q as any).weight ?? null,
            maxRank: (q as any).maxRank ?? null,
            maxSelect: (q as any).maxSelect ?? null,
            scoreByCount: (q as any).scoreByCount ?? null,
            options: ((((q as any).options) || []) as any[]).map((o: any) => ({
              value: o.value,
              label: o.label,
              score: o.score ?? null,
              reasoning: o.reasoning ?? null,
              model_input_context: o.model_input_context ?? null,
            })),
          })),
        }));

        const addOnsPayload = (assessmentAddOns || []).map((q, qIdx) => ({
          id: q.id,
          text: q.text,
          type: q.type,
          helper: (q as any).helper ?? null,
          required: (q as any).required ?? null,
          sequence: qIdx + 1,
          showIf: (q as any).showIf ?? null,
          hideIf: (q as any).hideIf ?? null,
          scoreMap: (q as any).scoreMap ?? null,
          scorePer: (q as any).scorePer ?? null,
          cap: (q as any).cap ?? null,
          scoreFormula: (q as any).scoreFormula ?? null,
          weight: (q as any).weight ?? null,
          maxRank: (q as any).maxRank ?? null,
          maxSelect: (q as any).maxSelect ?? null,
          scoreByCount: (q as any).scoreByCount ?? null,
          options: ((((q as any).options) || []) as any[]).map((o: any) => ({
            value: o.value,
            label: o.label,
            score: o.score ?? null,
            reasoning: o.reasoning ?? null,
            model_input_context: o.model_input_context ?? null,
          })),
        }));

        // 3) Upsert via RPC (function is SECURITY DEFINER and bypasses RLS)
        const { error } = await supabase.rpc('seed_assessment', { _sections: payload as any, _add_ons: addOnsPayload as any });
        if (error) {
          toast.error(`Seeding failed: ${error.message}`);
          // Retry once after a short delay in case of race conditions
          setTimeout(async () => {
            const { error: error2 } = await supabase.rpc('seed_assessment', { _sections: payload as any, _add_ons: addOnsPayload as any });
            if (error2) {
              toast.error(`Seeding failed again: ${error2.message}`);
            } else {
              const [{ count: qAfter }, { count: sAfter }, { count: cAfter }] = await Promise.all([
                supabase.from('questions').select('*', { count: 'exact', head: true }),
                supabase.from('sections').select('*', { count: 'exact', head: true }),
                supabase.from('question_choices').select('*', { count: 'exact', head: true }),
              ]);
              toast.success(`Seeded OK. Sections: ${sAfter ?? 0}, Questions: ${qAfter ?? 0}, Choices: ${cAfter ?? 0}`);
              seededRef.current = true;
            }
          }, 800);
          return;
        }

        // 4) Verify and notify
        const [{ count: qAfter }, { count: sAfter }, { count: cAfter }] = await Promise.all([
          supabase.from('questions').select('*', { count: 'exact', head: true }),
          supabase.from('sections').select('*', { count: 'exact', head: true }),
          supabase.from('question_choices').select('*', { count: 'exact', head: true }),
        ]);
        toast.success(`Seeded OK. Sections: ${sAfter ?? 0}, Questions: ${qAfter ?? 0}, Choices: ${cAfter ?? 0}`);
        seededRef.current = true;
      } catch (e) {
        console.warn('Seed init failed:', e);
        toast.error('Seed init failed');
      }
    };

    checkAndSeed();
  }, []);
}
