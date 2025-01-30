import { motion } from 'framer-motion';
import { PlatformStatusSection as CorePlatformStatus } from '@/features/dashboard/shared/analytics/PlatformStatusSection';

export function PlatformStatusSection() {
  return (
    <section id="platform-status" className="py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6"
      >
        <CorePlatformStatus />
      </motion.div>
    </section>
  );
} 