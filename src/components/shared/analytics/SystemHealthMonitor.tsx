import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';

export function SystemHealthMonitor() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">System Health</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Server Status"
          value="Operational"
          trend="stable"
          icon="server"
        />
        <MetricCard
          title="Response Time"
          value="120ms"
          trend="improving"
          icon="activity"
        />
        <MetricCard
          title="Error Rate"
          value="0.1%"
          trend="stable"
          icon="alert-triangle"
        />
        <MetricCard
          title="Uptime"
          value="99.9%"
          trend="stable"
          icon="clock"
        />
      </div>
    </div>
  );
} 