import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAdminData, type SubmissionDetails } from '@/hooks/useAdminData';
import { 
  Search, 
  Download, 
  Eye, 
  Filter,
  Trash2,
  Calendar,
  Building,
  User,
  Mail
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getPlaceholder } from '@/lib/placeholders';

export function SubmissionsTable() {
  const { submissions, isLoading, fetchSubmissions, exportToCSV, deleteSubmission } = useAdminData();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionDetails | null>(null);

  // Filter submissions based on search and status
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      const matchesSearch = !searchTerm || 
        submission.organization_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'completed' && submission.completed) ||
        (statusFilter === 'incomplete' && !submission.completed);

      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchTerm, statusFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredSubmissions.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkExport = () => {
    const selectedSubmissions = submissions.filter(s => selectedIds.includes(s.id));
    exportToCSV(selectedSubmissions);
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} submissions? This cannot be undone.`)) {
      return;
    }

    for (const id of selectedIds) {
      await deleteSubmission(id);
    }
    setSelectedIds([]);
  };

  const getStatusBadge = (completed: boolean) => (
    <Badge variant={completed ? "default" : "secondary"}>
      {completed ? "Completed" : "In Progress"}
    </Badge>
  );

  const getTrackBadge = (track: string) => {
    const colors = {
      TECH: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      REG: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300", 
      GEN: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    };

    return (
      <Badge variant="secondary" className={colors[track as keyof typeof colors]}>
        {track}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/3"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Submissions</h2>
          <p className="text-muted-foreground">
            Manage and review assessment submissions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle>All Submissions</CardTitle>
              <CardDescription>
                {filteredSubmissions.length} of {submissions.length} submissions
              </CardDescription>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={getPlaceholder('searchSubmissions')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="incomplete">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">
                {selectedIds.length} selected
              </span>
              <Button size="sm" variant="outline" onClick={handleBulkExport}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(submission.id)}
                        onCheckedChange={(checked) => handleSelectOne(submission.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {submission.organization_name || 'Unknown Organization'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {submission.industry || 'No industry specified'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <User className="h-3 w-3 mr-1 text-muted-foreground" />
                          {submission.full_name || 'Anonymous'}
                        </div>
                        {submission.email && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Mail className="h-3 w-3 mr-1" />
                            {submission.email}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {submission.role || 'No role specified'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTrackBadge(submission.track)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(submission.completed)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        {format(new Date(submission.created_at), 'MMM dd, yyyy')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(submission.created_at), 'HH:mm')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Submission Details</DialogTitle>
                            <DialogDescription>
                              Detailed view of assessment submission
                            </DialogDescription>
                          </DialogHeader>
                          {selectedSubmission && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Organization</h4>
                                  <p className="text-sm">{selectedSubmission.organization_name}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Contact</h4>
                                  <p className="text-sm">{selectedSubmission.full_name}</p>
                                  <p className="text-xs text-muted-foreground">{selectedSubmission.email}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Role</h4>
                                  <p className="text-sm">{selectedSubmission.role}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Industry</h4>
                                  <p className="text-sm">{selectedSubmission.industry}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Company Size</h4>
                                  <p className="text-sm">{selectedSubmission.company_size}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Track</h4>
                                  {getTrackBadge(selectedSubmission.track)}
                                </div>
                              </div>
                              <div className="pt-4 border-t">
                                <h4 className="font-medium mb-2">Assessment Details</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <span>Status:</span> {getStatusBadge(selectedSubmission.completed)}
                                  <span>Regulated:</span> <Badge variant="outline">{selectedSubmission.regulated ? 'Yes' : 'No'}</Badge>
                                  <span>Created:</span> <span>{format(new Date(selectedSubmission.created_at), 'PPpp')}</span>
                                  <span>Updated:</span> <span>{format(new Date(selectedSubmission.updated_at), 'PPpp')}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No submissions found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}