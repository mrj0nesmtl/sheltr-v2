import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseSettings } from '@/components/Settings/BaseSettings';
import { Card } from '@/components/ui/Card';

export function DonorSettings() {
  const { t } = useTranslation();

  const donorSections = [
    {
      id: 'preferences',
      title: t('settings.preferences.title'),
      description: t('settings.preferences.description'),
      icon: 'heart',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.preferences.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  {t('settings.preferences.donationType')}
                </label>
                <select className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md">
                  <option value="monthly">{t('settings.preferences.monthly')}</option>
                  <option value="oneTime">{t('settings.preferences.oneTime')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  {t('settings.preferences.causeAreas')}
                </label>
                {/* Add checkboxes for different cause areas */}
              </div>
            </div>
          </Card.Content>
        </Card>
      )
    },
    {
      id: 'payment',
      title: t('settings.payment.title'),
      description: t('settings.payment.description'),
      icon: 'credit-card',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.payment.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            {/* Payment method management */}
          </Card.Content>
        </Card>
      )
    }
  ];

  return <BaseSettings role="donor" additionalSections={donorSections} />;
} 