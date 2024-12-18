import { lazy } from 'react';

// Lazy load pages
export const Impact = lazy(() => import('./Impact'));
export const Home = lazy(() => import('./Home'));
export const About = lazy(() => import('./About'));
export const Solutions = lazy(() => import('./Solutions'));

// Export other pages
export * from './auth';
export * from './donor';
export * from './participant';
export * from './shelter';
