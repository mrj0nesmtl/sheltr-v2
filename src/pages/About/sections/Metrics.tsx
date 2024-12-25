import { AreaChart } from '@/features/dashboard/shared/widgets/charts/AreaChart';
import { BarChart } from '@/features/dashboard/shared/widgets/charts/BarChart';
import { LineChart } from '@/features/dashboard/shared/widgets/charts/LineChart';
import { motion } from 'framer-motion';
import { MetricCard } from '../components/MetricCard';

const sampleData = {
  health: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [98, 99, 98.5, 99.5, 99.8, 99.9],
  },
  donations: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [800, 950, 1000, 1100, 1200, 1234],
  },
  success: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [95, 96, 96.5, 97, 97.5, 98],
  },
};

export function Metrics() {
  return (
    <section className="py-20 px-4 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="text-sm uppercase tracking-wider text-gray-400 block mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Live Project Metrics
          </motion.span>
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Real-time insights into our platform's performance and impact.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MetricCard
            title="System Health"
            value="99.9%"
            trend="+0.1%"
            chart={<AreaChart data={sampleData.health} />}
          />
          <MetricCard
            title="Active Donations"
            value="1,234"
            trend="+12%"
            chart={<BarChart data={sampleData.donations} />}
          />
          <MetricCard
            title="Success Rate"
            value="98%"
            trend="+2%"
            chart={<LineChart data={sampleData.success} />}
          />
        </div>
      </div>
    </section>
  );
}
