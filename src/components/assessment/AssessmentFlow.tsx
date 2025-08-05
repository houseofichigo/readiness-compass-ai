// src/components/assessment/AssessmentFlow.tsx

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
import { validateSection } from "@/utils/validation";
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
    return [];
  }
};

export function AssessmentFlow({ onComplete }: AssessmentFlowProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, AssessmentValue>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile section computed fields
  const profileSection = assessmentSections.find(s => s.id === "section_0");
  const evaluateComputed = (fields: ComputedField[] | undefined, rs: Record<string, any>) => {
    const values: Record<string, any> = {};
    fields?.forEach(f => {
      if (f.id === "regulated") {
        const inds = parseListLiteral(String(f.logic || "[]"));
        values.regulated = inds.includes(rs.M4_industry as string);
      }
    });
    return values;
  };
  const globalComputed = evaluateComputed(profileSection?.computed, responses);

  // Keep detectedTrack up to date
  useEffect(() => {
    const newTrack = detectTrack(responses, globalComputed) as Track;
    setDetectedTrack(newTrack);
  }, [responses, globalComputed]);

  // Which add-ons to show?
  const visibleAddOns = assessmentAddOns.filter(q =>
    isQuestionVisible(q, responses, detectedTrack, 0, globalComputed)
  );

  const isLastSection = currentPage === assessmentSections.length - 1;
  const hasAddOns = visibleAddOns.length > 0;
  const isAddOnPage = currentPage === assessmentSections.length;
  const currentSection = isAddOnPage
    ? null
    : assessmentSections[currentPage];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goPrev = () => {
    setCurrentPage(p => Math.max(0, p - 1));
    scrollToTop();
  };
  const goNextPage = () => {
    if (isLastSection && hasAddOns) {
      setCurrentPage(assessmentSections.length);
    } else {
      setCurrentPage(p => Math.min(assessmentSections.length, p + 1));
    }
    scrollToTop();
  };

  const completeAssessment = async () => {
    // Build profile
    const profile: OrganizationProfile = {
      M0: (responses.M0 as string) || "",
      M1: (responses.M1 as string) || "",
      M2: (responses.M2 as string) || "",
      M3: (responses.M3 as string) || "",
      M3_other: (responses.M3_other as string) || "",
      M4_industry: (responses.M4_industry as string) || "",
      M4_sub: (responses.M4_sub as string) || "",
      M5_country: (responses.M5_country as string) || "",
      M6_size: (responses.M6_size as string) || "",
      M7_revenue: (responses.M7_revenue as string) || "",
      track: detectedTrack,
      regulated: Boolean(globalComputed.regulated),
    };

    setIsSubmitting(true);
    try {
      // Debug: Check responses before submission
      console.log("🔍 ASSESSMENT COMPLETION - Responses:", Object.keys(responses).length, "questions");
      console.log("📝 Sample responses:", Object.fromEntries(Object.entries(responses).slice(0, 3)));
      console.log("👤 Profile:", { track: detectedTrack, regulated: Boolean(globalComputed.regulated) });
      
      // Let Index.tsx handle the navigation - don't navigate here
      await onComplete(responses, profile);
      // Navigation is handled by onComplete in Index.tsx
    } catch (err) {
      console.error("🚨 Assessment completion error:", err);
      toast({
        title: "Error completing assessment",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerChange = (id: string, val: AssessmentValue) => {
    setResponses(r => ({ ...r, [id]: val }));
    if ((id === "M3" || id === "M4_industry") && !showTrackInfo) {
      setShowTrackInfo(true);
    }
  };

  const getVisibleQuestions = () => {
    if (isAddOnPage) return visibleAddOns;
    return currentSection
      ? currentSection.questions.filter(q =>
          isQuestionVisible(q, responses, detectedTrack, 0, globalComputed)
        )
      : [];
  };

  const canProceed = () => {
    const questions = getVisibleQuestions();
    // include consent if present
    if (currentSection?.consentBanner?.required) {
      questions.push({
        id: `consent_${currentSection.id}`,
        text: "Consent",
        type: "checkbox",
        required: true,
      } as any);
    }
    const ids = questions.map(q => q.id);
    return validateSection(questions, responses, ids).isValid;
  };

  const scrollToFirstError = () => {
    const validation = validateSection(getVisibleQuestions(), responses, getVisibleQuestions().map(q => q.id));
    const firstError = Object.keys(validation.errors)[0];
    const elem = document.getElementById(firstError);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = elem.querySelector("input, select, textarea, button");
      if (input instanceof HTMLElement) input.focus();
    }
  };

  const handleNext = async () => {
    if (isSubmitting) return;

    const onFinalStep = isAddOnPage || (isLastSection && !hasAddOns);

    if (!canProceed()) {
      scrollToFirstError();
      toast({
        title: "Please complete all required questions",
        description: "Some questions still need your input.",
        variant: "destructive",
      });
      return;
    }

    if (onFinalStep) {
      await completeAssessment();
    } else {
      goNextPage();
    }
  };

  const visibleQuestions = getVisibleQuestions();
  const sectionTitle = isAddOnPage ? "Additional Questions" : currentSection?.title;
  const sectionPurpose = isAddOnPage ? undefined : currentSection?.purpose;
  const progressIndex = Math.min(currentPage, assessmentSections.length - 1);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <AssessmentProgressBar
        currentSectionIndex={progressIndex}
        completedSections={progressIndex}
        detectedTrack={detectedTrack}
        showTrackInfo={showTrackInfo}
        responses={responses}
        globalComputed={globalComputed}
      />

      {!isAddOnPage && currentSection?.consentBanner && (
        <ConsentBanner
          id={`consent_${currentSection.id}`}
          text={currentSection.consentBanner.text || ""}
          required={currentSection.consentBanner.required}
          accepted={!!responses[`consent_${currentSection.id}`]}
          onChange={val => handleAnswerChange(`consent_${currentSection.id}`, val)}
        />
      )}

      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{sectionTitle}</h2>
          {sectionPurpose && <p className="text-muted-foreground">{sectionPurpose}</p>}
          <Progress value={((currentPage) / assessmentSections.length) * 100} className="w-full my-4" />
        </div>

        {visibleQuestions.map(q => (
          <div key={q.id} id={q.id} data-question-id={q.id}>
            <QuestionCard question={q} value={responses[q.id]} onChange={v => handleAnswerChange(q.id, v)} />
          </div>
        ))}
      </Card>

      <div className="flex justify-between">
        <Button onClick={goPrev} variant="outline" disabled={currentPage === 0 || isSubmitting}>
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting
            ? (<><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>)
            : (isAddOnPage || (isLastSection && !hasAddOns) ? "Complete Assessment" : <>Next <ArrowRight className="h-4 w-4" /></>)
          }
        </Button>
      </div>
    </div>
  );
}
