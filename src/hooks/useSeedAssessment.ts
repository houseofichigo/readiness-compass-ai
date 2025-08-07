import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { assessmentSections } from '@/data/assessmentQuestions';
import { toast } from 'sonner';

// One-time seeding of sections and questions from YAML into the database
export function useSeedAssessment() {
  const seededRef = useRef(false);

  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;

    const run = async () => {
      try {
        // Build minimal payload expected by the seed_assessment RPC
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
          })),
        }));

        // Upsert via RPC (function is SECURITY DEFINER and bypasses RLS)
        const { error } = await supabase.rpc('seed_assessment', { _sections: payload as any });
        if (error) {
          console.warn('Seed RPC error:', error.message);
          toast.error(`Seeding failed: ${error.message}`);
        } else {
          const [{ count: qCount }, { count: sCount }] = await Promise.all([
            supabase.from('questions').select('*', { count: 'exact', head: true }),
            supabase.from('sections').select('*', { count: 'exact', head: true }),
          ]);
          toast.success(`Seeded OK. Sections: ${sCount ?? 0}, Questions: ${qCount ?? 0}`);
          console.info('Seeding completed', { sections: sCount, questions: qCount });
        }
      } catch (e) {
        console.warn('Seed init failed:', e);
        toast.error('Seed init failed');
      }
    };

    // Fire and forget
    run();
  }, []);
}
