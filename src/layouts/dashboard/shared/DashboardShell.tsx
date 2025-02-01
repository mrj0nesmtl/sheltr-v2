import { type ReactNode } from 'react';

interface DashboardShellProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export const DashboardShell = ({ children, sidebar }: DashboardShellProps) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Sidebar - Fixed width */}
        {sidebar && (
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700">
            {sidebar}
          </div>
        )}
        
        {/* Main Content - With offset */}
        <main className={`flex-1 min-h-screen ${sidebar ? 'ml-64' : ''}`}>
          {/* Common header, notifications, etc. can go here */}
          {children}
        </main>
      </div>
    </div>
  );
};
