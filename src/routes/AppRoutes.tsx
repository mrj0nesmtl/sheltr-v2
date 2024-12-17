import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const About = lazy(() => import('@/pages/About'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Lazy load dashboard pages
const ScanDonatePage = lazy(() => import('@/pages/ScanDonatePage'));
const DonorDashboard = lazy(() => import('@/features/dashboard/components/donor/DonorDashboard'));
const ParticipantDashboard = lazy(() => import('@/features/roles/participant/ParticipantDashboard'));
const ShelterDashboard = lazy(() => import('@/features/dashboard/components/shelter/ShelterDashboard'));
const SuperAdminDashboard = lazy(() => import('@/pages/SuperAdmin/SuperAdminDashboard'));

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        } 
      />
      <Route 
        path="/about" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        } 
      />
      <Route 
        path="/login" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <SignupPage />
          </Suspense>
        } 
      />

      {/* Protected routes with role-based access */}
      
      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
            <Suspense fallback={<LoadingSpinner />}>
              <SuperAdminDashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Shelter routes */}
      <Route
        path="/shelter/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SHELTER_ADMIN]}>
            <Suspense fallback={<LoadingSpinner />}>
              <ShelterDashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Donor routes */}
      <Route
        path="/donor/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.DONOR]}>
            <Suspense fallback={<LoadingSpinner />}>
              <DonorDashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Participant routes */}
      <Route
        path="/participant/*"
        element={
          <ProtectedRoute allowedRoles={[UserRole.PARTICIPANT]}>
            <Suspense fallback={<LoadingSpinner />}>
              <ParticipantDashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Scan+Donate route - accessible to donors only */}
      <Route
        path="/scan-donate"
        element={
          <ProtectedRoute allowedRoles={[UserRole.DONOR]}>
            <Suspense fallback={<LoadingSpinner />}>
              <ScanDonatePage />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route 
        path="*" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        } 
      />
    </Routes>
  );
}
