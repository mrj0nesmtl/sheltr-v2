import { useAuth } from '@/hooks/useAuth';
import { DonorSidebar } from './DonorSidebar';
import { ParticipantSidebar } from './ParticipantSidebar';
import { ShelterAdminSidebar } from './ShelterAdminSidebar';
import { SuperAdminSidebar } from './SuperAdminSidebar';

export function Sidebar() {
  const { user } = useAuth();

  // Render appropriate sidebar based on user role
  switch (user?.role) {
    case 'SUPER_ADMIN':
      return <SuperAdminSidebar />;
    case 'SHELTER_ADMIN':
      return <ShelterAdminSidebar />;
    case 'PARTICIPANT':
      return <ParticipantSidebar />;
    case 'DONOR':
      return <DonorSidebar />;
    default:
      return null;
  }
} 