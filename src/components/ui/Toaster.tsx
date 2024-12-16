import { useEffect, useState } from 'react';
import { ToastProvider, ToastViewport } from './Toast';

export function Toaster() {
  const [toasts, setToasts] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Subscribe to toast events
    const handleToast = (event: CustomEvent) => {
      setToasts((current) => [...current, event.detail]);
    };

    window.addEventListener('toast' as any, handleToast);
    return () => window.removeEventListener('toast' as any, handleToast);
  }, []);

  return (
    <ToastProvider>
      {toasts}
      <ToastViewport />
    </ToastProvider>
  );
}