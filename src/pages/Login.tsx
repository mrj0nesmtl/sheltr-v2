import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/Auth/LoginForm';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function LoginPage() {
  const { t } = useTranslation();
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <LoginForm />
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 