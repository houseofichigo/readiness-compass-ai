import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAssessment } from '@/hooks/useAssessment';
import { format } from 'date-fns';

export function AssessmentAdmin() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const { getRecentAssessments, isLoading } = useAssessment();

  const loadSubmissions = async () => {
    const data = await getRecentAssessments(20);
    setSubmissions(data || []);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const getTrackBadgeColor = (track: string) => {
    switch (track) {
      case 'TECH': return 'bg-blue-500';
      case 'REG': return 'bg-red-500';
      case 'GEN': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assessment Submissions</h1>
        <Button onClick={loadSubmissions} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>

      <div className="grid gap-4">
        {submissions.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No assessment submissions found.</p>
          </Card>
        ) : (
          submissions.map((submission) => (
            <Card key={submission.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">
                      {submission.organization_name || 'Unknown Organization'}
                    </h3>
                    <Badge className={`${getTrackBadgeColor(submission.track)} text-white`}>
                      {submission.track}
                    </Badge>
                    {submission.completed && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">
                    {submission.full_name} • {submission.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Industry: {submission.industry} • Size: {submission.company_size}
                  </p>
                  {submission.email && (
                    <p className="text-sm text-muted-foreground">
                      Email: {submission.email}
                    </p>
                  )}
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(submission.created_at), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ID: {submission.id.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {submissions.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Showing {submissions.length} recent submissions
          </p>
        </div>
      )}
    </div>
  );
}