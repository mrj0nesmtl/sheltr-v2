import { Shield, Activity, Clock, Users, Database, RefreshCw, Server, Tag } from 'lucide-react';
import { usePlatformStatus } from '@/services/platformStatus';

interface SystemStatusProps {
  title: string;
  value: string;
  icon: React.ElementType;
  status: string;
  color: string;
}

const SystemStatus = ({ title, value, icon: Icon, status, color }: SystemStatusProps) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon className={`w-5 h-5 ${color} mr-3`} />
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'success' ? 'bg-green-500/20 text-green-400' :
        status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
        'bg-blue-500/20 text-blue-400'
      }`}>
        {status}
      </span>
    </div>
  </div>
);

export const PlatformStatusSection = () => {
  const { version, systemStatus } = usePlatformStatus();

  const statusItems = [
    {
      title: "System Status",
      value: systemStatus.isOperational ? "Operational" : "Issues Detected",
      icon: Server,
      status: systemStatus.isOperational ? "success" : "warning",
      color: "text-emerald-400"
    },
    {
      title: "Response Time",
      value: `${systemStatus.responseTime}ms`,
      icon: Activity,
      status: systemStatus.responseTime < 200 ? "good" : "warning",
      color: "text-blue-400"
    },
    {
      title: "Network Health",
      value: `${systemStatus.networkHealth}%`,
      icon: Shield,
      status: systemStatus.networkHealth > 99 ? "success" : "warning",
      color: "text-purple-400"
    },
    {
      title: "Uptime",
      value: `${systemStatus.uptime}%`,
      icon: Clock,
      status: "success",
      color: "text-green-400"
    },
    {
      title: "Version",
      value: `v${version}`,
      icon: Tag,
      status: "stable",
      color: "text-amber-400"
    },
    {
      title: "Last Update",
      value: new Date(systemStatus.lastUpdate).toLocaleTimeString(),
      icon: RefreshCw,
      status: "good",
      color: "text-blue-400"
    },
    {
      title: "Active Users",
      value: systemStatus.activeUsers.toLocaleString(),
      icon: Users,
      status: "good",
      color: "text-indigo-400"
    },
    {
      title: "API Status",
      value: systemStatus.apiStatus,
      icon: Database,
      status: systemStatus.apiStatus === 'Healthy' ? "success" : "warning",
      color: "text-teal-400"
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        <Shield className="w-6 h-6 mr-2" />
        Platform Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusItems.map((item, index) => (
          <SystemStatus key={index} {...item} />
        ))}
      </div>
    </div>
  );
}; 