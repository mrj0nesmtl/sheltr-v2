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
  version: '0.5.4',
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock response time calculation
      const responseTime = Math.floor(Math.random() * 100) + 50; // Random time between 50-150ms
      
      // Mock active users
      const activeUsers = Math.floor(Math.random() * 100);

      set(state => ({
        systemStatus: {
          ...state.systemStatus,
          responseTime,
          lastUpdate: new Date(),
          activeUsers,
          isOperational: true,
          apiStatus: 'Healthy',
          networkHealth: 99.9,
          uptime: 99.99
        }
      }));
    } catch (error) {
      console.error('Failed to fetch platform status:', error);
      set(state => ({
        systemStatus: {
          ...state.systemStatus,
          isOperational: false,
          apiStatus: 'Error'
        }
      }));
    }
  }
})); 