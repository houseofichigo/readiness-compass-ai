import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Clock, 
  Rocket, 
  FileText, 
  Download,
  Calendar,
  BarChart3,
  BookOpen,
  Users,
  Calculator,
  ExternalLink,
  ArrowLeft,
  Globe
} from "lucide-react";

export function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Get assessment data from navigation state
  const assessmentData = location.state?.assessmentData;
  const companyName = assessmentData?.profile?.M0 || 'Your Organization';
  const userName = assessmentData?.profile?.M1 || '';

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    
    // Handle window resize for confetti
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} will be available soon. We'll notify you when it's ready.`,
      duration: 3000,
    });
  };

  const handleScheduleConsultation = () => {
    // This would typically open a calendar booking system
    handleComingSoon("Expert Consultation Scheduling");
  };

  const handleVisitWebsite = () => {
    window.open('https://www.houseofichigo.com', '_blank');
  };

  const resourceCards = [
    {
      icon: BookOpen,
      title: "Implementation Guides",
      description: "Step-by-step guides for AI adoption",
      action: () => handleComingSoon("Implementation Guides")
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "One-on-one guidance from AI specialists",
      action: handleScheduleConsultation
    },
    {
      icon: BarChart3,
      title: "Best Practices Library",
      description: "Proven strategies and frameworks",
      action: () => handleComingSoon("Best Practices Library")
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Language Selector */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Globe className="w-4 h-4" />
        <span>🇺🇸 English</span>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 pt-16">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground animate-fade-in">
              Assessment Complete!
            </h1>
            <p className="text-xl text-primary animate-fade-in">
              {userName && `Congratulations ${userName}! `}
              {companyName} has successfully completed the AI readiness assessment
            </p>
            <Badge variant="outline" className="text-lg px-4 py-2">
              8 Key Areas Evaluated
            </Badge>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-green-50 border-green-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">Assessment Complete</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive evaluation across all AI readiness dimensions
              </p>
            </div>
          </Card>

          <Card className="p-6 text-center bg-blue-50 border-blue-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground">Report Processing</h3>
              <p className="text-sm text-muted-foreground">
                Your personalized report will be ready within 3 business days
              </p>
            </div>
          </Card>

          <Card className="p-6 text-center bg-orange-50 border-orange-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                <Rocket className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-foreground">Next Steps Ready</h3>
              <p className="text-sm text-muted-foreground">
                Actionable recommendations tailored to your organization
              </p>
            </div>
          </Card>
        </div>

        {/* Next Steps Section */}
        <Card className="p-8 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">What's Next?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your AI readiness journey continues with personalized insights and expert guidance
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => handleComingSoon("Interactive Report")}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Explore Your Interactive Report
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleComingSoon("Email Report")}
            >
              <FileText className="w-5 h-5 mr-2" />
              Email Report
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleComingSoon("Download PDF")}
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleScheduleConsultation}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </Card>

        {/* Quick Highlights */}
        <Card className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-foreground">Your Report Includes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">AI Maturity Score</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive assessment across 8 key dimensions with detailed scoring
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Detailed Analysis by Section</h3>
                <p className="text-sm text-muted-foreground">
                  Strengths identification and targeted improvement recommendations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Implementation Roadmap</h3>
                <p className="text-sm text-muted-foreground">
                  Prioritized timeline with clear milestones for AI adoption
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Operational Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Concrete steps and best practices tailored to your organization
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Resource Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-foreground">Continue Your AI Journey</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {resourceCards.map((card, index) => (
              <Card 
                key={index} 
                className="p-6 text-center hover-scale cursor-pointer transition-all duration-200 hover:shadow-lg"
                onClick={card.action}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap gap-4 justify-center pt-8 border-t">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retake Assessment
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleVisitWebsite}
            className="gap-2"
          >
            Visit Our Website
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center space-y-4 pb-8">
          <h3 className="text-xl font-semibold text-foreground">
            Thank You for Your Participation
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your assessment data helps us improve our evaluation framework and provide more relevant 
            insights for organizations on their AI readiness journey. We're committed to protecting 
            your privacy and will only use this information to enhance our services.
          </p>
          
          {assessmentData?.profile && (
            <div className="pt-4 opacity-75">
              <p className="text-sm text-muted-foreground">
                Assessment completed for: {companyName}
                {assessmentData.profile.M3 && ` • ${assessmentData.profile.M3}`}
                {userName && ` • ${userName}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}