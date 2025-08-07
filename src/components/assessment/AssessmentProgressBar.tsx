// src/components/assessment/AssessmentProgressBar.tsx

import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Clock, HelpCircle } from "lucide-react";
import { Track } from "@/types/assessment";
import { assessmentSections, assessmentAddOns } from "@/data/assessmentQuestions";
import { isQuestionVisible } from "@/utils/questionVisibility";

interface AssessmentProgressBarProps {
  currentSectionIndex: number;
  completedSections: number;
  detectedTrack: Track | null;
  showTrackInfo: boolean;
  responses?: Record<string, any>;
  globalComputed?: Record<string, any>;
}

export function AssessmentProgressBar({
  currentSectionIndex,
  completedSections,
  detectedTrack,
  showTrackInfo,
  responses = {},
  globalComputed = {},
}: AssessmentProgressBarProps) {
  const { t } = useTranslation();

  // Calculate remaining questions dynamically based on current responses and track
  const calculateRemainingQuestions = () => {
    if (!detectedTrack) return null;
    
    let totalQuestions = 0;
    let answeredQuestions = 0;
    
    // Count questions in all sections
    assessmentSections.forEach((section, sectionIndex) => {
      let sectionVisible = 0;
      section.questions.forEach(question => {
        if (isQuestionVisible(question, responses, detectedTrack, sectionVisible, globalComputed)) {
          sectionVisible++;
          totalQuestions++;
          
          // Count answered questions
          if (responses[question.id] !== undefined && responses[question.id] !== null && responses[question.id] !== "") {
            answeredQuestions++;
          }
        }
      });
    });
    
    // Count visible add-on questions
    assessmentAddOns.forEach(question => {
      if (isQuestionVisible(question, responses, detectedTrack, totalQuestions, globalComputed)) {
        totalQuestions++;
        if (responses[question.id] !== undefined && responses[question.id] !== null && responses[question.id] !== "") {
          answeredQuestions++;
        }
      }
    });
    
    return {
      total: totalQuestions,
      remaining: totalQuestions - answeredQuestions,
      answered: answeredQuestions
    };
  };

  // Check if we should show the question count (role filled in + on section 2 or later)
  const shouldShowQuestionCount = () => {
    const hasRole = responses.M3 && responses.M3 !== "";
    const isOnSection2OrLater = currentSectionIndex >= 1;
    return hasRole && isOnSection2OrLater && detectedTrack;
  };

  const questionData = calculateRemainingQuestions();
  const showQuestionCount = shouldShowQuestionCount();
  const totalSections = assessmentSections.length;
  const progressPercentage = Math.round(
    (completedSections / totalSections) * 100
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-foreground">
          {t('assessment.tagline')}
        </h1>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary tabular-nums">
            <span className="inline-block min-w-[4ch] text-right">{progressPercentage}%</span>
          </div>
          <div className="text-sm text-muted-foreground">{t('assessment.progress.complete')}</div>
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <div>
            <div className="text-2xl font-bold text-green-600">
              {completedSections}
            </div>
            <div className="text-sm text-green-700">{t('assessment.progress.sectionsComplete')}</div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-orange-600" />
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {totalSections - completedSections}
            </div>
            <div className="text-sm text-orange-700">{t('assessment.progress.sectionsRemaining')}</div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-gray-600" />
          <div>
            <div className="text-2xl font-bold text-gray-600">
              {showQuestionCount && questionData ? questionData.remaining : "?"}
            </div>
            <div className="text-sm text-gray-700">
              {showQuestionCount && detectedTrack && questionData
                ? `${t('assessment.progress.questionsRemaining_plural')} (${t(`tracks.${detectedTrack}`)})`
                : currentSectionIndex === 0 
                  ? "Complete Profile First"
                  : "Select Role to See Count"}
            </div>
          </div>
        </div>
      </div>

      {/* Current section indicator */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">
          {t('assessment.progress.sectionOf', { current: currentSectionIndex + 1, total: totalSections })}:{" "}
          {t(`sections.${assessmentSections[currentSectionIndex]?.id}`) || assessmentSections[currentSectionIndex]?.title}
        </div>
        {!showQuestionCount && currentSectionIndex === 0 && (
          <div className="text-sm text-muted-foreground">
            Complete your profile to see personalized question count
          </div>
        )}
        {!showQuestionCount && currentSectionIndex > 0 && !responses.M3 && (
          <div className="text-sm text-muted-foreground">
            Select your role to see remaining questions
          </div>
        )}
      </div>

      {/* Section circles */}
      <div className="flex items-center justify-between relative">
        {assessmentSections.map((section, index) => {
          const isCompleted = index < completedSections;
          const isCurrent = index === currentSectionIndex;

          return (
            <div key={section.id} className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold mb-2
                  ${isCurrent
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                    ? "bg-green-100 text-green-700 border-2 border-green-200"
                    : "bg-gray-100 text-gray-500"}
                `}
              >
                {index + 1}
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-foreground">
                  {t(`sections.${section.id}`) || section.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {isCurrent ? "Current" : isCompleted ? "Complete" : "Pending"}
                </div>
              </div>
              {/* Connector line */}
              {index < totalSections - 1 && (
                <div
                  className={`
                    absolute h-0.5 w-16 mt-6 ml-12
                    ${index < currentSectionIndex ? "bg-green-300" : "bg-gray-200"}
                  `}
                  style={{ zIndex: -1 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
