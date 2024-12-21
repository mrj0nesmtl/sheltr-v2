import React from 'react';
import { useAuthStore } from '@/auth/stores/authStore';

// Role-specific sidebar exports
export { DonorSidebar } from './DonorSidebar';
export { ParticipantSidebar } from './ParticipantSidebar';
export { ShelterAdminSidebar } from './ShelterAdminSidebar';
export { SuperAdminSidebar } from './SuperAdminSidebar';
export { DebugSidebar } from './DebugSidebar';
export { SidebarItem } from './SidebarItem';

// Main Sidebar component
export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();

  switch (user?.role) {
    case 'donor':
      return <DonorSidebar />;
    case 'participant':
      return <ParticipantSidebar />;
    case 'shelter_admin':
      return <ShelterAdminSidebar />;
    case 'super_admin':
      return <SuperAdminSidebar />;
    case 'debug':
      return <DebugSidebar />;
    default:
      return null;
  }
};