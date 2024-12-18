import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  format?: 'number' | 'currency';
  className?: string;
}

export function StatCard({ title, value, icon, format = 'number', className }: StatCardProps) {
  const formattedValue = format === 'currency' 
    ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}` 
    : value.toLocaleString();

  return (
    <div className={cn("bg-white/10 backdrop-blur-lg rounded-xl p-6", className)}>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-500/20 rounded-lg">
          <Icon name={icon} className="h-6 w-6 text-indigo-400" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">{formattedValue}</p>
        </div>
      </div>
    </div>
  );
} 