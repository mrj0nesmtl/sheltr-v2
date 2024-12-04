import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { AuthLayout } from './components/Auth/AuthLayout';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Solutions } from './components/Solutions';
import { QRScanner } from './components/QRScanner/QRScanner';
import { DonationForm } from './components/DonationForm/DonationForm';
import { ThankYou } from './components/ThankYou/ThankYou';
import { LoginPage } from './components/Auth/LoginPage';
import { SignUpSelector } from './components/Auth/SignUpSelector';
import { DonorSignUpForm } from './components/Auth/DonorSignUpForm';
import { ShelterSignUpForm } from './components/Auth/ShelterSignUpForm';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { SuperAdminDashboard } from './components/Admin/SuperAdminDashboard';
import { ContactForm } from './components/Contact/ContactForm';
import { BlogList } from './components/Blog/BlogList';
import { BlogPost } from './components/Blog/BlogPost';
import { BlogEditor } from './components/Blog/BlogEditor';
import { UserProfile } from './components/Profile/UserProfile';
import { ParticipantDashboard } from './components/Dashboard/ParticipantDashboard';
import { DonorDashboard } from './components/Dashboard/DonorDashboard';
import { PublicDashboard } from './components/Analytics/PublicDashboard';
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsOfService } from './components/Legal/TermsOfService';
import { WhitepaperPage } from './components/Whitepaper/WhitepaperPage';
import { useAuthStore, getDashboardPath } from './stores/authStore';

function App() {
  const { checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
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
            <Route path="whitepaper" element={<WhitepaperPage />} />
            <Route path="analytics" element={<PublicDashboard />} />
            
            {/* Protected Routes */}
            <Route path="profile/:id" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            <Route path="donor/dashboard" element={
              <ProtectedRoute allowedRoles={['donor']}>
                <DonorDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="participant/dashboard" element={
              <ProtectedRoute allowedRoles={['participant']}>
                <ParticipantDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="admin/dashboard" element={
              <ProtectedRoute allowedRoles={['shelter_admin', 'admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="super-admin/dashboard" element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            } />

            {/* Default dashboard redirect */}
            <Route path="dashboard" element={
              <ProtectedRoute>
                {({ user }) => {
                  const path = getDashboardPath(user?.role);
                  return <Navigate to={path} replace />;
                }}
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;