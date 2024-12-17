import { useState } from 'react';

export interface Alert {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  
  return {
    alerts,
    setAlerts,
    addAlert: (newAlert: Alert) => setAlerts(current => [...current, newAlert]),
    removeAlert: (id: string) => setAlerts(current => current.filter(alert => alert.id !== id))
  };
}; 