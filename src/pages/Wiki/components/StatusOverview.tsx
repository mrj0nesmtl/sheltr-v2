import { Shield } from 'lucide-react';
import type { SystemStatus } from '../types';

interface StatusCardProps {
  label: string;
  value: string;
  status: 'success' | 'warning' | 'error';
}

const StatusCard = ({ label, value, status }: StatusCardProps) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'success' ? 'bg-green-500/20 text-green-400' :
        status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
        'bg-red-500/20 text-red-400'
      }`}>
        {status}
      </span>
    </div>
  </div>
);

interface StatusOverviewProps {
  systemStatus: SystemStatus;
}

export const StatusOverview = ({ systemStatus }: StatusOverviewProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        System Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          label="System"
          value={systemStatus.isOperational ? 'Operational' : 'Issues Detected'}
          status={systemStatus.isOperational ? 'success' : 'warning'}
        />
        <StatusCard
          label="Security"
          value={`${systemStatus.securityHealth}%`}
          status={systemStatus.securityHealth > 90 ? 'success' : 'warning'}
        />
        <StatusCard
          label="API"
          value={systemStatus.apiStatus}
          status={systemStatus.apiStatus === 'Healthy' ? 'success' : 'warning'}
        />
        <StatusCard
          label="Response Time"
          value={`${systemStatus.responseTime}ms`}
          status={systemStatus.responseTime < 200 ? 'success' : 'warning'}
        />
      </div>
    </div>
  );
}; 