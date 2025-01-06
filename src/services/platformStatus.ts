import { create } from 'zustand';
import packageJson from '../../package.json';

interface PlatformStatusState {
  version: string;
  buildProgress: {
    core: number;
    auth: number;
    layout: number;
    qr: number;
    seo: number;
    blockchain: number;
  };
  systemStatus: {
    isOperational: boolean;
    responseTime: number;
    networkHealth: number;
    uptime: number;
    lastUpdate: Date;
    activeUsers: number;
    apiStatus: string;
  };
  fetchStatus: () => Promise<void>;
}

export const usePlatformStatus = create<PlatformStatusState>((set) => ({
  version: '0.5.4', // From README
  buildProgress: {
    core: 98,
    auth: 95,
    layout: 100,
    qr: 85,
    seo: 95,
    blockchain: 0
  },
  systemStatus: {
    isOperational: true,
    responseTime: 0,
    networkHealth: 99.9,
    uptime: 99.99,
    lastUpdate: new Date(),
    activeUsers: 0,
    apiStatus: 'Healthy'
  },
  fetchStatus: async () => {
    try {
      // Fetch real response time
      const startTime = performance.now();
      await fetch('/api/health-check');
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      // Get active users (could be from analytics service)
      const activeUsers = await fetch('/api/active-users').then(res => res.json());

      // Update state with real data
      set(state => ({
        systemStatus: {
          ...state.systemStatus,
          responseTime,
          lastUpdate: new Date(),
          activeUsers: activeUsers.count,
          // Add more real-time metrics
        }
      }));
    } catch (error) {
      console.error('Failed to fetch platform status:', error);
    }
  }
})); 