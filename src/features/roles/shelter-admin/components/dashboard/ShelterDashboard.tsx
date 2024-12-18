import { useAuthStore } from '@/auth/stores/authStore';
import { DonationMap } from '../Admin/DonationMap';
import { DonorList } from '../Admin/DonorList';
import { ParticipantLeaderboard } from '../Admin/ParticipantLeaderboard';
import { ParticipantRegistrationModal } from '../Admin/ParticipantRegistrationModal';
import { SystemAlerts } from '../Admin/SystemAlerts';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

// Color palette with proper typing
const COLORS = {
  housing: {
    emergency: '#4F46E5',
    transitional: '#818CF8',
    permanent: '#6366F1'
  },
  support: {
    medical: '#10B981',
    mental: '#34D399',
    addiction: '#059669'
  },
  services: {
    food: '#F59E0B',
    training: '#FBBF24',
    education: '#F97316'
  },
  operations: {
    admin: '#EF4444',
    maintenance: '#F87171',
    utilities: '#DC2626'
  }
} as const;

interface Alert {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
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

interface AllocationData {
  name: string;
  value: number;
  category: keyof typeof COLORS;
}

interface MonthlyTrend {
  month: string;
  donations: number;
  participants: number;
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
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'info',
      message: 'System maintenance scheduled for tonight at 2 AM EST',
      timestamp: new Date()
    }
  ]);

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

  const allocationData: AllocationData[] = [
    { name: 'Emergency Housing', value: 30, category: 'housing' },
    { name: 'Transitional Housing', value: 25, category: 'housing' },
    { name: 'Permanent Solutions', value: 15, category: 'housing' },
    { name: 'Medical Care', value: 6, category: 'support' },
    { name: 'Mental Health', value: 5, category: 'support' },
    { name: 'Addiction Recovery', value: 4, category: 'support' },
    { name: 'Food Programs', value: 4, category: 'services' },
    { name: 'Job Training', value: 3, category: 'services' },
    { name: 'Education', value: 3, category: 'services' },
    { name: 'Administration', value: 2, category: 'operations' },
    { name: 'Maintenance', value: 2, category: 'operations' },
    { name: 'Utilities', value: 1, category: 'operations' }
  ];

  const monthlyTrends: MonthlyTrend[] = [
    { month: 'Jan', donations: 18000, participants: 35 },
    { month: 'Feb', donations: 22000, participants: 38 },
    { month: 'Mar', donations: 28000, participants: 42 },
    { month: 'Apr', donations: 32000, participants: 45 },
    { month: 'May', donations: 35000, participants: 48 }
  ];

  const handleRegistrationSuccess = () => {
    setIsRegistrationOpen(false);
    // Add success alert or refresh data
  };

  const handleDismissAlert = (id: string) => {
    // Implement alert dismissal logic
    console.log('Dismiss alert:', id);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {t('admin.shelter.dashboard.title')}
          </h1>
          <Button onClick={logout}>
            <Icon name="user-minus" className="h-4 w-4 mr-2" />
            {t('admin.shelter.dashboard.signOut')}
          </Button>
        </div>

        <SystemAlerts alerts={alerts} onDismiss={handleDismissAlert} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg">
                <Icon name="dollar-sign" className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('admin.shelter.stats.totalDonations')}</p>
                <p className="text-2xl font-bold text-white">${stats.totalDonations.toLocaleString()}</p>
              </div>
            </div>
          </div>
          {/* Add other stat cards */}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Allocation Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {t('admin.shelter.charts.allocation')}
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={allocationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.category][Object.keys(COLORS[entry.category])[0]]}
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

          {/* Monthly Trends */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {t('admin.shelter.charts.monthlyTrends')}
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer>
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
        </div>

        {/* Participant Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ParticipantLeaderboard participants={[]} />
          <DonorList donors={[]} onViewDetails={(id: string) => console.log('View donor:', id)} />
        </div>

        {isRegistrationOpen && (
          <ParticipantRegistrationModal
            isOpen={isRegistrationOpen}
            onClose={() => setIsRegistrationOpen(false)}
            onSubmit={handleRegistrationSuccess}
          />
        )}
      </div>
    </div>
  );
} 