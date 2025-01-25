import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
  icon: string;
  unit: string;
}

export function SystemMonitoring() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      id: 'cpu',
      name: 'CPU Usage',
      value: 45,
      status: 'good',
      icon: 'cpu',
      unit: '%'
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      value: 68,
      status: 'warning',
      icon: 'hard-drive',
      unit: '%'
    },
    {
      id: 'storage',
      name: 'Storage Space',
      value: 42,
      status: 'good',
      icon: 'database',
      unit: '%'
    },
    {
      id: 'network',
      name: 'Network Load',
      value: 78,
      status: 'warning',
      icon: 'wifi',
      unit: 'Mbps'
    }
  ]);

  useEffect(() => {
    const subscription = supabase
      .channel('system-metrics')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'system_metrics' 
      }, (payload) => {
        // Update metrics in real-time
        setMetrics(current => 
          current.map(metric => 
            metric.id === payload.new.id ? { ...metric, ...payload.new } : metric
          )
        );
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">System Health</h3>
          <div className="flex items-center gap-2">
            <Icon name="refresh" className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Real-time monitoring</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    metric.status === 'good' ? 'bg-emerald-500/20' :
                    metric.status === 'warning' ? 'bg-yellow-500/20' :
                    'bg-red-500/20'
                  }`}>
                    <Icon 
                      name={metric.icon as any} 
                      className={`h-5 w-5 ${
                        metric.status === 'good' ? 'text-emerald-400' :
                        metric.status === 'warning' ? 'text-yellow-400' :
                        'text-red-400'
                      }`} 
                    />
                  </div>
                  <span className="text-gray-300">{metric.name}</span>
                </div>
                <span className={`text-lg font-medium ${
                  metric.status === 'good' ? 'text-emerald-400' :
                  metric.status === 'warning' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {metric.value}{metric.unit}
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    metric.status === 'good' ? 'bg-emerald-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 