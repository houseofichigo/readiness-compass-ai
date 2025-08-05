import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
  Mail,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import i18n from '@/lib/i18n';
import { getPlaceholder } from '@/lib/placeholders';

export function SubmissionsTable() {
  const { submissions, isLoading, exportToCSV, deleteSubmission } =
    useAdminData();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionDetails | null>(null);

  // determine language for fallback strings
  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesSearch =
        !searchTerm ||
        submission.organization_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        submission.full_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        submission.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && submission.completed) ||
        (statusFilter === 'incomplete' && !submission.completed);

      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchTerm, statusFilter]);

  const handleSelectAll = (checked: boolean) =>
    setSelectedIds(checked ? filteredSubmissions.map((s) => s.id) : []);

  const handleSelectOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  const handleBulkExport = () =>
    exportToCSV(submissions.filter((s) => selectedIds.includes(s.id)));

  const handleBulkDelete = async () => {
    if (
      !confirm(
        `Delete ${selectedIds.length} submissions? This cannot be undone.`
      )
    )
      return;
    for (const id of selectedIds) await deleteSubmission(id);
    setSelectedIds([]);
  };

  const getStatusBadge = (completed: boolean) => (
    <Badge variant={completed ? 'default' : 'secondary'}>
      {completed ? 'Completed' : 'In Progress'}
    </Badge>
  );

  const getTrackBadge = (track: string) => {
    const colors = {
      TECH: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      REG: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      GEN: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    } as const;
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
            <div className="h-6 bg-muted rounded w-1/4" />
            <div className="h-4 bg-muted rounded w-1/3" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded" />
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
          <h2 className="text-3xl font-bold tracking-tight">
            {lang === 'fr' ? 'Soumissions' : 'Submissions'}
          </h2>
          <p className="text-muted-foreground">
            {lang === 'fr'
              ? 'Gérez et consultez les soumissions'
              : 'Manage and review assessment submissions'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle>
                {lang === 'fr' ? 'Toutes les soumissions' : 'All Submissions'}
              </CardTitle>
              <CardDescription>
                {filteredSubmissions.length} / {submissions.length}{' '}
                {lang === 'fr' ? 'soumissions' : 'submissions'}
              </CardDescription>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={
                    lang === 'fr'
                      ? 'Rechercher des soumissions...'
                      : getPlaceholder('searchSubmissions')
                  }
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
                  <SelectItem value="all">
                    {lang === 'fr' ? 'Tous les statuts' : 'All Status'}
                  </SelectItem>
                  <SelectItem value="completed">
                    {lang === 'fr' ? 'Terminé' : 'Completed'}
                  </SelectItem>
                  <SelectItem value="incomplete">
                    {lang === 'fr' ? 'En cours' : 'In Progress'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">
                {selectedIds.length}{' '}
                {lang === 'fr' ? 'sélectionnées' : 'selected'}
              </span>
              <Button size="sm" variant="outline" onClick={handleBulkExport}>
                <Download className="mr-2 h-4 w-4" />
                {lang === 'fr' ? 'Exporter CSV' : 'Export CSV'}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleBulkDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {lang === 'fr' ? 'Supprimer' : 'Delete'}
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
                      checked={
                        selectedIds.length === filteredSubmissions.length &&
                        filteredSubmissions.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>
                    {lang === 'fr' ? 'Organisation' : 'Organization'}
                  </TableHead>
                  <TableHead>
                    {lang === 'fr' ? 'Contact' : 'Contact'}
                  </TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>
                    {lang === 'fr' ? 'Statut' : 'Status'}
                  </TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-20">
                    {lang === 'fr' ? 'Actions' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(submission.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOne(
                            submission.id,
                            checked as boolean
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {submission.organization_name ||
                              (lang === 'fr'
                                ? 'Organisation inconnue'
                                : 'Unknown Organization')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {submission.industry ||
                              (lang === 'fr'
                                ? 'Aucun secteur précisé'
                                : 'No industry specified')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <User className="h-3 w-3 mr-1 text-muted-foreground" />
                          {submission.full_name ||
                            (lang === 'fr' ? 'Anonyme' : 'Anonymous')}
                        </div>
                        {submission.email && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Mail className="h-3 w-3 mr-1" />
                            {submission.email}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {submission.role ||
                            (lang === 'fr'
                              ? 'Rôle non spécifié'
                              : 'No role specified')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTrackBadge(submission.track)}</TableCell>
                    <TableCell>
                      {getStatusBadge(submission.completed)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        {format(
                          new Date(submission.created_at),
                          'MMM dd, yyyy'
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(
                          new Date(submission.created_at),
                          'HH:mm'
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setSelectedSubmission(submission)
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              {lang === 'fr'
                                ? 'Détails de la soumission'
                                : 'Submission Details'}
                            </DialogTitle>
                            <DialogDescription>
                              {lang === 'fr'
                                ? 'Vue détaillée de la soumission'
                                : 'Detailed view of assessment submission'}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedSubmission && (
                            <div className="space-y-4">
                              {/* … details grid … */}
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
                <p className="text-muted-foreground">
                  {lang === 'fr'
                    ? 'Aucune soumission correspondante trouvée.'
                    : 'No submissions found matching your criteria.'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
