import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '../lib/types/database';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { Layout } from '../components/Layout/Layout';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Public Pages
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { AboutPage } from '../pages/About';
import { HowItWorksPage } from '../pages/HowItWorks';
import { SolutionsPage } from '../pages/Solutions';

// Protected Pages
import { SuperAdminDashboard } from '../pages/SuperAdmin/SuperAdminDashboard';
import { ShelterAdminDashboard } from '../pages/ShelterAdmin/ShelterAdminDashboard';
import { DonorDashboard } from '../pages/Donor/DonorDashboard';
import { ParticipantDashboard } from '../pages/Participant/ParticipantDashboard';

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<LoginPage isAdminLogin={true} />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          {/* ... rest of your routes ... */}
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}