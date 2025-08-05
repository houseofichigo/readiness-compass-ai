import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import Confetti from "react-confetti";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  CheckCircle,
  Clock,
  Rocket,
  FileText,
  BookOpen,
  Users,
  GraduationCap,
  MessageSquare,
  Calculator,
  Shield,
  ArrowLeft,
  Globe
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { OrganizationProfile, Track } from "@/types/assessment";
import { useAssessment } from "@/hooks/useAssessment";
import { getAssessmentTranslations } from "@/i18n/assessmentTranslations";

interface ThankYouPageData {
  profile: OrganizationProfile;
  track: Track;
  responses: Record<string, unknown>;
  submissionId?: string;
}

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { loadAssessment } = useAssessment();

  // keep this approach:
  const { i18n } = useTranslation();
  const { trackLabels } = getAssessmentTranslations(i18n.language);

  const [showConfetti, setShowConfetti] = useState(true);
  const [assessmentData, setAssessmentData] = useState<ThankYouPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const data = location.state as ThankYouPageData;
  const submissionIdFromUrl = searchParams.get("submissionId");

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (submissionIdFromUrl) {
        try {
          const loaded = await loadAssessment(submissionIdFromUrl);
          if (loaded) {
            setAssessmentData({
              profile: loaded.profile,
              track: loaded.profile.track,
              responses: loaded.responses,
              submissionId: submissionIdFromUrl,
            });
          }
        } catch {
          // silent
        }
      }
      setIsLoading(false);
    };
    loadData();
  }, [submissionIdFromUrl, loadAssessment]);

  const mockData: ThankYouPageData = {
    profile: {
      M0: "Demo Company",
      M1: "John Doe",
      M2: "john@demo.com",
      M3: "CTO/Tech Lead",
      M4_industry: "Technology",
      M5_country: "United States",
      M6_size: "50-249",
      track: "TECH",
    },
    track: "TECH",
    responses: {
      M0: "Demo Company",
      M1: "John Doe",
      M2: "john@demo.com",
      M3: "CTO/Tech Lead",
      M4_industry: "Technology",
      M5_country: "United States",
      M6_size: "50-249",
    },
    submissionId: "demo-123",
  };

  if (isLoading && submissionIdFromUrl) {
    return (
      <div className="min-h-screen bg-gradient-accent flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading your results...</h2>
          <p className="text-muted-foreground">
            Please wait while we retrieve your assessment data.
          </p>
        </div>
      </div>
    );
  }

  const pageData = assessmentData || data || mockData;
  const { profile, track, responses } = pageData;
  const totalQuestions = Object.keys(responses).length;

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} will be available soon. We'll notify you when it's ready.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-accent">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}

      <LanguageSwitcher className="absolute top-4 right-4 z-10" />

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              {i18n.t("assessment.thankYou.title")}
            </h1>
            <p className="text-lg text-primary">
              {i18n.t("assessment.thankYou.subtitle")}
            </p>
            <p className="text-muted-foreground">
              Thank you, {profile.M0} team, for completing our comprehensive AI
              readiness assessment
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* … three cards … */}
        </div>

        {/* Quick Highlights */}
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Assessment Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">
                  Questions Answered
                </div>
              </div>
              <div>
                <Badge variant="outline" className="text-sm">
                  {trackLabels[track]}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* … resource cards … */}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {i18n.t("assessment.thankYou.actions.retake")}
            </Button>
          </Link>
          <Button
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            onClick={() => window.open("https://www.houseofichigo.com", "_blank")}
          >
            <Globe className="w-4 h-4 mr-2" />
            {i18n.t("assessment.thankYou.actions.visitWebsite")}
          </Button>
        </div>
      </div>
    </div>
  );
}
