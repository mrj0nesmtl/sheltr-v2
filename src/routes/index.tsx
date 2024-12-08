import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Super Admin routes */}
      <Route
        path="/super-admin/*"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <SuperAdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* Shelter Admin routes */}
      <Route
        path="/shelter/*"
        element={
          <ProtectedRoute allowedRoles={['shelter_admin']}>
            <ShelterAdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* Donor routes */}
      <Route
        path="/donor/*"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <DonorRoutes />
          </ProtectedRoute>
        }
      />

      {/* Participant routes */}
      <Route
        path="/participant/*"
        element={
          <ProtectedRoute allowedRoles={['participant']}>
            <ParticipantRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
} 