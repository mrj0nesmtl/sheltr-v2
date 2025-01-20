# 📊 SHELTR Analytics Components
*Last Updated: January 20, 2024 22:45 EST*
*Version: 0.6.4*
*Status: STABLE* 🟢

## Component Directory Structure
```typescript
src/components/
├── shared/
│   ├── analytics/
│   │   ├── DetailedAnalytics.tsx
│   │   ├── SecurityMetrics.tsx
│   │   ├── PerformanceMonitor.tsx
│   │   ├── SystemHealthMonitor.tsx
│   │   ├── AIMetricsDisplay.tsx
│   │   └── index.ts
└── ui/
    └── Charts/
        ├── DonationAllocationPieChart.tsx
        ├── SecurityMetricsChart.tsx
        ├── PerformanceChart.tsx
        ├── MapComponent.tsx
        ├── NetworkActivityChart.tsx
        └── index.ts
```

## Available Components

### Analytics Dashboard
```typescript
import { DetailedAnalytics } from '@/components/shared/analytics'

// Usage
<DetailedAnalytics
  timeframe="weekly"
  showBreakdown={true}
  includeHistorical={true}
  showSecurityMetrics={true}
  showPerformanceData={true}
  onTimeframeChange={handleTimeframeChange}
/>
```

### Security Metrics
```typescript
import { SecurityMetrics } from '@/components/shared/analytics'

// Usage
<SecurityMetrics
  data={securityData}
  refreshInterval={5000}
  showThreatDetection={true}
  showAIInsights={true}
  onAlert={handleSecurityAlert}
/>
```

### Performance Monitoring
```typescript
import { PerformanceMonitor } from '@/components/shared/analytics'

// Usage
<PerformanceMonitor
  metrics={performanceMetrics}
  refreshInterval={3000}
  showAIMetrics={true}
  showDetailedView={true}
  onThresholdAlert={handleAlert}
/>
```

### System Health
```typescript
import { SystemHealthMonitor } from '@/components/shared/analytics'

// Usage
<SystemHealthMonitor
  metrics={systemMetrics}
  refreshInterval={5000}
  showDetailedView={true}
  includeAIHealth={true}
  onAlert={handleSystemAlert}
/>
```

### AI Metrics
```typescript
import { AIMetricsDisplay } from '@/components/shared/analytics'

// New Component
<AIMetricsDisplay
  data={aiMetrics}
  refreshInterval={3000}
  showPredictions={true}
  showAccuracy={true}
  onModelUpdate={handleUpdate}
/>
```

### Charts
```typescript
import { 
  DonationAllocationPieChart,
  SecurityMetricsChart,
  PerformanceChart,
  NetworkActivityChart 
} from '@/components/ui/Charts'

// Usage with security metrics
<SecurityMetricsChart 
  data={securityData}
  height={300}
  showThreats={true}
  showPredictions={true}
  isLoading={isLoading}
/>

// With performance data
<PerformanceChart
  data={performanceData}
  height={250}
  showAIMetrics={true}
  isLoading={isLoading}
  error={error}
  onRetry={refetch}
/>
```

## Theme Configuration
```typescript
interface AnalyticsTheme {
  colors: {
    primary: string[];
    secondary: string[];
    accent: string[];
    success: string[];
    warning: string[];
    error: string[];
    ai: string[];
  };
  charts: {
    background: string;
    gridLines: string;
    tooltip: {
      bg: string;
      text: string;
    };
    aiHighlight: string;
  };
  metrics: {
    card: {
      bg: string;
      border: string;
    };
    ai: {
      bg: string;
      accent: string;
    };
  };
}
```

## Implementation Guidelines
1. Use consistent import paths
2. Implement proper error boundaries
3. Include loading states
4. Handle data validation
5. Maintain type safety
6. Follow responsive design
7. Optimize performance
8. Consider accessibility
9. Implement AI metrics properly
10. Handle real-time updates

## Performance Optimization
1. Implement proper memoization
2. Use lazy loading
3. Optimize re-renders
4. Cache API responses
5. Virtual scroll for large datasets
6. Optimize AI computations
7. Batch real-time updates

## Error Management
```typescript
<ErrorBoundary 
  fallback={<AnalyticsError onRetry={refetch} />}
  onError={logError}
>
  <DetailedAnalytics />
</ErrorBoundary>
```

## Loading States
```typescript
<Skeleton className="h-[300px] w-full rounded-lg" />
```

## Accessibility Features
1. ARIA labels
2. Keyboard navigation
3. Color contrast
4. Screen reader support
5. Focus management
6. Real-time announcements
7. AI insights accessibility

---
*For implementation details, see [implementation.md](../guides/implementation.md)*
*For component structure, see [components-structure.md](../dev/notes/tree/current/components-structure.md)* 