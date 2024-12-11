import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { NotificationCenter } from './NotificationCenter';
import { AnalyticsGrid } from './AnalyticsGrid';
import { ShelterOverview } from './ShelterOverview';
import { SystemHealth } from './SystemHealth';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';

export function SuperAdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalShelters: 0,
    activeShelters: 0,
    totalParticipants: 0,
    totalDonations: 0,
    systemHealth: {
      status: 'healthy',
      uptime: '99.9%',
      lastIncident: null
    },
    recentAlerts: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t('superAdmin.dashboard.welcome')}
          </h1>
          <p className="text-gray-400">
            {t('superAdmin.dashboard.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            onClick={() => setShowNotifications(true)}
          >
            <Icon name="bell" className="mr-2 h-4 w-4" />
            {t('superAdmin.notifications.manage')}
          </Button>
          <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-300">
            <Icon name="shield" className="inline-block mr-2" />
            Super Admin
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickStatCard
          icon="building"
          label="Total Shelters"
          value={analytics.totalShelters}
          trend="+12%"
          trendUp={true}
        />
        <QuickStatCard
          icon="users"
          label="Total Participants"
          value={analytics.totalParticipants}
          trend="+8%"
          trendUp={true}
        />
        <QuickStatCard
          icon="dollar-sign"
          label="Total Donations"
          value={`$${analytics.totalDonations.toLocaleString()}`}
          trend="+15%"
          trendUp={true}
        />
        <QuickStatCard
          icon="activity"
          label="System Health"
          value={analytics.systemHealth.uptime}
          trend="Healthy"
          trendUp={true}
          customColor="emerald"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ShelterPerformanceChart />
        <DonationAnalytics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <ParticipantMetrics />
        <SystemHealthMonitor />
        <AlertsAndIncidents />
      </div>

      {/* Shelter Management */}
      <div className="grid grid-cols-1 gap-8">
        <ShelterManagementTable />
      </div>

      {/* Modals */}
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}

// Add these components in separate files: