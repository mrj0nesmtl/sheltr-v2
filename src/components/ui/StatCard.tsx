import type { IconName } from '@/components/ui/Icon';
import { Icon } from '@/components/ui/Icon';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: IconName;
  format?: 'number' | 'currency';
}

export function StatCard({ title, value, icon, format = 'number' }: StatCardProps) {
  const formattedValue = format === 'currency' 
    ? `$${Number(value).toLocaleString()}`
    : value;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-500/20 rounded-lg">
          <Icon name={icon} className="h-6 w-6 text-indigo-400" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">
            {formattedValue}
          </p>
        </div>
      </div>
    </div>
  );
} 