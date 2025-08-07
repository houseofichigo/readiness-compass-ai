// src/components/assessment/AssessmentFlow.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { QuestionCard } from "./QuestionCard";
import { AssessmentProgressBar } from "./AssessmentProgressBar";
import { ConsentBanner } from "./ConsentBanner";
import { OrganizationProfileForm } from "./OrganizationProfileForm";
import { assessmentSections, assessmentAddOns, computedFields } from "@/data/assessmentQuestions";
import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";
import { Track, OrganizationProfile, ComputedField, AssessmentValue } from "@/types/assessment";
import { validateSection } from "@/utils/validation";
import { validateSectionResponses } from "@/utils/assessmentValidation";
import { useToast } from "@/hooks/use-toast";
import { getLocalizedSection, getLocalizedQuestion } from "@/utils/assessmentUtils";
import { Logger } from "@/utils/logger";

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
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, AssessmentValue>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Evaluate computed fields using centralized logic
  const evaluateComputed = (responses: Record<string, unknown>): Record<string, unknown> => {
    const computed: Record<string, unknown> = {};
    
    Object.entries(computedFields).forEach(([id, field]) => {
      if (field.logic && typeof field.logic === 'string') {
        const logic = field.logic;
        
        if (id === 'regulated') {
          // Handle regulated industry logic with updated industry list
          const industryMatch = logic.match(/M4_industry\s+in\s+\[(.*?)\]/);
          if (industryMatch) {
            const industries = industryMatch[1].split(',').map(i => i.trim().replace(/['"]/g, ''));
            const userIndustry = responses.M4_industry as string;
            computed[id] = industries.includes(userIndustry);
          }
        } else if (id === 'track') {
          // Handle track detection with proper role matching
          const role = responses.M3 as string;
          const techRoles = [
            'CIO / CTO', 'IT Lead', 'Data / AI Lead', 'ML Engineer', 
            'Data Engineer', 'DevOps Engineer', 'Security Architect', 'Infrastructure Manager'
          ];
          const regRoles = [
            'Legal / Compliance Lead', 'Privacy Officer', 'Compliance Manager', 
            'Risk Manager', 'Audit Lead', 'Governance Officer'
          ];
          
          if (techRoles.includes(role)) {
            computed[id] = 'TECH';
          } else if (computed.regulated || regRoles.includes(role)) {
            computed[id] = 'REG';
          } else {
            computed[id] = 'GEN';
          }
        }
      }
    });
    
    return computed;
  };
  const globalComputed = evaluateComputed(responses);

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
    : getLocalizedSection(assessmentSections[currentPage], i18n.language);

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
      // Debug: Log assessment completion
      Logger.log("🔍 ASSESSMENT COMPLETION - Saving", Object.keys(responses).length, "responses");
      
      // Let Index.tsx handle the navigation - don't navigate here
      await onComplete(responses, profile);
      // Navigation is handled by onComplete in Index.tsx
    } catch (err) {
      Logger.error("🚨 Assessment completion error:", err);
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
    if (isAddOnPage) return visibleAddOns.map(q => getLocalizedQuestion(q, i18n.language));
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
    
    // Use enhanced validation
    const validation = validateSectionResponses(questions, responses);
    
    // Debug validation
    Logger.debug("ENHANCED VALIDATION DEBUG", {
      "Visible questions": questions.length,
      "Question IDs": questions.map(q => q.id),
      "Validation result": validation.valid,
      "Validation errors": validation.errors,
      "Current responses": Object.keys(responses)
    });
    
    return validation.valid;
  };

  const scrollToFirstError = () => {
    const questions = getVisibleQuestions();
    const validation = validateSectionResponses(questions, responses);
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
    Logger.debug("BUTTON CLICK DEBUG", {
      "Is final step": onFinalStep,
      "Is add-on page": isAddOnPage,
      "Is last section": isLastSection,
      "Has add-ons": hasAddOns
    });

    if (!canProceed()) {
      Logger.log("❌ VALIDATION FAILED - Cannot proceed!");
      scrollToFirstError();
      toast({
        title: "Please complete all required questions",
        description: "Some questions still need your input.",
        variant: "destructive",
      });
      return;
    }

    Logger.log("✅ VALIDATION PASSED - Proceeding...");
    if (onFinalStep) {
      Logger.log("🚀 CALLING completeAssessment()");
      await completeAssessment();
    } else {
      Logger.log("➡️ Going to next page");
      goNextPage();
    }
  };

  const visibleQuestions = getVisibleQuestions();
  const sectionTitle = isAddOnPage ? t('assessment.additionalQuestions') : t(`sections.${currentSection?.id}`) || currentSection?.title;
  const sectionPurpose = isAddOnPage ? undefined : currentSection?.purpose;
  const progressIndex = Math.min(currentPage, assessmentSections.length - 1);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Data & AI Maturity Diagnostic</h1>
        <LanguageSelector />
      </div>
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

        {/* Use special layout for Organization Profile section (section_0) */}
        {currentSection?.id === "section_0" ? (
          <OrganizationProfileForm
            questions={visibleQuestions}
            responses={responses}
            onChange={handleAnswerChange}
          />
        ) : (
          visibleQuestions.map(q => (
            <div key={q.id} id={q.id} data-question-id={q.id}>
              <QuestionCard question={q} value={responses[q.id]} onChange={v => handleAnswerChange(q.id, v)} detectedTrack={detectedTrack} />
            </div>
          ))
        )}
      </Card>

      <div className="flex justify-between">
        <Button onClick={goPrev} variant="outline" disabled={currentPage === 0 || isSubmitting}>
          <ArrowLeft className="h-4 w-4" /> {t('common.previous')}
        </Button>
        <Button 
          onClick={() => {
            Logger.log("🔴 BUTTON CLICKED - Starting handleNext");
            Logger.debug("CURRENT STATE", {
              "isSubmitting": isSubmitting,
              "currentPage": currentPage,
              "Total sections": assessmentSections.length,
              "Total responses": Object.keys(responses).length
            });
            handleNext();
          }} 
          disabled={isSubmitting}
        >
          {isSubmitting
            ? (<><Loader2 className="h-4 w-4 animate-spin" /> {t('common.submitting')}</>)
            : (isAddOnPage || (isLastSection && !hasAddOns) ? t('common.completeAssessment') : <>{t('common.next')} <ArrowRight className="h-4 w-4" /></>)
          }
        </Button>
      </div>
    </div>
  );
}
