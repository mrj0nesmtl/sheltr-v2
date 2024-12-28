import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Public pages - add type annotations
const Home = lazy(() => import('@/pages/HomePage').then(module => ({ default: module.default })));
const About = lazy(() => import('@/pages/About').then(module => ({ default: module.default })));
const HowItWorks = lazy(() => import('@/pages/HowItWorks').then(module => ({ default: module.default })));
const ScanDonate = lazy(() => import('@/pages/ScanDonatePage').then(module => ({ default: module.default })));
const Impact = lazy(() => import('@/pages/Impact').then(module => ({ default: module.default })));
const Login = lazy(() => import('@/pages/LoginPage').then(module => ({ default: module.default })));
const SignUp = lazy(() => import('@/pages/SignUpPage').then(module => ({ default: module.default })));

// Dashboard views - add type annotations
const DonorDashboardView = lazy(() => import('@/features/dashboard/roles/donor/DonorDashboard'));
const ParticipantDashboardView = lazy(() => import('@/features/dashboard/roles/participant/ParticipantDashboard'));
const ShelterDashboardView = lazy(() => 
  import('@/features/dashboard/roles/shelter-admin/ShelterDashboard')
    .then(module => {
      if (!module.default) {
        throw new Error('ShelterDashboard component not found');
      }
      return { default: module.default };
    })
);
const SuperAdminDashboardView = lazy(() => import('@/features/dashboard/roles/super-admin/SuperAdminDashboard'));

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  console.log('AppRoutes - Protected Route Check:', {
    path: window.location.pathname,
    isAuthenticated,
    hasUser: !!user,
    userRole: user?.role
  });

  const loginElement = isAuthenticated && user?.role ? (
    <Navigate to={`/${user.role}/dashboard`} replace />
  ) : (
    <ErrorBoundary>
      <Login />
    </ErrorBoundary>
  );

  return (
    <Suspense fallback={<div className="text-white">Loading routes...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/scan-donate" element={<ScanDonate />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/login" element={loginElement} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes with DashboardLayout */}
        <Route
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          {/* Dashboard routes based on user role */}
          <Route 
            path="/shelter-admin/dashboard" 
            element={
              user?.role === 'shelter_admin' ? (
                <ErrorBoundary>
                  <ShelterDashboardView />
                </ErrorBoundary>
              ) : (
                <Navigate to={`/${user?.role}/dashboard`} replace />
              )
            }
          />
          <Route path="/donor/dashboard" element={<DonorDashboardView />} />
          <Route path="/participant/dashboard" element={<ParticipantDashboardView />} />
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboardView />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
