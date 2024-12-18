import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description?: string;
  features?: string[];
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({
  title,
  description,
  features,
  icon: Icon,
  iconBg = 'bg-indigo-500/20',
  iconColor = 'text-indigo-400',
  className = '',
  delay = 0
}: FeatureCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-colors ${className}`}
    >
      <div className="flex items-center mb-6">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mr-4`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </motion.div>
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
      </div>
      {description && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="text-gray-300 mb-4"
        >
          {description}
        </motion.p>
      )}
      {features && (
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + 0.4 + (index * 0.1) }}
              className="flex items-center text-gray-300"
            >
              <span className={`w-1.5 h-1.5 ${iconColor} rounded-full mr-2`} />
              {feature}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
} 