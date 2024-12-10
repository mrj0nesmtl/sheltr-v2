import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { SystemAlerts } from './SystemAlerts';
import { ParticipantLeaderboard } from './ParticipantLeaderboard';
import { DonorList } from './DonorList';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export function SuperAdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // System-wide alerts
  const [alerts] = useState([
    {
      id: '1',
      type: 'info' as const,
      message: 'New shelter registration pending approval',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'warning' as const,
      message: 'System maintenance scheduled for tonight',
      timestamp: new Date()
    }
  ]);

  // Platform-wide statistics
  const platformStats = {
    totalShelters: 25,
    activeShelters: 22,
    totalParticipants: 1500,
    totalDonations: 750000,
    activeParticipants: 1200,
    monthlyGrowth: 15,
    successRate: 82
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Platform-wide Management & Analytics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-300">
            <Icon name="shield" className="inline-block mr-2" />
            Super Admin
          </div>
          <Button 
            variant="outline" 
            className="text-red-400 border-red-400 hover:bg-red-500/10"
            onClick={handleSignOut}
          >
            <Icon name="log-out" className="h-4 w-4 mr-2" />
            {t('common.signOut')}
          </Button>
        </div>
      </div>

      {/* System Alerts */}
      <div className="mb-8">
        <SystemAlerts alerts={alerts} onDismiss={(id) => console.log('Dismiss:', id)} />
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Icon name="building" className="h-5 w-5 text-purple-400" />
            </div>
            <span className="text-gray-400">Total Shelters</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {platformStats.totalShelters}
          </div>
        </div>
        {/* Add other stat cards */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Shelter Performance */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            Shelter Performance
          </h3>
          {/* Add shelter performance chart */}
        </div>

        {/* System Health */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            System Health
          </h3>
          {/* Add system health metrics */}
        </div>
      </div>
    </div>
  );
}