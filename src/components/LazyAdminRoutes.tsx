import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load admin components for better performance
const OverviewDashboard = lazy(() => import('@/components/admin/OverviewDashboard').then(module => ({ default: module.OverviewDashboard })));
const AnalyticsDashboard = lazy(() => import('@/components/admin/AnalyticsDashboard').then(module => ({ default: module.AnalyticsDashboard })));
const ExecutiveDashboard = lazy(() => import('@/components/admin/ExecutiveDashboard').then(module => ({ default: module.ExecutiveDashboard })));
const AssessmentAdmin = lazy(() => import('@/components/admin/AssessmentAdmin').then(module => ({ default: module.AssessmentAdmin })));
const SubmissionsTable = lazy(() => import('@/components/admin/SubmissionsTable').then(module => ({ default: module.SubmissionsTable })));

const LoadingFallback = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);

export function LazyAdminRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<OverviewDashboard />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="executive" element={<ExecutiveDashboard />} />
        <Route path="assessment" element={<AssessmentAdmin />} />
        <Route path="submissions" element={<SubmissionsTable />} />
      </Routes>
    </Suspense>
  );
}