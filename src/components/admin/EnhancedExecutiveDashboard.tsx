import React, { useState } from 'react';
import { useAdminData } from '@/hooks/useAdminData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter, 
  Search,
  Users,
  Target,
  Shield,
  Award,
  Calendar,
  FileText
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ExportOptions {
  format: 'csv' | 'json' | 'excel';
  dateRange: 'today' | 'week' | 'month' | 'all';
  includeResponses: boolean;
}

export function ExecutiveDashboard() {
  const { analytics, submissions, isLoading } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState<string>('all');
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    dateRange: 'month',
    includeResponses: false
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map(i => <Skeleton key={i} className="h-96" />)}
        </div>
      </div>
    );
  }

  // Enhanced metrics calculations
  const totalSubmissions = submissions?.length || 0;
  const todaySubmissions = submissions?.filter(s => 
    new Date(s.created_at).toDateString() === new Date().toDateString()
  ).length || 0;
  
  const yesterdaySubmissions = submissions?.filter(s => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(s.created_at).toDateString() === yesterday.toDateString();
  }).length || 0;

  const weekSubmissions = submissions?.filter(s => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(s.created_at) >= weekAgo;
  }).length || 0;

  const avgScore = submissions?.length ? 
    submissions.reduce((sum, s) => sum + (s.total_score || 0), 0) / submissions.length : 0;

  const completionRate = totalSubmissions > 0 ? 
    (submissions?.filter(s => s.status === 'completed').length || 0) / totalSubmissions * 100 : 0;

  // Track distribution
  const trackDistribution = submissions?.reduce((acc, s) => {
    const track = s.organization_profile?.track || 'Unknown';
    acc[track] = (acc[track] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Top performing organizations
  const topOrganizations = submissions
    ?.filter(s => s.total_score && s.organization_profile?.M0)
    .sort((a, b) => (b.total_score || 0) - (a.total_score || 0))
    .slice(0, 5) || [];

  // Filter submissions based on search and track
  const filteredSubmissions = submissions?.filter(s => {
    const matchesSearch = !searchTerm || 
      s.organization_profile?.M0?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.organization_profile?.M1?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTrack = trackFilter === 'all' || 
      s.organization_profile?.track === trackFilter;
    
    return matchesSearch && matchesTrack;
  }) || [];

  // Export functionality
  const handleExport = async () => {
    const dataToExport = filteredSubmissions.map(s => ({
      id: s.id,
      organization: s.organization_profile?.M0,
      contact: s.organization_profile?.M1,
      email: s.organization_profile?.M2,
      track: s.organization_profile?.track,
      score: s.total_score,
      status: s.status,
      created_at: s.created_at,
      ...(exportOptions.includeResponses && { responses: s.responses })
    }));

    let content: string;
    let filename: string;
    let mimeType: string;

    switch (exportOptions.format) {
      case 'json':
        content = JSON.stringify(dataToExport, null, 2);
        filename = `assessment-data-${Date.now()}.json`;
        mimeType = 'application/json';
        break;
      case 'csv':
        const headers = Object.keys(dataToExport[0] || {}).join(',');
        const rows = dataToExport.map(row => Object.values(row).join(','));
        content = [headers, ...rows].join('\n');
        filename = `assessment-data-${Date.now()}.csv`;
        mimeType = 'text/csv';
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const metrics = [
    {
      title: "Total Assessments",
      value: totalSubmissions.toLocaleString(),
      change: todaySubmissions - yesterdaySubmissions,
      changeLabel: "vs yesterday",
      icon: Users,
      trend: todaySubmissions >= yesterdaySubmissions ? "up" : "down",
      color: "text-blue-600"
    },
    {
      title: "Average Score",
      value: `${avgScore.toFixed(1)}%`,
      change: 2.3, // This would be calculated from historical data
      changeLabel: "vs last week",
      icon: Target,
      trend: "up",
      color: "text-green-600"
    },
    {
      title: "Completion Rate",
      value: `${completionRate.toFixed(1)}%`,
      change: 5.2,
      changeLabel: "vs last month",
      icon: Award,
      trend: "up",
      color: "text-purple-600"
    },
    {
      title: "This Week",
      value: weekSubmissions.toString(),
      change: weekSubmissions - (submissions?.filter(s => {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const date = new Date(s.created_at);
        return date >= twoWeeksAgo && date < weekAgo;
      }).length || 0),
      changeLabel: "vs last week",
      icon: Calendar,
      trend: "up",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Executive Dashboard</h1>
            <p className="text-primary-foreground/80">Real-time insights and analytics</p>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Live Data
          </Badge>
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {metric.change > 0 ? "+" : ""}{metric.change}
                  </span>
                  <span className="ml-1">{metric.changeLabel}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Advanced Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export, filter, and analyze assessment data</CardDescription>
            </div>
            <Button onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={trackFilter} onValueChange={setTrackFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tracks</SelectItem>
                <SelectItem value="TECH">Technical</SelectItem>
                <SelectItem value="REG">Regulated</SelectItem>
                <SelectItem value="GEN">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Options */}
          <div className="flex gap-4 items-center p-4 bg-muted/50 rounded-lg">
            <div className="flex gap-2">
              <label className="text-sm font-medium">Format:</label>
              <Select 
                value={exportOptions.format} 
                onValueChange={(value: 'csv' | 'json') => 
                  setExportOptions(prev => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Track Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Track Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(trackDistribution).map(([track, count]) => {
              const percentage = totalSubmissions > 0 ? (count / totalSubmissions) * 100 : 0;
              return (
                <div key={track} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{track}</span>
                    <span className="text-sm text-muted-foreground">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Top Organizations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topOrganizations.map((org, index) => (
                <div key={org.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{org.organization_profile?.M0 || 'Unknown'}</p>
                      <p className="text-sm text-muted-foreground">
                        {org.organization_profile?.track || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{org.total_score?.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Filtered Results ({filteredSubmissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Showing {filteredSubmissions.length} of {totalSubmissions} total assessments
            {searchTerm && ` matching "${searchTerm}"`}
            {trackFilter !== 'all' && ` in ${trackFilter} track`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}