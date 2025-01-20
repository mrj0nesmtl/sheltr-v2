import { AnalyticsTheme } from '../types';

export const analyticsTheme: AnalyticsTheme = {
  colors: {
    primary: ['#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3'],
    secondary: ['#10b981', '#34d399', '#6ee7b7', '#34d399', '#059669'],
    accent: ['#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309'],
    error: ['#ef4444', '#dc2626', '#b91c1c'],
    warning: ['#f59e0b', '#d97706', '#b45309'],
    success: ['#22c55e', '#16a34a', '#15803d'],
    background: 'rgb(17 24 39)',
    text: {
      primary: 'rgb(255 255 255)',
      secondary: 'rgb(156 163 175)',
      muted: 'rgb(107 114 128)'
    }
  },
  charts: {
    grid: {
      stroke: 'rgba(255, 255, 255, 0.1)',
      strokeDasharray: '3 3'
    },
    tooltip: {
      background: 'rgba(17, 24, 39, 0.9)',
      border: '#374151',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderRadius: '6px'
    },
    axis: {
      stroke: 'rgba(255, 255, 255, 0.1)',
      fontSize: 12,
      fontFamily: 'system-ui'
    },
    legend: {
      fontSize: 12,
      fontFamily: 'system-ui',
      color: 'rgb(156 163 175)'
    }
  },
  transitions: {
    duration: 150,
    timing: 'ease-in-out'
  },
  animations: {
    chart: {
      duration: 750,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
}; 