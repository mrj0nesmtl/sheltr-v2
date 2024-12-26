import { type ReactNode, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SuperAdminSidebar } from '@/features/dashboard/shared/navigation/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { UserNav } from '@/components/Navigation/UserNav';
import { Menu, X } from 'lucide-react';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      setIsInitialized(true);
    }
  }, [isLoading, user]);

  const SidebarComponent = () => {
    switch (user?.role) {
      case 'super_admin':
        return <SuperAdminSidebar />;
      default:
        return null;
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <h2 className="text-xl text-white">Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex">
        <div 
          className={`
            fixed inset-y-0 left-0 z-50 w-64 
            bg-gray-900 border-r border-gray-800 
            transform transition-transform duration-300 ease-in-out
            overflow-y-auto
            md:sticky md:top-0 md:translate-x-0
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <SidebarComponent />
        </div>

        <div className="flex-1 min-w-0">
          <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-800">
            <div className="p-4 flex justify-between items-center">
              <button
                className="md:hidden text-gray-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <div className="text-white">
                Welcome back, {user?.email}
              </div>
              <UserNav />
            </div>
          </div>

          <div className="p-6 md:ml-64">
            {children || <Outlet />}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}