import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { SystemAlerts } from '@/components/Admin/SystemAlerts';
import { ParticipantManagementTable } from '@/components/Admin/ParticipantManagementTable';
import { ParticipantLeaderboard } from '@/components/Admin/ParticipantLeaderboard';
import { DonorList } from '@/components/Admin/DonorList';
import { DonationMap } from '@/components/Admin/DonationMap';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ParticipantRegistrationModal } from '@/components/Admin/ParticipantRegistrationModal';

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
        {/* ... Stats cards remain the same ... */}
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
                {/* ... PieChart implementation remains the same ... */}
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
              {/* ... AreaChart implementation remains the same ... */}
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
          console.log('Registration successful:', data);
          setIsRegistrationOpen(false);
        }}
      />
    </div>
  );
}