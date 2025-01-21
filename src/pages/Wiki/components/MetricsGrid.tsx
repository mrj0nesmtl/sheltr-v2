import { Activity, DollarSign, Users, Building2, Trophy, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: number;
}

const MetricCard = ({ title, value, icon, trend }: MetricCardProps) => (
  <div className="bg-gray-900/50 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="w-5 h-5 text-gray-400">{icon}</div>
      <span className={cn(
        "text-sm font-medium",
        trend > 0 ? "text-green-500" : "text-red-400"
      )}>
        {trend > 0 ? "+" : ""}{trend}%
      </span>
    </div>
    <p className="text-3xl font-bold text-white mt-2">{value}</p>
    <p className="text-sm text-gray-400 mt-1">{title}</p>
  </div>
);

export const MetricsGrid = () => {
  const metrics = [
    {
      title: "Total Donations",
      value: "1,234",
      icon: <DollarSign />,
      trend: 12
    },
    {
      title: "Active Shelters",
      value: "45",
      icon: <Building2 />,
      trend: 8
    },
    {
      title: "People Helped",
      value: "789",
      icon: <Users />,
      trend: 15
    },
    {
      title: "Success Rate",
      value: "92",
      icon: <Trophy />,
      trend: 5
    }
  ];

  return (
    <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <LineChart className="w-6 h-6 text-violet-500" />
        <h2 className="text-xl font-bold text-white">Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </section>
  );
};