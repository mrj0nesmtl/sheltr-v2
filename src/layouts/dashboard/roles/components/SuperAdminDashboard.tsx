import { useAuthStore } from '@/auth/stores/authStore';
import { DashboardAnalytics } from '../../shared/analytics/DashboardAnalytics';
import { AUTH_ROLES } from '@/auth/types/auth.types';

export const SuperAdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Super Admin Dashboard</h2>
      
      {/* System Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">System Overview</h3>
          {/* We'll add metrics components later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Active Shelters</h3>
          {/* We'll add shelter stats later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Recent Activity</h3>
          {/* We'll add activity feed later */}
        </div>
      </div>

      {/* Analytics Section */}
      <DashboardAnalytics role={AUTH_ROLES.SUPER_ADMIN} />
      
      {/* System Activity */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-4">System Activity</h3>
        {/* We'll add activity log later */}
      </div>
    </div>
  );
}; 