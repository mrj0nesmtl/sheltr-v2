import { Card } from '@/components/ui/Card';
import type { IconName } from '@/components/ui/Icon';
import { Icon } from '@/components/ui/Icon';

interface QuickStatCardProps {
  icon: IconName;
  label: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  customColor?: 'indigo' | 'emerald' | 'purple' | 'yellow';
}

export function QuickStatCard({
  icon,
  label,
  value,
  trend,
  trendUp,
  customColor = 'indigo'
}: QuickStatCardProps) {
  const colorMap = {
    indigo: 'text-indigo-400 bg-indigo-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/20',
    purple: 'text-purple-400 bg-purple-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/20'
  };

  return (
    <Card>
      <Card.Content className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${colorMap[customColor]}`}>
            <Icon name={icon} className="h-6 w-6" />
          </div>
          <div className={`flex items-center gap-1 ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
            <Icon name={trendUp ? 'trending-up' : 'trending-down'} className="h-4 w-4" />
            <span>{trend}</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </Card.Content>
    </Card>
  );
} 