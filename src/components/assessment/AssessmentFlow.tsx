import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { AssessmentProgressBar } from "./AssessmentProgressBar";
import { ConsentBanner } from "./ConsentBanner";
import { assessmentSections, assessmentAddOns } from "@/data/assessmentQuestions";
import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";
import { Track, OrganizationProfile, ComputedField, AssessmentValue } from "@/types/assessment";
import { validateSection } from "@/utils/validation"; // Updated import
import { useToast } from "@/hooks/use-toast";

interface AssessmentFlowProps {
  onComplete: (responses: Record<string, AssessmentValue>, profile: OrganizationProfile) => Promise<void>;
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
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, AssessmentValue>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const goPrev = () => {
    setCurrentPage(i => Math.max(0, i - 1));
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const goNext = () => {
    if (isLastSection && hasAddOns) {
      setCurrentPage(assessmentSections.length); // Go to add-ons
    } else {
      setCurrentPage(i => Math.min(assessmentSections.length - 1, i + 1));
    }
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeAssessment = async () => {
    console.log("🎉 Starting assessment completion...");
    console.log("🔍 Current responses state:", responses);
    console.log("🔍 Response count:", Object.keys(responses).length);
    console.log("🔍 Sample responses:", Object.entries(responses).slice(0, 5));
    
    if (Object.keys(responses).length === 0) {
      console.error("🚨 CRITICAL: Responses object is empty in AssessmentFlow!");
      console.log("🔍 Current page:", currentPage);
      console.log("🔍 Detected track:", detectedTrack);
      toast({
        title: "No answers to save",
        description: "Please answer some questions before completing the assessment.",
        variant: "destructive"
      });
      return;
    }
    
    // Create complete profile object with all required fields
    const profile: OrganizationProfile = {
      M0: responses.M0 as string || "",
      M1: responses.M1 as string || "",
      M2: responses.M2 as string || "",
      M3: responses.M3 as string || "",
      M3_other: responses.M3_other as string || "",
      M4_industry: responses.M4_industry as string || "",
      M4_sub: responses.M4_sub as string || "",
      M5_country: responses.M5_country as string || "",
      M6_size: responses.M6_size as string || "",
      M7_revenue: responses.M7_revenue as string || "",
      track: detectedTrack || "GEN",
      regulated: globalComputed.regulated as boolean || false
    };
    
    setIsSubmitting(true);
    try {
      console.log("💾 Saving assessment data...");
      console.log("Complete profile:", profile);
      console.log("Responses:", responses);

      // Call onComplete and wait for it to finish
      console.log("🔄 About to call onComplete function...");
      await onComplete(responses, profile);
      navigate("/thank-you", { state: { profile, track: detectedTrack, responses } });
      console.log("🔄 onComplete completed successfully!");

      console.log("✅ Assessment completed and saved successfully");

    } catch (error) {
      console.error("❌ Error completing assessment:", error);
      toast({
        title: "Error completing assessment",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
      
      // Add consent banner to validation if it exists and is required
      const questionsToValidate = [...visibleQuestions];
      if (section.consentBanner?.required) {
        questionsToValidate.push({
          id: `consent_${section.id}`,
          text: "Consent",
          type: "checkbox",
          required: true
        } as any);
      }
      
      const visibleIds = questionsToValidate.map(q => q.id);
      return validateSection(questionsToValidate, responses, visibleIds).isValid;
    } else {
      // Add-ons page
      const visibleIds = visibleAddOns.map(q => q.id);
      return validateSection(visibleAddOns, responses, visibleIds).isValid;
    }
  };

  const scrollToFirstError = () => {
    // Find the first question with an error and scroll to it
    const currentQuestions = currentPage < assessmentSections.length 
      ? assessmentSections[currentPage].questions.filter(q =>
          isQuestionVisible(q, responses, detectedTrack, 0, globalComputed)
        )
      : visibleAddOns;
    
    const visibleIds = currentQuestions.map(q => q.id);
    const validation = validateSection(currentQuestions, responses, visibleIds);
    
    if (!validation.isValid) {
      const firstErrorId = Object.keys(validation.errors)[0];
      const errorElement = document.getElementById(firstErrorId) || 
                          document.querySelector(`[data-question-id="${firstErrorId}"]`);
      
      if (errorElement) {
        errorElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Add focus for better accessibility
        const input = errorElement.querySelector('input, select, textarea, button');
        if (input instanceof HTMLElement) {
          input.focus();
        }
      }
    }
  };

  const handleNext = () => {
    if (isSubmitting) return;
    console.log("🔵 handleNext called!");
    console.log("🔍 isFinalStep:", isFinalStep);
    console.log("🔍 isAddOnPage:", isAddOnPage);
    console.log("🔍 isLastSection:", isLastSection);
    console.log("🔍 hasAddOns:", hasAddOns);
    console.log("🔍 currentPage:", currentPage);
    
    // Check if we're on the final step and should complete
    if (isFinalStep) {
      console.log("✅ This IS the final step - will complete assessment!");
      // Validate before completing
      const currentQuestions = isAddOnPage
        ? visibleAddOns
        : currentSection!.questions.filter(q =>
            isQuestionVisible(q, responses, detectedTrack, 0, globalComputed)
          );
      
      const visibleIds = currentQuestions.map(q => q.id);
      const validation = validateSection(currentQuestions, responses, visibleIds);
      
      console.log("🔍 Validation check:");
      console.log("  - Questions to validate:", currentQuestions.length);
      console.log("  - Visible IDs:", visibleIds);
      console.log("  - Validation result:", validation);
      console.log("  - Is valid:", validation.isValid);
      
      if (!validation.isValid) {
        console.log("❌ Validation failed - errors:", validation.errors);
        scrollToFirstError();
        toast({
          title: "Please complete all required questions",
          description: "Some questions still need to be answered before you can complete the assessment.",
          variant: "destructive"
        });
        return;
      }
      
      console.log("✅ Validation passed - calling completeAssessment()");
      // Complete the assessment
      completeAssessment();
      return;
    }
    
    // For regular next steps, validate and proceed
    if (!canProceed()) {
      scrollToFirstError();
      toast({
        title: "Please complete all required questions",
        description: "Some questions still need to be answered before you can continue.",
        variant: "destructive"
      });
      return;
    }
    goNext();
  };

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
          <div key={question.id} id={question.id} data-question-id={question.id}>
            <QuestionCard
              question={question}
              value={responses[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
            />
          </div>
        ))}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={goPrev}
          variant="outline"
          className="flex items-center gap-2"
          disabled={currentPage === 0 || isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              {isFinalStep ? "Complete Assessment" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
