import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AlertsAndIncidents } from './AlertsAndIncidents';
import { DonationAnalytics } from './DonationAnalytics';
import { QuickStatCard } from './QuickStatCard';
import { ShelterPerformanceChart } from './ShelterPerformanceChart';
import { SystemHealthMonitor } from './SystemHealthMonitor';
import { GlobalAnalytics } from '../analytics/GlobalAnalytics';
import { SystemMetrics } from '../analytics/SystemMetrics';
import { NetworkPerformance } from '../analytics/NetworkPerformance';

export function SuperAdminDashboard() {
  return (
    <ErrorBoundary>
      <div className="space-y-6 p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ErrorBoundary>
            <QuickStatCard title="Total Donations" value="$0" change="+0%" />
          </ErrorBoundary>
          <ErrorBoundary>
            <QuickStatCard title="Active Shelters" value="0" change="+0%" />
          </ErrorBoundary>
          <ErrorBoundary>
            <QuickStatCard title="Total Users" value="0" change="+0%" />
          </ErrorBoundary>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary>
            <GlobalAnalytics />
          </ErrorBoundary>
          <ErrorBoundary>
            <SystemHealthMonitor />
          </ErrorBoundary>
        </div>

        {/* Performance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary>
            <DonationAnalytics />
          </ErrorBoundary>
          <ErrorBoundary>
            <ShelterPerformanceChart />
          </ErrorBoundary>
        </div>

        {/* System Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary>
            <SystemMetrics />
          </ErrorBoundary>
          <ErrorBoundary>
            <NetworkPerformance />
          </ErrorBoundary>
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1">
          <ErrorBoundary>
            <AlertsAndIncidents />
          </ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  );
}