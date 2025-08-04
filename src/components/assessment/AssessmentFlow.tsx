// src/components/assessment/AssessmentFlow.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { AssessmentProgressBar } from "./AssessmentProgressBar";
import { ConsentBanner } from "./ConsentBanner";

import { assessmentSections, assessmentAddOns } from "@/data/assessmentQuestions";
import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";
import {
  AssessmentResponse,
  Track,
  OrganizationProfile,
  ComputedField,
} from "@/types/assessment";

// Helpers to parse YAML list literals like "['A','B','C']"
const parseListLiteral = (lit: string): string[] => {
  const m = lit.match(/\[(.*?)\]/s);
  return m ? m[1].split(",").map(s => s.trim().replace(/['"]/g, "")) : [];
};

// Evaluate computed fields for a section
const evaluateComputed = (
  fields: ComputedField[] | undefined,
  rs: Record<string, any>
): Record<string, any> => {
  const values: Record<string, any> = {};
  fields?.forEach(f => {
    if (f.id === "regulated") {
      const industries = parseListLiteral(f.logic);
      values[f.id] = industries.includes(rs.M4_industry);
    }
  });
  return values;
};

interface AssessmentFlowProps {
  onComplete: (
    responses: AssessmentResponse[],
    profile: OrganizationProfile,
    track: Track
  ) => void;
}

export function AssessmentFlow({ onComplete }: AssessmentFlowProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");
  const [bannerConsent, setBannerConsent] = useState<Record<string, boolean>>({});

  // Precompute global computed fields (e.g., from profile section)
  const profileSection = assessmentSections.find(s => s.id === "section_0");
  const globalComputed = evaluateComputed(profileSection?.computed, responses);

  // Filter visible “add-on” questions
  const visibleAddOns = assessmentAddOns.filter(q =>
    isQuestionVisible(q, responses, detectedTrack, /* totalVisible= */ 0, globalComputed)
  );

  // Total pages = core sections + optional add-ons page
  const totalPages =
    assessmentSections.length + (visibleAddOns.length > 0 ? 1 : 0);

  // Are we on the final add-ons page?
  const isAddOnPage =
    visibleAddOns.length > 0 && currentPage === assessmentSections.length;

  // Pick current “section”
  const currentSection = isAddOnPage
    ? {
        id: "add_ons",
        title: "Additional Questions",
        purpose: "",
        questions: visibleAddOns,
        consent_banner: undefined,
        computed: undefined,
      }
    : assessmentSections[currentPage]!;

  // If still loading...
  if (!currentSection) return <div>Loading sections…</div>;

  const sectionComputed = evaluateComputed(currentSection.computed, responses);
  const computedValues = { ...globalComputed, ...sectionComputed };

  let totalVisible = 0;
  const visibleQuestions = currentSection.questions.filter(q => {
    const show = isQuestionVisible(
      q,
      responses,
      detectedTrack,
      totalVisible,
      computedValues,
    );
    if (show) totalVisible++;
    return show;
  });

  // Handle answer changes and re-compute track for persona fields
  const handleAnswerChange = (qid: string, val: any) => {
    setResponses(prev => {
      const updated = { ...prev, [qid]: val };
      if (qid === "M3" || qid === "M4_industry") {
        const comp = evaluateComputed(profileSection?.computed, updated);
        setDetectedTrack(detectTrack(updated, comp));
      }
      return updated;
    });
  };

  // Move forwards/backwards
  const goNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(i => i + 1);
    } else {
      // Finalize
      const allResponses: AssessmentResponse[] = Object.entries(responses).map(
        ([qid, v]) => ({
          questionId: qid,
          value: v,
          sectionId: isAddOnPage
            ? "add_ons"
            : assessmentSections.find(s =>
                s.questions.some(q => q.id === qid)
              )?.id ?? "unknown",
        })
      );

      const profile: OrganizationProfile = {
        M0: responses.M0 || "",
        M1: responses.M1 || "",
        M2: responses.M2 || "",
        M3: responses.M3 || "",
        M3_other: responses.M3_other || "",
        M4_industry: responses.M4_industry || "",
        M4_sub: responses.M4_sub || "",
        M5_country: responses.M5_country || "",
        M6_size: responses.M6_size || "",
        M7_revenue: responses.M7_revenue || "",
        M8_consent: responses.M8_consent || false,
      };

      onComplete(allResponses, profile, detectedTrack);
    }
  };
  const goPrev = () =>
    setCurrentPage(i => Math.max(0, i - 1));

  // UI bits
  const answeredCount = visibleQuestions.filter(q => responses[q.id] !== undefined).length;
  const showTrackInfo = Boolean(responses.M3 && responses.M4_industry);
  const consentReq = (currentSection as any).consent_banner?.required;
  const consentGiven = bannerConsent[currentSection.id] === true;

  return (
    <div className="min-h-screen bg-gradient-accent p-4">
      <div className="container mx-auto max-w-6xl">
        <AssessmentProgressBar
          currentSectionIndex={currentPage}
          completedSections={currentPage}
          detectedTrack={detectedTrack}
          showTrackInfo={showTrackInfo}
        />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentSection.title}
            </CardTitle>
            <p className="text-muted-foreground">
              {currentSection.purpose}
            </p>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Questions in this section</span>
              <span>
                {answeredCount} / {visibleQuestions.length} answered
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Consent banner if declared */}
            {"consent_banner" in currentSection &&
              currentSection.consent_banner && (
                <ConsentBanner
                  id={`consent_${currentSection.id}`}
                  text={currentSection.consent_banner!.text}
                  required={currentSection.consent_banner!.required}
                  accepted={consentGiven}
                  onChange={val =>
                    setBannerConsent(b => ({ ...b, [currentSection.id]: val }))
                  }
                />
              )}

            {/* All questions for this page */}
            {visibleQuestions.map((q, idx) => (
              <div key={q.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1 text-xs">
                    {idx + 1}
                  </Badge>
                  <div className="flex-1">
                    <QuestionCard
                      question={q}
                      value={responses[q.id]}
                      onChange={v => handleAnswerChange(q.id, v)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {currentPage > 0 ? (
            <Button
              variant="outline"
              onClick={goPrev}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
          ) : (
            <div />
          )}

          <Button
            onClick={goNext}
            className="flex items-center gap-2"
            disabled={consentReq && !consentGiven}
          >
            {currentPage === totalPages - 1 ? "Complete" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
