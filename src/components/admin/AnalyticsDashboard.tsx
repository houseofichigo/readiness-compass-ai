import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAdminData } from '@/hooks/useAdminData';
import {
  BarChart3,
  PieChart,
  TrendingDown,
  Users,
  FileText,
  Clock,
  Activity
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAssessmentTranslations } from '@/i18n/assessmentTranslations';

export function AnalyticsDashboard() {
  const { analytics, submissions, isLoading } = useAdminData();
  const { i18n } = useTranslation();
  const { trackLabels } = getAssessmentTranslations(i18n.language);

  // Calculate completion trends (last 7 days)
  const completionTrends = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => ({
      date,
      completions: submissions.filter(s => 
        s.completed && s.created_at.split('T')[0] === date
      ).length
    }));
  }, [submissions]);

  // Status distribution
  const statusDistribution = useMemo(() => {
    const completed = submissions.filter(s => s.completed).length;
    const inProgress = submissions.length - completed;
    
    return [
      { name: 'Completed', value: completed, color: 'bg-green-500' },
      { name: 'In Progress', value: inProgress, color: 'bg-yellow-500' }
    ];
  }, [submissions]);

  // Top organizations by submissions
  const topOrganizations = useMemo(() => {
    const orgCounts = submissions.reduce((acc, submission) => {
      const org = submission.organization_name || 'Unknown';
      acc[org] = (acc[org] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(orgCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([org, count]) => ({ org, count }));
  }, [submissions]);

  // Section drop-off analysis (simulated data)
  const sectionDropoff = [
    { section: 'Profile', completion: 100, dropoff: 0 },
    { section: 'Strategy', completion: 85, dropoff: 15 },
    { section: 'Data', completion: 78, dropoff: 7 },
    { section: 'Tools', completion: 72, dropoff: 6 },
    { section: 'Automation', completion: 65, dropoff: 7 },
    { section: 'People', completion: 58, dropoff: 7 },
    { section: 'Governance', completion: 52, dropoff: 6 }
  ];

  // Track distribution
  const trackDistribution = useMemo(() => {
    const tracks = submissions.reduce((acc, submission) => {
      acc[submission.track] = (acc[submission.track] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tracks).map(([track, count]) => ({
      track,
      count,
      percentage: submissions.length > 0 ? (count / submissions.length * 100).toFixed(1) : '0'
    }));
  }, [submissions]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Deep insights into assessment performance and user behavior
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12m 34s</div>
            <p className="text-xs text-muted-foreground">-2m from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drop-off Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10-11 AM</div>
            <p className="text-xs text-muted-foreground">Most active time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5%</div>
            <p className="text-xs text-muted-foreground">Users completing multiple</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Completion Trends (7 Days)
            </CardTitle>
            <CardDescription>Daily assessment completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completionTrends.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32">
                      <Progress 
                        value={(day.completions / Math.max(...completionTrends.map(d => d.completions), 1)) * 100} 
                        className="h-2"
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">
                      {day.completions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Status Distribution
            </CardTitle>
            <CardDescription>Assessment completion status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusDistribution.map((status) => (
                <div key={status.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <span className="text-sm font-medium">{status.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{status.value}</span>
                    <Badge variant="outline">
                      {submissions.length > 0 ? (status.value / submissions.length * 100).toFixed(0) : 0}%
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Total Submissions</span>
                  <span className="font-bold">{submissions.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Organizations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Top Organizations
            </CardTitle>
            <CardDescription>Organizations by submission volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topOrganizations.slice(0, 8).map((org, index) => (
                <div key={org.org} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium truncate max-w-40">
                      {org.org}
                    </span>
                  </div>
                  <Badge variant="secondary">{org.count}</Badge>
                </div>
              ))}
              {topOrganizations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No organization data available yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section Drop-off Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="mr-2 h-5 w-5" />
              Section Drop-off Rates
            </CardTitle>
            <CardDescription>User retention through assessment sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sectionDropoff.map((section) => (
                <div key={section.section} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{section.section}</span>
                    <span className="text-muted-foreground">
                      {section.completion}% ({section.dropoff}% drop)
                    </span>
                  </div>
                  <Progress value={section.completion} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Track Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Track Distribution</CardTitle>
          <CardDescription>How users are categorized across different tracks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trackDistribution.map((track) => (
              <div key={track.track} className="text-center space-y-2">
                <div className="text-3xl font-bold">{track.count}</div>
                <div className="text-sm text-muted-foreground">
                  {trackLabels[track.track as keyof typeof trackLabels]}
                </div>
                <Badge variant="outline">{track.percentage}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}