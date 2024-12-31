import { motion } from 'framer-motion';
import {
    ArrowUp,
    Building2,
    Home,
    LucideIcon,
    TrendingUp,
    Users
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart } from '@/features/dashboard/shared/analytics/charts/AreaChart';
import { MetricCard } from '@/features/dashboard/shared/analytics/metrics/MetricCard';
import { PageBackground } from '@/components/ui/PageBackground';

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

export default function Impact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900">
      <PageBackground
        imagePath="/images/backgrounds/impact-bg.jpg"
        opacity={15}
        fadeHeight="75vh"
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

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Donation Trends
          </h2>
          <AreaChart data={donationData} />
        </div>
      </div>
    </div>
  );
} 