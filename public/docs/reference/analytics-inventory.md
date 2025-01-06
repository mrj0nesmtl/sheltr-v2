# 🔍 SHELTR Analytics Components Inventory
*Last Updated: January 6, 2025 00:12 EST*
*Version: 0.5.7*
*Status: STABLE* 🟢

## Chart Components

### Base Chart Components
- `/src/features/dashboard/shared/widgets/charts/`
  - `AreaChart.tsx` (using recharts)
  - `BarChart.tsx` (using recharts)
  - `LineChart.tsx` (using recharts)
  - `PieChart.tsx` (using recharts)
  - `index.ts`

### Analytics Charts
- `/src/features/dashboard/shared/analytics/charts/`
  - `DonationChart.tsx`
  - `TokenMetricsChart.tsx`
  - `ImpactMetricsChart.tsx`
  - `TrendlineChart.tsx`

### Performance Charts
- `/src/features/dashboard/roles/super-admin/ShelterPerformanceChart.tsx`
- `/src/features/dashboard/roles/shelter-admin/LocalPerformanceChart.tsx`

## Transaction Components

### Global Transactions
- `/src/components/transactions/`
  - `TransactionRow.tsx` (global transactions)
  - `TransactionList.tsx` (global list component)
  - `TransactionDetails.tsx`

### Shelter Transactions
- `/src/features/dashboard/roles/shelter-admin/`
  - `ShelterTransactionRow.tsx` (shelter-specific)
  - `ShelterTransactionList.tsx`
  - `TransactionMetrics.tsx`

## Analytics Components

### Role-Specific Analytics
1. Super Admin
   - `/src/features/dashboard/roles/super-admin/`
     - `DonationAnalytics.tsx`
     - `GlobalAnalytics.tsx`
     - `NetworkMetrics.tsx`
     - `PlatformStatus.tsx`

2. Shelter Admin
   - `/src/features/dashboard/roles/shelter-admin/`
     - `ShelterAnalytics.tsx`
     - `LocalMetrics.tsx`
     - `ParticipantTracking.tsx`

3. Donor
   - `/src/features/dashboard/roles/donor/`
     - `DonorDashboard.tsx`
     - `ImpactMetrics.tsx`
     - `DonationHistory.tsx`

4. Participant
   - `/src/features/dashboard/roles/participant/`
     - `ParticipantMetrics.tsx`
     - `ServiceUtilization.tsx`
     - `ProgressTracking.tsx`

### Metric Components
- `/src/features/dashboard/shared/analytics/metrics/`
  - `MetricCard.tsx`
  - `DonationTrends.tsx`
  - `ShelterStats.tsx`
  - `TokenMetrics.tsx`
  - `ImpactScore.tsx`
  - `NetworkStatus.tsx`

### Map Components
- `/src/features/dashboard/shared/analytics/maps/`
  - `DonationMap.tsx`
  - `ShelterMap.tsx`
  - `ImpactMap.tsx`
  - `HeatMap.tsx`

### Shared Analytics
- `/src/features/dashboard/shared/analytics/`
  - `AnalyticsProvider.tsx`
  - `useAnalytics.ts`
  - `analyticsTheme.ts`
  - `types.ts`

## Libraries Used
1. recharts
   - Primary charting library
   - Used for all new visualizations
   - Enhanced customization options

2. Leaflet
   - Map visualizations
   - Location-based analytics
   - Heatmap implementations

## Type Definitions
- `/src/types/analytics.ts`
- `/src/types/metrics.ts`
- `/src/types/charts.ts`
- `/src/types/maps.ts`

## Implementation Notes
1. Standardized on recharts
   - Removed chart.js dependencies
   - Consistent API across components
   - Better TypeScript support

2. Component Organization
   - Role-based structure
   - Shared components
   - Clear separation of concerns

3. Performance Optimization
   - Lazy loading for heavy components
   - Memoization where appropriate
   - Efficient data structures

## Next Steps
1. Complete real-time updates
2. Enhance error boundaries
3. Implement skeleton loading
4. Add E2E tests
5. Optimize bundle size

---
*For implementation details, see [implementation.md](./implementation.md)*
*For component API details, see [api.md](./api.md)* 