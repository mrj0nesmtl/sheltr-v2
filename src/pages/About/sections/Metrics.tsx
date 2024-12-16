import { motion } from 'framer-motion';
import { LineChart, BarChart, AreaChart } from '@/components/ui/Charts';
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
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Live Project Metrics
        </motion.h2>

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
