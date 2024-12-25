import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { DashboardHeader } from '../shared/navigation/header/DashboardHeader';
import { Sidebar } from '../shared/navigation/sidebar';

export function DashboardLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}