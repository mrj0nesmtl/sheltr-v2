import { BaseSettings } from '@/components/Settings/BaseSettings';
import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';

export function ParticipantSettings() {
  const { t } = useTranslation();

  const participantSections = [
    {
      id: 'privacy',
      title: t('settings.privacy.title'),
      description: t('settings.privacy.description'),
      icon: 'eye',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.privacy.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {t('settings.privacy.shareProfile')}
                </span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {t('settings.privacy.showProgress')}
                </span>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </Card.Content>
        </Card>
      )
    },
    {
      id: 'communication',
      title: t('settings.communication.title'),
      description: t('settings.communication.description'),
      icon: 'message-circle',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.communication.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            {/* Communication preferences */}
          </Card.Content>
        </Card>
      )
    }
  ];

  return <BaseSettings role="participant" additionalSections={participantSections} />;
} 