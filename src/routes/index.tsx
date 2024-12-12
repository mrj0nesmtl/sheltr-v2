import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { ImpactPage } from '@/pages/ImpactPage';
import { About } from '@/pages/About';
// Import new Super Admin components
import { ShelterManagement } from '@/pages/SuperAdmin/ShelterManagement/index.tsx';
import { ParticipantManagement } from '@/pages/SuperAdmin/ParticipantManagement/index.tsx';
import { DonorManagement } from '@/pages/SuperAdmin/DonorManagement';
import { Analytics } from '@/pages/SuperAdmin/Analytics';
import { SystemSettings } from '@/pages/SuperAdmin/SystemSettings';
import { SuperAdminDashboard } from '@/pages/SuperAdmin/SuperAdminDashboard';
import { GlobalAnalytics } from '@/pages/SuperAdmin/GlobalAnalytics';
import { ShelterDetailAnalytics } from '@/pages/SuperAdmin/ShelterDetailAnalytics';
import { DonorDetailAnalytics } from '@/pages/SuperAdmin/DonorDetailAnalytics';
import { ParticipantDetailAnalytics } from '@/pages/SuperAdmin/ParticipantDetailAnalytics';
import { ShelterAnalytics } from '@/pages/SuperAdmin/ShelterAnalytics';
import { ShelterParticipantAnalytics } from '@/pages/SuperAdmin/ShelterParticipantAnalytics';
import { ShelterDonorAnalytics } from '@/pages/SuperAdmin/ShelterDonorAnalytics';
import { ParticipantAnalytics } from '@/pages/SuperAdmin/ParticipantAnalytics';
import { DonorAnalytics } from '@/pages/SuperAdmin/DonorAnalytics';
import { DonorLeaderboard } from '@/pages/SuperAdmin/DonorLeaderboard';
import { DonorAchievements } from '@/pages/SuperAdmin/DonorAchievements';
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
        path="/super-admin/*"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
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
        path="/shelter-admin/*"
        element={
          <ProtectedRoute allowedRoles={['shelter_admin']}>
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
          <ProtectedRoute allowedRoles={['participant']}>
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
          <ProtectedRoute allowedRoles={['donor']}>
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

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* QR Scanner Route */}
      <Route path="/scan-donate" element={<QRScanner />} />
    </Routes>
  );
} 