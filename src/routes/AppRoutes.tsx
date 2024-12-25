import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Public pages
const Home = lazy(() => import('@/pages/HomePage'));
const About = lazy(() => import('@/pages/About'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const ScanDonate = lazy(() => import('@/pages/ScanDonatePage'));
const Impact = lazy(() => import('@/pages/Impact'));
const Login = lazy(() => import('@/pages/LoginPage'));
const SignUp = lazy(() => import('@/pages/SignUpPage'));

// Dashboard views
const DonorDashboardView = lazy(() => 
  import('@/features/dashboard/roles/donor/DonorDashboard')
);
const ParticipantDashboardView = lazy(() => 
  import('@/features/dashboard/roles/participant/ParticipantDashboard')
);
const ShelterDashboardView = lazy(() => 
  import('@/features/dashboard/roles/shelter-admin/ShelterDashboard')
);
const SuperAdminDashboardView = lazy(() => 
  import('@/features/dashboard/roles/super-admin/SuperAdminDashboard')
);

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Suspense fallback={<div className="text-white">Loading routes...</div>}>
      <Routes>
        {/* Public routes - always accessible */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/scan-donate" element={<ScanDonate />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes with DashboardLayout */}
        <Route 
          element={
            isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
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
