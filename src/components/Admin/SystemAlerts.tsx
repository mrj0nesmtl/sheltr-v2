import { Icon } from '@/components/ui/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SystemAlert {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

interface SystemAlertsProps {
  alerts: SystemAlert[];
  onDismiss: (id: string) => void;
}

export function SystemAlerts({ alerts, onDismiss }: SystemAlertsProps) {
  const { t } = useTranslation();

  const getAlertStyles = (type: SystemAlert['type']) => {
    const styles = {
      info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      success: 'bg-green-500/10 text-green-400 border-green-500/20',
      warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      error: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return styles[type];
  };

  const getAlertIcon = (type: SystemAlert['type']) => {
    const icons = {
      info: 'info',
      success: 'check-circle',
      warning: 'alert-triangle',
      error: 'alert-circle'
    };
    return icons[type];
  };

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`flex items-center justify-between p-4 rounded-lg border ${getAlertStyles(alert.type)}`}
          >
            <div className="flex items-center gap-3">
              <Icon name={getAlertIcon(alert.type)} className="h-5 w-5" />
              <span>{alert.message}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm opacity-60">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </span>
              <button
                onClick={() => onDismiss(alert.id)}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Icon name="x" className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 