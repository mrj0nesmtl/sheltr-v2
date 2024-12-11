import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

export function AlertsAndIncidents() {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'High server load detected',
      timestamp: '2 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'error',
      message: 'Failed login attempts from IP 192.168.1.1',
      timestamp: '15 minutes ago',
      status: 'investigating'
    },
    // Add more alerts...
  ];

  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Active Alerts</h3>
          <Button variant="outline" size="sm">
            <Icon name="bell" className="mr-2 h-4 w-4" />
            Manage Alerts
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50' :
                alert.type === 'error' ? 'bg-red-500/20 border-red-500/50' :
                'bg-emerald-500/20 border-emerald-500/50'
              } border`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon
                    name={alert.type === 'warning' ? 'alert-triangle' : 'alert-circle'}
                    className={`h-5 w-5 ${
                      alert.type === 'warning' ? 'text-yellow-400' :
                      alert.type === 'error' ? 'text-red-400' :
                      'text-emerald-400'
                    }`}
                  />
                  <div>
                    <p className="text-white">{alert.message}</p>
                    <p className="text-sm text-gray-400">{alert.timestamp}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Investigate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 