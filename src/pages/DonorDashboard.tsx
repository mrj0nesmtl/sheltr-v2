import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { DashboardHeader } from '@/components/Layout/DashboardHeader';

export function DonorDashboard() {
  const { t } = useTranslation();
  const { user, signOut } = useAuthStore();
  
  const getDisplayName = (email: string = '') => {
    if (!email) return '';
    const withoutSuffix = email.replace('+donor', '');
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
        role="donor"
        title={t('dashboard.donor.title')}
        onSignOut={signOut}
      />
      
      {/* Stats Grid */}
      <div className="px-8">
        {/* ... rest of donor dashboard content ... */}
      </div>
    </div>
  );
} 