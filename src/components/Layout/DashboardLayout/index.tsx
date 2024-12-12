import React from 'react';
import { UserBadge } from '@/components/UserBadge/UserBadge';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';
import { SuperAdminSidebar } from './Sidebar/SuperAdminSidebar';
import { ShelterAdminSidebar } from './Sidebar/ShelterAdminSidebar';
import { DonorSidebar } from './Sidebar/DonorSidebar';
import { ParticipantSidebar } from './Sidebar/ParticipantSidebar';
import { DebugSidebar } from './Sidebar/DebugSidebar';
import { DashboardSidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, signOut } = useAuthStore();
  const { t } = useTranslation();

  console.log('DashboardLayout mounting', { user, title });

  const renderSidebar = () => {
    return <DebugSidebar />;
    
    /* Comment out temporarily
    switch (user?.role) {
      case 'super_admin':
        return <SuperAdminSidebar />;
      case 'admin':
      case 'shelter_admin':
        return <ShelterAdminSidebar />;
      case 'donor':
        return <DonorSidebar />;
      case 'participant':
        return <ParticipantSidebar />;
      default:
        return null;
    }
    */
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800">
        {renderSidebar()}
      </div>
      <div className="flex-1 pl-64">
        <header className="bg-gray-800 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl text-white">{title}</h1>
            <div className="flex items-center gap-4">
              <UserBadge user={user} />
              <Button 
                variant="ghost" 
                onClick={signOut}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">{t('common.signOut')}</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 