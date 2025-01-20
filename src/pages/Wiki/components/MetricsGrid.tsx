import { Icons } from '@/lib/icons';
import { cn } from '@/lib/utils';
import type { WikiData } from '../types';

interface MetricsGridProps {
  metrics: WikiData['metrics'];
  className?: string;
}

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: number; 
  icon: React.ElementType; 
  trend?: number;
}) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <Icon className="w-5 h-5 text-gray-400" />
      <span className={cn(
        "text-sm font-medium",
        trend && trend > 0 ? "text-green-400" : "text-red-400"
      )}>
        {trend && `${trend > 0 ? '+' : ''}${trend}%`}
      </span>
    </div>
    <h3 className="mt-4 text-2xl font-bold text-white">{value.toLocaleString()}</h3>
    <p className="text-sm text-gray-400">{title}</p>
  </div>
);

export const MetricsGrid = ({ metrics, className }: MetricsGridProps) => {
  const { barChart, dollarSign, users, trophy } = Icons;
  
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      <MetricCard
        title="Total Donations"
        value={metrics.totalDonations}
        icon={dollarSign}
        trend={12}
      />
      <MetricCard
        title="Active Shelters"
        value={metrics.activeShelters}
        icon={barChart}
        trend={8}
      />
      <MetricCard
        title="People Helped"
        value={metrics.peopleHelped}
        icon={users}
        trend={15}
      />
      <MetricCard
        title="Success Rate"
        value={metrics.successRate}
        icon={trophy}
      />
    </div>
  );
};