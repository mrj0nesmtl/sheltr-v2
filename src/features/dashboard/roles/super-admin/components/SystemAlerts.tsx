import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

interface SystemAlertsProps {
  alerts: SystemAlert[];
  onDismiss: (id: string) => void;
}

export function SystemAlerts({ alerts, onDismiss }: SystemAlertsProps) {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg flex items-center justify-between ${
            alert.type === 'info' ? 'bg-blue-500/20 border-blue-500/50' :
            alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50' :
            'bg-red-500/20 border-red-500/50'
          } border`}
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
            <span className="text-white">{alert.message}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(alert.id)}
            className="text-gray-400 hover:text-white"
          >
            <Icon name="x" className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
} 