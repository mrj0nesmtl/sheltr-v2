import { AUTH_ROLES } from '@/auth/types/auth.types';

// Temporary mock data until we connect to real data
const mockData = {
  shelterStats: {
    totalShelters: 0,
    activeParticipants: 0,
    occupancyRate: 0,
    resourceUtilization: 0
  },
  chartData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [0, 0, 0, 0, 0, 0],
      label: 'Default Dataset'
    }]
  }
};

interface DashboardAnalyticsProps {
  role: AUTH_ROLES;
  timeframe?: 'day' | 'week' | 'month' | 'year';
}

export const DashboardAnalytics = ({ role, timeframe = 'month' }: DashboardAnalyticsProps) => {
  const renderRoleSpecificAnalytics = () => {
    switch (role) {
      case AUTH_ROLES.SUPER_ADMIN:
        return (
          <>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">System Overview</h3>
              {/* Placeholder for ShelterStats */}
              <div className="mt-4 grid gap-4 grid-cols-2">
                <div>Total Shelters: {mockData.shelterStats.totalShelters}</div>
                <div>Active Participants: {mockData.shelterStats.activeParticipants}</div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Global Performance</h3>
              {/* Placeholder for BarChart */}
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Donation Trends</h3>
              {/* Placeholder for LineChart */}
            </div>
          </>
        );
      
      case AUTH_ROLES.SHELTER_ADMIN:
        return (
          <>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Shelter Statistics</h3>
              {/* Placeholder for ShelterStats */}
              <div className="mt-4">
                <div>Occupancy Rate: {mockData.shelterStats.occupancyRate}%</div>
                <div>Resource Utilization: {mockData.shelterStats.resourceUtilization}%</div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Occupancy Trends</h3>
              {/* Placeholder for AreaChart */}
            </div>
          </>
        );
      
      case AUTH_ROLES.DONOR:
        return (
          <>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Donation Impact</h3>
              {/* Placeholder for DonorStats */}
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Personal Impact</h3>
              {/* Placeholder for LineChart */}
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renderRoleSpecificAnalytics()}
      </div>
    </div>
  );
}; 