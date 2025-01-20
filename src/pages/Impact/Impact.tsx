import { useState } from 'react';
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
import { useEffect } from 'react';
import { usePlatformStatus } from '@/services/platformStatus';
import { Home, Building2, Users, TrendingUp, Server, Activity, Shield, Database, History } from 'lucide-react';
import { MetricCard } from '@/features/dashboard/shared/analytics/metrics/MetricCard';

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

export default function Impact() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { version, systemStatus, fetchStatus } = usePlatformStatus();

  // Add platformStats data
  const platformStats = [
    {
      title: 'System Status',
      value: 'Operational',
      status: 'success',
      icon: Server
    },
    {
      title: 'Response Time',
      value: '134ms',
      status: 'good',
      icon: Activity
    },
    {
      title: 'Network Health',
      value: '99.9%',
      status: 'success',
      icon: Shield
    },
    {
      title: 'API Status',
      value: 'Healthy',
      status: 'success',
      icon: Database
    }
  ];

  // Define metrics here
  const metrics = [
    {
      title: 'Participants Housed',
      value: '1,234',
      change: '+12%',
      icon: Home,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10'
    },
    {
      title: 'Cities and Towns',
      value: '48',
      change: '+8%',
      icon: Building2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      title: 'Lives Impacted',
      value: '5,678',
      change: '+23%',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      title: 'Donation Increase',
      value: '$789K',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10'
    }
  ];

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <div 
      className="min-h-screen bg-gray-900 relative"
      style={{
        backgroundImage: `url('/images/backgrounds/impact-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Add a darker overlay for better readability */}
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-[2px]" />
      
      {/* Mobile Navigation */}
      <ImpactMobileNav 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Sidebar */}
      <ImpactSidebar 
        className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col" 
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Impact
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Tracking real change in our community through transparent data
              </p>
            </motion.div>
          </div>
        </div>

        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Platform Status */}
            <section id="platform-status" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {platformStats.map((stat, index) => (
                  <div key={stat.title} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <stat.icon className="w-5 h-5 text-gray-400" />
                        <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        stat.status === 'success' ? 'bg-green-500/10 text-green-400' :
                        stat.status === 'good' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {stat.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Metrics Overview */}
            <section id="metrics" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <MetricCard 
                    key={metric.title}
                    {...metric}
                    index={index}
                  />
                ))}
              </div>
            </section>

            {/* Global Impact */}
            <section id="global-impact" className="py-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-6">Global Impact</h2>
                <GlobalDonationMap locations={SHELTER_LOCATIONS} />
              </div>
            </section>

            {/* Token Metrics */}
            <section id="token" className="py-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-6">Token Metrics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Keep existing token metrics */}
                  {/* ... */}
                </div>
              </div>
            </section>

            {/* Transaction History */}
            <section id="transactions" className="py-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <History className="w-6 h-6 mr-2" />
                  Recent Transactions
                </h2>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <TransactionRow key={tx.id} {...tx} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}