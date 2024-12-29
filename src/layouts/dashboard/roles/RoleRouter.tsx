import { Routes, Route } from 'react-router-dom';
import { AUTH_ROLES } from '@/auth/types/auth.types';

// Import from our new structure
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { ShelterAdminDashboard } from './components/ShelterAdminDashboard';
import { DonorDashboard } from './components/DonorDashboard';
import { ParticipantDashboard } from './components/ParticipantDashboard';

interface RoleRouterProps {
  role: AUTH_ROLES;
}

export const RoleRouter = ({ role }: RoleRouterProps) => {
  const getDashboardComponent = () => {
    switch (role) {
      case AUTH_ROLES.SUPER_ADMIN:
        return <SuperAdminDashboard />;
      case AUTH_ROLES.SHELTER_ADMIN:
        return <ShelterAdminDashboard />;
      case AUTH_ROLES.DONOR:
        return <DonorDashboard />;
      case AUTH_ROLES.PARTICIPANT:
        return <ParticipantDashboard />;
      default:
        return null;
    }
  };

  return (
    <Routes>
      <Route path="dashboard/*" element={getDashboardComponent()} />
      <Route path="*" element={getDashboardComponent()} />
    </Routes>
  );
};
