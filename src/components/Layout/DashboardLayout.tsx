import React from 'react';
import { UserBadge } from '@/components/UserBadge/UserBadge';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, signOut } = useAuthStore();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Left side: Title and Badge */}
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {t('dashboard.welcome', { name: user?.name })}
                </h1>
                <p className="text-gray-400 mt-1">{title}</p>
              </div>
              <UserBadge role={user?.role || 'participant'} />
            </div>

            {/* Right side: User info and Sign Out */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={signOut}
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('common.signOut')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
} 