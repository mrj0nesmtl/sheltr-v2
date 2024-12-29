import { useAuthStore } from '@/auth/stores/authStore';
import { DashboardAnalytics } from '../../shared/analytics/DashboardAnalytics';
import { AUTH_ROLES } from '@/auth/types/auth.types';

export const DonorDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Donor Dashboard</h2>
      
      {/* Donor Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Your Impact</h3>
          {/* We'll add impact metrics later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Recent Donations</h3>
          {/* We'll add donation history later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Donation Goals</h3>
          {/* We'll add goals tracking later */}
        </div>
      </div>

      {/* Analytics Section */}
      <DashboardAnalytics role={AUTH_ROLES.DONOR} />
      
      {/* Impact Tracking */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-4">Your Impact Story</h3>
        {/* We'll add impact visualization later */}
      </div>

      {/* Available Campaigns */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-4">Active Campaigns</h3>
        {/* We'll add campaign list later */}
      </div>
    </div>
  );
}; 