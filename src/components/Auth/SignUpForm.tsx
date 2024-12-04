import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { SignUpSelector } from './SignUpSelector';

export function SignUpForm() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <SignUpSelector />;
}