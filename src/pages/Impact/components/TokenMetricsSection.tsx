import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { BlockchainStats } from '@/components/Blockchain/BlockchainStats';
import { TransactionTable } from '@/features/dashboard/shared/analytics/metrics/TransactionTable';
import { AreaChart } from '@/components/charts/AreaChart';

export function TokenMetricsSection() {
  // Sample token metrics data
  const tokenMetrics = [
    {
      title: 'Token Price',
      value: '$0.51',
      change: '+8.5%',
      trend: 'up',
      gradient: 'from-indigo-600/20 to-blue-600/20'
    },
    {
      title: 'Market Cap',
      value: '$5.1M',
      change: '+12.3%',
      trend: 'up',
      gradient: 'from-purple-600/20 to-indigo-600/20'
    },
    {
      title: '24h Volume',
      value: '$124.5K',
      change: '+15.7%',
      trend: 'up',
      gradient: 'from-pink-600/20 to-purple-600/20'
    },
    {
      title: 'Total Holders',
      value: '1,234',
      change: '+23',
      trend: 'up',
      gradient: 'from-rose-600/20 to-pink-600/20'
    }
  ];

  // Updated price data format to match the ChartDataPoint type
  const priceData = [
    { label: '00:00', value: 0.42 },
    { label: '04:00', value: 0.45 },
    { label: '08:00', value: 0.44 },
    { label: '12:00', value: 0.47 },
    { label: '16:00', value: 0.49 },
    { label: '20:00', value: 0.51 },
  ];

  return (
    <section id="token" className="py-6">
      <div className="space-y-6">
        {/* Token Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tokenMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative overflow-hidden rounded-2xl 
                bg-gradient-to-br ${metric.gradient} 
                p-6 backdrop-blur-xl border border-white/10
                flex flex-col justify-between
                min-h-[160px] group hover:scale-[1.02] transition-transform duration-200
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-white/80">{metric.title}</h3>
                <span className={`
                  px-2 py-1 text-xs rounded-full 
                  ${metric.trend === 'up' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}
                  flex items-center gap-1
                `}>
                  <Icon 
                    name={metric.trend === 'up' ? 'trendingUp' : 'trendingDown'} 
                    className="w-3 h-3" 
                  />
                  {metric.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-white tracking-tight">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Token Price Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-white">$SHELTR Price</h2>
              <Icon name="verified" className="ml-2 h-5 w-5 text-blue-400" />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-full bg-gray-700/50 text-white/80 text-sm">24H</button>
              <button className="px-3 py-1 rounded-full bg-gray-700/50 text-white/80 text-sm">7D</button>
              <button className="px-3 py-1 rounded-full bg-gray-700/50 text-white/80 text-sm">30D</button>
            </div>
          </div>
          <div className="h-64">
            <AreaChart 
              data={priceData}
              height={300}
            />
          </div>
        </div>

        {/* Blockchain Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BlockchainStats />
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Token Distribution</h3>
            {/* Add pie chart or distribution stats here */}
          </div>
        </div>

        {/* Recent Transactions */}
        <TransactionTable />
      </div>
    </section>
  );
} 