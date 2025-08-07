import React, { useState } from 'react';
import { useAdminData } from '@/hooks/useAdminData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Trash2, 
  Archive,
  Mail,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface BulkAction {
  type: 'delete' | 'archive' | 'export' | 'email';
  label: string;
  icon: React.ReactNode;
  variant?: 'default' | 'destructive';
}

export function DataManagementPanel() {
  const { submissions, isLoading } = useAdminData();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [trackFilter, setTrackFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-16" />)}
        </div>
      </div>
    );
  }

  const bulkActions: BulkAction[] = [
    { type: 'export', label: 'Export Selected', icon: <Download className="h-4 w-4" /> },
    { type: 'email', label: 'Send Summary Email', icon: <Mail className="h-4 w-4" /> },
    { type: 'archive', label: 'Archive Selected', icon: <Archive className="h-4 w-4" /> },
    { type: 'delete', label: 'Delete Selected', icon: <Trash2 className="h-4 w-4" />, variant: 'destructive' }
  ];

  // Filter submissions
  const filteredSubmissions = submissions?.filter(submission => {
    const matchesSearch = !searchTerm || 
      submission.organization_profile?.M0?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.organization_profile?.M1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.organization_profile?.M2?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesTrack = trackFilter === 'all' || submission.organization_profile?.track === trackFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const submissionDate = new Date(submission.created_at);
      const now = new Date();
      
      switch (dateFilter) {
        case 'today':
          matchesDate = submissionDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = submissionDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = submissionDate >= monthAgo;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesTrack && matchesDate;
  }) || [];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(filteredSubmissions.map(s => s.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  const handleBulkAction = async (action: BulkAction) => {
    const selectedData = filteredSubmissions.filter(s => selectedItems.has(s.id));
    
    switch (action.type) {
      case 'export':
        // Export selected items as CSV
        const csvData = selectedData.map(s => ({
          organization: s.organization_profile?.M0 || '',
          contact: s.organization_profile?.M1 || '',
          email: s.organization_profile?.M2 || '',
          track: s.organization_profile?.track || '',
          score: s.total_score || 0,
          status: s.status,
          created: new Date(s.created_at).toLocaleDateString()
        }));
        
        const csvContent = [
          Object.keys(csvData[0]).join(','),
          ...csvData.map(row => Object.values(row).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `selected-assessments-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Export completed",
          description: `${selectedData.length} assessments exported successfully.`
        });
        break;
        
      case 'delete':
        // In a real app, this would make API calls to delete
        toast({
          title: "Delete action",
          description: `Would delete ${selectedData.length} assessments.`,
          variant: "destructive"
        });
        break;
        
      case 'archive':
        toast({
          title: "Archive action",
          description: `Would archive ${selectedData.length} assessments.`
        });
        break;
        
      case 'email':
        toast({
          title: "Email action",
          description: `Would send summary emails for ${selectedData.length} assessments.`
        });
        break;
    }
    
    setSelectedItems(new Set());
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTrackBadge = (track: string) => {
    const colors = {
      TECH: 'bg-blue-100 text-blue-800',
      REG: 'bg-purple-100 text-purple-800',
      GEN: 'bg-gray-100 text-gray-800'
    };
    return (
      <Badge variant="outline" className={colors[track as keyof typeof colors] || colors.GEN}>
        {track}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Data Management</h2>
          <p className="text-muted-foreground">Manage and export assessment data</p>
        </div>
        
        {selectedItems.size > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Bulk Actions ({selectedItems.size})
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {bulkActions.map((action) => (
                <DropdownMenuItem
                  key={action.type}
                  onClick={() => handleBulkAction(action)}
                  className={action.variant === 'destructive' ? 'text-destructive' : ''}
                >
                  {action.icon}
                  <span className="ml-2">{action.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Organization, contact, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Track</label>
              <Select value={trackFilter} onValueChange={setTrackFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tracks</SelectItem>
                  <SelectItem value="TECH">Technical</SelectItem>
                  <SelectItem value="REG">Regulated</SelectItem>
                  <SelectItem value="GEN">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Submissions ({filteredSubmissions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Select All */}
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filteredSubmissions.length > 0 && selectedItems.size === filteredSubmissions.length}
                onCheckedChange={handleSelectAll}
              />
              <label className="text-sm font-medium">
                Select all ({filteredSubmissions.length})
              </label>
            </div>

            <Separator />

            {/* Submissions List */}
            <div className="space-y-2">
              {filteredSubmissions.map((submission) => (
                <div 
                  key={submission.id} 
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={selectedItems.has(submission.id)}
                    onCheckedChange={(checked) => handleSelectItem(submission.id, checked as boolean)}
                  />
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="font-medium">
                        {submission.organization_profile?.M0 || 'Unknown Organization'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submission.organization_profile?.M1}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm">{submission.organization_profile?.M2}</p>
                      {submission.organization_profile?.track && getTrackBadge(submission.organization_profile.track)}
                    </div>
                    
                    <div>
                      <p className="font-medium">{submission.total_score?.toFixed(1) || 'N/A'}%</p>
                      {getStatusBadge(submission.status)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">{new Date(submission.created_at).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(submission.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}