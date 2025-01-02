import { useAuthStore } from '@/auth/stores/authStore';
import { DonationMap } from '@/features/shared/analytics/maps/DonationMap';
import { UserNav } from '@/components/Navigation/UserNav';
import { DonorLeaderboard } from '@/features/dashboard/shared/widgets/DonorLeaderboard';
import { ParticipantLeaderboard } from '@/features/dashboard/shared/components/ParticipantLeaderboard';
import { ParticipantRegistrationModal } from '@/features/dashboard/shared/components/ParticipantRegistrationModal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShelterAdminSidebar } from '@/features/dashboard/shared/navigation/sidebar/ShelterAdminSidebar';
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
import { 
  ParticipantList,
  ParticipantManagementTable 
} from '@/features/roles/shelter-admin/components/participant-management';

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

export default function ShelterDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
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
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-72">
          <ShelterAdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-72">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center justify-between px-8 py-4">
              <h1 className="text-2xl font-bold text-white">
                {t('admin.shelter.welcome')}
              </h1>
              
              <div className="flex items-center space-x-4">
                <Button 
                  variant="default"
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => setIsRegistrationOpen(true)}
                >
                  <Icon name="user-plus" className="h-4 w-4 mr-2" />
                  {t('admin.shelter.participants.add')}
                </Button>
                
                <UserNav />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <StatCard
                icon="dollar-sign"
                label="Total Donations"
                value={`$${stats.totalDonations.toLocaleString()}`}
                trend="+12.5%"
              />
              <StatCard
                icon="users"
                label="Active Participants"
                value={stats.activeParticipants.toString()}
                trend="+4.2%"
              />
              <StatCard
                icon="target"
                label="Success Rate"
                value={`${stats.successRate}%`}
                trend="+5.3%"
              />
              <StatCard
                icon="home"
                label="Housing Placements"
                value={stats.housingPlacements.toString()}
                trend="+2.1%"
              />
              <StatCard
                icon="briefcase"
                label="Job Placements"
                value={stats.jobPlacements.toString()}
                trend="+3.7%"
              />
              <StatCard
                icon="activity"
                label="Active Services"
                value={stats.activeServices.toString()}
                trend="+1.2%"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-6">Global Donations</h3>
                <DonationMap />
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-6">Fund Allocation</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    {/* Your existing PieChart implementation */}
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Registration Modal */}
      {isRegistrationOpen && (
        <ParticipantRegistrationModal
          onClose={() => setIsRegistrationOpen(false)}
          onSuccess={() => setIsRegistrationOpen(false)}
        />
      )}
    </div>
  );
}

// StatCard component (you can move this to a separate file)
function StatCard({ icon, label, value, trend }: { icon: string; label: string; value: string; trend: string }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center">
        <div className="p-2 bg-gray-700 rounded-lg">
          <Icon name={icon} className="h-6 w-6 text-indigo-400" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className="text-sm text-green-400">{trend}</p>
        </div>
      </div>
    </div>
  );
} 