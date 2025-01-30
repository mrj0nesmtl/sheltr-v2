import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImpactHeader } from './components/ImpactHeader';
import { ImpactSidebar } from './components/ImpactSidebar';
import { ImpactMobileNav } from './components/ImpactMobileNav';
import { PageBackground } from '@/components/ui/PageBackground';
import { TokenCard } from '@/components/Token/TokenCard';
import { TransactionRow } from '@/components/Transactions/TransactionRow';
import { GlobalDonationMap } from '@/features/dashboard/roles/shelter-admin/components/GlobalDonationMap';
import { PieChart, LineChart } from '@/features/shared/analytics/charts';
import { SystemStatus } from '@/components/metrics/SystemStatus';
import { Home, Building2, Users, TrendingUp, Server, Activity, Shield, Database, History, BarChart3, Globe2, Coins } from 'lucide-react';
import { MetricCard } from '@/features/dashboard/shared/analytics/metrics/MetricCard';
import impactBg from '/images/backgrounds/impact-bg.jpg';
import { ImpactLayout } from './layout/ImpactLayout';
import { TokenMetricsSection } from './components/TokenMetricsSection';
import { GlobalImpactSection } from './components/GlobalImpactSection';
import { TransactionsSection } from './components/TransactionsSection';
import { PlatformStatusSection } from './components/PlatformStatusSection';
import { usePlatformStatus } from '@/services/platformStatus';
import { AnalyticsSection } from './components/AnalyticsSection';

// Add shelter locations data
const SHELTER_LOCATIONS = [
  {
    id: '1',
    name: 'Downtown Shelter',
    lat: 40.7128,
    lng: -74.0060,
    city: 'New York',
    state: 'NY',
    donations: 125000
  },
  {
    id: '2',
    name: 'Harbor Hope',
    lat: 42.3601,
    lng: -71.0589,
    city: 'Boston',
    state: 'MA',
    donations: 98000
  },
  {
    id: '3',
    name: 'Mission Center',
    lat: 34.0522,
    lng: -118.2437,
    city: 'Los Angeles',
    state: 'CA',
    donations: 156000
  },
  {
    id: '4',
    name: 'Hope House',
    lat: 41.8781,
    lng: -87.6298,
    city: 'Chicago',
    state: 'IL',
    donations: 112000
  }
];

// Add sample transaction data
const recentTransactions = [
  {
    id: '1',
    type: 'donation',
    amount: '$250',
    from: '0x1234...5678',
    to: 'Downtown Shelter',
    status: 'completed',
    timestamp: '2024-01-19T10:30:00Z'
  },
  {
    id: '2',
    type: 'distribution',
    amount: '$1,000',
    from: 'Harbor Hope',
    to: 'Food Program',
    status: 'completed',
    timestamp: '2024-01-19T09:45:00Z'
  },
  {
    id: '3',
    type: 'donation',
    amount: '$500',
    from: '0x8765...4321',
    to: 'Mission Center',
    status: 'pending',
    timestamp: '2024-01-19T09:30:00Z'
  },
  {
    id: '4',
    type: 'allocation',
    amount: '$750',
    from: 'Hope House',
    to: 'Medical Aid',
    status: 'completed',
    timestamp: '2024-01-19T09:15:00Z'
  }
];

// Update the hero section styling
const heroSection = (
  <div 
    className="relative overflow-hidden bg-cover bg-center bg-no-repeat h-[50vh]"
    style={{
      backgroundImage: 'url("/images/backgrounds/impact-bg.jpg")',
    }}
  >
    {/* Dark gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/80 to-gray-900/95" />
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
          Impact
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          Tracking real change in our community through transparent data
        </p>
      </motion.div>
    </div>
  </div>
);

// Update platform stats styling
const platformStats = [
  {
    title: 'System Status',
    value: 'Operational',
    status: 'success',
    icon: Server,
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'Response Time',
    value: '134ms',
    status: 'good',
    icon: Activity,
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Network Health',
    value: '99.9%',
    status: 'good',
    icon: Shield,
    gradient: 'from-violet-500/20 to-purple-500/20'
  },
  {
    title: 'API Status',
    value: 'Healthy',
    status: 'success',
    icon: Database,
    gradient: 'from-rose-500/20 to-pink-500/20'
  }
];

// Enhanced metrics data with better styling
const metrics = [
  {
    title: 'Participants Housed',
    value: '1,234',
    change: '+12.3%',
    icon: Home,
    gradient: 'from-blue-600/20 to-indigo-600/20',
    trend: 'up'
  },
  {
    title: 'Cities and Towns',
    value: '48',
    change: '+4 new',
    icon: Building2,
    gradient: 'from-emerald-600/20 to-teal-600/20',
    trend: 'up'
  },
  {
    title: 'Lives Impacted',
    value: '5,678',
    change: '+23.5%',
    icon: Users,
    gradient: 'from-violet-600/20 to-purple-600/20',
    trend: 'up'
  },
  {
    title: 'Donation Increase',
    value: '$789K',
    change: '+45.9%',
    icon: TrendingUp,
    gradient: 'from-rose-600/20 to-pink-600/20',
    trend: 'up'
  }
];

export default function Impact() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fetchStatus } = usePlatformStatus();

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <div className="relative min-h-screen bg-gray-900">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${impactBg})`,
          opacity: 0.2,
        }}
      />

      <div className="relative z-10">
        <ImpactLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          {/* Main Content */}
          <main className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnalyticsSection />
              <GlobalImpactSection />
              <TransactionsSection />
              <TokenMetricsSection />
              <PlatformStatusSection />
            </div>
          </main>
        </ImpactLayout>
      </div>
    </div>
  );
}