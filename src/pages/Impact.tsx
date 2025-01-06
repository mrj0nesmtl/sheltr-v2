import { motion } from 'framer-motion';
import {
    ArrowUp,
    Building2,
    Home,
    LucideIcon,
    TrendingUp,
    Users,
    Activity,
    CandlestickChart,
    ArrowUpRight,
    ListOrdered,
    CircleDollarSign,
    Globe,
    Shield,
    Server,
    CheckCircle2,
    Clock,
    Tag,
    RefreshCw,
    Database,
    History
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart } from '@/features/dashboard/shared/analytics/charts/AreaChart';
import { MetricCard } from '@/features/dashboard/shared/analytics/metrics/MetricCard';
import { PageBackground } from '@/components/ui/PageBackground';
import { TokenCard } from '@/components/Token/TokenCard';
import TransactionList from "@/components/Blockchain/TransactionList";
import { GlobalDonationMap } from '@/features/dashboard/roles/shelter-admin/components/GlobalDonationMap';
import { PieChart } from '@/components/charts/PieChart';
import { SystemStatus } from '@/components/metrics/SystemStatus';
import { DonationAllocationPieChart } from '@/components/ui/Charts/DonationAllocationPieChart';
import { useEffect } from 'react';
import { usePlatformStatus } from '@/services/platformStatus';
import { LineChart } from '@/components/charts/LineChart';
import { TransactionRow } from '@transactions/TransactionRow';

// Define types
interface DonationData {
  month: string;
  amount: number;
}

interface Metric {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

// Type the sample data
const donationData: DonationData[] = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 5000 },
  { month: 'Mar', amount: 4800 },
  { month: 'Apr', amount: 6000 },
  { month: 'May', amount: 7000 },
  { month: 'Jun', amount: 8500 },
];

const metrics: Metric[] = [
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

// Add new interfaces
interface LocationData {
  lat: number;
  lng: number;
  name: string;
  participants: number;
}

interface AllocationData {
  category: string;
  amount: number;
  color: string;
}

// Add sample data
const locationData: LocationData[] = [
  { lat: 43.6532, lng: -79.3832, name: "Toronto Shelter", participants: 156 },
  { lat: 49.2827, lng: -123.1207, name: "Vancouver Haven", participants: 89 },
  { lat: 40.7128, lng: -74.0060, name: "NYC Center", participants: 234 },
  // Add more locations...
];

const allocationData: AllocationData[] = [
  { category: "Direct Aid", amount: 65, color: "emerald" },
  { category: "Housing", amount: 20, color: "blue" },
  { category: "Education", amount: 10, color: "purple" },
  { category: "Operations", amount: 5, color: "gray" },
];

const volumeData = [1000, 1200, 800, 1600, 1200, 1800, 2000];
const marketCapData = [5000000, 5100000, 5050000, 5200000, 5150000, 5300000, 5100000];
const holdersData = [1000, 1050, 1100, 1150, 1200, 1220, 1234];

const recentTransactions = [
  {
    id: '1',
    type: 'receive' as const,
    amount: 1500,
    address: '0x1234567890abcdef1234567890abcdef12345678',
    timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: '2',
    type: 'send' as const,
    amount: 2000,
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: '3',
    type: 'receive' as const,
    amount: 3500,
    address: '0x7890abcdef1234567890abcdef1234567890abcd',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  }
];

export default function Impact() {
  const { t } = useTranslation();
  const { version, systemStatus, fetchStatus } = usePlatformStatus();

  useEffect(() => {
    // Fetch initial status
    fetchStatus();

    // Set up polling for real-time updates
    const interval = setInterval(fetchStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [fetchStatus]);

  const platformStats = [
    {
      title: "System Status",
      value: systemStatus.isOperational ? "Operational" : "Issues Detected",
      icon: Server,
      status: systemStatus.isOperational ? "success" : "warning",
      color: "text-emerald-400"
    },
    {
      title: "Response Time",
      value: `${systemStatus.responseTime}ms`,
      icon: Activity,
      status: systemStatus.responseTime < 200 ? "good" : "warning",
      color: "text-blue-400"
    },
    {
      title: "Network Health",
      value: `${systemStatus.networkHealth}%`,
      icon: Shield,
      status: systemStatus.networkHealth > 99 ? "success" : "warning",
      color: "text-purple-400"
    },
    {
      title: "Uptime",
      value: `${systemStatus.uptime}%`,
      icon: Clock,
      status: "success",
      color: "text-green-400"
    },
    {
      title: "Version",
      value: `v${version}`,
      icon: Tag,
      status: "stable",
      color: "text-amber-400"
    },
    {
      title: "Last Update",
      value: new Date(systemStatus.lastUpdate).toLocaleTimeString(),
      icon: RefreshCw,
      status: "good",
      color: "text-blue-400"
    },
    {
      title: "Active Users",
      value: systemStatus.activeUsers.toLocaleString(),
      icon: Users,
      status: "good",
      color: "text-indigo-400"
    },
    {
      title: "API Status",
      value: systemStatus.apiStatus,
      icon: Database,
      status: systemStatus.apiStatus === 'Healthy' ? "success" : "warning",
      color: "text-teal-400"
    }
  ];

  // Add sample shelter locations
  const SHELTER_LOCATIONS = [
    { id: '1', name: 'Toronto Shelter', lat: 43.6532, lng: -79.3832, amount: 156000 },
    { id: '2', name: 'Vancouver Haven', lat: 49.2827, lng: -123.1207, amount: 89000 },
    { id: '3', name: 'NYC Center', lat: 40.7128, lng: -74.0060, amount: 234000 },
    { id: '4', name: 'Montreal Mission', lat: 45.5017, lng: -73.5673, amount: 178000 },
    // Add more locations as needed
  ];

  const tokenSection = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Token Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-gray-400 text-sm mb-2">24h Volume</h3>
          <p className="text-2xl font-bold text-white">$124.5K</p>
          <LineChart
            data={volumeData}
            color="#60A5FA"
            height={100}
            showTooltip
          />
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-gray-400 text-sm mb-2">Market Cap</h3>
          <p className="text-2xl font-bold text-white">$5.1M</p>
          <LineChart
            data={marketCapData}
            color="#34D399"
            height={100}
            showTooltip
          />
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-gray-400 text-sm mb-2">Holders</h3>
          <p className="text-2xl font-bold text-white">1,234</p>
          <LineChart
            data={holdersData}
            color="#A78BFA"
            height={100}
            showTooltip
          />
        </div>
      </div>

      {/* Recent Transactions */}
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <PageBackground
        imagePath="/images/backgrounds/impact-bg.jpg"
        opacity={15}
        fadeHeight="75vh"
        alt="Impact Background"
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Our Impact
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Tracking real change in our community through transparent data
            </p>
          </motion.div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} index={index} />
          ))}
        </div>
      </div>

      {/* Platform Status & Global Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Platform Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Platform Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {platformStats.map(stat => (
                <SystemStatus key={stat.title} {...stat} />
              ))}
            </div>
          </div>

          {/* Donation Allocation */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <DonationAllocationPieChart />
          </div>
        </div>
      </div>

      {/* Global Impact Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-2" />
            Global Impact
          </h2>
          <GlobalDonationMap 
            shelterLocations={SHELTER_LOCATIONS}
            initialView={{
              center: [43.6532, -79.3832],
              zoom: 4
            }}
          />
        </div>
      </div>

      {/* Token & Blockchain Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Token Stats & Donation Trends Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Donation Trends */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Donation Trends
            </h2>
            <div className="h-[300px]">
              <LineChart
                data={donationData}
                color="#60A5FA"
                height={300}
                showTooltip
                showAxis
                showLabels
              />
            </div>
          </div>

          {/* Token Stats */}
          <div className="space-y-6">
            {/* Token Header */}
            <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">$SHELTR</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-white">$0.51</span>
                <span className="ml-2 text-emerald-400">8.5%</span>
              </div>
            </div>

            {/* Token Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-gray-400 text-sm">24h Volume</h3>
                <p className="text-xl font-bold text-white">$124.5K</p>
                <LineChart
                  data={volumeData}
                  color="#60A5FA"
                  height={60}
                  showTooltip
                />
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-gray-400 text-sm">Market Cap</h3>
                <p className="text-xl font-bold text-white">$5.1M</p>
                <LineChart
                  data={marketCapData}
                  color="#34D399"
                  height={60}
                  showTooltip
                />
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-gray-400 text-sm">Holders</h3>
                <p className="text-xl font-bold text-white">1,234</p>
                <LineChart
                  data={holdersData}
                  color="#A78BFA"
                  height={60}
                  showTooltip
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
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
      </div>
    </div>
  );
} 