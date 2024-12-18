import { AUTH_ROLES, isValidRole } from '@/auth/types/auth.types';
import { useAuthStore } from '@/stores/authStore';
import { DonorSidebar } from './DonorSidebar';
import { ParticipantSidebar } from './ParticipantSidebar';
import { ShelterAdminSidebar } from './ShelterAdminSidebar';
import { SuperAdminSidebar } from './SuperAdminSidebar';

export function DashboardSidebar() {
  const { user } = useAuthStore();
  
  if (!user?.role || !isValidRole(user.role)) {
    return null;
  }

  const sidebarMap = {
    [AUTH_ROLES.SUPER_ADMIN]: SuperAdminSidebar,
    [AUTH_ROLES.SHELTER_ADMIN]: ShelterAdminSidebar,
    [AUTH_ROLES.DONOR]: DonorSidebar,
    [AUTH_ROLES.PARTICIPANT]: ParticipantSidebar
  };

  const SidebarComponent = sidebarMap[user.role];
  return SidebarComponent ? <SidebarComponent /> : null;
} 