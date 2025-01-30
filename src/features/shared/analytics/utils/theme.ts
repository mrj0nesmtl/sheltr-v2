import { AnalyticsTheme } from '../types';

export const analyticsTheme: AnalyticsTheme = {
  colors: {
    primary: ['#6366f1', '#4f46e5', '#4338ca'],
    secondary: ['#a855f7', '#9333ea', '#7e22ce'],
    success: ['#22c55e', '#16a34a', '#15803d'],
    warning: ['#eab308', '#ca8a04', '#a16207'],
    error: ['#ef4444', '#dc2626', '#b91c1c'],
    accent: ['#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309'],
    background: 'rgb(17 24 39)',
    text: {
      primary: '#f9fafb',
      secondary: '#9ca3af',
      muted: 'rgb(107 114 128)'
    }
  },
  charts: {
    grid: {
      stroke: '#374151',
      strokeDasharray: '3 3'
    },
    tooltip: {
      background: '#1f2937',
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