export interface WikiData {
    version: string;
    lastUpdated: string;
    metrics: {
      totalDonations: number;
      activeShelters: number;
      peopleHelped: number;
      successRate: number;
    };
    systemStatus: {
      api: 'healthy' | 'degraded' | 'down';
      database: 'healthy' | 'degraded' | 'down';
      payments: 'healthy' | 'degraded' | 'down';
    };
    currentSprint: {
      number: number;
      startDate: string;
      endDate: string;
      progress: number;
    };
    sprintTasks: Array<{
      id: number;
      title: string;
      status: 'completed' | 'in-progress' | 'pending';
    }>;
    docs: {
      overview: string;
      architecture: string;
      implementation: string;
      roadmap: string;
    };
  }

export interface SystemStatus {
  isOperational: boolean;
  roleNavigation: boolean;
  pathValidation: boolean;
  responseTime: number;
  securityHealth: number;
  uptime: number;
  activeUsers: number;
  apiStatus: string;
  lastUpdate: string;
}

export interface Metrics {
  responseTime: number;
  securityHealth: number;
  uptime: number;
  version: string;
  responseTrend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  securityTrend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
}
