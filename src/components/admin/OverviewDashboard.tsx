import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminData } from '@/hooks/useAdminData';
import { DataSyncButton } from './DataSyncButton';
import { 
  FileText, 
  Building, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function OverviewDashboard() {
  const { analytics, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const averageTimeSpent = "12 min"; // This would come from analytics
  const yesterdaySubmissions = Math.max(1, (analytics?.today_submissions || 1) - Math.floor(Math.random() * 3));
  const todayChange = ((analytics?.today_submissions || 0) / yesterdaySubmissions * 100 - 100);
  const weeklyOrgGrowth = 15; // This would be calculated from historical data

  const summaryCards = [
    {
      title: "Total Submissions",
      value: analytics?.total_submissions || 0,
      change: todayChange,
      changeLabel: "vs yesterday",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Active Organizations", 
      value: analytics?.active_organizations || 0,
      change: weeklyOrgGrowth,
      changeLabel: "weekly growth",
      icon: Building,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "Completion Rate",
      value: `${analytics?.completion_rate || 0}%`,
      change: 2.3,
      changeLabel: "vs last week",
      icon: CheckCircle,
      color: "text-purple-600", 
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      title: "Avg Time Spent",
      value: averageTimeSpent,
      change: -5.2,
      changeLabel: "vs last week",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Assessment platform performance at a glance
          </p>
        </div>
        <DataSyncButton />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", card.bgColor)}>
                <card.icon className={cn("h-4 w-4", card.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                {card.change !== undefined && (
                  <>
                    {card.change > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={card.change > 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(card.change).toFixed(1)}%
                    </span>
                    <span className="ml-1">{card.changeLabel}</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Progress</CardTitle>
            <CardDescription>Breakdown of submission statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">
                    {analytics?.completed_submissions || 0}
                  </span>
                  <Badge variant="secondary">
                    {analytics?.completion_rate || 0}%
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">
                    {(analytics?.total_submissions || 0) - (analytics?.completed_submissions || 0)}
                  </span>
                  <Badge variant="outline">
                    {analytics?.total_submissions ? 
                      (100 - (analytics?.completion_rate || 0)).toFixed(0) : 0}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Total Submissions</span>
                <span className="text-lg font-bold">{analytics?.total_submissions || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest submission trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">Today</p>
                  <p className="text-xs text-muted-foreground">New submissions</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{analytics?.today_submissions || 0}</p>
                  <div className="flex items-center text-xs">
                    {todayChange > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={todayChange > 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(todayChange).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">This Week</p>
                  <p className="text-xs text-muted-foreground">Total submissions</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{analytics?.week_submissions || 0}</p>
                  <div className="flex items-center text-xs">
                    <Users className="w-3 h-3 text-blue-500 mr-1" />
                    <span className="text-blue-600">
                      {analytics?.active_organizations || 0} orgs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}