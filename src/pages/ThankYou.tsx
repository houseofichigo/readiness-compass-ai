import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import Confetti from "react-confetti";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CheckCircle, Clock, Rocket, FileText, BookOpen, Users, GraduationCap, MessageSquare, Calculator, Shield, Phone, ArrowLeft, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { OrganizationProfile, Track } from "@/types/assessment";
import { useAssessment } from "@/hooks/useAssessment";
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
  const { t } = useTranslation();
  
  const [showConfetti, setShowConfetti] = useState(true);
  const [assessmentData, setAssessmentData] = useState<ThankYouPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const data = location.state as ThankYouPageData;
  const submissionIdFromUrl = searchParams.get('submissionId');

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (submissionIdFromUrl) {
        try {
          const loadedData = await loadAssessment(submissionIdFromUrl);
          if (loadedData) {
            setAssessmentData({
              profile: loadedData.profile,
              track: loadedData.profile.track,
              responses: loadedData.responses,
              submissionId: submissionIdFromUrl
            });
          }
        } catch (error) {
          // Error handled silently in production
        }
      }
      setIsLoading(false);
    };

    loadData();
  }, [submissionIdFromUrl, loadAssessment]);

  // Create mock data for preview when no real data is available
  const mockData: ThankYouPageData = {
    profile: {
      M0: "Demo Company",
      M1: "John Doe",
      M2: "john@demo.com",
      M3: "CTO/Tech Lead",
      M4_industry: "Technology",
      M5_country: "United States",
      M6_size: "50-249",
      track: "TECH"
    },
    track: "TECH",
    responses: {
      M0: "Demo Company",
      M1: "John Doe",
      M2: "john@demo.com",
      M3: "CTO/Tech Lead",
      M4_industry: "Technology",
      M5_country: "United States",
      M6_size: "50-249"
    },
    submissionId: "demo-123"
  };

  // Show loading state
  if (isLoading && submissionIdFromUrl) {
    return (
      <div className="min-h-screen bg-gradient-accent flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading your results...</h2>
          <p className="text-muted-foreground">Please wait while we retrieve your assessment data.</p>
        </div>
      </div>
    );
  }

  // Use real data if available, otherwise use mock data for preview
  const pageData = assessmentData || data || mockData;
  const {
    profile,
    track,
    responses
  } = pageData;
  const getTrackLabel = (track: Track) => {
    switch (track) {
      case "TECH":
        return t('assessment.welcome.tracksSection.technical.title');
      case "REG":
        return t('assessment.welcome.tracksSection.regulated.title');
      default:
        return t('assessment.welcome.tracksSection.general.title');
    }
  };
  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} will be available soon. We'll notify you when it's ready.`
    });
  };
  const handleRetakeAssessment = () => {
    navigate("/");
  };
  const totalQuestions = Object.keys(responses).length;
  return <div className="min-h-screen bg-gradient-accent">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} gravity={0.1} />}

      <LanguageSwitcher className="absolute top-4 right-4 z-10" />

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">{t('assessment.thankYou.title')}</h1>
            <p className="text-lg text-primary">{t('assessment.thankYou.subtitle')}</p>
            <p className="text-muted-foreground">
              Thank you, {profile.M0} team, for completing our comprehensive AI readiness assessment
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
              <h3 className="font-semibold text-foreground">{t('assessment.thankYou.statusCards.complete.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('assessment.thankYou.statusCards.complete.description')}</p>
            </div>
          </Card>

          <Card className="p-6 text-center bg-yellow-50 border-yellow-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('assessment.thankYou.statusCards.report.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('assessment.thankYou.statusCards.report.description')}</p>
            </div>
          </Card>

          <Card className="p-6 text-center bg-green-50 border-green-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Rocket className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('assessment.thankYou.statusCards.action.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('assessment.thankYou.statusCards.action.description')}</p>
            </div>
          </Card>
        </div>

        {/* Quick Highlights Card */}
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Assessment Overview</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Key Areas Evaluated</div>
              </div>
              <div>
                <Badge variant="outline" className="text-sm">
                  {getTrackLabel(track)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">
                {t('assessment.thankYou.preparing.noticeTitle')}
              </span>
            </div>
            <p className="text-sm text-blue-700">
              {t('assessment.thankYou.preparing.noticeDescription')}
            </p>
          </div>
        </Card>

        {/* Next Steps Section */}
        

        {/* Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon("Implementation Guides")}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground">Implementation Guides</h3>
              <p className="text-sm text-muted-foreground">Step-by-step guides to implement AI solutions</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon("Best Practices Library")}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-foreground">Best Practices Library</h3>
              <p className="text-sm text-muted-foreground">Industry best practices and case studies</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon("Expert Consultation")}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-foreground">Expert Consultation</h3>
              <p className="text-sm text-muted-foreground">One-on-one sessions with AI experts</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon("Training Resources")}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">Training Resources</h3>
              <p className="text-sm text-muted-foreground">Comprehensive training programs for your team</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon("Community Access")}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-foreground">Community Access</h3>
              <p className="text-sm text-muted-foreground">Connect with other AI-forward organizations</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon("ROI Calculator")}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-foreground">ROI Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate potential return on AI investments</p>
            </div>
          </Card>
        </div>

        {/* Your Report Includes */}
        <Card className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-foreground">{t('assessment.thankYou.includes.title')}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{t('assessment.thankYou.includes.maturityScore.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('assessment.thankYou.includes.maturityScore.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{t('assessment.thankYou.includes.analysis.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('assessment.thankYou.includes.analysis.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{t('assessment.thankYou.includes.recommendations.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('assessment.thankYou.includes.recommendations.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{t('assessment.thankYou.includes.roadmap.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('assessment.thankYou.includes.roadmap.description')}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retake Assessment
            </Button>
          </Link>
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={() => window.open("https://www.houseofichigo.com", "_blank")}>
            <Globe className="w-4 h-4 mr-2" />
            Visit Our Website
          </Button>
        </div>

        {/* Footer Elements */}
        <div className="text-center space-y-4 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">{t('assessment.thankYou.thanks.title')}</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('assessment.thankYou.thanks.description')} {t('assessment.thankYou.footer.privacyNotice')}
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>{t('assessment.thankYou.footer.dataPrivacy')}</span>
            </div>
            <span>•</span>
            <span>{t('assessment.thankYou.footer.contact')}</span>
          </div>

          {/* Profile Info */}
          <div className="text-center space-y-2 opacity-60">
            <p className="text-sm text-muted-foreground">
              {profile.M0} • {profile.M3} • {profile.M4_industry}
            </p>
            <Badge variant="outline" className="text-xs">
              {getTrackLabel(track)}
            </Badge>
          </div>
        </div>
      </div>
    </div>;
}