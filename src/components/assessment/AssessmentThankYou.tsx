import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Rocket, BarChart3, FileText, Map, Lightbulb } from "lucide-react";
import { OrganizationProfile, Track } from "@/types/assessment";

interface AssessmentThankYouProps {
  profile: OrganizationProfile;
  track: Track;
  onRestart: () => void;
}

export function AssessmentThankYou({
  profile,
  track,
  onRestart
}: AssessmentThankYouProps) {
  const getTrackLabel = (track: Track) => {
    switch (track) {
      case "TECH": return "Technical Track";
      case "REG": return "Regulated Track";
      default: return "General Business Track";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with Success Icon */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Assessment Complete</h1>
          <p className="text-lg text-primary">8 key areas evaluated with detailed analysis</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground">Assessment Complete</h3>
            <p className="text-sm text-muted-foreground">8 key areas evaluated with detailed analysis</p>
          </div>
        </Card>

        <Card className="p-6 text-center bg-yellow-50 border-yellow-200">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-foreground">Report Available Soon</h3>
            <p className="text-sm text-muted-foreground">We will email your personalized report within 3 business days</p>
          </div>
        </Card>

        <Card className="p-6 text-center bg-green-50 border-green-200">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Rocket className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground">Take Action</h3>
            <p className="text-sm text-muted-foreground">Implement recommendations to advance your AI journey</p>
          </div>
        </Card>
      </div>

      {/* Report Preparation Section */}
      <Card className="p-8 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Your report is being prepared</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI experts are analyzing your responses to create a comprehensive, personalized maturity report with 
            concrete recommendations specifically tailored to your organization.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">
              We will send you your detailed AI readiness report within 3 business days
            </span>
          </div>
          <p className="text-sm text-blue-700">
            Please check your inbox (and spam folder) to receive your personalized assessment results
          </p>
        </div>
      </Card>

      {/* Report Includes */}
      <Card className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-foreground">Your report includes</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">AI Maturity Score</h3>
              <p className="text-sm text-muted-foreground">Overall assessment of the 8 key areas</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">Detailed Analysis by Section</h3>
              <p className="text-sm text-muted-foreground">Identification of strengths and areas for improvement</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">Operational Recommendations</h3>
              <p className="text-sm text-muted-foreground">Concrete steps to advance your AI journey</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">Implementation Roadmap</h3>
              <p className="text-sm text-muted-foreground">Prioritized timeline for AI adoption</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="outline" onClick={onRestart}>
          Retake Assessment
        </Button>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          Visit Our Website
        </Button>
      </div>

      {/* Thank You Message */}
      <div className="text-center space-y-2 pt-8">
        <h3 className="text-lg font-semibold text-foreground">Thank you for your participation</h3>
        <p className="text-sm text-muted-foreground">
          Your data helps us improve our assessment and provide more relevant insights on AI readiness.
        </p>
      </div>

      {/* Profile Info */}
      <div className="text-center space-y-2 opacity-60">
        <p className="text-sm text-muted-foreground">
          {profile.M1} • {profile.M3} at {profile.M0}
        </p>
        <Badge variant="outline" className="text-xs">
          {getTrackLabel(track)}
        </Badge>
      </div>
    </div>
  );
}