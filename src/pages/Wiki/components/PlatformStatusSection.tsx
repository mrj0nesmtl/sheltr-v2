import { Shield, Activity, Clock, Users, Database, RefreshCw, Server, Tag, Lock, Route, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

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
  metrics: any; // Update with proper type
}

export function PlatformStatusSection({ systemStatus, metrics }: PlatformStatusSectionProps) {
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
      icon: Server,
      label: 'System Status',
      value: isOperational ? 'Operational' : 'Issues Detected',
      status: isOperational ? 'success' : 'warning',
      color: 'text-emerald-400'
    },
    {
      icon: Navigation,
      label: 'Role Navigation',
      value: roleNavigation ? 'Active' : 'Issues',
      status: roleNavigation ? 'success' : 'warning',
      color: 'text-violet-400'
    },
    {
      icon: Lock,
      label: 'Path Validation',
      value: pathValidation ? 'Secured' : 'Issues',
      status: pathValidation ? 'success' : 'warning',
      color: 'text-rose-400'
    },
    {
      icon: Activity,
      label: 'Response Time',
      value: `${responseTime}ms`,
      status: responseTime < 200 ? 'good' : 'warning',
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      label: 'Security Health',
      value: `${securityHealth}%`,
      status: securityHealth > 95 ? 'success' : 'warning',
      color: 'text-purple-400'
    },
    {
      icon: Clock,
      label: 'Uptime',
      value: `${uptime}%`,
      status: 'success',
      color: 'text-green-400'
    },
    {
      icon: Tag,
      label: 'Version',
      value: `v${version}`,
      status: 'stable',
      color: 'text-amber-400'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: activeUsers.toLocaleString(),
      status: 'good',
      color: 'text-indigo-400'
    },
    {
      icon: Database,
      label: 'API Status',
      value: apiStatus,
      status: apiStatus === 'Healthy' ? 'success' : 'warning',
      color: 'text-teal-400'
    }
  ] as const;

  return (
    <div className="flex flex-col space-y-3">
      {statusItems.map((item, index) => (
        <Card key={index} className="w-full">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-sm truncate">{item.label}</p>
                <p className="text-white font-semibold truncate">{item.value}</p>
              </div>
            </div>
            <Badge 
              variant={
                item.status === 'success' ? 'success' :
                item.status === 'good' ? 'info' :
                item.status === 'stable' ? 'default' : 'warning'
              }
              size="sm"
              className="flex-shrink-0"
            >
              {item.status}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
} 