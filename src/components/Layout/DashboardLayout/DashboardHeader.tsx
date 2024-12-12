import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardHeaderProps {
  name: string;
  role: 'admin' | 'donor' | 'participant';
  title: string;
  onSignOut: () => void;
}

export function DashboardHeader({ name, role, title, onSignOut }: DashboardHeaderProps) {
  const { t } = useTranslation();

  const getRoleConfig = (role: string) => {
    const configs = {
      admin: {
        icon: 'building',
        color: 'purple',
        label: 'Shelter Admin'
      },
      donor: {
        icon: 'heart',
        color: 'pink',
        label: 'Donor'
      },
      participant: {
        icon: 'user',
        color: 'blue',
        label: 'Participant'
      }
    };
    return configs[role] || configs.participant;
  };

  const roleConfig = getRoleConfig(role);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {name}
          </h1>
          <h2 className="text-xl text-gray-400">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className={`bg-${roleConfig.color}-900/50 rounded-full px-4 py-2`}>
            <div className="flex items-center gap-2">
              <Icon name={roleConfig.icon} className={`h-5 w-5 text-${roleConfig.color}-300`} />
              <span className={`text-${roleConfig.color}-300`}>{roleConfig.label}</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onSignOut}
            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('common.signOut')}
          </Button>
        </div>
      </div>
    </div>
  );
} 