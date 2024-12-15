import React from 'react';
import { ParticipantErrorBoundary } from '../components/ErrorBoundary';
import { LoadingState } from '../components/LoadingState';

export function ParticipantAnalytics() {
  return (
    <ParticipantErrorBoundary>
      <div className="space-y-6">
        <h1>Participant Analytics</h1>
        {/* Analytics content */}
      </div>
    </ParticipantErrorBoundary>
  );
} 