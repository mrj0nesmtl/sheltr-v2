import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/stores/authStore';
import { AUTH_ROLES } from '@/auth/types/auth.types';

// Import the dashboard components
import { SuperAdminDashboard } from '@/features/dashboard/roles/super-admin/SuperAdminDashboard';
import { ShelterAdminDashboard } from '@/features/dashboard/roles/shelter-admin/ShelterAdminDashboard';
import { DonorDashboard } from '@/features/dashboard/roles/donor/DonorDashboard';
import { ParticipantDashboard } from '@/features/dashboard/roles/participant/ParticipantDashboard';

export const RoleRouter = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {/* Super Admin Routes */}
      <Route 
        path="/super-admin/*" 
        element={
          user.role === AUTH_ROLES.SUPER_ADMIN 
            ? <SuperAdminDashboard /> 
            : <Navigate to="/unauthorized" replace />
        } 
      />

      {/* Shelter Admin Routes */}
      <Route 
        path="/shelter-admin/:orgId/*" 
        element={
          user.role === AUTH_ROLES.SHELTER_ADMIN 
            ? <ShelterAdminDashboard /> 
            : <Navigate to="/unauthorized" replace />
        } 
      />

      {/* Donor Routes */}
      <Route 
        path="/donor/:userId/*" 
        element={
          user.role === AUTH_ROLES.DONOR 
            ? <DonorDashboard /> 
            : <Navigate to="/unauthorized" replace />
        } 
      />

      {/* Participant Routes */}
      <Route 
        path="/participant/:userId/*" 
        element={
          user.role === AUTH_ROLES.PARTICIPANT 
            ? <ParticipantDashboard /> 
            : <Navigate to="/unauthorized" replace />
        } 
      />

      {/* Default redirect for unknown paths */}
      <Route path="*" element={<Navigate to="/unauthorized" replace />} />
    </Routes>
  );
};
