import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AssessmentResponse, OrganizationProfile, Track, TRACK_WEIGHTS } from "@/types/assessment";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, BarChart3 } from "lucide-react";

interface AssessmentResultsProps {
  responses: AssessmentResponse[];
  profile: OrganizationProfile;
  track: Track;
  onRestart: () => void;
}

export function AssessmentResults({ 
  responses, 
  profile, 
  track, 
  onRestart 
}: AssessmentResultsProps) {
  // Calculate mock scores for demonstration
  const sectionScores = {
    Strategy: Math.floor(Math.random() * 40) + 60,
    Data: Math.floor(Math.random() * 40) + 50,
    Tools: Math.floor(Math.random() * 40) + 55,
    Automation: Math.floor(Math.random() * 40) + 45,
    People: Math.floor(Math.random() * 40) + 65,
    Governance: Math.floor(Math.random() * 40) + 40
  };

  const weights = TRACK_WEIGHTS[track];
  const overallScore = Math.round(
    Object.entries(sectionScores).reduce((total, [section, score]) => {
      return total + (score * weights[section as keyof typeof weights]) / 100;
    }, 0)
  );

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: "Advanced", color: "bg-green-500", description: "Excellent AI readiness" };
    if (score >= 65) return { level: "Intermediate", color: "bg-blue-500", description: "Good foundation with room for growth" };
    if (score >= 45) return { level: "Developing", color: "bg-yellow-500", description: "Basic readiness, needs improvement" };
    return { level: "Beginner", color: "bg-red-500", description: "Significant development needed" };
  };

  const readinessLevel = getReadinessLevel(overallScore);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="bg-gradient-primary bg-clip-text text-transparent">
          <h1 className="text-4xl font-bold">AI Readiness Assessment Results</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          {profile.M1} • {profile.M3} at {profile.M5}
        </p>
        <Badge variant="outline" className="text-sm">
          {track === "TECH" ? "Technical Track" : track === "REG" ? "Regulated Track" : "General Business Track"}
        </Badge>
      </div>

      {/* Overall Score */}
      <Card className="p-8 text-center bg-gradient-accent border-0 shadow-glow">
        <div className="space-y-4">
          <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {overallScore}
          </div>
          <div className="space-y-2">
            <Badge className={`${readinessLevel.color} text-white px-4 py-2 text-lg`}>
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
        {Object.entries(sectionScores).map(([section, score]) => (
          <Card key={section} className="p-6 hover:shadow-elegant transition-all duration-300">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{section}</h3>
                <span className="text-2xl font-bold text-primary">{score}</span>
              </div>
              <Progress value={score} className="h-2" />
              <div className="text-sm text-muted-foreground">
                Weight: {weights[section as keyof typeof weights]}%
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card className="p-8 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Key Recommendations
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600">Strengths</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
                Leadership alignment on AI initiatives
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
                Strong technical foundation for AI implementation
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
                Good data management practices
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-600">Areas for Improvement</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                Develop comprehensive AI governance framework
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                Increase automation maturity across processes
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                Enhance team AI capabilities and training
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share Results
        </Button>
        <Button variant="outline" onClick={onRestart}>
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
}