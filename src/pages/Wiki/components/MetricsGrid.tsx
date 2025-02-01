import { Activity, DollarSign, Users, Building2, Trophy, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: number;
}

const MetricCard = ({ title, value, icon, trend }: MetricCardProps) => (
  <Card className="w-full">
    <div className="p-4 flex flex-col min-w-0">
      <div className="flex items-center justify-between">
        <div className="w-5 h-5 text-gray-400 flex-shrink-0">{icon}</div>
        <Badge 
          variant={trend > 0 ? 'success' : 'error'} 
          size="sm"
          className="flex-shrink-0"
        >
          {trend > 0 ? "+" : ""}{trend}%
        </Badge>
      </div>
      <p className="text-2xl font-bold text-white mt-2 truncate">{value}</p>
      <p className="text-sm text-gray-400 mt-1 truncate">{title}</p>
    </div>
  </Card>
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
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-2">
        <LineChart className="w-5 h-5 text-violet-500 flex-shrink-0" />
        <h2 className="text-xl font-semibold text-white">Metrics</h2>
      </div>

      <div className="flex flex-col space-y-3">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};