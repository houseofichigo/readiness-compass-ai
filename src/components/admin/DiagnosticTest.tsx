import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assessmentSections } from "@/data/assessmentQuestions";

export function DiagnosticTest() {
  const [diagnostics, setDiagnostics] = useState<any>(null);

  const runDiagnostics = () => {
    // Check first few sections for pillar data
    const section1 = assessmentSections.find(s => s.id === 'section_1');
    const section2 = assessmentSections.find(s => s.id === 'section_2');
    
    console.log("Section 1:", section1);
    console.log("Section 2:", section2);
    
    const diagnosticResults = {
      totalSections: assessmentSections.length,
      section1: {
        id: section1?.id,
        category: section1?.category,
        purpose: section1?.purpose,
        hasPillarScores: !!section1?.pillar_scores,
        pillarScoresKeys: section1?.pillar_scores ? Object.keys(section1.pillar_scores) : [],
        samplePillarData: section1?.pillar_scores
      },
      section2: {
        id: section2?.id,
        category: section2?.category,
        purpose: section2?.purpose,
        hasPillarScores: !!section2?.pillar_scores,
        pillarScoresKeys: section2?.pillar_scores ? Object.keys(section2.pillar_scores) : []
      },
      allSectionsWithPillarData: assessmentSections.filter(s => s.pillar_scores && Object.keys(s.pillar_scores).length > 0).length
    };
    
    setDiagnostics(diagnosticResults);
    console.log("Diagnostic Results:", diagnosticResults);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>YAML Extraction Diagnostics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDiagnostics} className="w-full">
          Run YAML Diagnostics
        </Button>
        
        {diagnostics && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Diagnostic Results:</h3>
            <pre className="text-sm overflow-auto max-h-96 whitespace-pre-wrap">
              {JSON.stringify(diagnostics, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}