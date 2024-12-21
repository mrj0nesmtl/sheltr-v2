import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/layouts/base/Layout';
import { DashboardLayout } from '@/layouts/specialized/dashboard';

// Lazy load pages with correct paths
const Home = lazy(() => import('@/pages/HomePage'));
const About = lazy(() => import('@/pages/About'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const ScanDonate = lazy(() => import('@/pages/ScanDonatePage'));
const Impact = lazy(() => import('@/pages/Impact'));
const Login = lazy(() => import('@/pages/LoginPage'));
const SignUp = lazy(() => import('@/pages/SignUpPage'));

// Dashboard pages - Correct paths in layouts directory
const DonorDashboard = lazy(() => import('@/layouts/specialized/dashboard/components/donor/DonorDashboard'));
const ParticipantDashboard = lazy(() => import('@/layouts/specialized/dashboard/components/participant/ParticipantDashboard'));
const ShelterDashboard = lazy(() => import('@/layouts/specialized/dashboard/components/shelter/ShelterDashboard'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes with main layout */}
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
        <Route element={<DashboardLayout />}>
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
          <Route path="/shelter/dashboard" element={<ShelterDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
