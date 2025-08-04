import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { AssessmentProgressBar } from "./AssessmentProgressBar";
import { AssessmentThankYou } from "./AssessmentThankYou";
import { ConsentBanner } from "./ConsentBanner";
import { assessmentSections, assessmentAddOns } from "@/data/assessmentQuestions";
import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";
import { Track, OrganizationProfile, ComputedField, AssessmentValue } from "@/types/assessment";
import { validateSection } from "@/utils/validation"; // Updated import
import { useToast } from "@/hooks/use-toast";

interface AssessmentFlowProps {
  onComplete: (responses: Record<string, AssessmentValue>, profile: OrganizationProfile) => void;
}

// Helper to parse YAML list literals like "['A','B','C']"
const parseListLiteral = (lit: string): string[] => {
  try {
    const cleaned = lit.replace(/'/g, '"');
    return JSON.parse(cleaned);
  } catch {
    return [lit];
  }
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

  // Original compute for per‐section computed fields
  const evaluateComputed = (fields: ComputedField[] | undefined, rs: Record<string, unknown>) => {
    const values: Record<string, unknown> = {};
    fields?.forEach(f => {
      if (f.id === "regulated") {
        const inds = parseListLiteral(String(f.logic || "[]"));
        values.regulated = inds.includes(rs.M4_industry as string);
      }
    });
    return values;
  };

  // Global computed
  const globalComputed = evaluateComputed(profileSection?.computed, responses);
  // Initialize detectedTrack from profile using utility
  useEffect(() => {
    const newTrack = detectTrack(responses, globalComputed) as Track;
    setDetectedTrack(newTrack);
  }, [responses, globalComputed]);

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
  const isAddOnPage = currentPage === assessmentSections.length;

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
      M0: responses.M0 as string || "",
      M4_industry: responses.M4_industry as string || "",
      M3: responses.M3 as string || "",
      M6_size: responses.M6_size as string || "",
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
      <AssessmentThankYou
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

  if (!currentSection && !isAddOnPage) {
    return <div>Section not found</div>;
  }

  const visibleQuestions = isAddOnPage
    ? visibleAddOns
    : currentSection!.questions.filter(q =>
        isQuestionVisible(q, responses, detectedTrack, 0, globalComputed)
      );

  const sectionTitle = isAddOnPage ? "Additional Questions" : currentSection!.title;
  const sectionPurpose = isAddOnPage ? undefined : currentSection!.purpose;
  const progressSectionIndex = Math.min(currentPage, assessmentSections.length - 1);
  const isFinalStep = isAddOnPage || (isLastSection && !hasAddOns);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <AssessmentProgressBar
        currentSectionIndex={progressSectionIndex}
        completedSections={Math.min(currentPage, assessmentSections.length)}
        detectedTrack={detectedTrack}
        showTrackInfo={showTrackInfo}
        responses={responses}
        globalComputed={globalComputed}
      />

      {!isAddOnPage && currentSection?.consentBanner && (
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
            <h2 className="text-2xl font-bold mb-2">{sectionTitle}</h2>
            {sectionPurpose && (
              <p className="text-muted-foreground mb-4">{sectionPurpose}</p>
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
          {isFinalStep ? "Complete Assessment" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
