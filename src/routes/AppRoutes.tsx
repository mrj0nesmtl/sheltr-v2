import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { AUTH_ROLES } from '@/auth/types/auth.types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Impact from '@/pages/Impact';
import ScanDonatePage from '@/pages/ScanDonatePage';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const About = lazy(() => import('@/pages/About'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignupPage = lazy(() => import('@/pages/SignUpPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const Solutions = lazy(() => import('@/pages/Solutions'));

// Lazy load dashboard pages
const DonorDashboard = lazy(() => import('@/features/dashboard/components/donor/DonorDashboard'));
const ParticipantDashboard = lazy(() => import('@/features/roles/participant/ParticipantDashboard'));
const ShelterDashboard = lazy(() => import('@/features/dashboard/components/shelter/ShelterDashboard'));
const SuperAdminDashboard = lazy(() => import('@/pages/SuperAdmin/SuperAdminDashboard'));

const AppRoutes = () => {
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
      <Route 
        path="/how-it-works" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <HowItWorks />
          </Suspense>
        } 
      />
      <Route 
        path="/solutions" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <Solutions />
          </Suspense>
        } 
      />
      <Route 
        path="/scan-donate" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <ScanDonatePage />
          </Suspense>
        } 
      />
      <Route path="/impact" element={<Impact />} />

      {/* Protected routes with role-based access */}
      
      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={[AUTH_ROLES.SUPER_ADMIN]}>
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
          <ProtectedRoute allowedRoles={[AUTH_ROLES.SHELTER_ADMIN]}>
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
          <ProtectedRoute allowedRoles={[AUTH_ROLES.DONOR]}>
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
          <ProtectedRoute allowedRoles={[AUTH_ROLES.PARTICIPANT]}>
            <Suspense fallback={<LoadingSpinner />}>
              <ParticipantDashboard />
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
};

export default AppRoutes;
