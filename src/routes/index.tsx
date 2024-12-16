import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { UserRole } from '@/auth/types/auth.types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Public Pages - Lazy loaded
const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const ImpactPage = lazy(() => import('@/pages/ImpactPage'));
const About = lazy(() => import('@/pages/About'));

// Super Admin Pages - Lazy loaded
const SuperAdminPages = {
  Dashboard: lazy(() => import('@/pages/SuperAdmin/SuperAdminDashboard')),
  Analytics: lazy(() => import('@/pages/SuperAdmin/Analytics')),
  ShelterManagement: lazy(() => import('@/pages/SuperAdmin/ShelterManagement')),
  ParticipantManagement: lazy(() => import('@/pages/SuperAdmin/ParticipantManagement')),
  DonorManagement: lazy(() => import('@/pages/SuperAdmin/DonorManagement')),
  SystemSettings: lazy(() => import('@/pages/SuperAdmin/SystemSettings'))
};

// Shelter Admin Pages - Lazy loaded
const ShelterAdminPages = {
  Dashboard: lazy(() => import('@/pages/ShelterAdmin/ShelterDashboard')),
  Analytics: lazy(() => import('@/pages/ShelterAdmin/ShelterAnalytics')),
  ParticipantManagement: lazy(() => import('@/pages/ShelterAdmin/ParticipantManagement'))
};

// Participant Pages - Lazy loaded
const ParticipantPages = {
  Dashboard: lazy(() => import('@/pages/Participant/ParticipantDashboard')),
  Profile: lazy(() => import('@/pages/Participant/ParticipantProfile')),
  Services: lazy(() => import('@/pages/Participant/Services')),
  History: lazy(() => import('@/pages/Participant/History')),
  Resources: lazy(() => import('@/pages/Participant/Resources')),
  Goals: lazy(() => import('@/pages/Participant/Goals')),
  Appointments: lazy(() => import('@/pages/Participant/Appointments'))
};

// Donor Pages - Lazy loaded
const DonorPages = {
  Dashboard: lazy(() => import('@/pages/Donor/DonorDashboard')),
  Leaderboard: lazy(() => import('@/pages/Donor/DonorLeaderboard')),
  Achievements: lazy(() => import('@/pages/Donor/DonorAchievements'))
};

// Shared Components
const QRScanner = lazy(() => import('@/components/QRScanner/QRScanner'));

// Wrap component with Suspense and ErrorBoundary
const withSuspense = (Component: React.ComponentType) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={withSuspense(HomePage)} />
      <Route path="/login" element={withSuspense(LoginPage)} />
      <Route path="/signup" element={withSuspense(SignUpPage)} />
      <Route path="/impact" element={withSuspense(ImpactPage)} />
      <Route path="/about" element={withSuspense(About)} />

      {/* Super Admin Routes */}
      <Route
        path="/super_admin/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.super_admin]}>
            <Routes>
              <Route path="dashboard" element={withSuspense(SuperAdminPages.Dashboard)} />
              <Route path="analytics" element={withSuspense(SuperAdminPages.Analytics)} />
              <Route path="shelters" element={withSuspense(SuperAdminPages.ShelterManagement)} />
              <Route path="participants" element={withSuspense(SuperAdminPages.ParticipantManagement)} />
              <Route path="donors" element={withSuspense(SuperAdminPages.DonorManagement)} />
              <Route path="settings" element={withSuspense(SuperAdminPages.SystemSettings)} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* Shelter Admin Routes */}
      <Route
        path="/shelter_admin/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.shelter_admin]}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={withSuspense(ShelterAdminPages.Dashboard)} />
                <Route path="analytics" element={withSuspense(ShelterAdminPages.Analytics)} />
                <Route path="participants" element={withSuspense(ShelterAdminPages.ParticipantManagement)} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Participant Routes */}
      <Route
        path="/participant/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.participant]}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={withSuspense(ParticipantPages.Dashboard)} />
                <Route path="profile" element={withSuspense(ParticipantPages.Profile)} />
                <Route path="services" element={withSuspense(ParticipantPages.Services)} />
                <Route path="history" element={withSuspense(ParticipantPages.History)} />
                <Route path="resources" element={withSuspense(ParticipantPages.Resources)} />
                <Route path="goals" element={withSuspense(ParticipantPages.Goals)} />
                <Route path="appointments" element={withSuspense(ParticipantPages.Appointments)} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Donor Routes */}
      <Route
        path="/donor/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.donor]}>
            <Routes>
              <Route path="dashboard" element={withSuspense(DonorPages.Dashboard)} />
              <Route path="leaderboard" element={withSuspense(DonorPages.Leaderboard)} />
              <Route path="achievements" element={withSuspense(DonorPages.Achievements)} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* QR Scanner Route */}
      <Route path="/scan-donate" element={withSuspense(QRScanner)} />

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 