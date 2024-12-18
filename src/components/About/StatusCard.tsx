import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface StatusCardProps {
  title: string;
  icon: LucideIcon;
  delay?: number;
  children: React.ReactNode;
  variant?: 'default' | 'compact';
}

export function StatusCard({ 
  title, 
  icon: Icon, 
  delay = 0, 
  children,
  variant = 'default'
}: StatusCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`
        bg-gray-800/30 rounded-lg 
        ${variant === 'compact' ? 'p-3' : 'p-4'} 
        hover:bg-gray-800/40 transition-colors
      `}
    >
      <div className="flex items-center mb-3">
        <div className={`
          ${variant === 'compact' ? 'w-8 h-8' : 'w-10 h-10'}
          bg-gray-700/50 rounded-lg flex items-center justify-center mr-3
        `}>
          <Icon className={`
            ${variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'}
            text-indigo-400
          `} />
        </div>
        <h3 className={`
          text-white font-medium
          ${variant === 'compact' ? 'text-sm' : 'text-base'}
        `}>
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
} 