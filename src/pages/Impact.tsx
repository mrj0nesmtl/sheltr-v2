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
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

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
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Impact
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tracking real change in our community through transparent data
            </p>
          </motion.div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="flex items-center space-x-1 bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs">
                    <ArrowUp className="w-3 h-3" />
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-gray-400 text-sm">{metric.title}</h3>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Donation Trends
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={donationData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 