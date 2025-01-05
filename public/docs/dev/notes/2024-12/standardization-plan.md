# 🎯 SHELTR Analytics Standardization Plan
*Version: 0.5.3*

## 1. Component Audit Results

### Duplicate Components Found
1. Chart Components
   ```typescript
   // Currently have multiple implementations:
   - /src/features/dashboard/shared/widgets/charts/AreaChart.tsx
   - /src/features/dashboard/shared/analytics/charts/AreaChart.tsx
   ```

2. Metric Cards
   ```typescript
   // Three different implementations:
   - /src/features/dashboard/shared/analytics/metrics/MetricCard.tsx
   - /src/pages/About/components/MetricCard.tsx
   - /src/components/ui/MetricCard.tsx
   ```

3. Analytics Dashboards
   ```typescript
   // Overlapping implementations:
   - /src/layouts/dashboard/shared/analytics/DashboardAnalytics.tsx
   - /src/features/dashboard/roles/*/Analytics.tsx
   ```

## 2. Standardization Decisions

### A. Chart Library
```typescript
// Standardize on recharts for all new implementations
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
// Benefits:
// - Better TypeScript support
// - More customizable
// - Better performance
// - Active maintenance
```

### B. Shared Component Library Location
```typescript
// New consolidated location:
/src/features/shared/analytics/
├── charts/
│   ├── AreaChart.tsx
│   ├── BarChart.tsx
│   ├── LineChart.tsx
│   └── index.ts
├── metrics/
│   ├── MetricCard.tsx
│   └── index.ts
├── maps/
│   ├── DonationMap.tsx
│   └── index.ts
└── index.ts
```

### C. Consistent Theming
```typescript
// Theme configuration
export const analyticsTheme = {
  colors: {
    primary: ['#818cf8', '#6366f1', '#4f46e5'],
    secondary: ['#10b981', '#34d399', '#6ee7b7'],
    accent: ['#fcd34d', '#fbbf24', '#f59e0b'],
    background: 'rgb(17 24 39)',
    text: {
      primary: 'rgb(255 255 255)',
      secondary: 'rgb(156 163 175)'
    }
  },
  charts: {
    grid: {
      stroke: 'rgba(255, 255, 255, 0.1)'
    },
    tooltip: {
      background: 'rgba(17, 24, 39, 0.9)'
    }
  }
} as const; 