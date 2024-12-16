import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  chart?: ReactNode;
  delay?: number;
}

export function MetricCard({ title, value, trend, chart, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all"
    >
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-bold text-white">{value}</span>
        {trend && (
          <span className={`text-sm ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
      
      {chart && (
        <div className="mt-4">
          {chart}
        </div>
      )}
    </motion.div>
  );
}
