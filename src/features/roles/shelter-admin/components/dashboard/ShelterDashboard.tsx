import { useAuthStore } from '@/auth/stores/authStore';
import { DonationMap } from '@/components/Admin/DonationMap';
import { DonorList } from '@/components/Admin/DonorList';
import { ParticipantLeaderboard } from '@/components/Admin/ParticipantLeaderboard';
import { ParticipantRegistrationModal } from '@/components/Admin/ParticipantRegistrationModal';
import { SystemAlerts } from '@/components/Admin/SystemAlerts';
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

// Update IconName type to match available icons
type IconName = 
  | 'user' 
  | 'x' 
  | 'key' 
  | 'home' 
  | 'menu' 
  | 'search' 
  | 'activity' 
  | 'alert' 
  | 'settings'
  | 'hash'
  | 'info'
  | 'users'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-up';

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

// Update modal props interface
interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: unknown) => void;
}

// Add these interfaces at the top with the other interfaces
interface DonationLocation {
  id: string;
  lat: number;
  lng: number;
  amount: number;
  participant_name: string;
  created_at: string;
}

interface MonthlyTrend {
  month: string;
  donations: number;
  participants: number;
}

// Update the IconName type to be more specific
type DashboardIconName = 
  | 'dollar-sign'  // Add this
  | 'user'
  | 'key'
  | 'home'
  | 'menu'
  | 'search'
  | 'activity'
  | 'alert'
  | 'x';

// Update the stats section with proper icon names
const StatItem: React.FC<{
  icon: DashboardIconName;
  label: string;
  value: string | number;
  bgColor: string;
  textColor: string;
}> = ({ icon, label, value, bgColor, textColor }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
    <div className="flex items-center gap-3">
      <div className={`p-3 ${bgColor} rounded-lg`}>
        <Icon name={icon} className={`h-6 w-6 ${textColor}`} />
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

export function ShelterDashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'info',
      message: 'System maintenance scheduled for tonight at 2 AM EST',
      timestamp: new Date()
    }
  ]);

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

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

  const statsConfig = [
    {
      icon: 'dollar-sign' as DashboardIconName,
      label: 'Total Donations',
      value: `$${stats.totalDonations.toLocaleString()}`,
      bgColor: 'bg-indigo-500/20',
      textColor: 'text-indigo-400'
    },
    {
      icon: 'user' as DashboardIconName,
      label: 'Active Participants',
      value: stats.activeParticipants,
      bgColor: 'bg-green-500/20',
      textColor: 'text-green-400'
    },
    // ... add other stats similarly
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
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
              onClick={logout}
            >
              <Icon name="x" className="h-4 w-4 mr-2" />
              {t('common.signOut')}
            </Button>
          </div>
        </div>

        <SystemAlerts alerts={alerts} onDismiss={handleDismissAlert} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statsConfig.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
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
            title="Register New Participant"
          />
        )}
      </div>
    </div>
  );
} 