# 📦 Analytics Components Migration Guide
*Version: 0.5.3*

## Deprecated Components
The following components should be replaced with new shared analytics components:

```typescript
// OLD IMPORTS (Remove these)
import { MetricCard } from '@/pages/About/components/MetricCard'
import { AreaChart } from '@/features/dashboard/shared/widgets/charts'
import { DonationMap } from '@/features/dashboard/roles/super-admin/components'

// NEW IMPORTS (Use these instead)
import { 
  MetricCard,
  AreaChart,
  BarChart,
  LineChart,
  DonationMap 
} from '@/features/shared/analytics'
```

## Files Requiring Updates
1. `/src/pages/About/sections/Metrics.tsx`
2. `/src/features/dashboard/roles/super-admin/SuperAdminDashboard.tsx`
3. `/src/features/dashboard/roles/shelter-admin/ShelterAdminDashboard.tsx`

## Migration Steps
1. Update imports to use new shared components
2. Remove old component files
3. Update component props to match new interfaces
4. Test all dashboard views 