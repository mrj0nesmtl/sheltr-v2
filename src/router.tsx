import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/About';
import { HowItWorksPage } from './pages/HowItWorks';
import { SolutionsPage } from './pages/Solutions';
import { LoginPage } from '@/pages/Login';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'about',
            element: <AboutPage />,
          },
          {
            path: 'how-it-works',
            element: <HowItWorksPage />,
          },
          {
            path: 'solutions',
            element: <SolutionsPage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]); 