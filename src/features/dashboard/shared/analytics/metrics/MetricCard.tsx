import { motion } from 'framer-motion';
import { ArrowUp, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  index?: number;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  bgColor, 
  index = 0 
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="flex items-center space-x-1 bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs">
          <ArrowUp className="w-3 h-3" />
          <span>{change}</span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
} 