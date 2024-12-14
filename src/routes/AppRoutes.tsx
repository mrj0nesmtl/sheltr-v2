import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '../lib/types/database';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Public Pages
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { AboutPage } from '../pages/About';
import { HowItWorksPage } from '../pages/HowItWorks';
import { SolutionsPage } from '../pages/Solutions';

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
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
      </Routes>
    </ErrorBoundary>
  );
}