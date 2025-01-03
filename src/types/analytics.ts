export interface AnalyticsData {
  donations: {
    total: number;
    monthly: number[];
    impact: ImpactMetrics;
  };
  participants: {
    active: number;
    growth: number;
    engagement: EngagementMetrics;
  };
  scanner: {
    scans: number;
    success: number;
    errors: ScanError[];
  };
}

export interface ImpactMetrics {
  livesImpacted: number;
  servicesProvided: number;
  communityGrowth: number;
}

export interface EngagementMetrics {
  dailyActive: number;
  retention: number;
  satisfaction: number;
}

export type ScanError = {
  code: string;
  message: string;
  timestamp: Date;
};

export interface GrowthTrend {
  month: string;
  users: number;
  donations: number;
  shelters: number;
}

export interface UserActivityData {
  activeToday: number;
  weeklyActive: number;
  topLocations: Array<{
    city: string;
    users: number;
  }>;
}

export interface ActivityItem {
  id: number;
  type: 'donation' | 'shelter' | 'user';
  user: string;
  action: string;
  timestamp: string;
}