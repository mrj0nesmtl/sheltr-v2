export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface AnalyticsTheme {
  colors: {
    primary: string[];
    secondary: string[];
    accent: string[];
    error: string[];
    warning: string[];
    success: string[];
    background: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
  };
  charts: {
    grid: {
      stroke: string;
      strokeDasharray: string;
    };
    tooltip: {
      background: string;
      border: string;
      boxShadow: string;
      borderRadius: string;
    };
    axis: {
      stroke: string;
      fontSize: number;
      fontFamily: string;
    };
    legend: {
      fontSize: number;
      fontFamily: string;
      color: string;
    };
  };
  transitions: {
    duration: number;
    timing: string;
  };
} 