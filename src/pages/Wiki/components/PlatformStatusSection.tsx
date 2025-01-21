import { Shield, Activity, Clock, Users, Database, RefreshCw, Server, Tag, Lock, Route } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemStatus {
  isOperational: boolean;
  roleNavigation: boolean;
  pathValidation: boolean;
  responseTime: number;
  securityHealth: number;
  uptime: number;
  lastUpdate: string;
  activeUsers: number;
  apiStatus: string;
  version: string;
}

interface SystemStatusProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  status: 'success' | 'warning' | 'good' | 'stable';
  color: string;
}

const SystemStatus = ({ title, value, icon: Icon, status, color }: SystemStatusProps) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon className={cn("w-5 h-5 mr-3", color)} />
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        status === 'success' && "bg-green-500/20 text-green-400",
        status === 'warning' && "bg-yellow-500/20 text-yellow-400",
        status === 'good' && "bg-blue-500/20 text-blue-400",
        status === 'stable' && "bg-purple-500/20 text-purple-400"
      )}>
        {status}
      </span>
    </div>
  </div>
);

interface PlatformStatusSectionProps {
  systemStatus: Partial<SystemStatus>;
}

export const PlatformStatusSection = ({ systemStatus = {} }: PlatformStatusSectionProps) => {
  const {
    isOperational = true,
    roleNavigation = true,
    pathValidation = true,
    responseTime = 0,
    securityHealth = 100,
    uptime = 100,
    lastUpdate = new Date().toISOString(),
    activeUsers = 0,
    apiStatus = 'Healthy',
    version = '1.0.0'
  } = systemStatus;

  const statusItems = [
    {
      title: "System Status",
      value: isOperational ? "Operational" : "Issues Detected",
      icon: Server,
      status: isOperational ? "success" : "warning",
      color: "text-emerald-400"
    },
    {
      title: "Role Navigation",
      value: roleNavigation ? "Active" : "Issues",
      icon: Route,
      status: roleNavigation ? "success" : "warning",
      color: "text-violet-400"
    },
    {
      title: "Path Validation",
      value: pathValidation ? "Secured" : "Issues",
      icon: Lock,
      status: pathValidation ? "success" : "warning",
      color: "text-rose-400"
    },
    {
      title: "Response Time",
      value: `${responseTime}ms`,
      icon: Activity,
      status: responseTime < 200 ? "good" : "warning",
      color: "text-blue-400"
    },
    {
      title: "Security Health",
      value: `${securityHealth}%`,
      icon: Shield,
      status: securityHealth > 95 ? "success" : "warning",
      color: "text-purple-400"
    },
    {
      title: "Uptime",
      value: `${uptime}%`,
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
      value: new Date(lastUpdate).toLocaleTimeString(),
      icon: RefreshCw,
      status: "good",
      color: "text-blue-400"
    },
    {
      title: "Active Users",
      value: activeUsers.toLocaleString(),
      icon: Users,
      status: "good",
      color: "text-indigo-400"
    },
    {
      title: "API Status",
      value: apiStatus,
      icon: Database,
      status: apiStatus === 'Healthy' ? "success" : "warning",
      color: "text-teal-400"
    }
  ] as const;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        <Activity className="w-6 h-6 mr-2 text-emerald-500" />
        Platform Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusItems.map((item, index) => (
          <SystemStatus key={`status-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
}; 