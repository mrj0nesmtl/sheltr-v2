import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
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
import SuperAdminDashboard from '@/features/dashboard/roles/super-admin';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShelterSelector } from '@/features/dashboard/roles/shelter-admin/components/ShelterSelector';

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

// Update helper to handle multiple organizations
const getPrimaryOrganization = async (userId: string) => {
  const { data, error } = await supabase
    .from('organization_staff')
    .select(`
      organization_id,
      organizations:organization_id (
        id,
        name,
        created_at
      )
    `)
    .eq('user_id', userId)
    .eq('role', 'shelter_admin')
    .eq('status', 'active')
    .order('created_at', { ascending: false }); // Get most recent first

  if (error) throw error;
  
  // If no data, return null
  if (!data || data.length === 0) return null;
  
  // If multiple orgs, redirect to selector
  if (data.length > 1) {
    return 'selector';
  }
  
  // Return the single org id
  return data[0].organization_id;
};

export default function AppRoutes() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Only log when authentication state or role changes
  useEffect(() => {
    console.debug('Auth State Updated:', {
      isAuthenticated,
      userRole: user?.role,
      currentPath: window.location.pathname
    });
  }, [isAuthenticated, user?.role]);

  // Update the routing effect
  useEffect(() => {
    const routeShelterAdmin = async () => {
      if (isAuthenticated && user?.role === AUTH_ROLES.SHELTER_ADMIN) {
        try {
          // Only run this if we're on the root dashboard path
          if (location.pathname === '/dashboard') {
            const result = await getPrimaryOrganization(user.id);
            
            if (!result) {
              console.error('No organizations found');
              navigate('/login');
              return;
            }

            if (result === 'selector') {
              navigate('/dashboard/shelter');
              return;
            }

            navigate(`/shelter/${result}/dashboard`);
          }
        } catch (error) {
          console.error('Error routing shelter admin:', error);
          navigate('/login');
        }
      }
    };

    routeShelterAdmin();
  }, [isAuthenticated, user?.role]);

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
        path="/shelter/:shelterId/dashboard"
        element={
          <BaseErrorBoundary variant="shelter-admin">
            <ProtectedRoute 
              allowedRoles={[AUTH_ROLES.SHELTER_ADMIN]}
              fallback={<LoadingSpinner size="lg" />}
            >
              <Suspense fallback={<LoadingSpinner size="lg" />}>
                <ShelterAdminDashboard />
              </Suspense>
            </ProtectedRoute>
          </BaseErrorBoundary>
        }
      />

      {/* Add shelter selection route */}
      <Route
        path="/dashboard/shelter"
        element={
          <ProtectedRoute allowedRoles={[AUTH_ROLES.SHELTER_ADMIN]}>
            <ShelterSelector />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/shelter/:shelterId"
        element={
          <ProtectedRoute allowedRoles={[AUTH_ROLES.SHELTER_ADMIN]}>
            <ShelterAdminDashboard />
          </ProtectedRoute>
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

      {/* Protected Routes */}
      <Route
        path="/dashboard/super-admin/*"
        element={
          <ProtectedRoute allowedRoles={[AUTH_ROLES.SUPER_ADMIN]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Add catch-all route for debugging */}
      <Route path="*" element={
        <div className="text-white p-4">
          404 - Current auth state: {JSON.stringify({ isAuthenticated, role: user?.role })}
        </div>
      } />
    </Routes>
  );
}
