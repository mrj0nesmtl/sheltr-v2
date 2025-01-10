# 📊 SHELTR Analytics Components
*Last Updated: January 12, 2025 12:00 EST*
*Version: 0.5.7*
*Status: STABLE* 🟢

## Component Directory Structure
```typescript
src/components/
├── shared/
│   ├── analytics/
│   │   ├── DetailedAnalytics.tsx
│   │   ├── SystemHealthMonitor.tsx
│   │   └── index.ts
└── ui/
    └── Charts/
        ├── DonationAllocationPieChart.tsx
        ├── MapComponent.tsx
        ├── NetworkActivityChart.tsx
        └── index.ts
```

## Available Components

### Charts
```typescript
import { 
  DonationAllocationPieChart, 
  NetworkActivityChart 
} from '@/components/ui/Charts'

// Usage
<DonationAllocationPieChart 
  data={donationData}
  height={300}
  gradient={true}
  isLoading={isLoading}
/>

// With loading state
<NetworkActivityChart
  data={networkData}
  height={250}
  isLoading={isLoading}
  error={error}
  onRetry={refetch}
/>
```

### System Monitoring
```typescript
import { SystemHealthMonitor } from '@/components/shared/analytics'

// Usage
<SystemHealthMonitor
  metrics={systemMetrics}
  refreshInterval={5000}
  showDetailedView={true}
  onAlert={handleSystemAlert}
/>
```

### Detailed Analytics
```typescript
import { DetailedAnalytics } from '@/components/shared/analytics'

// Usage
<DetailedAnalytics
  timeframe="weekly"
  showBreakdown={true}
  includeHistorical={true}
  onTimeframeChange={handleTimeframeChange}
/>
```

### Maps
```typescript
import { MapComponent } from '@/components/ui/Charts'

// Usage
<MapComponent
  height={400}
  initialView={{
    center: [-96, 37.8],
    zoom: 3
  }}
  markers={locationData}
  onMarkerClick={handleMarkerClick}
  clustering={true}
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
  };
  charts: {
    background: string;
    gridLines: string;
    tooltip: {
      bg: string;
      text: string;
    };
  };
  metrics: {
    card: {
      bg: string;
      border: string;
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

## Performance Optimization
1. Implement proper memoization
2. Use lazy loading
3. Optimize re-renders
4. Cache API responses
5. Virtual scroll for large datasets

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

---
*For implementation details, see [implementation.md](../guides/implementation.md)*
*For component structure, see [components-structure.md](../dev/notes/tree/current/components-structure.md)* 