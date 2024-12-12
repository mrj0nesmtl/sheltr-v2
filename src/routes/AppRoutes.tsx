import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Shelter Admin Routes */}
      <Route
        path="/shelter-admin/*"
        element={
          <ProtectedRoute allowedRoles={['shelter_admin']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<ShelterAdminDashboard />} />
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

      {/* Donor Routes */}
      <Route
        path="/donor/*"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<DonorDashboard />} />
                <Route path="donations" element={<MyDonations />} />
                <Route path="leaderboard" element={<DonorLeaderboard />} />
                <Route path="achievements" element={<DonorAchievements />} />
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

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}