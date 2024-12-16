import React from 'react';
import { ParticipantErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingState } from '../components/LoadingState';

// Add a test component that throws an error
const TestErrorComponent = () => {
  throw new Error('Test error in Participant Analytics');
  return null;
};

export function ParticipantAnalytics() {
  return (
    <ParticipantErrorBoundary>
      <div className="space-y-6">
        <h1>Participant Analytics</h1>
        {/* Temporarily add the error component to test */}
        {process.env.NODE_ENV === 'development' && <TestErrorComponent />}
        {/* Analytics content */}
      </div>
    </ParticipantErrorBoundary>
  );
} 