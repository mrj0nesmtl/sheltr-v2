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
import { BlogList } from './components/Blog/BlogList';
import { BlogPost } from './components/Blog/BlogPost';
import { BlogEditor } from './components/Blog/BlogEditor';
import { UserProfile as UserProfileComponent } from './components/Profile/UserProfile';
import { ParticipantDashboard } from './components/Dashboard/ParticipantDashboard';
import { DonorDashboard } from './components/Dashboard/DonorDashboard';
import { PublicDashboard } from './components/Analytics/PublicDashboard';
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsOfService } from './components/Legal/TermsOfService';
import { AboutPage } from './components/About/AboutPage';
import { useAuthStore, getDashboardPath } from './stores/authStore';
import type { UserProfile } from './lib/types/auth';
import { useTranslation } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

interface ProtectedRouteProps {
  children: React.ReactNode | ((props: { user: UserProfile }) => React.ReactNode);
  allowedRoles?: string[];
}

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
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const SuperAdminDashboard = lazy(() => import('./components/Admin/SuperAdminDashboard').then(module => ({ default: module.SuperAdminDashboard })));

function App() {
  const { checkUser } = useAuthStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <ThemedApp />
      </Suspense>
    </ThemeProvider>
  );
}

// Separate component to use theme after provider is initialized
function ThemedApp() {
  const { theme } = useTheme();
  
  return (
    <div data-theme={theme} className="min-h-screen bg-primary">
      <HelmetProvider>
        <ErrorBoundary>
          <Router>
            <Routes>
              {/* Auth Layout Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/signup" element={<SignUpSelector />} />
                <Route path="/signup/donor" element={<DonorSignUpForm />} />
                <Route path="/signup/shelter" element={<ShelterSignUpForm />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
              </Route>

              {/* Main Layout Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Hero />} />
                <Route path="how-it-works" element={<HowItWorks />} />
                <Route path="solutions" element={<Solutions />} />
                <Route path="contact" element={<ContactForm />} />
                <Route path="scan" element={<QRScanner />} />
                <Route path="impact" element={<PublicDashboard />} />
                <Route path="donate/:id" element={<DonationForm />} />
                <Route path="thank-you" element={<ThankYou />} />
                <Route path="blog" element={<BlogList posts={[]} />} />
                <Route path="blog/:slug" element={<BlogPost 
                  title=""
                  content=""
                  publishedAt=""
                  author={{ name: "" }}
                  categories={[]}
                />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="about" element={<AboutPage />} />
                
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
                  <ProtectedRoute allowedRoles={['admin', 'shelter_admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/super-admin/dashboard" element={
                  <ProtectedRoute allowedRoles={['super_admin']}>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
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
    </div>
  );
}

export default App;