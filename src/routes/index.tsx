import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { UserRole } from '@/auth/types/auth.types';

// Public Pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { ImpactPage } from '@/pages/ImpactPage';
import { About } from '@/pages/About';

// Import Super Admin components
import { 
  ShelterManagement,
  ParticipantManagement,
  DonorManagement,
  Analytics,
  SystemSettings,
  SuperAdminDashboard,
  GlobalAnalytics,
  ShelterDetailAnalytics,
  DonorDetailAnalytics,
  ParticipantDetailAnalytics,
  ShelterAnalytics,
  ShelterParticipantAnalytics,
  ShelterDonorAnalytics,
  ParticipantAnalytics,
  DonorAnalytics,
  DonorLeaderboard,
  DonorAchievements
} from '@/pages/SuperAdmin';

import { QRScanner } from '@/components/QRScanner/QRScanner';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/impact" element={<ImpactPage />} />
      <Route path="/about" element={<About />} />

      {/* Super Admin Routes */}
      <Route
        path="/super_admin/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.super_admin]}>
            <Routes>
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route path="analytics">
                <Route index element={<GlobalAnalytics />} />
                <Route path="shelters/:shelterId" element={<ShelterDetailAnalytics />} />
                <Route path="donors/:donorId" element={<DonorDetailAnalytics />} />
                <Route path="participants/:participantId" element={<ParticipantDetailAnalytics />} />
              </Route>
              <Route path="shelters" element={<ShelterManagement />} />
              <Route path="participants" element={<ParticipantManagement />} />
              <Route path="donors" element={<DonorManagement />} />
              <Route path="settings" element={<SystemSettings />} />
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
                <Route path="dashboard" element={<ShelterDashboard />} />
                <Route path="participants" element={<ParticipantManagement />} />
                <Route path="analytics" element={<ShelterAnalytics />} />
                <Route path="map" element={<ShelterMap />} />
                <Route path="reports" element={<Reports />} />
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
                <Route path="dashboard" element={<ParticipantDashboard />} />
                <Route path="profile" element={<ParticipantProfile />} />
                <Route path="services" element={<Services />} />
                <Route path="history" element={<History />} />
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
              <Route path="dashboard" element={<DonorDashboard />} />
              <Route path="donations" element={<MyDonations />} />
              <Route path="leaderboard" element={<DonorLeaderboard />} />
              <Route path="achievements" element={<DonorAchievements />} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* QR Scanner Route */}
      <Route path="/scan-donate" element={<QRScanner />} />

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 