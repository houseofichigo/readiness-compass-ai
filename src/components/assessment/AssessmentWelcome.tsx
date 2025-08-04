import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Shield, BarChart3, Brain } from "lucide-react";

interface AssessmentWelcomeProps {
  onStart: () => void;
}

export function AssessmentWelcome({ onStart }: AssessmentWelcomeProps) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Assessment",
      description: "Advanced algorithms evaluate your organization's AI readiness across 6 key dimensions"
    },
    {
      icon: Users,
      title: "Personalized Experience", 
      description: "Adaptive questionnaire tailored to your role, industry, and organization size"
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive scoring with benchmarking against industry peers"
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description: "Built-in assessment for GDPR, EU AI Act, and other regulatory frameworks"
    }
  ];

  const trackBenefits = [
    "Strategic alignment assessment",
    "Data foundation evaluation", 
    "Technology stack analysis",
    "Automation maturity scoring",
    "Team capability mapping",
    "Governance framework review"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            AI Readiness Assessment v2.0
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Measure Your
            </span>
            <br />
            <span className="text-foreground">AI Readiness</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive assessment platform that evaluates your organization's AI maturity 
            across strategy, data, tools, automation, people, and governance dimensions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>15-20 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>60 smart questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>3 specialized tracks</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-elegant transition-all duration-300">
            <div className="mb-4 mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Assessment Tracks */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-2 border-blue-200 bg-blue-50/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <h3 className="font-semibold text-blue-700">Technical Track</h3>
            </div>
            <p className="text-sm text-blue-600">
              For Data/AI Leads, CTOs, and IT Leaders focusing on technical implementation and architecture.
            </p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Advanced technical assessments</li>
              <li>• MLOps and deployment evaluation</li>
              <li>• Architecture documentation review</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6 border-2 border-purple-200 bg-purple-50/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <h3 className="font-semibold text-purple-700">Regulated Track</h3>
            </div>
            <p className="text-sm text-purple-600">
              For organizations in regulated industries with compliance requirements.
            </p>
            <ul className="text-xs text-purple-600 space-y-1">
              <li>• GDPR & EU AI Act compliance</li>
              <li>• Risk management frameworks</li>
              <li>• Audit readiness assessment</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6 border-2 border-green-200 bg-green-50/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <h3 className="font-semibold text-green-700">General Business Track</h3>
            </div>
            <p className="text-sm text-green-600">
              For business leaders, founders, and functional heads starting their AI journey.
            </p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Business-focused assessments</li>
              <li>• ROI and strategy alignment</li>
              <li>• Change management readiness</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* What You'll Get */}
      <Card className="p-8 bg-gradient-accent border-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">What You'll Discover</h2>
            <ul className="space-y-3">
              {trackBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  85
                </div>
                <div className="text-sm text-muted-foreground">
                  Your AI Readiness Score
                </div>
                <Badge className="bg-green-500 text-white">Advanced</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Get your personalized readiness score with actionable recommendations
            </p>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-6">
        <Button 
          size="lg" 
          onClick={onStart}
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4"
        >
          Start Your AI Assessment
        </Button>
        <p className="text-sm text-muted-foreground">
          Free assessment • No registration required • Instant results
        </p>
      </div>
    </div>
  );
}