import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  label?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

export const MetricCard = ({ 
  title, 
  value, 
  trend, 
  label,
  status = 'info' 
}: MetricCardProps) => {
  const statusColors = {
    success: 'bg-green-500/10 text-green-400',
    warning: 'bg-yellow-500/10 text-yellow-400',
    error: 'bg-red-500/10 text-red-400',
    info: 'bg-blue-500/10 text-blue-400'
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-400" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-gray-800/50 p-4 backdrop-blur hover:bg-gray-800/70 transition-all"
    >
      <h3 className="text-sm font-medium text-gray-300">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-white">{value}</p>
        {label && <p className="ml-2 text-sm text-gray-300">{label}</p>}
      </div>
      {trend && (
        <div className={`mt-2 inline-flex items-center gap-1 rounded px-2 py-0.5 text-sm ${statusColors[status]}`}>
          {getTrendIcon()}
          <span className="text-gray-300">{trend}</span>
        </div>
      )}
    </motion.div>
  );
};