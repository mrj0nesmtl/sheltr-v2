import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase/client';

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

function SystemAlerts({ alerts, onDismiss }: { alerts: SystemAlert[]; onDismiss: (id: string) => void }) {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg flex items-center justify-between ${
            alert.type === 'info' ? 'bg-blue-500/20 border-blue-500/50' :
            alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50' :
            'bg-red-500/20 border-red-500/50'
          } border`}
        >
          <div className="flex items-center gap-3">
            <Icon
              name={alert.type === 'info' ? 'info' : alert.type === 'warning' ? 'alert-triangle' : 'alert-circle'}
              className={`h-5 w-5 ${
                alert.type === 'info' ? 'text-blue-400' :
                alert.type === 'warning' ? 'text-yellow-400' :
                'text-red-400'
              }`}
            />
            <span className="text-white">{alert.message}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(alert.id)}
            className="text-gray-400 hover:text-white"
          >
            <Icon name="x" className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export function SuperAdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // System-wide alerts
  const [alerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'info',
      message: 'New shelter registration pending approval',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'warning',
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

  const statCards = [
    {
      icon: 'building',
      label: 'Total Shelters',
      value: platformStats.totalShelters,
      color: 'purple'
    },
    {
      icon: 'users',
      label: 'Active Participants',
      value: platformStats.activeParticipants,
      color: 'blue'
    },
    {
      icon: 'dollar-sign',
      label: 'Total Donations',
      value: `$${platformStats.totalDonations.toLocaleString()}`,
      color: 'emerald'
    },
    {
      icon: 'trending-up',
      label: 'Success Rate',
      value: `${platformStats.successRate}%`,
      color: 'yellow'
    }
  ];

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
        <SystemAlerts 
          alerts={alerts} 
          onDismiss={(id) => {
            // Handle alert dismissal
            console.log('Dismiss alert:', id);
          }} 
        />
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <Card.Content className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${stat.color}-500/20 rounded-lg`}>
                  <Icon name={stat.icon as any} className={`h-5 w-5 text-${stat.color}-400`} />
                </div>
                <span className="text-gray-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {stat.value}
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shelter Performance */}
        <Card>
          <Card.Content className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Shelter Performance
            </h3>
            {/* Add shelter performance chart */}
          </Card.Content>
        </Card>

        {/* System Health */}
        <Card>
          <Card.Content className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              System Health
            </h3>
            {/* Add system health metrics */}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}