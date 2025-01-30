import { motion } from 'framer-motion';
import { StatCard } from '@/features/dashboard/shared/widgets/StatCard';
import { Home, Users, Building2, Wallet, HeartHandshake, TrendingUp } from 'lucide-react';

export function AnalyticsSection() {
  const impactMetrics = [
    {
      title: "Participants Housed",
      value: "12",
      icon: "home",
      change: "+2 this week"
    },
    {
      title: "Total Donations",
      value: "8.9K",
      icon: "heart-handshake",
      format: "currency"
    },
    {
      title: "Active Shelters",
      value: "3",
      icon: "building",
      change: "+1 new"
    },
    {
      title: "Lives Impacted",
      value: "47",
      icon: "users",
      change: "+5 this week"
    },
    {
      title: "Monthly Disbursements",
      value: "5.2K",
      icon: "wallet",
      format: "currency"
    },
    {
      title: "Allocation Rate",
      value: "96.3%",
      icon: "trending-up",
      change: "+0.8%"
    }
  ];

  return (
    <section id="analytics-section" className="py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Impact Analytics</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Last updated: Today, 11:23 AM</span>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {impactMetrics.map((metric) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <StatCard
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                format={metric.format}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 