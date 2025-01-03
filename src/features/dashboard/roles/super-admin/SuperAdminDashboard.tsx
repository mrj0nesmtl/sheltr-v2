import { useAuthStore } from '@/auth/stores/authStore';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// UI Components
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Table } from '@/components/ui/Table';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { SignOutButton } from '@/components/ui/SignOutButton';
import { QuickStatCard } from './QuickStatCard';

// Analytics Components
import { SystemHealthMonitor } from '@/components/shared/analytics/SystemHealthMonitor';
import { GlobalAnalytics } from './analytics/GlobalAnalytics';
import { DonationFlowMetrics } from '@/components/shared/analytics/DonationFlowMetrics';
import { NetworkOverview } from '@/components/shared/analytics/NetworkOverview';
import { DetailedAnalytics } from '@/components/shared/analytics/DetailedAnalytics';

// Charts
import { 
  DonationAllocationPieChart,
  NetworkActivityChart 
} from '@/components/ui/Charts';

// Feature Components
import { BlockchainStats } from '@/components/Blockchain';
import { TransactionList } from '@/components/Transactions/TransactionList';
import { ShelterList } from '@/components/Admin/Shelters/ShelterList';

export const SuperAdminDashboard = () => {
  const { user, role } = useAuthStore();

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-200">
              Welcome {user?.name || 'Admin'} - System Developer
            </h1>
          </div>
          <SignOutButton 
            variant="header" 
            className="bg-gray-900/50 hover:bg-gray-700/50"
          />
        </div>

        {/* Quick Stats Grid */}
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

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Health & Network Overview */}
          <Card className="lg:col-span-2">
            <SystemHealthMonitor />
          </Card>
          <Card>
            <BlockchainStats />
          </Card>

          {/* Donation Analytics */}
          <Card className="lg:col-span-2">
            <DonationAllocationPieChart />
          </Card>
          <Card>
            <NetworkActivityChart />
          </Card>

          {/* Transaction & Shelter Lists */}
          <Card className="lg:col-span-3">
            <TransactionList />
          </Card>
          <Card className="lg:col-span-3">
            <ShelterList />
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Card className="mt-6">
          <DetailedAnalytics />
        </Card>
      </div>
    </ErrorBoundary>
  );
};