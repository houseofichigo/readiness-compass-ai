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
import { AssessmentResponse, Track, OrganizationProfile, ComputedField } from "@/types/assessment";

// Helpers to parse YAML list literals like "['A','B','C']"
const parseListLiteral = (lit: string): string[] => {
  const m = lit.match(/\[(.*?)\]/s);
  return m ? m[1].split(",").map(s => s.trim().replace(/['"]/g, "")) : [];
};

// Evaluate computed fields for a section
const evaluateComputed = (fields: ComputedField[] | undefined, rs: Record<string, any>): Record<string, any> => {
  const values: Record<string, any> = {};
  fields?.forEach(f => {
    if (f.id === "regulated") {
      const industries = parseListLiteral(f.logic as unknown as string || "");
      values[f.id] = industries.includes(rs.M4_industry);
    }
  });
  return values;
};
interface AssessmentFlowProps {
  onComplete: (responses: AssessmentResponse[], profile: OrganizationProfile, track: Track) => void;
}
export function AssessmentFlow({
  onComplete
}: AssessmentFlowProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");
  const [bannerConsent, setBannerConsent] = useState<Record<string, boolean>>({});

  // Precompute global computed fields (e.g., from profile section)
  const profileSection = assessmentSections.find(s => s.id === "section_0");
  const globalComputed = evaluateComputed(profileSection?.computed, responses);

  // Filter visible “add-on” questions
  const visibleAddOns = assessmentAddOns.filter(q => isQuestionVisible(q, responses, detectedTrack, /* totalVisible= */0, globalComputed));

  // Total pages = core sections + optional add-ons page
  const totalPages = assessmentSections.length + (visibleAddOns.length > 0 ? 1 : 0);

  // Are we on the final add-ons page?
  const isAddOnPage = visibleAddOns.length > 0 && currentPage === assessmentSections.length;

  // Pick current “section”
  const currentSection = isAddOnPage ? {
    id: "add_ons",
    title: "Additional Questions",
    purpose: "",
    questions: visibleAddOns,
    consentBanner: undefined,
    computed: undefined
  } : assessmentSections[currentPage]!;

  // If still loading...
  if (!currentSection) return <div>Loading sections…</div>;
  const sectionComputed = evaluateComputed(currentSection.computed, responses);
  const computedValues = {
    ...globalComputed,
    ...sectionComputed
  };
  let totalVisible = 0;
  const visibleQuestions = currentSection.questions.filter(q => {
    const show = isQuestionVisible(q, responses, detectedTrack, totalVisible, computedValues);
    if (show) totalVisible++;
    return show;
  });

  // Handle answer changes and re-compute track for persona fields
  const handleAnswerChange = (qid: string, val: any) => {
    setResponses(prev => {
      const updated = {
        ...prev,
        [qid]: val
      };
      if (qid === "M3" || qid === "M4_industry") {
        const comp = evaluateComputed(profileSection?.computed, updated);
        setDetectedTrack(detectTrack(updated, comp) as Track);
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
      const allResponses: AssessmentResponse[] = Object.entries(responses).map(([qid, v]) => ({
        questionId: qid,
        value: v,
        sectionId: isAddOnPage ? "add_ons" : assessmentSections.find(s => s.questions.some(q => q.id === qid))?.id ?? "unknown"
      }));
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
      };
      onComplete(allResponses, profile, detectedTrack);
    }
  };
  const goPrev = () => setCurrentPage(i => Math.max(0, i - 1));

  // UI bits
  const answeredCount = visibleQuestions.filter(q => responses[q.id] !== undefined).length;
  const showTrackInfo = Boolean(responses.M3 && responses.M4_industry);
  const consentReq = currentSection.consentBanner?.required;
  const consentGiven = bannerConsent[currentSection.id] === true;
  return <div className="min-h-screen bg-gradient-accent p-4">
      <div className="container mx-auto max-w-6xl">
        <AssessmentProgressBar 
          currentSectionIndex={currentPage} 
          completedSections={currentPage} 
          detectedTrack={detectedTrack} 
          showTrackInfo={showTrackInfo}
          responses={responses}
          globalComputed={globalComputed}
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
            {currentSection.consentBanner && <ConsentBanner id={`consent_${currentSection.id}`} text={currentSection.consentBanner.text} required={currentSection.consentBanner.required} accepted={consentGiven} onChange={val => setBannerConsent(b => ({
            ...b,
            [currentSection.id]: val
          }))} />}

            {/* All questions for this page */}
            {visibleQuestions.map((q, idx) => 
              <QuestionCard key={q.id} question={q} value={responses[q.id]} onChange={v => handleAnswerChange(q.id, v)} />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
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
          
          <Button onClick={goNext} className="flex items-center gap-2" disabled={consentReq && !consentGiven}>
            {currentPage === totalPages - 1 ? "Complete" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>;
}