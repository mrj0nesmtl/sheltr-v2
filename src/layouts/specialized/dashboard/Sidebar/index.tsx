import React from 'react';
import { useAuthStore } from '@/auth/stores/authStore';
import { DonorSidebar } from '@/features/roles/donor/components/common/DonorSidebar';
import { ParticipantSidebar } from '@/features/roles/participant/components/common/ParticipantSidebar';
import { ShelterAdminSidebar } from '@/features/roles/shelter-admin/components/common/ShelterAdminSidebar';
import { SuperAdminSidebar } from '@/features/roles/super-admin/components/common/SuperAdminSidebar';
import { DebugSidebar } from './DebugSidebar';
import { SidebarItem } from './SidebarItem';

// Role-specific sidebar exports
export {
  DonorSidebar,
  ParticipantSidebar,
  ShelterAdminSidebar,
  SuperAdminSidebar
};
export { DebugSidebar } from './DebugSidebar';
export { SidebarItem } from './SidebarItem';

// Main Sidebar component
export const Sidebar: React.FC = () => {
  const { role } = useAuthStore();

  switch (role) {
    case 'donor':
      return <DonorSidebar />;
    case 'shelter_admin':
      return <ShelterAdminSidebar />;
    case 'super_admin':
      return <SuperAdminSidebar />;
    case 'participant':
      return <ParticipantSidebar />;
    default:
      return null;
  }
};