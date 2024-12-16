import { UserRole, isValidRole } from '@/auth/types/auth.types';
import { useAuthStore } from '@/stores/authStore';
import { ShelterAdminSidebar } from './ShelterAdminSidebar';
import { DonorSidebar } from './DonorSidebar';
import { ParticipantSidebar } from './ParticipantSidebar';
import { SuperAdminSidebar } from './SuperAdminSidebar';

export function DashboardSidebar() {
  const { user } = useAuthStore();
  
  if (!user?.role || !isValidRole(user.role)) {
    return null;
  }

  const sidebarMap = {
    [UserRole.SUPER_ADMIN]: SuperAdminSidebar,
    [UserRole.SHELTER_ADMIN]: ShelterAdminSidebar,
    [UserRole.DONOR]: DonorSidebar,
    [UserRole.PARTICIPANT]: ParticipantSidebar
  };

  const SidebarComponent = sidebarMap[user.role];
  return SidebarComponent ? <SidebarComponent /> : null;
} 