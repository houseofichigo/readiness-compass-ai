import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Shield, AlertTriangle, Activity, Users, Lock, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface SecurityEvent {
  id: string;
  event_type: string;
  user_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  event_data?: any;
  created_at: string;
}

export function SecurityDashboard() {
  const { isAdmin } = useAuth();
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    recentFailures: 0,
    rateLimitHits: 0,
    suspiciousActivity: 0
  });

  const loadSecurityEvents = async () => {
    if (!isAdmin) return;
    
    try {
      setIsLoading(true);
      
      // Load recent security events
      const { data: events, error } = await supabase
        .from('security_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setSecurityEvents((events || []).map(event => ({
        ...event,
        ip_address: event.ip_address as string | null,
        user_id: event.user_id as string | null,
        user_agent: event.user_agent as string | null
      })));
      
      // Calculate stats
      const now = new Date();
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      const recentEvents = events?.filter(e => new Date(e.created_at) > last24Hours) || [];
      
      setStats({
        totalEvents: events?.length || 0,
        recentFailures: recentEvents.filter(e => 
          e.event_type.includes('failure') || e.event_type.includes('error')
        ).length,
        rateLimitHits: recentEvents.filter(e => 
          e.event_type.includes('rate_limit')
        ).length,
        suspiciousActivity: recentEvents.filter(e => 
          e.event_type.includes('suspicious') || 
          e.event_type.includes('invalid')
        ).length
      });
      
    } catch (error) {
      console.error('Error loading security events:', error);
      toast.error('Failed to load security events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSecurityEvents();
  }, [isAdmin]);

  const getEventBadgeVariant = (eventType: string) => {
    if (eventType.includes('failure') || eventType.includes('error')) return 'destructive';
    if (eventType.includes('rate_limit') || eventType.includes('suspicious')) return 'secondary';
    if (eventType.includes('success')) return 'default';
    return 'outline';
  };

  const formatEventType = (eventType: string) => {
    return eventType.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (!isAdmin) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Access denied. Administrator privileges required.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Security Dashboard</h1>
        </div>
        <Button onClick={loadSecurityEvents} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Recent Failures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentFailures}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-secondary" />
              Rate Limit Hits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rateLimitHits}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-warning" />
              Suspicious Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.suspiciousActivity}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading security events...</div>
          ) : securityEvents.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No security events found
            </div>
          ) : (
            <div className="space-y-4">
              {securityEvents.slice(0, 20).map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getEventBadgeVariant(event.event_type)}>
                        {formatEventType(event.event_type)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.created_at).toLocaleString()}
                      </span>
                    </div>
                    
                    {event.ip_address && (
                      <div className="text-xs text-muted-foreground mb-1">
                        IP: {event.ip_address}
                      </div>
                    )}
                    
                    {event.event_data && (
                      <div className="text-xs font-mono bg-muted p-2 rounded mt-2">
                        {JSON.stringify(event.event_data, null, 2)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}