# 📊 SHELTR Analytics Components
*Version: 0.5.3*

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
    // ...
  };
  // ...
}
```

## Best Practices
1. Always import from '@/features/shared/analytics'
2. Use consistent theming
3. Provide loading states
4. Handle errors gracefully
5. Include proper TypeScript types 