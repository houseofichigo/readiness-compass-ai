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
      description: t("assessment.welcome.features.personalized.description"),
    },
    {
      icon: BarChart3,
      title: t("assessment.welcome.features.analytics.title"),
      description: t("assessment.welcome.features.analytics.description"),
    },
    {
      icon: Shield,
      title: t("assessment.welcome.features.compliance.title"),
      description: t("assessment.welcome.features.compliance.description"),
    },
  ];

  // localized array of bullet items under "What you'll discover"
  const trackBenefits = t("assessment.welcome.discover.items", {
    returnObjects: true,
  }) as string[];

  // localized structure for each track
  const tracks = t("assessment.welcome.tracksSection", {
    returnObjects: true,
  }) as {
    technical: { title: string; description: string; items: string[] };
    regulated: { title: string; description: string; items: string[] };
    general: { title: string; description: string; items: string[] };
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-6">
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

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <Card key={i} className="p-6 text-center hover:shadow-elegant transition-all duration-300">
            <div className="mb-4 mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <f.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.description}</p>
          </Card>
        ))}
      </div>

      {/* Tracks */}
      <div className="grid md:grid-cols-3 gap-6">
        {([
          { key: "technical", color: "blue", data: tracks.technical },
          { key: "regulated", color: "purple", data: tracks.regulated },
          { key: "general", color: "green", data: tracks.general },
        ] as const).map(({ key, color, data }) => (
          <Card key={key} className={`p-6 border-2 border-${color}-200 bg-${color}-50/50`}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full bg-${color}-500`} />
                <h3 className={`font-semibold text-${color}-700`}>
                  {data.title}
                </h3>
              </div>
              <p className={`text-sm text-${color}-600`}>{data.description}</p>
              <ul className={`text-xs text-${color}-600 space-y-1`}>
                {data.items.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {/* What You’ll Discover */}
      <Card className="p-8 bg-gradient-accent border-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              {t("assessment.welcome.discover.title")}
            </h2>
            <ul className="space-y-3">
              {trackBenefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-elegant text-center">
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
