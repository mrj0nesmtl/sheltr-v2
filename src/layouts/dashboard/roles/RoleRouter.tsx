import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/stores/authStore';
import { AUTH_ROLES } from '@/auth/types/auth.types';

// Fix imports to point directly to the dashboard files
import { ShelterAdminDashboard } from '@/features/dashboard/roles/shelter-admin/ShelterAdminDashboard';
import { DonorDashboard } from '@/features/dashboard/roles/donor/DonorDashboard';
import { ParticipantDashboard } from '@/features/dashboard/roles/participant/ParticipantDashboard';
import { SuperAdminDashboard } from '@/features/dashboard/roles/super-admin/SuperAdminDashboard';

export const RoleRouter = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case AUTH_ROLES.SUPER_ADMIN:
        return <SuperAdminDashboard />;
      case AUTH_ROLES.SHELTER_ADMIN:
        return <ShelterAdminDashboard />;
      case AUTH_ROLES.DONOR:
        return <DonorDashboard />;
      case AUTH_ROLES.PARTICIPANT:
        return <ParticipantDashboard />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  };

  return (
    <Routes>
      <Route path="/*" element={getDashboardComponent()} />
    </Routes>
  );
};
