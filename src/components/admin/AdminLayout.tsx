import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  LogOut, 
  Shield,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminLayout() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, adminRole, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: t('admin.navigation.dashboard'), href: '/admin', icon: LayoutDashboard, premium: true },
    { name: t('admin.navigation.overview'), href: '/admin/overview', icon: BarChart3 },
    { name: t('admin.navigation.submissions'), href: '/admin/submissions', icon: FileText },
    { name: t('admin.navigation.analytics'), href: '/admin/analytics', icon: BarChart3 },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const isPremium = adminRole === 'superadmin';

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">{t('admin.portal')}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/admin'}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    item.premium && !isPremium && "opacity-50 cursor-not-allowed"
                  )
                }
                onClick={(e) => {
                  if (item.premium && !isPremium) {
                    e.preventDefault();
                  }
                }}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
                {item.premium && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Pro
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User info */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{adminRole}</p>
              </div>
              <Badge variant={isPremium ? "default" : "secondary"}>
                {isPremium ? t('admin.roles.superAdmin') : t('admin.roles.analyst')}
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">AI Readiness Assessment</h1>
                <p className="text-sm text-muted-foreground">
                  Administrative Dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
                <LanguageSwitcher />
              <div className="text-right">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}