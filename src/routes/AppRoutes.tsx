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
const DonorDashboardView = lazy(() => 
  import('@/features/dashboard/roles/donor/DonorDashboard').then(module => ({ default: module.default }))
);
const ParticipantDashboardView = lazy(() => 
  import('@/features/dashboard/roles/participant/ParticipantDashboard').then(module => ({ default: module.default }))
);
const ShelterDashboardView = lazy(() => 
  import('@/features/dashboard/roles/shelter-admin/ShelterDashboard').then(module => ({ default: module.default }))
);
const SuperAdminDashboardView = lazy(() => 
  import('@/features/dashboard/roles/super-admin/SuperAdminDashboard').then(module => ({ default: module.default }))
);

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Suspense fallback={<div className="text-white">Loading routes...</div>}>
      <Routes>
        {/* Public routes - always accessible */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/scan-donate" element={<ScanDonate />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/login" element={
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        } />
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
            path="/super-admin/dashboard" 
            element={<SuperAdminDashboardView />} 
          />
          <Route 
            path="/shelter-admin/dashboard" 
            element={<ShelterDashboardView />} 
          />
          <Route 
            path="/donor/dashboard" 
            element={<DonorDashboardView />} 
          />
          <Route 
            path="/participant/dashboard" 
            element={<ParticipantDashboardView />} 
          />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
