import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAuthStore } from '@/auth/stores/authStore';
import { Layout } from '@/layouts/base/Layout';
import { MetaTags } from '@/components/SEO/MetaTags';
import { ScrollToTop } from '@/components/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { MobileNav } from '@/components/Navigation/MobileNav';
import { Navigation } from '@/components/Navigation/Navigation';
import { DashboardNav } from '@/features/dashboard/shared/navigation/DashboardNav';

export function App() {
  // Destructure only what we need initially
  const { refreshSession, checkSession, isLoading, user } = useAuthStore();
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Debug logging
  console.log('Auth State:', { isLoading, user, initializationError, hasInitialized });

  // Initialize auth state and session checking
  useEffect(() => {
    const initializeAuth = async () => {
      if (hasInitialized) return; // Prevent multiple initializations
      
      console.log('Starting auth initialization...');
      try {
        await refreshSession();
        console.log('Auth refresh completed');
        setHasInitialized(true);
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setInitializationError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    initializeAuth();

    // Set up periodic session checks
    const sessionInterval = setInterval(() => {
      if (hasInitialized) {
        checkSession().catch(error => {
          console.error('Session check failed:', error);
        });
      }
    }, 4 * 60 * 1000);

    return () => clearInterval(sessionInterval);
  }, [refreshSession, checkSession, hasInitialized]);

  // Show loading state only during initial load
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

  // Add debug logging
  console.log('Current pathname:', window.location.pathname);
  console.log('Rendering navigation components...');

  // Check which components are being rendered
  console.log('Mounted Navigation Components:', {
    Navigation: document.querySelector('[data-testid="main-navigation"]'),
    MobileNav: document.querySelector('[data-testid="mobile-navigation"]'),
    UserNav: document.querySelector('[data-testid="user-navigation"]'),
    DashboardNav: document.querySelector('[data-testid="dashboard-navigation"]')
  });

  return (
    <HelmetProvider>
      <BrowserRouter>
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
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;