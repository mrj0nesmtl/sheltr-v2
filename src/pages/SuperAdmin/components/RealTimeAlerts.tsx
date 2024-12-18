import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export function RealTimeAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Initial fetch
    fetchAlerts();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('alerts')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'alerts' 
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setAlerts(current => [payload.new, ...current]);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAlerts = async () => {
    const { data } = await supabase
      .from('alerts')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);

    if (data) {
      setAlerts(data);
    }
  };

  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Real-time Alerts</h3>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${
                alert.type === 'info' ? 'bg-blue-500/20 border-blue-500/50' :
                alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50' :
                'bg-red-500/20 border-red-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  name={alert.type === 'info' ? 'info' : alert.type === 'warning' ? 'alert-triangle' : 'alert-circle'}
                  className={`h-5 w-5 ${
                    alert.type === 'info' ? 'text-blue-400' :
                    alert.type === 'warning' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}
                />
                <div>
                  <p className="text-white">{alert.message}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 