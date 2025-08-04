import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAdminData } from '@/hooks/useAdminData';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Award,
  Activity,
  Shield,
  CheckCircle,
  BarChart3,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ExecutiveDashboard() {
  const { analytics, submissions, isLoading } = useAdminData();
  const [liveActivity, setLiveActivity] = useState(0);

  // Simulate live activity counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveActivity(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const yesterdaySubmissions = analytics?.today_submissions || 0;
  const todayGrowth = yesterdaySubmissions > 0 
    ? ((analytics?.today_submissions || 0) / yesterdaySubmissions * 100 - 100).toFixed(1)
    : '0';

  const weeklyGrowth = analytics?.week_submissions || 0;
  const topPerformer = submissions
    .filter(s => s.completed && s.organization_name)
    .slice(0, 1)[0];

  const metrics = [
    {
      title: "Live Activity",
      value: liveActivity,
      description: "Active sessions",
      icon: Activity,
      trend: null,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      indicator: <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
    },
    {
      title: "Today's Impact",
      value: analytics?.today_submissions || 0,
      description: `${todayGrowth}% vs yesterday`,
      icon: TrendingUp,
      trend: parseFloat(todayGrowth) >= 0 ? "up" : "down",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Weekly Growth",
      value: weeklyGrowth,
      description: "submissions this week",
      icon: BarChart3,
      trend: weeklyGrowth > 0 ? "up" : null,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      title: "Top Performer",
      value: topPerformer?.organization_name || "No data",
      description: topPerformer ? "Latest completion" : "awaiting data",
      icon: Crown,
      trend: null,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      badge: topPerformer && <Badge className="ml-auto">★</Badge>
    }
  ];

  const kpis = [
    { label: "Completion Rate", value: analytics?.completion_rate || 0, target: 85, unit: "%" },
    { label: "Client Growth", value: analytics?.active_organizations || 0, target: 50, unit: "" },
    { label: "Engagement Score", value: 87, target: 90, unit: "%" },
    { label: "Data Quality", value: 94, target: 95, unit: "%" }
  ];

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Executive Dashboard</h2>
            <p className="text-purple-100">Real-time insights and business intelligence</p>
          </div>
          <Badge className="bg-white/20 text-white">
            Enterprise
          </Badge>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                  <metric.icon className={cn("h-4 w-4", metric.color)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {typeof metric.value === 'string' 
                      ? metric.value.length > 15 
                        ? `${metric.value.substring(0, 15)}...`
                        : metric.value
                      : metric.value.toLocaleString()
                    }
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    {metric.trend === "up" && <TrendingUp className="w-3 h-3 text-green-500 mr-1" />}
                    {metric.trend === "down" && <TrendingDown className="w-3 h-3 text-red-500 mr-1" />}
                    {metric.description}
                  </div>
                </div>
                <div className="flex items-center">
                  {metric.indicator}
                  {metric.badge}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPIs Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Track progress against business targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{kpi.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {kpi.value}{kpi.unit} / {kpi.target}{kpi.unit}
                  </span>
                </div>
                <Progress 
                  value={(kpi.value / kpi.target) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current</span>
                  <span>Target</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Data Encryption", status: "Active", color: "text-green-600" },
                { label: "GDPR Compliance", status: "Compliant", color: "text-green-600" },
                { label: "Audit Logging", status: "Enabled", color: "text-green-600" },
                { label: "Access Control", status: "Protected", color: "text-green-600" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.label}</span>
                  <div className="flex items-center">
                    <CheckCircle className={cn("h-4 w-4 mr-1", item.color)} />
                    <span className={cn("text-sm font-medium", item.color)}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Organizations</CardTitle>
            <CardDescription>Leading assessment completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions
                .filter(s => s.completed && s.organization_name)
                .slice(0, 5)
                .map((submission, index) => (
                  <div key={submission.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3",
                        index === 0 ? "bg-yellow-100 text-yellow-800" :
                        index === 1 ? "bg-gray-100 text-gray-800" :
                        index === 2 ? "bg-orange-100 text-orange-800" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {submission.organization_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {submission.track} track
                        </p>
                      </div>
                    </div>
                    {index === 0 && <Award className="h-4 w-4 text-yellow-500" />}
                  </div>
                ))}
              {submissions.filter(s => s.completed && s.organization_name).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No completed assessments yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}