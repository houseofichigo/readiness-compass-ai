// Debug utility to analyze YAML extraction
import { assessmentSections } from "@/data/assessmentQuestions";

export function debugYamlExtraction() {
  console.log("=== YAML Extraction Debug ===");
  
  assessmentSections.forEach((section, index) => {
    console.log(`\nSection ${index}: ${section.id}`);
    console.log("  Title:", section.title);
    console.log("  Category:", section.category);
    console.log("  Purpose:", section.purpose);
    console.log("  Pillar Scores:", section.pillar_scores);
    console.log("  Pillar Options:", section.pillar_options);
    console.log("  Pillar Logic:", section.pillar_logic);
    console.log("  Questions count:", section.questions.length);
    
    // Debug first few questions with rich options
    section.questions.slice(0, 3).forEach((q, qIndex) => {
      console.log(`    Q${qIndex}: ${q.id} - ${q.type}`);
      if (q.options && q.options.length > 0) {
        const firstOption = q.options[0];
        console.log("      First option:", {
          value: firstOption.value,
          label: firstOption.label,
          score: firstOption.score,
          reasoning: firstOption.reasoning ? "✓" : "✗",
          model_input_context: firstOption.model_input_context ? "✓" : "✗"
        });
      }
      if (q.scoreMapByBucket) {
        console.log("      Score map by bucket:", Object.keys(q.scoreMapByBucket));
      }
    });
  });
  
  return assessmentSections;
}