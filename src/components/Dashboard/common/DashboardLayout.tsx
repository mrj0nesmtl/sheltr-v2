import React from 'react';
import { DashboardHeader } from '@/layouts/specialized/dashboard/components/DashboardHeader';
import { Sidebar } from '@/layouts/specialized/dashboard/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardHeader />
        <main>{children}</main>
      </div>
    </div>
  );
}