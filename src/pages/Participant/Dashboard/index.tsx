import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { DashboardHeader } from '@/components/Layout/DashboardLayout/DashboardHeader';

export function ParticipantDashboard() {
  const { t } = useTranslation();
  const { user, signOut } = useAuthStore();
  
  const getDisplayName = (email: string = '') => {
    if (!email) return '';
    const withoutSuffix = email.replace('+participant', '');
    const localPart = withoutSuffix.split('@')[0];
    const nameParts = localPart.split(/[._]/);
    return nameParts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader
        name={getDisplayName(user?.email)}
        role="participant"
        title={t('dashboard.participant.title')}
        onSignOut={signOut}
      />
      
      {/* Stats Grid */}
      <div className="px-8">
        {/* ... rest of participant dashboard content ... */}
      </div>
    </div>
  );
} 