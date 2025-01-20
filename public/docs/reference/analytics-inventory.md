# 🔍 SHELTR Analytics Components Inventory
*Last Updated: January 20, 2024 22:45 EST*
*Version: 0.6.4*
*Status: STABLE* 🟢

## Chart Components

### Base Chart Components
- `/src/features/dashboard/shared/widgets/charts/`
  - `AreaChart.tsx` (using recharts)
  - `BarChart.tsx` (using recharts)
  - `LineChart.tsx` (using recharts)
  - `PieChart.tsx` (using recharts)
  - `SecurityChart.tsx` (new)    // Added for security metrics
  - `AIMetricsChart.tsx` (new)   // Added for AI insights
  - `index.ts`

### Analytics Charts
- `/src/features/dashboard/shared/analytics/charts/`
  - `DonationChart.tsx`
  - `TokenMetricsChart.tsx`
  - `ImpactMetricsChart.tsx`
  - `TrendlineChart.tsx`
  - `SecurityMetricsChart.tsx` (new)
  - `PerformanceChart.tsx` (new)
  - `AIInsightsChart.tsx` (new)

### Performance Charts
- `/src/features/dashboard/roles/super-admin/`
  - `ShelterPerformanceChart.tsx`
  - `SecurityOverviewChart.tsx` (new)
  - `AIMetricsOverview.tsx` (new)
- `/src/features/dashboard/roles/shelter-admin/`
  - `LocalPerformanceChart.tsx`
  - `SecurityMetricsLocal.tsx` (new)
  - `AIInsightsLocal.tsx` (new)

## Transaction Components

### Global Transactions
- `/src/components/transactions/`
  - `TransactionRow.tsx`
  - `TransactionList.tsx`
  - `TransactionDetails.tsx`
  - `SecurityLog.tsx` (new)
  - `AIAnalysis.tsx` (new)

### Shelter Transactions
- `/src/features/dashboard/roles/shelter-admin/`
  - `ShelterTransactionRow.tsx`
  - `ShelterTransactionList.tsx`
  - `TransactionMetrics.tsx`
  - `SecurityMetrics.tsx` (new)
  - `AIMetrics.tsx` (new)

## Analytics Components

### Role-Specific Analytics
1. Super Admin
   - `/src/features/dashboard/roles/super-admin/`
     - `DonationAnalytics.tsx`
     - `GlobalAnalytics.tsx`
     - `NetworkMetrics.tsx`
     - `PlatformStatus.tsx`
     - `SecurityOverview.tsx` (new)
     - `AIInsights.tsx` (new)

2. Shelter Admin
   - `/src/features/dashboard/roles/shelter-admin/`
     - `ShelterAnalytics.tsx`
     - `LocalMetrics.tsx`
     - `ParticipantTracking.tsx`
     - `SecurityDashboard.tsx` (new)
     - `AIMetrics.tsx` (new)

3. Donor
   - `/src/features/dashboard/roles/donor/`
     - `DonorDashboard.tsx`
     - `ImpactMetrics.tsx`
     - `DonationHistory.tsx`
     - `SecurityStatus.tsx` (new)
     - `AIRecommendations.tsx` (new)

4. Participant
   - `/src/features/dashboard/roles/participant/`
     - `ParticipantMetrics.tsx`
     - `ServiceUtilization.tsx`
     - `ProgressTracking.tsx`
     - `SecurityMetrics.tsx` (new)
     - `AIAssistance.tsx` (new)

### Metric Components
- `/src/features/dashboard/shared/analytics/metrics/`
  - `MetricCard.tsx`
  - `DonationTrends.tsx`
  - `ShelterStats.tsx`
  - `TokenMetrics.tsx`
  - `ImpactScore.tsx`
  - `NetworkStatus.tsx`
  - `SecurityMetrics.tsx` (new)
  - `AIMetrics.tsx` (new)
  - `PerformanceMetrics.tsx` (new)

### Map Components
- `/src/features/dashboard/shared/analytics/maps/`
  - `DonationMap.tsx`
  - `ShelterMap.tsx`
  - `ImpactMap.tsx`
  - `HeatMap.tsx`
  - `SecurityHeatmap.tsx` (new)
  - `AIInsightsMap.tsx` (new)

### Shared Analytics
- `/src/features/dashboard/shared/analytics/`
  - `AnalyticsProvider.tsx`
  - `useAnalytics.ts`
  - `analyticsTheme.ts`
  - `types.ts`
  - `useSecurityAnalytics.ts` (new)
  - `useAIAnalytics.ts` (new)
  - `usePerformanceMetrics.ts` (new)

## Libraries Used
1. recharts
   - Primary charting library
   - Used for all visualizations
   - Enhanced customization options
   - AI metrics support

2. Leaflet
   - Map visualizations
   - Location-based analytics
   - Heatmap implementations
   - Security mapping

## Type Definitions
- `/src/types/analytics.ts`
- `/src/types/metrics.ts`
- `/src/types/charts.ts`
- `/src/types/maps.ts`
- `/src/types/security.ts` (new)
- `/src/types/ai.ts` (new)

## Implementation Notes
1. Standardized on recharts
   - Removed chart.js dependencies
   - Consistent API across components
   - Better TypeScript support
   - Enhanced AI visualization

2. Component Organization
   - Role-based structure
   - Shared components
   - Clear separation of concerns
   - Security integration
   - AI metrics support

3. Performance Optimization
   - Lazy loading for heavy components
   - Memoization where appropriate
   - Efficient data structures
   - Real-time updates
   - AI processing optimization

## Next Steps
1. Complete AI integration
2. Enhance security visualization
3. Implement predictive analytics
4. Optimize performance metrics
5. Expand monitoring capabilities

---
*For implementation details, see [implementation.md](./implementation.md)*
*For component API details, see [api.md](./api.md)* 