// src/components/assessment/AssessmentFlow.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { AssessmentProgressBar } from "./AssessmentProgressBar";
import { assessmentSections, assessmentMeta } from "@/data/assessmentQuestions";
import { AssessmentResponse, Track, OrganizationProfile, ComputedField } from "@/types/assessment";

// Helpers to parse the YAML-declared computed logic
const parseListLiteral = (literal: string): string[] => {
  const match = literal.match(/\[(.*?)\]/s);
  if (!match) return [];
  return match[1].split(",").map(s => s.trim().replace(/['"]/g, ""));
};

const parseTechRoles = (rules: any[]): string[] => {
  const techRule = rules.find(
    (r: any) => typeof r.if === "string" && r.if.includes("-> TECH")
  );
  if (!techRule) return [];
  return parseListLiteral((techRule.if as string));
};

interface AssessmentFlowProps {
  onComplete: (responses: AssessmentResponse[], profile: OrganizationProfile, track: Track) => void;
}

export function AssessmentFlow({ onComplete }: AssessmentFlowProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");

  // 1) Extract the computed field for "regulated" from section_0
  const profileSection = assessmentSections.find(s => s.id === "section_0");
  const regulatedLogic =
    profileSection?.computed?.find((c: ComputedField) => c.id === "regulated")
      ?.logic ?? "";
  const regulatedIndustries = parseListLiteral(regulatedLogic);

  // 2) Extract the YAML-defined track_detection rules
  const trackRules = (assessmentMeta as any)?.track_detection?.precedence || [];
  const techRoles = parseTechRoles(trackRules);
  const legalRole = "Legal / Compliance Lead";

  // Fallback/simple track compute
  const computeTrack = (res: Record<string, any>): Track => {
    const role = res.M3 as string;
    const industry = res.M4_industry as string;
    if (techRoles.includes(role)) return "TECH";
    if (regulatedIndustries.includes(industry) || role === legalRole)
      return "REG";
    return "GEN";
  };

  const currentSection = assessmentSections[currentSectionIndex];
  if (!currentSection) return <div>Loading sections…</div>;

  const visibleQuestions = currentSection.questions;

  const handleAnswerChange = (questionId: string, value: any) => {
    setResponses(prev => {
      const updated = { ...prev, [questionId]: value };
      // re-compute track when persona fields change
      if (questionId === "M3" || questionId === "M4_industry") {
        setDetectedTrack(computeTrack(updated));
      }
      return updated;
    });
  };

  const goToNextSection = () => {
    if (currentSectionIndex < assessmentSections.length - 1) {
      setCurrentSectionIndex(idx => idx + 1);
    } else {
      // finalize
      const allResponses: AssessmentResponse[] = Object.entries(responses).map(
        ([questionId, val]) => ({
          questionId,
          value: val,
          sectionId:
            assessmentSections.find(s =>
              s.questions.some(q => q.id === questionId)
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

  const goToPreviousSection = () => {
    setCurrentSectionIndex(idx => Math.max(0, idx - 1));
  };

  const answeredCount = visibleQuestions.filter(q => responses[q.id] !== undefined).length;
  const personaDone = Boolean(responses.M3 && responses.M4_industry);

  return (
    <div className="min-h-screen bg-gradient-accent p-4">
      <div className="container mx-auto max-w-6xl">
        <AssessmentProgressBar
          currentSectionIndex={currentSectionIndex}
          totalSections={assessmentSections.length}
          completedSections={currentSectionIndex}
          detectedTrack={detectedTrack}
          showTrackInfo={personaDone}
        />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{currentSection.title}</CardTitle>
            <p className="text-muted-foreground">{currentSection.purpose}</p>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Questions in this section</span>
              <span>{answeredCount} / {visibleQuestions.length} answered</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
                      onChange={val => handleAnswerChange(q.id, val)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {currentSectionIndex > 0 ? (
            <Button
              variant="outline"
              onClick={goToPreviousSection}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
          ) : <div />}

          <Button onClick={goToNextSection} className="flex items-center gap-2">
            {currentSectionIndex === assessmentSections.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
