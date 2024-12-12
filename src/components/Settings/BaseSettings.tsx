import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/stores/authStore';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: React.ReactNode;
}

export function BaseSettings({ 
  role,
  additionalSections = []
}: { 
  role: 'super_admin' | 'shelter_admin' | 'donor' | 'participant',
  additionalSections?: SettingsSection[]
}) {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const commonSections: SettingsSection[] = [
    {
      id: 'account',
      title: t('settings.account.title'),
      description: t('settings.account.description'),
      icon: 'user',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.account.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            {/* Account settings form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  {t('settings.account.email')}
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  {t('settings.account.name')}
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md"
                />
              </div>
            </div>
          </Card.Content>
        </Card>
      )
    },
    {
      id: 'notifications',
      title: t('settings.notifications.title'),
      description: t('settings.notifications.description'),
      icon: 'bell',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.notifications.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            {/* Notification preferences */}
          </Card.Content>
        </Card>
      )
    },
    {
      id: 'security',
      title: t('settings.security.title'),
      description: t('settings.security.description'),
      icon: 'shield',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.security.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            {/* Security settings */}
          </Card.Content>
        </Card>
      )
    }
  ];

  const allSections = [...commonSections, ...additionalSections];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {allSections.map((section) => (
            <div key={section.id}>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name={section.icon} className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-400 mb-4">{section.description}</p>
              {section.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 