import { Routes, Route, Navigate } from 'react-router-dom';
import { UnifiedDashboard } from '@/layouts/dashboard/base/UnifiedDashboard';
import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { useAuthStore } from '@/auth/stores/authStore';
import { AUTH_ROLES } from '@/auth/types/auth.types';
import { RoleRouter } from '@/layouts/dashboard/roles/RoleRouter';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import NotFoundPage from '@/pages/NotFoundPage';
import Solutions from '@/pages/Solutions';
import HowItWorks from '@/pages/HowItWorks';
import ScanDonatePage from '@/pages/ScanDonatePage';
import Impact from '@/pages/Impact';
import About from '@/pages/About';
import Wiki from '@/pages/Wiki/Wiki';
import { ParticipantDashboard } from '@/features/dashboard/roles/participant/ParticipantDashboard';
import { DonorDashboard } from '@/features/dashboard/roles/donor/DonorDashboard';

const AppRoutes = () => {
  const { role } = useAuthStore();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/scan-donate" element={<ScanDonatePage />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/about" element={<About />} />
      <Route path="/wiki" element={<Wiki />} />
      
      {/* Protected dashboard routes */}
      <Route
        path="/super-admin/*"
        element={
          <ProtectedRoute allowedRoles={[AUTH_ROLES.SUPER_ADMIN]}>
            <RoleRouter />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shelter-admin/*"
        element={
          <ProtectedRoute allowedRoles={[AUTH_ROLES.SHELTER_ADMIN]}>
            <RoleRouter />
          </ProtectedRoute>
        }
      />

      {/* Add Donor Routes */}
      <Route
        path="/donor/*"
        element={
          <ProtectedRoute allowedRoles={[AUTH_ROLES.DONOR]}>
            <RoleRouter />
          </ProtectedRoute>
        }
      />

      {/* Add Participant Routes */}
      <Route
        path="/participant/*"
        element={
          <ProtectedRoute allowedRoles={[AUTH_ROLES.PARTICIPANT]}>
            <RoleRouter />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
