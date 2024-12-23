import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/layouts/base/Layout';
import { DashboardLayout } from '@/layouts/specialized/dashboard';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Public pages
const Home = lazy(() => import('@/pages/HomePage'));
const About = lazy(() => import('@/pages/About'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const ScanDonate = lazy(() => import('@/pages/ScanDonatePage'));
const Impact = lazy(() => import('@/pages/Impact'));
const Login = lazy(() => import('@/pages/LoginPage'));
const SignUp = lazy(() => import('@/pages/SignUpPage'));

// Dashboard pages
const DonorDashboardView = lazy(() => import('@/features/roles/donor/components/Dashboard/DonorDashboard'));
const ParticipantDashboardView = lazy(() => import('@/features/roles/participant/components/Dashboard/ParticipantDashboard'));
const ShelterDashboardView = lazy(() => import('@/features/roles/shelter-admin/components/Dashboard/ShelterDashboard'));
const SuperAdminDashboardView = lazy(() => import('@/features/roles/super-admin/components/dashboard/SuperAdminDashboard'));

// Profile pages - Updated with correct paths
const DonorProfileView = lazy(() => import('@/features/roles/donor/components/profile/DonorProfile'));
const ParticipantProfileView = lazy(() => import('@/features/roles/participant/components/profile/ParticipantProfile'));
const ShelterProfileView = lazy(() => import('@/features/roles/shelter-admin/components/profile/Profile'));
const SuperAdminProfileView = lazy(() => import('@/features/roles/super-admin/components/profile/Profile'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/scan-donate" element={<ScanDonate />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected dashboard routes */}
        <Route element={<ErrorBoundary><DashboardLayout /></ErrorBoundary>}>
          {/* Super Admin Routes */}
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboardView />} />
          <Route path="/super-admin/profile" element={<SuperAdminProfileView />} />
          
          {/* Shelter Admin Routes */}
          <Route path="/shelter-admin/dashboard" element={<ShelterDashboardView />} />
          <Route path="/shelter-admin/profile" element={<ShelterProfileView />} />
          
          {/* Donor Routes */}
          <Route path="/donor/dashboard" element={<DonorDashboardView />} />
          <Route path="/donor/profile" element={<DonorProfileView />} />
          
          {/* Participant Routes */}
          <Route path="/participant/dashboard" element={<ParticipantDashboardView />} />
          <Route path="/participant/profile" element={<ParticipantProfileView />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
