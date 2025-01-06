import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';
import { AreaChart } from '@/features/dashboard/shared/analytics/charts/AreaChart';
import { motion } from 'framer-motion';

interface TokenCardProps {
  className?: string;
}

export function TokenCard({ className }: TokenCardProps) {
  const { t } = useTranslation();

  // Sample price data
  const priceData = [
    { timestamp: '00:00', value: 0.42 },
    { timestamp: '04:00', value: 0.45 },
    { timestamp: '08:00', value: 0.44 },
    { timestamp: '12:00', value: 0.47 },
    { timestamp: '16:00', value: 0.49 },
    { timestamp: '20:00', value: 0.51 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 ${className}`}
    >
      {/* Token Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-white">$SHELTR</h2>
          <Icon name="verified" className="ml-2 h-5 w-5 text-blue-400" />
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-white">$0.51</span>
          <span className="text-emerald-400 flex items-center text-sm">
            <Icon name="trendingUp" className="h-4 w-4 mr-1" />
            8.5%
          </span>
        </div>
      </div>

      {/* Price Chart */}
      <div className="h-48 mb-6">
        <AreaChart 
          data={priceData}
          gradient
          color="indigo"
        />
      </div>

      {/* Token Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-gray-400 text-sm mb-1">24h Volume</div>
          <div className="text-white font-semibold">$124.5K</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm mb-1">Market Cap</div>
          <div className="text-white font-semibold">$5.1M</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm mb-1">Holders</div>
          <div className="text-white font-semibold">1,234</div>
        </div>
      </div>
    </motion.div>
  );
} 