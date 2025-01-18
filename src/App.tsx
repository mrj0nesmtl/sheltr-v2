import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAuthStore } from '@/auth/stores/authStore';
import { Layout } from '@/layouts/base/Layout';
import { MetaTags } from '@/components/SEO/MetaTags';
import { ScrollToTop } from '@/components/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { MobileNav } from '@/components/Navigation/MobileNav';
import { Navigation } from '@/components/Navigation/Navigation';
import { DashboardNavigation } from '@/layouts/dashboard/navigation/DashboardNavigation';

// Create AppContent component to use location
const AppContent = memo(() => {
  const location = useLocation();
  const { refreshSession, checkSession, isLoading, user } = useAuthStore();
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const mountedRef = useRef(false);
  const prevPathRef = useRef(location.pathname);

  // Memoized logging function
  const logNavigationState = useCallback(() => {
    if (!mountedRef.current || prevPathRef.current === location.pathname) return;
    
    prevPathRef.current = location.pathname;
    console.debug('Navigation state:', {
      pathname: location.pathname,
      auth: { isLoading, user, hasInitialized },
      components: {
        Navigation: true,
        MobileNav: isOpen,
        DashboardNav: location.pathname.includes('/shelter/')
      }
    });
  }, [location.pathname, isLoading, user, hasInitialized, isOpen]);

  // Initialize auth state and session checking
  useEffect(() => {
    if (mountedRef.current || hasInitialized) return;
    
    const initializeAuth = async () => {
      console.debug('Starting auth initialization...');
      try {
        await refreshSession();
        console.debug('Auth refresh completed');
        setHasInitialized(true);
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setInitializationError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    mountedRef.current = true;
    initializeAuth();

    // Set up periodic session checks
    const sessionInterval = setInterval(() => {
      if (hasInitialized) {
        checkSession().catch(error => {
          console.error('Session check failed:', error);
        });
      }
    }, 4 * 60 * 1000);

    return () => {
      mountedRef.current = false;
      clearInterval(sessionInterval);
    };
  }, [refreshSession, checkSession, hasInitialized]);

  // Log navigation state changes
  useEffect(() => {
    logNavigationState();
  }, [logNavigationState]);

  if (isLoading && !hasInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="text-gray-100 text-xl mb-4">Initializing SHELTR...</div>
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        {initializationError && (
          <div className="mt-4 text-red-400 text-sm">
            Error: {initializationError}
          </div>
        )}
        <div className="mt-4 text-gray-400 text-sm">
          Attempting to restore session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <ScrollToTop />
      <MetaTags />
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1F2937',
            color: '#fff',
          },
        }}
      />
      <nav data-testid="main-navigation">
        <Navigation />
      </nav>
      <div data-testid="mobile-navigation">
        <MobileNav 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      </div>
      {location.pathname.includes('/shelter/') && (
        <div data-testid="dashboard-navigation">
          <DashboardNavigation role={AUTH_ROLES.SHELTER_ADMIN} />
        </div>
      )}
    </div>
  );
});

AppContent.displayName = 'AppContent';

// Main App component
export const App = memo(() => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
});

App.displayName = 'App';

export default App;