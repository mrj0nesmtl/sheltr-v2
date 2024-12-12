import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseSettings } from '@/components/Settings/BaseSettings';
import { Card } from '@/components/ui/Card';

export function ShelterAdminSettings() {
  const { t } = useTranslation();

  const shelterAdminSections = [
    {
      id: 'shelter',
      title: t('settings.shelter.title'),
      description: t('settings.shelter.description'),
      icon: 'home',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.shelter.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  {t('settings.shelter.name')}
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  {t('settings.shelter.address')}
                </label>
                <textarea
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  {t('settings.shelter.capacity')}
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md"
                />
              </div>
            </div>
          </Card.Content>
        </Card>
      )
    },
    {
      id: 'services',
      title: t('settings.services.title'),
      description: t('settings.services.description'),
      icon: 'package',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.services.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            {/* Service management settings */}
          </Card.Content>
        </Card>
      )
    }
  ];

  return <BaseSettings role="shelter_admin" additionalSections={shelterAdminSections} />;
} 