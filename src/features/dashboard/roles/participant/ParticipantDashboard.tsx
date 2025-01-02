import { useAuthStore } from '@/auth/stores/authStore';
import { useTranslation } from 'react-i18next';
import { DashboardHeader } from '@/features/dashboard/shared/components/DashboardHeader';

export const ParticipantDashboard = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title={t('dashboard.participant.title')} 
        user={user} 
      />
      {/* Dashboard content */}
    </div>
  );
};

export default ParticipantDashboard; 