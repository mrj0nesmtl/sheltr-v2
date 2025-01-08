import { Shield, Server, Activity, Clock, Users, Database, RefreshCw, Tag } from 'lucide-react';
import { usePlatformStatus } from '@/services/platformStatus';

export const PlatformStatusSection = () => {
  const { systemStatus, version } = usePlatformStatus();

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
      status: "good",
      color: "text-blue-400"
    },
    {
      title: "Network Health",
      value: `${systemStatus.networkHealth}%`,
      icon: Shield,
      status: "success",
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
      value: systemStatus.activeUsers.toString(),
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
    <>
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        <Shield className="w-6 h-6 mr-2" />
        Platform Status
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statusItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    item.status === 'success' ? 'bg-green-500/10' : 
                    item.status === 'warning' ? 'bg-yellow-500/10' : 
                    'bg-blue-500/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.title}</p>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'success' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}; 