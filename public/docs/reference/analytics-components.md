# 📊 SHELTR Analytics Components
*Version: 0.5.7*

## Available Components

### Charts
```typescript
import { AreaChart, BarChart, LineChart } from '@/features/shared/analytics'

// Usage
<AreaChart 
  data={[{ label: 'Jan', value: 100 }]} 
  height={300}
  gradient={true}
/>

// With loading state
<LineChart
  data={data}
  height={250}
  isLoading={isLoading}
  error={error}
  onRetry={refetch}
/>
```

### Metrics
```typescript
import { MetricCard } from '@/features/shared/analytics'

// Usage
<MetricCard
  title="Total Donations"
  value="$125,000"
  change={{ value: 12, trend: 'up' }}
  icon={WalletIcon}
  color="text-blue-500"
  bgColor="bg-blue-500/10"
  isLoading={isLoading}
/>
```

### Transaction Components
```typescript
import { TransactionTable } from '@/features/dashboard/shared/analytics/metrics'
import { TransactionRow } from '@/components/Transactions/TransactionRow'

// Global Transaction Table
<TransactionTable
  limit={5}
  onRefresh={refetchTransactions}
  className="mt-4"
/>

// Individual Transaction Row
<TransactionRow
  type="receive"
  amount={1000}
  address="0x1234...5678"
  timestamp={new Date()}
/>
```

### Maps
```typescript
import { DonationMap } from '@/features/shared/analytics'

// Usage
<DonationMap
  height={400}
  initialView={{
    center: [-96, 37.8],
    zoom: 3
  }}
  markers={donationLocations}
  onMarkerClick={handleMarkerClick}
/>
```

## Theme Customization
```typescript
import { analyticsTheme } from '@/features/shared/analytics'

// Theme structure
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

## Best Practices
1. Always import from '@/features/shared/analytics'
2. Use consistent theming
3. Provide loading states
4. Handle errors gracefully
5. Include proper TypeScript types
6. Implement responsive designs
7. Add error boundaries
8. Use skeleton loading states

## Performance Guidelines
1. Lazy load heavy components
2. Implement proper memoization
3. Use virtual scrolling for long lists
4. Optimize re-renders
5. Cache API responses

## Error Handling
```typescript
<ErrorBoundary fallback={<AnalyticsError onRetry={refetch} />}>
  <AnalyticsComponent />
</ErrorBoundary>
```

## Loading States
```typescript
<Skeleton className="h-[300px] w-full" />
```

## Accessibility
1. Proper ARIA labels
2. Keyboard navigation
3. Color contrast
4. Screen reader support

---
*For implementation examples, see [implementation.md](./implementation.md)*
*For component API details, see [api.md](./api.md)* 