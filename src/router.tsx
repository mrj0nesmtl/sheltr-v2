import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/About';
import { HowItWorksPage } from './pages/HowItWorks';
import { SolutionsPage } from './pages/Solutions';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ScanDonatePage } from './pages/ScanDonatePage';
import { ImpactPage } from './pages/Impact';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';

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
          {
            path: 'signup',
            element: <SignUpPage />,
          },
          {
            path: 'scan-donate',
            element: <ScanDonatePage />,
          },
          {
            path: 'impact',
            element: <ImpactPage />,
          }
        ],
      },
    ],
  },
  {
    path: '/protected/*',
    element: <AppRoutes />
  }
]); 