import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { AuthLayout } from './components/Auth/AuthLayout';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Hero } from './components/Hero';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { AdminLogin } from './components/Admin/AdminLogin';
import { ContactForm } from './components/Contact/ContactForm';
import { BlogList } from '@/components/Blog/BlogList';
import { BlogPost } from '@/components/Blog/BlogPost';
import { UserProfile as UserProfileComponent } from './components/Profile/UserProfile';
import { ParticipantDashboard } from './components/Dashboard/ParticipantDashboard';
import { DonorDashboard } from './components/Dashboard/DonorDashboard';
import { useAuthStore, getDashboardPath } from './stores/authStore';
import type { UserProfile } from './lib/types/auth';
import { useTranslation } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MetaTags } from '@/components/SEO/MetaTags';

// Lazy loaded components
const HowItWorks = lazy(() => import('./components/HowItWorks').then(module => ({ default: module.HowItWorks })));
const Solutions = lazy(() => import('./components/Solutions').then(module => ({ default: module.Solutions })));
const QRScanner = lazy(() => import('./components/QRScanner/QRScanner').then(module => ({ default: module.QRScanner })));
const DonationForm = lazy(() => import('./components/DonationForm/DonationForm').then(module => ({ default: module.DonationForm })));
const ThankYou = lazy(() => import('./components/ThankYou/ThankYou').then(module => ({ default: module.ThankYou })));
const LoginPage = lazy(() => import('./components/Auth/LoginPage').then(module => ({ default: module.LoginPage })));
const SignUpSelector = lazy(() => import('./components/Auth/SignUpSelector').then(module => ({ default: module.SignUpSelector })));
const DonorSignUpForm = lazy(() => import('./components/Auth/DonorSignUpForm').then(module => ({ default: module.DonorSignUpForm })));
const ShelterSignUpForm = lazy(() => import('./components/Auth/ShelterSignUpForm').then(module => ({ default: module.ShelterSignUpForm })));
const ShelterDashboard = lazy(() => 
  import("./components/Admin/ShelterDashboard").then(module => ({ 
    default: module.ShelterDashboard 
  }))
);
const SuperAdminDashboard = lazy(() => 
  import("./components/Admin/SuperAdminDashboard").then(module => ({ 
    default: module.SuperAdminDashboard 
  }))
);
const WhitepaperPage = lazy(() => import('./routes/blockchain/WhitepaperPage').then(module => ({ default: module.WhitepaperPage })));
const AboutPage = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const ImpactPage = lazy(() => 
  import('@/pages/ImpactPage')
    .then(module => ({ 
      default: module.ImpactPage 
    }))
);
const PrivacyPolicy = lazy(() => import('./components/Legal/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./components/Legal/TermsOfService').then(module => ({ default: module.TermsOfService })));

interface ProtectedRouteProps {
  children: React.ReactNode | ((props: { user: UserProfile }) => React.ReactNode);
  allowedRoles?: string[];
}

export function App() {
  const { checkUser, initialized } = useAuthStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await checkUser();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    if (!initialized) {
      initializeApp();
    }
  }, [checkUser, initialized]);

  if (!initialized) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider>
      <HelmetProvider>
        <ErrorBoundary>
          <MetaTags />
          <Router>
            <Routes>
              {/* Auth Layout Routes */}
              <Route element={<Layout />}>
                <Route path="/signup" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <SignUpSelector />
                  </Suspense>
                } />
                <Route path="/signup/donor" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <DonorSignUpForm />
                  </Suspense>
                } />
                <Route path="/signup/shelter" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ShelterSignUpForm />
                  </Suspense>
                } />
                <Route path="/login" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <LoginPage />
                  </Suspense>
                } />
                <Route path="/admin/login" element={<AdminLogin />} />
              </Route>

              {/* Main Layout Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Hero />} />
                <Route path="how-it-works" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <HowItWorks />
                  </Suspense>
                } />
                <Route path="solutions" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Solutions />
                  </Suspense>
                } />
                <Route path="contact" element={<ContactForm />} />
                <Route path="scan" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <QRScanner />
                  </Suspense>
                } />
                <Route path="impact" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ImpactPage />
                  </Suspense>
                } />
                <Route path="donate/:id" element={<DonationForm />} />
                <Route path="thank-you" element={<ThankYou />} />
                <Route path="blog" element={<BlogList />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="privacy" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <PrivacyPolicy />
                  </Suspense>
                } />
                <Route path="terms" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <TermsOfService />
                  </Suspense>
                } />
                <Route path="about" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AboutPage />
                  </Suspense>
                } />
                <Route path="/whitepaper" element={<Navigate to="/blockchain/whitepaper" replace />} />
                <Route path="/blockchain/whitepaper" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <WhitepaperPage />
                  </Suspense>
                } />
                <Route path="/docs/whitepaper" element={<Navigate to="/blockchain/whitepaper" replace />} />
                
                {/* Protected Routes */}
                <Route path="profile/:id" element={
                  <ProtectedRoute>
                    <UserProfileComponent />
                  </ProtectedRoute>
                } />
                
                <Route path="/donor/dashboard" element={
                  <ProtectedRoute allowedRoles={['donor']}>
                    <DonorDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/participant/dashboard" element={
                  <ProtectedRoute allowedRoles={['participant']}>
                    <ParticipantDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/dashboard" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute allowedRoles={['admin', 'shelter_admin']}>
                      <ShelterDashboard />
                    </ProtectedRoute>
                  </Suspense>
                } />
                
                <Route path="/super-admin/dashboard" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute allowedRoles={['super_admin']}>
                      <SuperAdminDashboard />
                    </ProtectedRoute>
                  </Suspense>
                } />

                {/* Default dashboard redirect */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    {({ user }) => {
                      const path = getDashboardPath(user.role);
                      return <Navigate to={path} replace />;
                    }}
                  </ProtectedRoute>
                } />

                {/* Add this route to handle logout redirects */}
                <Route path="/logout" element={<Navigate to="/login" replace />} />
              </Route>
            </Routes>
          </Router>
        </ErrorBoundary>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;