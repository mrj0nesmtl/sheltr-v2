import { SignOutButton } from '@/components/ui/SignOutButton';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { useTranslation } from 'react-i18next';

export function ParticipantDashboard() {
  const { t } = useTranslation();

  return (
    <DashboardLayout title={t('dashboard.participant.title')}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* ... existing stat cards ... */}
      </div>
      
      {/* ... rest of the dashboard content ... */}
    </DashboardLayout>
  );
} 