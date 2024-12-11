import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { SystemAlerts } from './SystemAlerts';
import { ParticipantManagementTable } from './ParticipantManagementTable';
import { ParticipantLeaderboard } from './ParticipantLeaderboard';
import { DonorList } from './DonorList';
import { DonationMap } from './DonationMap';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ParticipantRegistrationModal } from './ParticipantRegistrationModal';

// Enhanced color palette
const COLORS = {
  housing: {
    emergency: '#4F46E5',    // Indigo
    transitional: '#818CF8', // Light Indigo
    permanent: '#6366F1'     // Mid Indigo
  },
  support: {
    medical: '#10B981',      // Emerald
    mental: '#34D399',       // Light Emerald
    addiction: '#059669'     // Dark Emerald
  },
  services: {
    food: '#F59E0B',        // Amber
    training: '#FBBF24',    // Light Amber
    education: '#F97316'    // Orange
  },
  operations: {
    admin: '#EF4444',       // Red
    maintenance: '#F87171', // Light Red
    utilities: '#DC2626'    // Dark Red
  }
};

export function ShelterDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  // Sample data - replace with actual data fetch
  const [alerts] = useState([
    {
      id: '1',
      type: 'info' as const,
      message: 'System maintenance scheduled for tonight at 2 AM EST',
      timestamp: new Date()
    }
  ]);

  // Sample stats
  const stats = {
    totalDonations: 125000,
    totalParticipants: 48,
    activeParticipants: 42,
    housingPlacements: 15,
    averageDonation: 250,
    monthlyGrowth: 12.5,
    successRate: 85,
    jobPlacements: 30,
    activeServices: 20
  };

  // More granular allocation data
  const allocationData = [
    // Housing Programs (70%)
    { name: 'Emergency Housing', value: 30, category: 'housing' },
    { name: 'Transitional Housing', value: 25, category: 'housing' },
    { name: 'Permanent Solutions', value: 15, category: 'housing' },
    
    // Support Services (15%)
    { name: 'Medical Care', value: 6, category: 'support' },
    { name: 'Mental Health', value: 5, category: 'support' },
    { name: 'Addiction Recovery', value: 4, category: 'support' },
    
    // Essential Services (10%)
    { name: 'Food Programs', value: 4, category: 'services' },
    { name: 'Job Training', value: 3, category: 'services' },
    { name: 'Education', value: 3, category: 'services' },
    
    // Operations (5%)
    { name: 'Administration', value: 2, category: 'operations' },
    { name: 'Maintenance', value: 2, category: 'operations' },
    { name: 'Utilities', value: 1, category: 'operations' }
  ];

  // Sample monthly trends
  const monthlyTrends = [
    { month: 'Jan', donations: 18000, participants: 35 },
    { month: 'Feb', donations: 22000, participants: 38 },
    { month: 'Mar', donations: 28000, participants: 42 },
    { month: 'Apr', donations: 32000, participants: 45 },
    { month: 'May', donations: 35000, participants: 48 }
  ];

  // Sample donation locations
  const donationLocations = [
    {
      id: '1',
      lat: 40.7128,
      lng: -74.0060,
      amount: 100,
      participant_name: 'John Doe',
      created_at: new Date().toISOString()
    }
    // Add more locations...
  ];

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t('admin.shelter.welcome', { 
              name: user?.displayName || user?.name?.split('+')[0] || 'Administrator'
            })}
          </h1>
          <p className="text-gray-400">
            {t('admin.shelter.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setIsRegistrationOpen(true)}
          >
            <Icon name="users" className="h-4 w-4 mr-2" />
            {t('admin.shelter.participants.add')}
          </Button>
          <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-300">
            <Icon name="building" className="inline-block mr-2" />
            Shelter Admin
          </div>
          <Button 
            variant="outline" 
            className="text-red-400 border-red-400 hover:bg-red-500/10"
            onClick={() => useAuthStore.getState().signOut()}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Icon name="dollar-sign" className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Donations</p>
              <p className="text-2xl font-bold text-white">
                ${stats.totalDonations.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Icon name="users" className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Participants</p>
              <p className="text-2xl font-bold text-white">
                {stats.activeParticipants}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Icon name="trending-up" className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-white">
                {stats.successRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Icon name="home" className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Housing Placements</p>
              <p className="text-2xl font-bold text-white">
                {stats.housingPlacements}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Icon name="briefcase" className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Job Placements</p>
              <p className="text-2xl font-bold text-white">
                {stats.jobPlacements}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <Icon name="activity" className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Services</p>
              <p className="text-2xl font-bold text-white">
                {stats.activeServices}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Donation Map */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Global Donations</h3>
          <DonationMap donations={donationLocations} />
        </div>

        {/* Fund Allocation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Fund Allocation</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={160}
                  paddingAngle={3}
                  dataKey="value"
                  cornerRadius={4}
                  stroke="#1F2937"
                  strokeWidth={2}
                >
                  {allocationData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.category][Object.keys(COLORS[entry.category])[0]]}
                      opacity={0.9}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
                        <p className="font-semibold text-white">{data.name}</p>
                        <p className="text-gray-300">{data.value}% of total funds</p>
                        <p className="text-sm text-gray-400">
                          ${(data.value * stats.totalDonations / 100).toLocaleString()}
                        </p>
                      </div>
                    );
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Monthly Trends</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrends}>
              <defs>
                <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="donations"
                stroke="#6366F1"
                fillOpacity={1}
                fill="url(#colorDonations)"
              />
              <Area
                type="monotone"
                dataKey="participants"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorParticipants)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Participant Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ParticipantLeaderboard participants={[]} />
        <DonorList donors={[]} onViewDetails={(id) => console.log('View donor:', id)} />
      </div>

      <ParticipantRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSuccess={(data) => {
          // Handle successful registration
          console.log('Registration successful:', data);
          setIsRegistrationOpen(false);
          // Refresh participant list
        }}
      />
    </div>
  );
} 