import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { UserRole } from '@/lib/types/database';
import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';

// Public Pages
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/About';
import { SolutionsPage } from '@/pages/Solutions';
import { HowItWorksPage } from '@/pages/HowItWorks';
import { ImpactPage } from '@/pages/ImpactPage';
import { LoginPage } from '@/pages/LoginPage';

// Auth Pages
import { SignUpPage } from '@/pages/SignUpPage';
import { DonorSignUp } from '@/pages/DonorSignUp';
import { ShelterSignUp } from '@/pages/ShelterSignUp';

// Dashboard Pages
import { ShelterDashboard } from '@/pages/ShelterAdmin/Dashboard';
import { ShelterAnalytics } from '@/pages/ShelterAdmin/ShelterAnalytics';
import { ShelterSettings } from '@/pages/ShelterAdmin/Settings';
import { ParticipantDashboard } from '@/pages/Participant/Dashboard';
import { ParticipantAnalytics } from '@/pages/Participant/Analytics';
import { ParticipantProfile } from '@/pages/Participant/Profile';
import { ParticipantSettings } from '@/pages/Participant/Settings';

// Add a wrapper for debugging
const DebugRoute = ({ children }: { children: React.ReactNode }) => {
  console.log('Current Route:', {
    pathname: window.location.pathname,
    auth: useAuthStore.getState(),
    timestamp: new Date().toISOString()
  });
  return <>{children}</>;
};

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/solutions',
    element: <SolutionsPage />
  },
  {
    path: '/how-it-works',
    element: <HowItWorksPage />
  },
  {
    path: '/impact',
    element: <ImpactPage />
  },

  // Auth Routes
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/signup/donor',
    element: <DonorSignUp />
  },
  {
    path: '/signup/shelter',
    element: <ShelterSignUp />
  },

  // Protected Dashboard Routes
  {
    path: '/shelter-admin',
    element: (
      <DebugRoute>
        <ProtectedRoute allowedRoles={[UserRole.shelter_admin]}>
          <DashboardLayout title="Shelter Admin Dashboard">
            <Outlet />
          </DashboardLayout>
        </ProtectedRoute>
      </DebugRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <DebugRoute>
            <ShelterDashboard />
          </DebugRoute>
        )
      },
      {
        path: 'analytics',
        element: <ShelterAnalytics />
      },
      {
        path: 'settings',
        element: <ShelterSettings />
      }
    ]
  },
  {
    path: '/donor/*',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.donor]}>
        <DonorDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DonorDashboard />
      },
      {
        path: 'profile',
        element: <DonorProfile />
      },
      {
        path: 'settings',
        element: <DonorSettings />
      }
    ]
  },
  {
    path: '/SuperAdmin/*',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.super_admin]}>
        <SuperAdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'Dashboard',
        element: <SuperAdminDashboard />
      },
      {
        path: 'Analytics',
        element: <GlobalAnalytics />
      },
      {
        path: 'Settings',
        element: <SystemSettings />
      }
    ]
  },
  {
    path: '*',
    element: (
      <div className="p-8 text-white">
        <h1>404 - Not Found</h1>
        <pre className="mt-4 p-4 bg-gray-800 rounded">
          {JSON.stringify({
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            auth: useAuthStore.getState(),
          }, null, 2)}
        </pre>
      </div>
    )
  }
]); 

const resolveRoute = (path: string) => {
  console.log('Resolving route:', path);
  const routes = router.routes;
  let match = null;

  const findMatch = (routes: any[], path: string): any => {
    for (const route of routes) {
      if (route.path === path) {
        match = route;
        return;
      }
      if (route.children) {
        findMatch(route.children, path);
      }
    }
  };

  findMatch(routes, path);
  console.log('Route match result:', { path, match });
  return match;
};

// Add to your router configuration
window.__DEBUG_resolveRoute = resolveRoute; 