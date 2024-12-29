import { useAuthStore } from '@/auth/stores/authStore';
import { DashboardAnalytics } from '../../shared/analytics/DashboardAnalytics';
import { AUTH_ROLES } from '@/auth/types/auth.types';

export const ShelterAdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Shelter Admin Dashboard</h2>
      
      {/* Shelter Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Current Occupancy</h3>
          {/* We'll add occupancy metrics later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Resource Status</h3>
          {/* We'll add resource tracking later */}
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Today's Schedule</h3>
          {/* We'll add schedule component later */}
        </div>
      </div>

      {/* Analytics Section */}
      <DashboardAnalytics role={AUTH_ROLES.SHELTER_ADMIN} />
      
      {/* Participant Management */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-4">Participant Management</h3>
        {/* We'll add participant list/management later */}
      </div>

      {/* Resource Management */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold mb-4">Resource Management</h3>
        {/* We'll add resource management later */}
      </div>
    </div>
  );
}; 