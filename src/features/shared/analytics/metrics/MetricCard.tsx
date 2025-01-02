import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus, LucideIcon } from 'lucide-react';
import { MetricCardProps } from '../types';

interface MetricCardProps {
  title: string
  value: string
  trend?: string
  label?: string
  status?: 'success' | 'warning' | 'error' | 'info'
}

export const MetricCard = ({ 
  title, 
  value, 
  trend, 
  label,
  status = 'info' 
}: MetricCardProps) => {
  const statusColors = {
    success: 'bg-green-500/10 text-green-500',
    warning: 'bg-yellow-500/10 text-yellow-500',
    error: 'bg-red-500/10 text-red-500',
    info: 'bg-blue-500/10 text-blue-500'
  }

  return (
    <div className="rounded-lg bg-gray-800/50 p-4 backdrop-blur">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-white">{value}</p>
        {label && <p className="ml-2 text-sm text-gray-400">{label}</p>}
      </div>
      {trend && (
        <div className={`mt-2 inline-flex items-center rounded px-2 py-0.5 text-sm ${statusColors[status]}`}>
          {trend}
        </div>
      )}
    </div>
  )
} 