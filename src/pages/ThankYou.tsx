import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Phone,
  Globe,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OrganizationProfile, Track } from "@/types/assessment";

interface ThankYouPageData {
  profile: OrganizationProfile;
  track: Track;
  responses: Record<string, any>;
  submissionId?: string;
}

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const data = location.state as ThankYouPageData;

  // Debug logging
  console.log("ThankYou page data:", data);
  console.log("Location state:", location.state);

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

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

  // Use real data if available, otherwise use mock data for preview
  const pageData = data || mockData;
  const { profile, track, responses } = pageData;

  const getTrackLabel = (track: Track) => {
    switch (track) {
      case "TECH": return "Technical Track";
      case "REG": return "Regulated Track";
      default: return "General Business Track";
    }
  };

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} will be available soon. We'll notify you when it's ready.`,
    });
  };

  const handleRetakeAssessment = () => {
    navigate("/");
  };

  const totalQuestions = Object.keys(responses).length;

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

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
          <Globe className="w-4 h-4" />
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent border-none outline-none text-sm"
          >
            <option value="English">🇺🇸 English</option>
            <option value="Spanish">🇪🇸 Spanish</option>
            <option value="French">🇫🇷 French</option>
            <option value="German">🇩🇪 German</option>
          </select>
        </div>
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
            <h1 className="text-4xl font-bold text-foreground">Assessment Complete</h1>
            <p className="text-lg text-primary">8 key areas evaluated with detailed analysis</p>
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
              <h3 className="font-semibold text-foreground">Assessment Complete</h3>
              <p className="text-sm text-muted-foreground">8 key areas evaluated with detailed analysis</p>
            </div>
          </Card>

          <Card className="p-6 text-center bg-yellow-50 border-yellow-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-foreground">Report Available Soon</h3>
              <p className="text-sm text-muted-foreground">We will email your personalized report within 3 business days</p>
            </div>
          </Card>

          <Card className="p-6 text-center bg-green-50 border-green-200 hover-scale">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Rocket className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">Take Action</h3>
              <p className="text-sm text-muted-foreground">Implement recommendations to advance your AI journey</p>
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
                We will send you your detailed AI readiness report within 3 business days
              </span>
            </div>
            <p className="text-sm text-blue-700">
              Please check your inbox (and spam folder) to receive your personalized assessment results
            </p>
          </div>
        </Card>

        {/* Next Steps Section */}
        <Card className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-foreground">Next Steps</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => handleComingSoon("Interactive Report")}
            >
              <FileText className="w-5 h-5 mr-2" />
              Explore Your Interactive Report
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleComingSoon("Email Report")}
            >
              Email Report
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleComingSoon("PDF Download")}
            >
              Download PDF
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleComingSoon("Consultation")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </Card>

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

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="outline" onClick={handleRetakeAssessment} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retake Assessment
          </Button>
          <Button 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            onClick={() => window.open("https://www.houseofichigo.com", "_blank")}
          >
            <Globe className="w-4 h-4 mr-2" />
            Visit Our Website
          </Button>
        </div>

        {/* Footer Elements */}
        <div className="text-center space-y-4 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">Thank you for your participation</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Your data helps us improve our assessment and provide more relevant insights on AI readiness. 
            We are committed to protecting your privacy and will only use your information to provide 
            you with the requested assessment results and related resources.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Data Privacy Protected</span>
            </div>
            <span>•</span>
            <span>Contact: support@houseofichigo.com</span>
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