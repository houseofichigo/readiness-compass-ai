import React from "react";
import { CheckCircle2, Clock, HelpCircle } from "lucide-react";
import { Track } from "@/types/assessment";
import { assessmentSections } from "@/data/assessmentQuestions";

interface AssessmentProgressBarProps {
  currentSectionIndex: number;
  completedSections: number;
  detectedTrack: Track | null;
  showTrackInfo: boolean;
}

const trackLabels = {
  TECH: "Technical Track",
  REG: "Regulated Track", 
  GEN: "General Track"
};

export function AssessmentProgressBar({
  currentSectionIndex,
  completedSections,
  detectedTrack,
  showTrackInfo
}: AssessmentProgressBarProps) {
  const totalSections = assessmentSections.length;
  const progressPercentage = Math.round((completedSections / totalSections) * 100);
  const remainingSections = totalSections - completedSections;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {/* Header with title and completion percentage */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-foreground">AI Readiness Assessment</h1>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <div>
            <div className="text-2xl font-bold text-green-600">{completedSections}</div>
            <div className="text-sm text-green-700">Sections Complete</div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-orange-600" />
          <div>
            <div className="text-2xl font-bold text-orange-600">{remainingSections}</div>
            <div className="text-sm text-orange-700">Sections Remaining</div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-gray-600" />
          <div>
            <div className="text-2xl font-bold text-gray-600">?</div>
            <div className="text-sm text-gray-700">
              {showTrackInfo && detectedTrack 
                ? trackLabels[detectedTrack]
                : "Complete Profile First"
              }
            </div>
          </div>
        </div>
      </div>

      {/* Current section indicator */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">
          Section {currentSectionIndex + 1} of {totalSections}: {assessmentSections[currentSectionIndex]?.title}
        </div>
        {!showTrackInfo && (
          <div className="text-sm text-muted-foreground">
            Complete your profile to see personalized question count
          </div>
        )}
      </div>

      {/* Section progress circles */}
      <div className="flex items-center justify-between">
        {assessmentSections.map((section, index) => {
          const label = section.title;
          const isCompleted = index < completedSections;
          const isCurrent = index === currentSectionIndex;

          return (
            <div key={section.id} className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold mb-2
                  ${isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                      ? 'bg-green-100 text-green-700 border-2 border-green-200'
                      : 'bg-gray-100 text-gray-500'
                  }
                `}
              >
                {index + 1}
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">
                  {isCurrent ? 'Current' : isCompleted ? 'Complete' : 'Pending'}
                </div>
              </div>

              {/* Progress line between circles */}
              {index < assessmentSections.length - 1 && (
                <div
                  className={`
                    absolute h-0.5 w-16 mt-6 ml-12
                    ${index < currentSectionIndex ? 'bg-green-300' : 'bg-gray-200'}
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