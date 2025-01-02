export interface AnalyticsTheme {
  colors: {
    primary: string[];
    secondary: string[];
    accent: string[];
    background: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
  charts: {
    grid: {
      stroke: string;
    };
    tooltip: {
      background: string;
    };
  };
}

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  color?: string;
  bgColor?: string;
}

export interface AnalyticsProps {
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  loading?: boolean;
  error?: Error | null;
} 