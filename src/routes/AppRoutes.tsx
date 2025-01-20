import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { UnifiedDashboard } from '@/layouts/dashboard/base/UnifiedDashboard';
import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { useAuthStore } from '@/auth/stores/authStore';
import { AUTH_ROLES } from '@/auth/types/auth.types';
import { RoleRouter } from '@/layouts/dashboard/roles/RoleRouter';
import { ShelterAdminDashboard } from '@/features/dashboard/roles/shelter-admin/ShelterAdminDashboard';
import { ShelterSetupGuard } from '@/auth/components/ShelterSetupGuard';
import { ShelterSetup } from '@/pages/shelter/ShelterSetup';
import { BaseErrorBoundary } from '@/components/ErrorBoundary/BaseErrorBoundary';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Impact from '@/pages/Impact/Impact';

// Lazy loaded components
const Wiki = lazy(() => import('../pages/Wiki'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const Solutions = lazy(() => import('@/pages/Solutions'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const ScanDonatePage = lazy(() => import('@/pages/ScanDonatePage'));
const About = lazy(() => import('@/pages/About'));
const RegistrationConfirmation = lazy(() => import('@/pages/RegistrationConfirmation'));
const EmailVerificationError = lazy(() => import('@/components/Auth/EmailVerificationError'));

// Wrap component with error boundary and suspense
const withErrorBoundary = (Component: React.ComponentType, variant?: string) => (
  <BaseErrorBoundary variant={variant}>
    <Suspense fallback={<LoadingSpinner size="md" />}>
      <Component />
    </Suspense>
  </BaseErrorBoundary>
);

const AppRoutes = () => {
  const { role } = useAuthStore();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={withErrorBoundary(HomePage)} />
      <Route path="/login" element={withErrorBoundary(LoginPage)} />
      <Route path="/signup" element={withErrorBoundary(SignUpPage)} />
      <Route path="/registration-confirmation" element={withErrorBoundary(RegistrationConfirmation)} />
      <Route path="/how-it-works" element={withErrorBoundary(HowItWorks)} />
      <Route path="/solutions" element={withErrorBoundary(Solutions)} />
      <Route path="/scan-donate" element={withErrorBoundary(ScanDonatePage)} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/about" element={withErrorBoundary(About)} />
      <Route path="/wiki" element={withErrorBoundary(Wiki)} />
      <Route path="/verification-error" element={withErrorBoundary(EmailVerificationError)} />
      
      {/* Protected dashboard routes */}
      <Route
        path="/super-admin/*"
        element={
          <BaseErrorBoundary variant="super-admin">
            <ProtectedRoute allowedRoles={[AUTH_ROLES.SUPER_ADMIN]}>
              <RoleRouter />
            </ProtectedRoute>
          </BaseErrorBoundary>
        }
      />

      <Route
        path="/shelter/:orgId/dashboard/*"
        element={
          <BaseErrorBoundary variant="shelter-admin">
            <ProtectedRoute allowedRoles={[AUTH_ROLES.SHELTER_ADMIN]}>
              <ShelterSetupGuard>
                <ShelterAdminDashboard />
              </ShelterSetupGuard>
            </ProtectedRoute>
          </BaseErrorBoundary>
        }
      />

      {/* Add Donor Routes */}
      <Route
        path="/donor/*"
        element={
          <BaseErrorBoundary variant="donor">
            <ProtectedRoute allowedRoles={[AUTH_ROLES.DONOR]}>
              <RoleRouter />
            </ProtectedRoute>
          </BaseErrorBoundary>
        }
      />

      {/* Add Participant Routes */}
      <Route
        path="/participant/*"
        element={
          <BaseErrorBoundary variant="participant">
            <ProtectedRoute allowedRoles={[AUTH_ROLES.PARTICIPANT]}>
              <RoleRouter />
            </ProtectedRoute>
          </BaseErrorBoundary>
        }
      />

      <Route
        path="/shelter/setup"
        element={
          <BaseErrorBoundary variant="shelter-admin">
            <ProtectedRoute allowedRoles={[AUTH_ROLES.SHELTER_ADMIN]}>
              <ShelterSetup />
            </ProtectedRoute>
          </BaseErrorBoundary>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={withErrorBoundary(NotFoundPage)} />
    </Routes>
  );
};

export default AppRoutes;
