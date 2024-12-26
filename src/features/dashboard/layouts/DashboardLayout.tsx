import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { SuperAdminSidebar } from '@/features/dashboard/shared/navigation/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { UserNav } from '@/components/Navigation/UserNav';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const SidebarComponent = () => {
    switch (user?.role) {
      case 'super_admin':
        return <SuperAdminSidebar />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <SidebarComponent />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <div className="text-white">
            Welcome back, {user?.email}
          </div>
          <UserNav />
        </div>

        <div className="container mx-auto px-6 py-8">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}