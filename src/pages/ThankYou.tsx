// src/pages/ThankYou.tsx
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
  const { i18n, t } = useTranslation();
  const { trackLabels } = getAssessmentTranslations(i18n.language);
  const { toast } = useToast();
  const { loadAssessment } = useAssessment();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
    async function load() {
      if (submissionIdFromUrl) {
        const loaded = await loadAssessment(submissionIdFromUrl);
        if (loaded) {
          setAssessmentData({
            profile: loaded.profile,
            track: loaded.profile.track,
            responses: loaded.responses,
            submissionId: submissionIdFromUrl,
          });
        }
      }
      setIsLoading(false);
    }
    load();
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
          <h2 className="text-2xl font-bold mb-2">{t("errors.loading.title")}</h2>
          <p className="text-muted-foreground">{t("errors.loading.description")}</p>
        </div>
      </div>
    );
  }

  const { profile, track, responses } = assessmentData || data || mockData;
  const totalQuestions = Object.keys(responses).length;

  const handleComingSoon = (featureKey: string) => {
    toast({
      title: t("toast.comingSoon.title"),
      description: t("toast.comingSoon.description", { feature: t(featureKey) }),
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
              {t("assessment.thankYou.title")}
            </h1>
            <p className="text-lg text-primary">
              {t("assessment.thankYou.subtitle")}
            </p>
            <p className="text-muted-foreground">
              {t("assessment.thankYou.heroMessage", { organization: profile.M0 })}
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-blue-50 border-blue-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground">
                {t("assessment.thankYou.statusCards.complete.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("assessment.thankYou.statusCards.complete.description")}
              </p>
            </div>
          </Card>
          <Card className="p-6 text-center bg-yellow-50 border-yellow-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-foreground">
                {t("assessment.thankYou.statusCards.report.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("assessment.thankYou.statusCards.report.description")}
              </p>
            </div>
          </Card>
          <Card className="p-6 text-center bg-green-50 border-green-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Rocket className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">
                {t("assessment.thankYou.statusCards.action.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("assessment.thankYou.statusCards.action.description")}
              </p>
            </div>
          </Card>
        </div>

        {/* Overview */}
        <Card className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {t("assessment.thankYou.overview.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">
                {totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("assessment.thankYou.overview.questionsAnswered")}
              </div>
            </div>
            <div>
              <Badge variant="outline" className="text-sm">
                {trackLabels[track]}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Resources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="p-6 hover-scale cursor-pointer"
            onClick={() => handleComingSoon("assessment.thankYou.resources.implementationGuides.title")}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground">
                {t("assessment.thankYou.resources.implementationGuides.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("assessment.thankYou.resources.implementationGuides.description")}
              </p>
            </div>
          </Card>
          {/* … repeat for each resource card … */}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("assessment.thankYou.actions.retake")}
            </Button>
          </Link>
          <Button
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            onClick={() => window.open("https://www.houseofichigo.com", "_blank")}
          >
            <Globe className="w-4 h-4 mr-2" />
            {t("assessment.thankYou.actions.visitWebsite")}
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center space-y-4 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">
            {t("assessment.thankYou.thanks.title")}
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t("assessment.thankYou.thanks.description")}{" "}
            {t("assessment.thankYou.footer.privacyNotice")}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>{t("assessment.thankYou.footer.dataPrivacy")}</span>
            </div>
            <span>•</span>
            <span>{t("assessment.thankYou.footer.contact")}</span>
          </div>
          <p className="text-sm opacity-60">
            {profile.M0} • {profile.M3} • {profile.M4_industry}
          </p>
          <Badge variant="outline" className="text-xs">
            {trackLabels[track]}
          </Badge>
        </div>
      </div>
    </div>
  );
}
