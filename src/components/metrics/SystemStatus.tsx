import { LucideIcon } from 'lucide-react';

interface SystemStatusProps {
  title: string;
  value: string;
  icon: LucideIcon;
  status: 'success' | 'active' | 'good' | 'warning' | 'error';
  color: string;
}

export const SystemStatus = ({ title, value, icon: Icon, status, color }: SystemStatusProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
      <div className="flex items-center">
        <Icon className={`w-5 h-5 ${color} mr-3`} />
        <div>
          <div className="text-sm text-gray-400">{title}</div>
          <div className="text-white font-semibold">{value}</div>
        </div>
      </div>
      <div className={`flex items-center ${
        status === 'success' ? 'text-emerald-400' :
        status === 'warning' ? 'text-amber-400' :
        status === 'error' ? 'text-red-400' :
        'text-blue-400'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-2 bg-current`} />
        <span className="text-sm capitalize">{status}</span>
      </div>
    </div>
  );
}; 