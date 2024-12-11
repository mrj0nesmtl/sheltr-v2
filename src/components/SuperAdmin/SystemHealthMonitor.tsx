import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function SystemHealthMonitor() {
  const metrics = [
    { name: 'API Response Time', value: '45ms', status: 'good' },
    { name: 'Database Load', value: '32%', status: 'good' },
    { name: 'Memory Usage', value: '68%', status: 'warning' },
    { name: 'Storage Space', value: '42%', status: 'good' },
    { name: 'Active Users', value: '1.2k', status: 'good' }
  ];

  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">System Health</h3>
          <div className="flex items-center gap-2 text-emerald-400">
            <Icon name="check-circle" className="h-5 w-5" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${
                  metric.status === 'good' ? 'bg-emerald-400' :
                  metric.status === 'warning' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`} />
                <span className="text-gray-300">{metric.name}</span>
              </div>
              <span className="text-white font-medium">{metric.value}</span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
} 