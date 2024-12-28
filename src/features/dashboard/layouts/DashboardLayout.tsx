import { type ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserNav } from '@/components/Navigation/UserNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ShelterAdminSidebar } from '@/features/dashboard/shared/navigation/sidebar/ShelterAdminSidebar';
import { SuperAdminSidebar } from '@/features/dashboard/shared/navigation/sidebar';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  // Render appropriate sidebar based on user role
  const renderSidebar = () => {
    if (!user?.role) return null;

    const sidebarMap = {
      shelter_admin: <ShelterAdminSidebar />,
      super_admin: <SuperAdminSidebar />
    };

    return sidebarMap[user.role as keyof typeof sidebarMap] || null;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            fixed top-0 left-0 h-screen w-64 
            bg-gray-800 border-r border-gray-700
            transform transition-transform duration-200 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:relative lg:translate-x-0
          `}
        >
          {renderSidebar()}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          {/* Top Navigation */}
          <nav className="sticky top-0 z-40 bg-gray-800 border-b border-gray-700">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold text-white">
                  {getPageTitle(user?.role)}
                </h1>
              </div>
              <UserNav />
            </div>
          </nav>

          {/* Page Content */}
          <div className="p-6">
            <ErrorBoundary>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="text-white">Loading content...</div>
                </div>
              }>
                {children || <Outlet />}
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Helper function to get page title
function getPageTitle(role?: string) {
  switch (role) {
    case 'shelter_admin':
      return 'Shelter Dashboard';
    case 'super_admin':
      return 'Admin Dashboard';
    default:
      return 'Dashboard';
  }
}