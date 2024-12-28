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
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-${customColor}-500/20`}>
                <Icon name={icon} className={`h-5 w-5 text-${customColor}-400`} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-2xl font-semibold text-white">{value}</p>
              </div>
            </div>
            <div className={`text-${trendUp ? 'green' : 'red'}-400 text-sm`}>
              {trend}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
} 