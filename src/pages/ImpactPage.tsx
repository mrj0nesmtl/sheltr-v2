import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { DonationTrends } from '@/components/Analytics/DonationTrends';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar, LineChart, Line
} from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';
import { TransactionTable } from '@/components/Analytics/TransactionTable';
import { ImpactMetrics } from '@/components/Analytics/ImpactMetrics';
import { IconName } from '@/components/ui/Icon';

interface StatItem {
  iconName: IconName;  // This ensures type safety for icons
  value: string;
  label: string;
  color: 'indigo' | 'green' | 'blue' | 'purple';
}

// Add monthly growth data
const monthlyGrowthData = [
  { month: 'Jan', participants: 45, donations: 89, amount: 12500 },
  { month: 'Feb', participants: 52, donations: 102, amount: 15800 },
  { month: 'Mar', participants: 58, donations: 118, amount: 14200 },
  { month: 'Apr', participants: 65, donations: 132, amount: 19500 },
  { month: 'May', participants: 72, donations: 145, amount: 22000 },
  { month: 'Jun', participants: 80, donations: 160, amount: 24500 }
];

export default function ImpactPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats: StatItem[] = [
    {
      iconName: 'home',
      value: '15',
      label: t('impact.metrics.participantsHoused'),
      color: 'indigo'
    },
    {
      iconName: 'map-pin',
      value: '3',
      label: t('impact.metrics.citiesAndTowns'),
      color: 'green'
    },
    {
      iconName: 'trending-up',
      value: '12%',
      label: t('impact.metrics.donationIncrease'),
      color: 'blue'
    },
    {
      iconName: 'users',
      value: '250+',
      label: t('impact.metrics.livesImpacted'),
      color: 'purple'
    }
  ];

  // Sample data - replace with real data
  const donationTrends = [
    { date: '12/31/2023', total: 12000, housing: 3000, direct: 8000, operations: 1000 },
    { date: '1/31/2024', total: 18000, housing: 4500, direct: 12000, operations: 1500 },
    { date: '2/29/2024', total: 24000, housing: 6000, direct: 16000, operations: 2000 }
  ];

  const allocationData = [
    { 
      name: 'Direct Support', 
      value: 80, 
      color: '#818CF8',
      description: 'Essential needs & services',
      icon: 'user-check',
      amount: '$24,000'
    },
    { 
      name: 'Housing Fund', 
      value: 15, 
      color: '#34D399',
      description: 'Transitional housing support',
      icon: 'home',
      amount: '$4,500'
    },
    { 
      name: 'Operations', 
      value: 5, 
      color: '#F472B6',
      description: 'Platform maintenance',
      icon: 'settings',
      amount: '$1,500'
    }
  ];

  const impactMetrics = [
    { name: 'Housing Success Rate', value: 85, color: '#34D399' },
    { name: 'Community Engagement', value: 92, color: '#818CF8' },
    { name: 'Resource Utilization', value: 78, color: '#F472B6' }
  ];

  // Chart colors
  const chartColors = {
    primary: '#818CF8',    // Indigo
    secondary: '#34D399',  // Green
    tertiary: '#F472B6',   // Pink
    background: '#1F2937', // Dark background
    text: '#9CA3AF',       // Gray text
  };

  // Gradient definitions
  const gradients = (
    <defs>
      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8}/>
        <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorHousing" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.8}/>
        <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={chartColors.tertiary} stopOpacity={0.8}/>
        <stop offset="95%" stopColor={chartColors.tertiary} stopOpacity={0}/>
      </linearGradient>
    </defs>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('impact.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('impact.subtitle')}
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 flex items-center hover:bg-gray-800/70 transition-colors"
            >
              <div className={`p-3 bg-${stat.color}-500/20 rounded-lg mr-4`}>
                <Icon name={stat.iconName} className={`h-6 w-6 text-${stat.color}-400`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all" />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Donation Trends */}
          <div className="w-full">
            <DonationTrends />
          </div>

          {/* Fund Allocation */}
          <div className="bg-gray-800/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              {t('impact.charts.fundAllocation')}
            </h2>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Pie Chart */}
              <div className="flex-1">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={6}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth={3}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-xl">
                                <div className="flex items-center gap-3 mb-2">
                                  <Icon name={data.icon as IconName} className="h-6 w-6" style={{ color: data.color }} />
                                  <span className="text-lg font-medium text-white">{data.name}</span>
                                </div>
                                <div className="text-base text-gray-300">{data.description}</div>
                                <div className="mt-3 text-xl font-medium" style={{ color: data.color }}>
                                  {data.value}% ({data.amount})
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Legend & Stats */}
              <div className="flex flex-col gap-4 justify-center min-w-[300px]">
                {allocationData.map((item) => (
                  <div 
                    key={item.name}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors hover:bg-gray-800/70"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl" style={{ backgroundColor: `${item.color}20` }}>
                        <Icon name={item.icon as IconName} className="h-7 w-7" style={{ color: item.color }} />
                      </div>
                      <div>
                        <div className="text-lg font-medium text-white">{item.name}</div>
                        <div className="text-base text-gray-400">{item.description}</div>
                        <div className="mt-2">
                          <span className="text-3xl font-bold" style={{ color: item.color }}>
                            {item.value}%
                          </span>
                          <span className="ml-3 text-lg text-gray-400">{item.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="bg-gray-800/50 rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Success Metrics
                </h2>
                <p className="text-gray-400 mt-1">
                  {t('impact.metrics.description')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Icon name="calendar" className="h-5 w-5" />
                <span className="text-sm">Last 30 days</span>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactMetrics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    type="number" 
                    stroke="#9CA3AF"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#9CA3AF"
                    width={150}
                    tick={{ fontSize: 14 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.95)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff',
                      padding: '12px'
                    }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {impactMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Blockchain Transactions */}
          <div className="w-full">
            <TransactionTable />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Add new chart components */}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center bg-gray-800/50 rounded-xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {t('impact.cta.title')}
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('impact.cta.description')}
          </p>
          <Button
            onClick={() => navigate('/signup')}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {t('impact.cta.getStarted')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
} 