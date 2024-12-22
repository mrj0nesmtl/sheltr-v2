import React from 'react';
import { useAuthStore } from '@/auth/stores/authStore';
import { DonorSidebar } from './DonorSidebar';
import { ShelterAdminSidebar } from './ShelterAdminSidebar';
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { ParticipantSidebar } from './ParticipantSidebar';

// Role-specific sidebar exports
export { DonorSidebar } from './DonorSidebar';
export { ParticipantSidebar } from './ParticipantSidebar';
export { ShelterAdminSidebar } from './ShelterAdminSidebar';
export { SuperAdminSidebar } from './SuperAdminSidebar';
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