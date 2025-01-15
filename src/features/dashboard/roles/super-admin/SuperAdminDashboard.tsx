import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/auth/stores/authStore';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { supabase } from '@/lib/supabase';

// UI Components
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Table } from '@/components/ui/Table';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { SignOutButton } from '@/components/ui/SignOutButton';
import { DashboardHeader } from '@/features/dashboard/shared/components/DashboardHeader';
import { UserBadge } from '@/components/UserBadge/UserBadge';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
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
  const { user } = useAuthStore();

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    activeShelters: 0,
    totalDonations: 0
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        console.log('Fetching dashboard stats...');
        
        // Get verified shelter count
        const { data: shelterData, error: shelterError } = await supabase
          .from('organizations')
          .select('count', { count: 'exact' })
          .eq('verified', true);
        
        if (shelterError) console.error('Shelter fetch error:', shelterError);
        
        // Get total capacity and current occupancy
        const { data: capacityData, error: capacityError } = await supabase
          .from('organizations')
          .select('total_capacity, current_capacity')
          .eq('verified', true);
        
        // Get donation total from housing fund balance
        const { data: fundData, error: fundError } = await supabase
          .from('organizations')
          .select('housing_fund_balance')
          .eq('verified', true);
        
        const totalCapacity = capacityData?.reduce((acc, curr) => acc + (curr.total_capacity || 0), 0) || 0;
        const totalOccupancy = capacityData?.reduce((acc, curr) => acc + (curr.current_capacity || 0), 0) || 0;
        const totalFunds = fundData?.reduce((acc, curr) => acc + (Number(curr.housing_fund_balance) || 0), 0) || 0;
        
        setDashboardStats({
          totalUsers: totalOccupancy, // This could be refined based on actual user counts
          activeShelters: shelterData?.count || 0,
          totalDonations: totalFunds
        });
        
      } catch (error) {
        console.error('Dashboard stats fetch error:', error);
      }
    };

    fetchDashboardStats();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('dashboard_updates')
      .on('postgres_changes', { event: '*', schema: 'public' }, 
        (payload) => {
          fetchDashboardStats();
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        {/* Header Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div className="space-y-4">
              <DashboardHeader title="Welcome Admin - System Developer" user={user} />
              <div className="flex items-center gap-2 flex-wrap">
                <UserBadge role="super_admin" />
                <Badge variant="error" size="sm" className="flex items-center gap-1">
                  <Icon name="shield" className="w-3 h-3" />
                  System Access
                </Badge>
                <Badge variant="warning" size="sm" className="flex items-center gap-1">
                  <Icon name="bell" className="w-3 h-3" />
                  3 New Shelters Pending
                </Badge>
                <Badge variant="info" size="sm" className="flex items-center gap-1">
                  <Icon name="activity" className="w-3 h-3" />
                  System Health: 100%
                </Badge>
                <Badge variant="success" size="sm" className="flex items-center gap-1">
                  <Icon name="check-circle" className="w-3 h-3" />
                  All Services Active
                </Badge>
              </div>
            </div>
            <SignOutButton variant="header" />
          </div>
        </div>

        <div className="container mx-auto px-4 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <QuickStatCard 
              icon="users"
              label="Total Users"
              value={dashboardStats.totalUsers}
              trend="+0%"
              trendUp={true}
              customColor="indigo"
            />
            <QuickStatCard 
              icon="home"
              label="Active Shelters"
              value={dashboardStats.activeShelters}
              trend="+0%"
              trendUp={true}
              customColor="purple"
            />
            <QuickStatCard 
              icon="dollar-sign"
              label="Total Donations"
              value={`$${dashboardStats.totalDonations}`}
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
      </div>
    </ErrorBoundary>
  );
};

export default SuperAdminDashboard;