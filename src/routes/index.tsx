import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { DonorDashboard } from '@/pages/DonorDashboard';
import { ParticipantDashboard } from '@/pages/ParticipantDashboard';
import { ImpactPage } from '@/pages/ImpactPage';
import { ShelterDashboard } from '@/components/Admin/ShelterDashboard';
import { SuperAdminDashboard } from '@/components/Admin/SuperAdminDashboard';
import { DocumentHub } from '@/components/Docs/DocumentHub';
import { DocumentViewer } from '@/components/Docs/DocumentViewer';
import { AboutPage } from '@/components/About/AboutPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/impact" element={<ImpactPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Super Admin Routes */}
      <Route
        path="/super-admin/*"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <Routes>
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* Shelter Admin Routes */}
      <Route
        path="/shelter/*"
        element={
          <ProtectedRoute allowedRoles={['shelter_admin']}>
            <Routes>
              <Route path="dashboard" element={<ShelterDashboard />} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* Other dashboard routes */}
      <Route
        path="/donor/dashboard"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <DonorDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/participant/dashboard"
        element={
          <ProtectedRoute allowedRoles={['participant']}>
            <ParticipantDashboard />
          </ProtectedRoute>
        }
      />

      {/* Documentation Routes - Make sure these come before the catch-all */}
      <Route path="/docs" element={<DocumentHub />} />
      <Route path="/docs/:docId" element={<DocumentViewer />} />

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 