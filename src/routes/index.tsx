import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Use lazy loading for page components
const Impact = lazy(() => import('@/pages/Impact').then(mod => ({ 
  default: mod.default || mod.Impact 
})));

const Solutions = lazy(() => import('@/pages/Solutions'));
const Home = lazy(() => import('@/pages/Home'));

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
  }
]; 