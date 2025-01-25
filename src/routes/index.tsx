import { AUTH_ROLES } from '@/types/auth';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/Auth/AuthLayout';

// Use typeof AUTH_ROLES for the type
type CustomRouteObject = RouteObject & {
  requiredRole?: typeof AUTH_ROLES[keyof typeof AUTH_ROLES];
};

// Public Pages
const Home = lazy(() => import('@/pages/HomePage.tsx'));
const Impact = lazy(() => import('@/pages/Impact.tsx'));
const Solutions = lazy(() => import('@/pages/Solutions.tsx'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const QRScanner = lazy(() => import('@/pages/ScanDonatePage.tsx'));

// Role-Based Dashboards
const SuperAdminDashboard = lazy(() => import('@/features/dashboard/roles/super-admin/SuperAdminDashboard'));
const ShelterDashboard = lazy(() => import('@/features/dashboard/roles/shelter-admin'));
const DonorDashboard = lazy(() => import('@/features/dashboard/roles/donor/DonorDashboard'));
const ParticipantDashboard = lazy(() => import('@/features/dashboard/roles/participant/ParticipantDashboard'));

// Auth & Onboarding
const DonorSignUp = lazy(() => import('@/pages/Donor/DonorSignUp.tsx'));
const ShelterSetup = lazy(() => import('@/pages/Shelter/Setup.tsx'));

export const routes: CustomRouteObject[] = [
  // Public Routes
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/impact',
    element: <Impact />
  },
  {
    path: '/solutions',
    element: <Solutions />
  },
  {
    path: '/donor/signup',
    element: <DonorSignUp />
  },

  // Protected Dashboard Routes
  {
    path: '/dashboard/super-admin',
    element: <SuperAdminDashboard />,
    requiredRole: AUTH_ROLES.SUPER_ADMIN
  },
  {
    path: '/dashboard/shelter/:orgId/*',
    element: <ShelterDashboard />,
    requiredRole: AUTH_ROLES.SHELTER_ADMIN
  },
  {
    path: '/dashboard/donor/:userId/*',
    element: <DonorDashboard />,
    requiredRole: AUTH_ROLES.DONOR
  },
  {
    path: '/dashboard/participant/:userId/*',
    element: <ParticipantDashboard />,
    requiredRole: AUTH_ROLES.PARTICIPANT
  },

  // Special Routes
  {
    path: '/shelter/setup',
    element: <ShelterSetup />,
    requiredRole: AUTH_ROLES.SHELTER_ADMIN
  },
  {
    path: '/qr-scanner',
    element: <QRScanner />,
    requiredRole: AUTH_ROLES.DONOR
  }
]; 