import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AssessmentResponse,
  OrganizationProfile,
  Track,
  WeightVector,
} from "@/types/assessment";
import { assessmentMeta } from "@/data/assessmentQuestions";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, BarChart3 } from "lucide-react";
import { scoreAnswers } from "@/utils/scoring";
import { useTranslation } from "react-i18next";

interface AssessmentResultsProps {
  responses: AssessmentResponse[];
  profile: OrganizationProfile;
  track: Track;
  submissionId?: string | null;
  onRestart: () => void;
}

export function AssessmentResults({
  responses,
  profile,
  track,
  submissionId,
  onRestart,
}: AssessmentResultsProps) {
  const { t } = useTranslation();

  // Map responses to a simple object
  const responseValues = responses.reduce<Record<string, unknown>>(
    (acc, { questionId, value }) => {
      acc[questionId] = value;
      return acc;
    },
    {}
  );

  // Score everything
  const { questionScores, sectionScores, totalScore } = scoreAnswers(
    responseValues,
    track
  );
  const roundedScore = Math.round(totalScore);

  // Determine readiness level
  const getReadinessLevel = (score: number) => {
    if (score >= 80)
      return {
        level: t("assessment.results.readinessLevel.advanced"),
        color: "bg-green-500",
        description: t("assessment.results.readinessLevel.advancedDesc"),
      };
    if (score >= 65)
      return {
        level: t("assessment.results.readinessLevel.intermediate"),
        color: "bg-blue-500",
        description: t("assessment.results.readinessLevel.intermediateDesc"),
      };
    if (score >= 45)
      return {
        level: t("assessment.results.readinessLevel.developing"),
        color: "bg-yellow-500",
        description: t("assessment.results.readinessLevel.developingDesc"),
      };
    return {
      level: t("assessment.results.readinessLevel.beginner"),
      color: "bg-red-500",
      description: t("assessment.results.readinessLevel.beginnerDesc"),
    };
  };
  const readinessLevel = getReadinessLevel(roundedScore);

  // Pull in the per-track weights from meta
  const weightVectors = (
    assessmentMeta as { weight_vectors?: Record<Track, WeightVector> }
  ).weight_vectors ?? {};
  const defaultWeights: WeightVector = {
    strategy: 0,
    data: 0,
    tools: 0,
    automation: 0,
    people: 0,
    governance: 0,
  };
  const weights =
    weightVectors[track] ?? weightVectors.GEN ?? defaultWeights;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="bg-gradient-primary bg-clip-text text-transparent">
          <h1 className="text-4xl font-bold">
            {t("assessment.results.heading")}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          {profile.M1} • {profile.M3} at {profile.M0}
        </p>
        <Badge variant="outline" className="text-sm">
          {t(`assessment.results.track.${track}`)}
        </Badge>
        {submissionId && (
          <div className="text-sm text-muted-foreground">
            Assessment ID:{" "}
            <code className="font-mono bg-muted px-2 py-1 rounded text-xs">
              {submissionId}
            </code>
          </div>
        )}
      </div>

      {/* Overall Score */}
      <Card className="p-8 text-center bg-gradient-accent border-0 shadow-glow">
        <div className="space-y-4">
          <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {roundedScore}
          </div>
          <div className="space-y-2">
            <Badge
              className={`${readinessLevel.color} text-white px-4 py-2 text-lg`}
            >
              {readinessLevel.level}
            </Badge>
            <p className="text-muted-foreground">
              {readinessLevel.description}
            </p>
          </div>
        </div>
      </Card>

      {/* Section Breakdown */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(sectionScores).map(([section, score]) => {
          const weight = (weights as Partial<WeightVector>)[
            section as keyof WeightVector
          ];
          return (
            <Card
              key={section}
              className="p-6 hover:shadow-elegant transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{section}</h3>
                  <span className="text-2xl font-bold text-primary">
                    {score}
                  </span>
                </div>
                <Progress value={score} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  Weight: {weight != null ? `${weight}%` : "N/A"}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recommendations */}
      <Card className="p-8 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          {t("assessment.results.keyRecommendations")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600">
              {t("assessment.results.strengths")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
                {t("assessment.results.strengthsList.leadership")}
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
                {t("assessment.results.strengthsList.technical")}
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
                {t("assessment.results.strengthsList.data")}
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-600">
              {t("assessment.results.areasForImprovement")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                {t("assessment.results.improvementList.governance")}
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                {t("assessment.results.improvementList.automation")}
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                {t("assessment.results.improvementList.training")}
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Download className="h-4 w-4 mr-2" />
          {t("assessment.results.actions.download")}
        </Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          {t("assessment.results.actions.share")}
        </Button>
        <Button variant="outline" onClick={onRestart}>
          {t("assessment.results.actions.restart")}
        </Button>
      </div>
    </div>
  );
}
