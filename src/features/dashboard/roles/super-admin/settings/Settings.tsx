import { BaseSettings } from '@/components/Settings/BaseSettings';
import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';


export function SuperAdminSettings() {
  const { t } = useTranslation();

  const superAdminSections = [
    {
      id: 'system',
      title: t('settings.system.title'),
      description: t('settings.system.description'),
      icon: 'settings',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.system.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            {/* System settings */}
          </Card.Content>
        </Card>
      )
    },
    {
      id: 'audit',
      title: t('settings.audit.title'),
      description: t('settings.audit.description'),
      icon: 'file-text',
      component: (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-medium text-white">
              {t('settings.audit.title')}
            </h3>
          </Card.Header>
          <Card.Content>
            {/* Audit log settings */}
          </Card.Content>
        </Card>
      )
    }
  ];

  return <BaseSettings role="super_admin" additionalSections={superAdminSections} />;
} 