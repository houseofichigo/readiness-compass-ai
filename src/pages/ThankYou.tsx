import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Rocket, FileText, BookOpen, Users, GraduationCap, MessageSquare, Calculator, Shield, Phone, Globe, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OrganizationProfile, Track } from "@/types/assessment";
import { useAssessment } from "@/hooks/useAssessment";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { SEO } from "@/components/SEO";
interface ThankYouPageData {
  profile: OrganizationProfile;
  track: Track;
  responses: Record<string, any>;
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
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  
  const data = location.state as ThankYouPageData;
  const submissionIdFromUrl = searchParams.get('submissionId');

  useEffect(() => {
    // Set mounted state and window size safely
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      window.addEventListener('resize', handleResize);
      
      // Stop confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (submissionIdFromUrl) {
        try {
          const loadedData = await loadAssessment(submissionIdFromUrl);
          if (loadedData && loadedData.profile) {
            setAssessmentData({
              profile: loadedData.profile,
              track: loadedData.profile.track || "GENERAL",
              responses: loadedData.responses || {},
              submissionId: submissionIdFromUrl
            });
          } else {
            console.warn('[ThankYou] Loaded data incomplete, using mock data');
          }
        } catch (error) {
          console.error('Error loading assessment data:', error);
          toast({
            title: "Notice",
            description: "Unable to load assessment data. Using default view.",
            variant: "default",
          });
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
  let pageData = assessmentData || data || mockData;
  
  // Additional safety check for data integrity
  if (!pageData || !pageData.profile) {
    console.error('[ThankYou] Critical: No valid page data available', { assessmentData, data, mockData });
    // Use mock data as absolute fallback
    pageData = { ...mockData };
  }
  const {
    profile,
    track,
    responses
  } = pageData;
  const getTrackLabel = (track: Track) => {
    switch (track) {
      case "TECH":
        return t('tracks.technical');
      case "REG":
        return t('tracks.regulated');
      default:
        return t('tracks.general');
    }
  };
  const handleComingSoon = (feature: string) => {
    toast({
      title: t('thankYou.comingSoon.title'),
      description: t('thankYou.comingSoon.description', { feature })
    });
  };
  const handleRetakeAssessment = () => {
    navigate("/");
  };
  const totalQuestions = Object.keys(responses || {}).length;
  
  // Safe URL generation for SEO
  const getCanonicalUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return submissionIdFromUrl 
      ? `https://www.ai.houseofichigo.com/thank-you?submissionId=${submissionIdFromUrl}`
      : 'https://www.ai.houseofichigo.com/thank-you';
  };
  return (
    <div className="min-h-screen bg-gradient-accent">
      <SEO
        title="Thank You | AI Readiness Assessment"
        description="Thank you for completing the AI Readiness Assessment. Access your next steps and resources."
        canonical={getCanonicalUrl()}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Thank You - AI Readiness Assessment',
          url: getCanonicalUrl(),
          description: 'Thank you for completing the AI Readiness Assessment.'
        }}
      />
      {showConfetti && isMounted && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          recycle={false} 
          numberOfPieces={200} 
          gravity={0.1} 
        />
      )}

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">{t('thankYou.title')}</h1>
            <p className="text-lg text-primary">{t('thankYou.subtitle')}</p>
            <p className="text-muted-foreground">
              {t('thankYou.thankMessage', { company: profile.M0 })}
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
              <h3 className="font-semibold text-foreground">{t('thankYou.status.complete.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.status.complete.description')}</p>
            </div>
          </Card>

          <Card className="p-6 text-center bg-yellow-50 border-yellow-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('thankYou.status.report.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.status.report.description')}</p>
            </div>
          </Card>

          <Card className="p-6 text-center bg-green-50 border-green-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Rocket className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('thankYou.status.action.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.status.action.description')}</p>
            </div>
          </Card>
        </div>

        {/* Quick Highlights Card */}
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">{t('thankYou.overview.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">{t('thankYou.overview.questionsAnswered')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">{t('thankYou.overview.keyAreas')}</div>
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
                {t('thankYou.overview.reportNotice')}
              </span>
            </div>
            <p className="text-sm text-blue-700">
              {t('thankYou.overview.emailCheck')}
            </p>
          </div>
        </Card>

        {/* Next Steps Section */}
        

        {/* Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon(t('thankYou.resources.implementation.title'))}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('thankYou.resources.implementation.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.resources.implementation.description')}</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon(t('thankYou.resources.bestPractices.title'))}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('thankYou.resources.bestPractices.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.resources.bestPractices.description')}</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon(t('thankYou.resources.consultation.title'))}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('thankYou.resources.consultation.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.resources.consultation.description')}</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon(t('thankYou.resources.training.title'))}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('thankYou.resources.training.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.resources.training.description')}</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon(t('thankYou.resources.community.title'))}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('thankYou.resources.community.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.resources.community.description')}</p>
            </div>
          </Card>

          <Card className="p-6 hover-scale cursor-pointer" onClick={() => handleComingSoon(t('thankYou.resources.calculator.title'))}>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-foreground">{t('thankYou.resources.calculator.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('thankYou.resources.calculator.description')}</p>
            </div>
          </Card>
        </div>

        {/* Your Report Includes */}
        <Card className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-foreground">{t('thankYou.reportIncludes.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{t('thankYou.reportIncludes.maturityScore.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('thankYou.reportIncludes.maturityScore.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{t('thankYou.reportIncludes.analysis.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('thankYou.reportIncludes.analysis.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{t('thankYou.reportIncludes.recommendations.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('thankYou.reportIncludes.recommendations.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{t('thankYou.reportIncludes.roadmap.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('thankYou.reportIncludes.roadmap.description')}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t('thankYou.actions.retake')}
            </Button>
          </Link>
          <Button 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open("https://www.houseofichigo.com", "_blank");
              }
            }}
          >
            <Globe className="w-4 h-4 mr-2" />
            {t('thankYou.actions.website')}
          </Button>
        </div>

        {/* Footer Elements */}
        <div className="text-center space-y-4 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">{t('thankYou.footer.thankYou')}</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('thankYou.footer.privacy')}
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>{t('thankYou.footer.dataProtected')}</span>
            </div>
            <span>•</span>
            <span>{t('thankYou.footer.contact')}</span>
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
    </div>
  );
}