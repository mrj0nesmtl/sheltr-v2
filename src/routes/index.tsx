import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AUTH_ROLES } from '@/types/auth';

// Use lazy loading for page components
const Impact = lazy(() => import('@/pages/Impact').then(mod => ({ 
  default: mod.default || mod.Impact 
})));

const Solutions = lazy(() => import('@/pages/Solutions'));
const Home = lazy(() => import('@/pages/Home'));
const DonorDashboard = lazy(() => import('@/pages/Donor/DonorDashboard'));
const QRScanner = lazy(() => import('@/components/QRScanner'));
const ImpactPage = lazy(() => import('@/pages/Impact'));

export const routes: RouteObject[] = [
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
  }
]; 