import { Outlet } from 'react-router-dom';
import type { DashboardLayoutProps } from '@/types/core/dashboard';
import { DashboardHeader } from './components/DashboardHeader';
import { Sidebar } from './Sidebar';

export function DashboardLayout({ title = "Dashboard" }: Partial<DashboardLayoutProps>) {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title={title} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}