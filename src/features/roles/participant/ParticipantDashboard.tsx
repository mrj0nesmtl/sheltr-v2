import { ErrorBoundary } from '@/components/ErrorBoundary';

export function ParticipantDashboard() {
  return (
    <ErrorBoundary>
      {/* Dashboard content */}
      <div className="min-h-screen bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Participant Dashboard
        </h1>
        {/* Add dashboard content here */}
      </div>
    </ErrorBoundary>
  );
} 