import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface SystemHealth {
  serverStatus: string;
  responseTime: number;
  errorRate: number;
  uptime: number;
}

export function SystemHealthMonitor() {
  const [health, setHealth] = useState<SystemHealth>({
    serverStatus: 'Operational',
    responseTime: 0,
    errorRate: 0,
    uptime: 100
  });

  useEffect(() => {
    const fetchHealthMetrics = async () => {
      // Implement real health check logic here
      const { data, error } = await supabase
        .from('system_health')
        .select('*')
        .single();
        
      if (data) {
        setHealth(data);
      }
    };

    fetchHealthMetrics();
    const interval = setInterval(fetchHealthMetrics, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">System Health</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Server Status"
          value={health.serverStatus}
          trend="stable"
          icon="server"
        />
        <MetricCard
          title="Response Time"
          value={`${health.responseTime}ms`}
          trend="improving"
          icon="activity"
        />
        <MetricCard
          title="Error Rate"
          value={`${health.errorRate}%`}
          trend="stable"
          icon="alert-triangle"
        />
        <MetricCard
          title="Uptime"
          value={`${health.uptime}%`}
          trend="stable"
          icon="clock"
        />
      </div>
    </div>
  );
} 