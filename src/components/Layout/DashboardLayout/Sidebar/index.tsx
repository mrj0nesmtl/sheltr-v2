import { useAuthStore } from '@/stores/authStore';
import { ShelterAdminSidebar } from './ShelterAdminSidebar';
import { DonorSidebar } from './DonorSidebar';
import { ParticipantSidebar } from './ParticipantSidebar';
import { SuperAdminSidebar } from './SuperAdminSidebar';

export function DashboardSidebar() {
  const { user } = useAuthStore();

  switch (user?.role) {
    case 'super_admin':
      return <SuperAdminSidebar />;
    case 'shelter_admin':
      return <ShelterAdminSidebar />;
    case 'donor':
      return <DonorSidebar />;
    case 'participant':
      return <ParticipantSidebar />;
    default:
      return null;
  }
} 