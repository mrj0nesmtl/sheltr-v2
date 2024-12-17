import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '@/lib/auth/types';
import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { toast } from "@/components/ui/Toast";

// Import from new dashboard structure
import {
  DonorDashboard,
  ParticipantDashboard,
  ShelterDashboard
} from '@/features/dashboard';

// Import pages
import { 
  HomePage,
  AboutPage,
  LoginPage,
  SignUpPage,
  HowItWorksPage,
  SolutionsPage 
} from '@/pages';

export function AppRoutes() {
  return (
    <ErrorBoundary
      fallback={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "An unexpected error occurred"
        });
        return null;
      }}
    >
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
        <Route
          path="/donor/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.DONOR]}>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/participant/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.PARTICIPANT]}>
              <ParticipantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shelter/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.SHELTER_ADMIN]}>
              <ShelterDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}
