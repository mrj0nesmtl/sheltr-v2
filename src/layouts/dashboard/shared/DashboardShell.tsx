import { type ReactNode } from 'react';

interface DashboardShellProps {
  children: ReactNode;
}

export const DashboardShell = ({ children }: DashboardShellProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative flex min-h-screen flex-col">
        {/* Common header, notifications, etc. can go here */}
        {children}
      </div>
    </div>
  );
};
