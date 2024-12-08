import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';

export function ImpactPage() {
  const { t } = useTranslation();

  // Sample data - replace with real data
  const donationTrends = [
    { date: '12/31/2023', total: 12000, housing: 3000, direct: 8000, operations: 1000 },
    { date: '1/31/2024', total: 18000, housing: 4500, direct: 12000, operations: 1500 },
    { date: '2/29/2024', total: 24000, housing: 6000, direct: 16000, operations: 2000 }
  ];

  const allocationData = [
    { name: 'Direct Support', value: 80, color: '#818CF8' },
    { name: 'Housing Fund', value: 15, color: '#34D399' },
    { name: 'Operations', value: 5, color: '#F472B6' }
  ];

  const impactMetrics = [
    { name: 'Housing Success Rate', value: 85, color: '#34D399' },
    { name: 'Community Engagement', value: 92, color: '#818CF8' },
    { name: 'Resource Utilization', value: 78, color: '#F472B6' }
  ];

  // Define chart colors
  const chartColors = {
    primary: '#818CF8',    // Indigo
    secondary: '#34D399',  // Green
    tertiary: '#F472B6',   // Pink
    background: '#1F2937', // Dark background
    text: '#9CA3AF',       // Gray text
  };

  // Add gradient definitions for each data series
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

  // Add animation variants
  const chartAnimations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Add chart animation config
  const chartConfig = {
    animate: true,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease-out'
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with animation */}
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

        {/* Key Metrics with staggered animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6"
            variants={chartAnimations}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-2">
              <Icon name="home" className="h-6 w-6 text-indigo-400 mr-2" />
              <h3 className="text-lg font-medium text-white">15</h3>
            </div>
            <p className="text-gray-400">Participants Housed</p>
          </motion.div>

          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6"
            variants={chartAnimations}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-2">
              <Icon name="map-pin" className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-lg font-medium text-white">3</h3>
            </div>
            <p className="text-gray-400">Cities & Towns</p>
          </motion.div>

          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6"
            variants={chartAnimations}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-2">
              <Icon name="trending-up" className="h-6 w-6 text-pink-400 mr-2" />
              <h3 className="text-lg font-medium text-white">12%</h3>
            </div>
            <p className="text-gray-400">Increase in Donations</p>
          </motion.div>
        </motion.div>

        {/* Donation Trends Chart with animation */}
        <motion.div 
          className="bg-gray-800/50 rounded-xl p-6 mb-12"
          variants={chartAnimations}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            {t('impact.metrics.trends.title')}
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={donationTrends} {...chartConfig}>
                {gradients}
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                />
                <YAxis 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    color: '#fff'
                  }}
                  // Add animation to tooltip
                  animationDuration={200}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke={chartColors.primary}
                  fill="url(#colorTotal)"
                  strokeWidth={2}
                  // Add animation
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Area
                  type="monotone"
                  dataKey="housing"
                  stroke={chartColors.secondary}
                  fill="url(#colorHousing)"
                  strokeWidth={2}
                  // Add animation
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Area
                  type="monotone"
                  dataKey="direct"
                  stroke={chartColors.tertiary}
                  fill="url(#colorDirect)"
                  strokeWidth={2}
                  // Add animation
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Legend 
                  wrapperStyle={{ color: chartColors.text }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Fund Allocation and Impact Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Fund Allocation */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Fund Allocation</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Impact Metrics</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactMetrics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {impactMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-800/50 rounded-xl p-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            {t('impact.cta.title')}
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('impact.cta.description')}
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
} 