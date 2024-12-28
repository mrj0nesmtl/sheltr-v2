import { useAuth } from '@/hooks/useAuth';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { QuickStatCard } from './QuickStatCard';
import { GlobalAnalytics } from './analytics/GlobalAnalytics';

export default function SuperAdminDashboardView() {
  const { user, role } = useAuth();
  console.log('SuperAdminDashboard: Rendering with role:', role);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Quick Stats Row - Improve responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <QuickStatCard 
            icon="users"
            label="Total Users"
            value="0"
            trend="+0%"
            trendUp={true}
            customColor="indigo"
          />
          <QuickStatCard 
            icon="home"
            label="Active Shelters"
            value="0"
            trend="+0%"
            trendUp={true}
            customColor="purple"
          />
          <QuickStatCard 
            icon="dollar-sign"
            label="Total Donations"
            value="$0"
            trend="+0%"
            trendUp={true}
            customColor="emerald"
          />
        </div>

        {/* Analytics Section */}
        <ErrorBoundary>
          <GlobalAnalytics />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}