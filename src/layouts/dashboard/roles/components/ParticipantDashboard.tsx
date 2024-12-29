import { useAuthStore } from '@/auth/stores/authStore';
import { DashboardAnalytics } from '../../shared/analytics/DashboardAnalytics';
import { AUTH_ROLES } from '@/auth/types/auth.types';

export const ParticipantDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Participant Dashboard</h2>
      
      {/* Participant Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Your Progress</h3>
          {/* We'll add progress metrics later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Available Resources</h3>
          {/* We'll add resource list later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Upcoming Events</h3>
          {/* We'll add events calendar later */}
        </div>
      </div>

      {/* Analytics Section */}
      <DashboardAnalytics role={AUTH_ROLES.PARTICIPANT} />
      
      {/* Progress Tracking */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-4">Activity History</h3>
          {/* We'll add activity log later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-4">Resource Access</h3>
          {/* We'll add resource access component later */}
        </div>
      </div>
    </div>
  );
}; 