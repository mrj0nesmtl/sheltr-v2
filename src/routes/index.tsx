import { AUTH_ROLES } from '@/types/auth';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Use typeof AUTH_ROLES for the type
type CustomRouteObject = RouteObject & {
  requiredRole?: typeof AUTH_ROLES[keyof typeof AUTH_ROLES];
};

// Updated import paths to match actual file structure
const Impact = lazy(() => import('@/pages/Impact.tsx'));
const Solutions = lazy(() => import('@/pages/Solutions.tsx'));
const Home = lazy(() => import('@/pages/HomePage.tsx'));
const DonorDashboard = lazy(() => import('@/pages/Donor/DonorDashboard.tsx'));
const QRScanner = lazy(() => import('@/pages/ScanDonatePage.tsx'));
const ImpactPage = lazy(() => import('@/pages/Impact.tsx'));
const DonorSignUp = lazy(() => import('@/pages/Donor/DonorSignUp.tsx'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));

export const routes: CustomRouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Home />
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
    path: '/donor-dashboard',
    element: <DonorDashboard />,
    requiredRole: AUTH_ROLES.SUPER_ADMIN
  },
  {
    path: '/qr-scanner',
    element: <QRScanner />,
    requiredRole: AUTH_ROLES.SUPER_ADMIN
  },
  {
    path: '/impact-page',
    element: <ImpactPage />,
    requiredRole: AUTH_ROLES.SUPER_ADMIN
  },
  {
    path: '/donor/signup',
    element: <DonorSignUp />
  },
]; 