import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Shield, BarChart3, Brain } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AssessmentWelcomeProps {
  onStart: () => void;
}

export function AssessmentWelcome({ onStart }: AssessmentWelcomeProps) {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t("assessment.welcome.features.aiPowered.title"),
      description: t("assessment.welcome.features.aiPowered.description"),
    },
    {
      icon: Users,
      title: t("assessment.welcome.features.personalized.title"), 
      description: t("assessment.welcome.features.personalized.description")
    },
    {
      icon: BarChart3,
      title: t("assessment.welcome.features.analytics.title"),
      description: t("assessment.welcome.features.analytics.description")
    },
    {
      icon: Shield,
      title: t("assessment.welcome.features.compliance.title"),
      description: t("assessment.welcome.features.compliance.description")
    }
  ];

  const trackBenefits = t("assessment.welcome.discover.items", {
    returnObjects: true,
  }) as string[];

  const tracks = t("assessment.welcome.tracksSection", {
    returnObjects: true,
  }) as {
    technical: { title: string; description: string; items: string[] };
    regulated: { title: string; description: string; items: string[] };
    general: { title: string; description: string; items: string[] };
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            {t("assessment.welcome.badge")}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t("assessment.welcome.title.highlight")}
            </span>
            <br />
            <span className="text-foreground">
              {t("assessment.welcome.title.rest")}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("assessment.welcome.description")}
          </p>
        </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{t("assessment.welcome.duration")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>{t("assessment.welcome.questions")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{t("assessment.welcome.tracks")}</span>
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
              <h3 className="font-semibold text-blue-700">
                {tracks.technical.title}
              </h3>
            </div>
            <p className="text-sm text-blue-600">
              {tracks.technical.description}
            </p>
            <ul className="text-xs text-blue-600 space-y-1">
              {tracks.technical.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-6 border-2 border-purple-200 bg-purple-50/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <h3 className="font-semibold text-purple-700">
                {tracks.regulated.title}
              </h3>
            </div>
            <p className="text-sm text-purple-600">
              {tracks.regulated.description}
            </p>
            <ul className="text-xs text-purple-600 space-y-1">
              {tracks.regulated.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-6 border-2 border-green-200 bg-green-50/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <h3 className="font-semibold text-green-700">
                {tracks.general.title}
              </h3>
            </div>
            <p className="text-sm text-green-600">
              {tracks.general.description}
            </p>
            <ul className="text-xs text-green-600 space-y-1">
              {tracks.general.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* What You'll Get */}
      <Card className="p-8 bg-gradient-accent border-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              {t("assessment.welcome.discover.title")}
            </h2>
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
                  {t("assessment.welcome.score.label")}
                </div>
                <Badge className="bg-green-500 text-white">
                  {t("assessment.welcome.score.badge")}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {t("assessment.welcome.score.description")}
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
          {t("assessment.welcome.cta.startButton")}
        </Button>
        <p className="text-sm text-muted-foreground">
          {t("assessment.welcome.cta.disclaimer")}
        </p>
      </div>
    </div>
  );
}