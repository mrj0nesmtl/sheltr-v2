import { useAuthStore } from '@/auth/stores/authStore';
import { DonationMap } from '@/components/Admin/DonationMap';
import { DonorList } from '@/components/Admin/DonorList';
import { ParticipantLeaderboard } from '@/components/Admin/ParticipantLeaderboard';
import { ParticipantRegistrationModal } from '@/components/Admin/ParticipantRegistrationModal';
import { SystemAlerts } from '@/components/Admin/SystemAlerts';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell, Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: Date;
}

interface DashboardStats {
  totalDonations: number;
  totalParticipants: number;
  activeParticipants: number;
  housingPlacements: number;
  averageDonation: number;
  monthlyGrowth: number;
  successRate: number;
  jobPlacements: number;
  activeServices: number;
}

// Define the color categories and their subcategories
type ColorMapping = {
  housing: {
    emergency: string;
    transitional: string;
    permanent: string;
  };
  support: {
    medical: string;
    mental: string;
    addiction: string;
  };
  services: {
    food: string;
    training: string;
    education: string;
  };
  operations: {
    admin: string;
    maintenance: string;
    utilities: string;
  };
};

// Type the COLORS constant
const COLORS: ColorMapping = {
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
} as const;

// Update the interface for allocation data
interface AllocationData {
  name: string;
  value: number;
  category: keyof ColorMapping;
  subcategory: string;
}

interface DonationLocation {
  id: string;
  lat: number;
  lng: number;
  amount: number;
  participant_name: string;
  created_at: string;
}

export function ShelterDashboard() {
  const { t } = useTranslation();
  const { user, clearAuth } = useAuthStore();
  
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'info',
      message: 'System maintenance scheduled for tonight at 2 AM EST',
      timestamp: new Date()
    }
  ]);

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  // Sample stats with proper typing
  const stats: DashboardStats = {
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

  // More granular allocation data with proper typing
  const allocationData: AllocationData[] = [
    // Housing Programs (70%)
    { name: 'Emergency Housing', value: 30, category: 'housing', subcategory: 'emergency' },
    { name: 'Transitional Housing', value: 25, category: 'housing', subcategory: 'transitional' },
    { name: 'Permanent Solutions', value: 15, category: 'housing', subcategory: 'permanent' },
    
    // Support Services (15%)
    { name: 'Medical Care', value: 6, category: 'support', subcategory: 'medical' },
    { name: 'Mental Health', value: 5, category: 'support', subcategory: 'mental' },
    { name: 'Addiction Recovery', value: 4, category: 'support', subcategory: 'addiction' },
    
    // Essential Services (10%)
    { name: 'Food Programs', value: 4, category: 'services', subcategory: 'food' },
    { name: 'Job Training', value: 3, category: 'services', subcategory: 'training' },
    { name: 'Education', value: 3, category: 'services', subcategory: 'education' },
    
    // Operations (5%)
    { name: 'Administration', value: 2, category: 'operations', subcategory: 'admin' },
    { name: 'Maintenance', value: 2, category: 'operations', subcategory: 'maintenance' },
    { name: 'Utilities', value: 1, category: 'operations', subcategory: 'utilities' }
  ];

  // Sample monthly trends with proper typing
  const monthlyTrends = [
    { month: 'Jan', donations: 18000, participants: 35 },
    { month: 'Feb', donations: 22000, participants: 38 },
    { month: 'Mar', donations: 28000, participants: 42 },
    { month: 'Apr', donations: 32000, participants: 45 },
    { month: 'May', donations: 35000, participants: 48 }
  ];

  // Sample donation locations with proper typing
  const donationLocations: DonationLocation[] = [
    {
      id: '1',
      lat: 40.7128,
      lng: -74.0060,
      amount: 100,
      participant_name: 'John Doe',
      created_at: new Date().toISOString()
    }
  ];

  const handleRegistrationSuccess = (data: unknown) => {
    console.log('Registration successful:', data);
    setIsRegistrationOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t('admin.shelter.welcome', { 
              name: user?.email?.split('@')[0] || 'Administrator'
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
            <Icon name="user" className="h-4 w-4 mr-2" />
            {t('admin.shelter.participants.add')}
          </Button>
          <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-300">
            <Icon name="user" className="inline-block mr-2" />
            Shelter Admin
          </div>
          <Button 
            variant="outline" 
            className="text-red-400 border-red-400 hover:bg-red-500/10"
            onClick={() => clearAuth()}
          >
            <Icon name="x" className="h-4 w-4 mr-2" />
            {t('common.signOut')}
          </Button>
        </div>
      </div>

      {/* System Alerts */}
      <div className="mb-8">
        <SystemAlerts alerts={alerts} onDismiss={(id: string) => console.log('Dismiss:', id)} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Icon name="key" className="h-6 w-6 text-indigo-400" />
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
              <Icon name="user" className="h-6 w-6 text-green-400" />
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
              <Icon name="search" className="h-6 w-6 text-yellow-400" />
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
              <Icon name="menu" className="h-6 w-6 text-blue-400" />
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
                      fill={COLORS[entry.category][entry.subcategory as keyof (typeof COLORS)[typeof entry.category]]}
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
        <DonorList donors={[]} onViewDetails={(id: string) => console.log('View donor:', id)} />
      </div>

      <ParticipantRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
} 