import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { AssessmentProgressBar } from "./AssessmentProgressBar";
import { AssessmentResults } from "./AssessmentResults";
import { ConsentBanner } from "./ConsentBanner";
import { assessmentSections, assessmentAddOns, assessmentMeta } from "@/data/assessmentQuestions";
import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";
import { AssessmentResponse, Track, OrganizationProfile, ComputedField, AssessmentValue } from "@/types/assessment";
import { validateSection } from "@/utils/validation";
import { useToast } from "@/hooks/use-toast";

interface AssessmentFlowProps {
  onComplete: (responses: Record<string, AssessmentValue>, profile: OrganizationProfile) => void;
}

// Helpers to parse YAML list literals like "['A','B','C']"
const parseListLiteral = (lit: string): string[] => {
  try {
    const cleaned = lit.replace(/'/g, '"');
    return JSON.parse(cleaned);
  } catch {
    return [lit];
  }
};

// 1) Compute "regulated" logic from meta
// 2) Find TECH roles from track_detection rules
const parseTechRoles = (rules: Array<Record<string, any>>): string[] => {
  const techRule = rules.find(
    r => r.if && typeof r.if !== "object" && String(r.if).includes("TECH")
  );
  return techRule
    ? parseListLiteral(String(techRule.if))
    : [];
};

export function AssessmentFlow({
  onComplete
}: AssessmentFlowProps) {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, AssessmentValue>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTrackInfo, setShowTrackInfo] = useState(false);

  // Precompute global computed fields (e.g., from profile section)
  const profileSection = assessmentSections.find(s => s.id === "section_0");
  // --- regulatedIndustries from meta
  const regulatedLogic = (assessmentMeta as any)?.track_detection?.precedence
    ?.find((p: any) => p.then === "REG")?.if;
  const regulatedIndustries = Array.isArray(regulatedLogic)
    ? regulatedLogic as string[]
    : parseListLiteral(String(regulatedLogic || "[]"));

  // --- techRoles from meta
  const techRoles = parseTechRoles((assessmentMeta as any)?.track_detection?.precedence || []);
  const legalRole = "Legal / Compliance Lead";

  // 3) Fallback computeTrack for persona changes
  const computeTrack = (rs: Record<string, AssessmentValue>): Track => {
    const role = rs.M3 as string;
    const industry = rs.M4_industry as string;
    if (techRoles.includes(role)) return "TECH";
    if (regulatedIndustries.includes(industry) || role === legalRole)
      return "REG";
    return "GEN";
  };

  // Original compute for per‐section computed fields
  const evaluateComputed = (fields: ComputedField[] | undefined, rs: Record<string, any>) => {
    const values: Record<string, any> = {};
    fields?.forEach(f => {
      if (f.id === "regulated") {
        const inds = parseListLiteral(String(f.logic || "[]"));
        values.regulated = inds.includes(rs.M4_industry);
      }
    });
    return values;
  };

  // Global computed
  const globalComputed = evaluateComputed(profileSection?.computed, responses);
  // Initialize detectedTrack from profile
  useEffect(() => {
    setDetectedTrack(computeTrack(responses));
  }, [responses.M3, responses.M4_industry]);

  // Filter visible "add-on" questions
  const visibleAddOns = assessmentAddOns.filter(q =>
    isQuestionVisible(
      q,
      responses,
      detectedTrack,
      /* totalVisible= */ 0,
      globalComputed
    )
  );

  const currentSection = assessmentSections[currentPage];
  const isLastSection = currentPage === assessmentSections.length - 1;
  const hasAddOns = visibleAddOns.length > 0;

  // Move forwards/backwards
  const goPrev = () => setCurrentPage(i => Math.max(0, i - 1));
  const goNext = () => {
    if (isLastSection && hasAddOns) {
      setCurrentPage(assessmentSections.length); // Go to add-ons
    } else if (currentPage === assessmentSections.length) {
      // Completed add-ons, finish
      completeAssessment();
    } else {
      setCurrentPage(i => Math.min(assessmentSections.length - 1, i + 1));
    }
  };

  const completeAssessment = () => {
    const profile: OrganizationProfile = {
      orgName: responses.M1 as string || "",
      industry: responses.M4_industry as string || "",
      role: responses.M3 as string || "",
      size: responses.M6_size as string || "",
      track: detectedTrack || "GEN"
    };
    
    setIsCompleted(true);
    onComplete(responses, profile);
  };

  const handleAnswerChange = (questionId: string, value: AssessmentValue) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));

    // Show track detection info after M3 or M4_industry
    if ((questionId === "M3" || questionId === "M4_industry") && !showTrackInfo) {
      setShowTrackInfo(true);
    }
  };

  const canProceed = () => {
    if (currentPage < assessmentSections.length) {
      const section = assessmentSections[currentPage];
      const visibleQuestions = section.questions.filter(q =>
        isQuestionVisible(q, responses, detectedTrack, 0, globalComputed)
      );
      const visibleIds = visibleQuestions.map(q => q.id);
      return validateSection(visibleQuestions, responses, visibleIds).isValid;
    } else {
      // Add-ons page
      const visibleIds = visibleAddOns.map(q => q.id);
      return validateSection(visibleAddOns, responses, visibleIds).isValid;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast({
        title: "Please complete all required questions",
        description: "Some questions still need to be answered before you can continue.",
        variant: "destructive"
      });
      return;
    }
    goNext();
  };

  if (isCompleted) {
    return (
      <AssessmentResults
        responses={Object.entries(responses).map(([questionId, value]) => ({
          questionId,
          value,
          sectionId: currentPage < assessmentSections.length ? assessmentSections[currentPage].id : "add_ons"
        }))}
        profile={{
          M0: responses.M0 as string,
          M1: responses.M1 as string,
          M2: responses.M2 as string,
          M3: responses.M3 as string,
          M4_industry: responses.M4_industry as string,
          M5_country: responses.M5_country as string,
          M6_size: responses.M6_size as string,
          track: detectedTrack || "GEN"
        }}
        track={detectedTrack || "GEN"}
        onRestart={() => window.location.reload()}
      />
    );
  }

  // Add-ons page
  if (currentPage === assessmentSections.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <AssessmentProgressBar
          currentSectionIndex={currentPage}
          completedSections={assessmentSections.length}
          detectedTrack={detectedTrack}
          showTrackInfo={showTrackInfo}
          responses={responses}
          globalComputed={globalComputed}
        />

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Additional Questions</h2>
              <p className="text-muted-foreground">
                These optional questions help us provide more personalized recommendations.
              </p>
            </div>

            {visibleAddOns.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                value={responses[question.id]}
                onChange={(value) => handleAnswerChange(question.id, value)}
              />
            ))}
          </div>
        </Card>

        <div className="flex justify-between">
          <Button
            onClick={goPrev}
            variant="outline"
            className="flex items-center gap-2"
            disabled={currentPage === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={completeAssessment}
            className="flex items-center gap-2"
          >
            Complete Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (!currentSection) {
    return <div>Section not found</div>;
  }

  const visibleQuestions = currentSection.questions.filter(q =>
    isQuestionVisible(q, responses, detectedTrack, 0, globalComputed)
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <AssessmentProgressBar
        currentSectionIndex={currentPage}
        completedSections={currentPage}
        detectedTrack={detectedTrack}
        showTrackInfo={showTrackInfo}
        responses={responses}
        globalComputed={globalComputed}
      />

      {currentSection.consentBanner && (
        <ConsentBanner
          id={`consent_${currentSection.id}`}
          text={currentSection.consentBanner.text || currentSection.consentBanner.consent_text || ""}
          required={currentSection.consentBanner.required}
          accepted={!!responses[`consent_${currentSection.id}`]}
          onChange={(accepted) => handleAnswerChange(`consent_${currentSection.id}`, accepted)}
        />
      )}

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{currentSection.title}</h2>
            {currentSection.purpose && (
              <p className="text-muted-foreground mb-4">{currentSection.purpose}</p>
            )}
            <Progress 
              value={(currentPage / assessmentSections.length) * 100} 
              className="w-full" 
            />
          </div>

          {visibleQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={responses[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
            />
          ))}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={goPrev}
          variant="outline"
          className="flex items-center gap-2"
          disabled={currentPage === 0}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          className="flex items-center gap-2"
          disabled={!canProceed()}
        >
          {isLastSection && hasAddOns ? "Continue to Additional Questions" : 
           isLastSection ? "Complete Assessment" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}