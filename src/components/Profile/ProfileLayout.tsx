import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/auth/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">
            {t('profile.title')}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
              {user?.role}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
} 