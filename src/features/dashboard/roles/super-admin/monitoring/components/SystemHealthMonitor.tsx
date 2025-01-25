import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { SystemMonitor } from '@/lib/services/monitoring';
import { useEffect, useState } from 'react';

export function SystemHealthMonitor() {
  const [status, setStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const currentStatus = await SystemMonitor.getStatus();
      setStatus(currentStatus);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (!status) return <Card>Loading system status...</Card>;

  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">System Health</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Icon name={status.status === 'healthy' ? 'check-circle' : 'alert-circle'} />
            <span className="ml-2">Status: {status.status}</span>
          </div>
          {/* Add more monitoring details */}
        </div>
      </div>
    </Card>
  );
} 