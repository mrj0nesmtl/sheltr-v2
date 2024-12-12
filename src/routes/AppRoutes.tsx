import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '../lib/types/database';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { AuthProvider } from '../components/Auth/AuthProvider';
import { Layout } from '../components/Layout/Layout';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Public Pages
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { AboutPage } from '../pages/About';
import { HowItWorksPage } from '../pages/HowItWorks';
import { SolutionsPage } from '../pages/Solutions';

// Protected Pages
import { SuperAdminDashboard } from '../pages/SuperAdmin/SuperAdminDashboard';
import { ShelterAdminDashboard } from '../pages/ShelterAdmin/ShelterAdminDashboard';
import { DonorDashboard } from '../pages/Donor/DonorDashboard';
import { ParticipantDashboard } from '../pages/Participant/ParticipantDashboard';

export function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />} errorElement={<ErrorBoundary />}>
          {/* Public Routes */}
          <Route errorElement={<ErrorBoundary />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/login" element={<LoginPage isAdminLogin={true} />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          {/* Super Admin Routes */}
          <Route path="/super-admin/*" element={
            <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
              <Routes>
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="analytics" element={<SuperAdminAnalytics />} />
                <Route path="settings" element={<SuperAdminSettings />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Shelter Admin Routes */}
          <Route path="/shelter-admin/*" element={
            <ProtectedRoute allowedRoles={[UserRole.SHELTER_ADMIN, UserRole.SUPER_ADMIN]}>
              <Routes>
                <Route path="dashboard" element={<ShelterAdminDashboard />} />
                <Route path="participants" element={<ParticipantManagement />} />
                <Route path="settings" element={<ShelterSettings />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Donor Routes */}
          <Route path="/donor/*" element={
            <ProtectedRoute allowedRoles={[UserRole.DONOR]}>
              <Routes>
                <Route path="dashboard" element={<DonorDashboard />} />
                <Route path="profile" element={<DonorProfile />} />
                <Route path="donations" element={<DonationHistory />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Participant Routes */}
          <Route path="/participant/*" element={
            <ProtectedRoute allowedRoles={[UserRole.PARTICIPANT]}>
              <Routes>
                <Route path="dashboard" element={<ParticipantDashboard />} />
                <Route path="profile" element={<ParticipantProfile />} />
                <Route path="services" element={<ParticipantServices />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}