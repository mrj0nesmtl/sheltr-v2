# 🔍 SHELTR Analytics Components Inventory
*Generated: January 1, 2025*
*Version: 0.5.3*

## Chart Components

### Base Chart Components
- `/src/features/dashboard/shared/widgets/charts/`
  - `AreaChart.tsx` (using react-chartjs-2)
  - `BarChart.tsx` (using react-chartjs-2)
  - `LineChart.tsx` (using react-chartjs-2)
  - `index.ts`

### Analytics Charts
- `/src/features/dashboard/shared/analytics/charts/`
  - `AreaChart.tsx` (using recharts)

### Performance Charts
- `/src/features/dashboard/roles/super-admin/ShelterPerformanceChart.tsx` (using recharts)
- `/src/backup/super-admin/ShelterPerformanceChart.tsx` (backup version)

## Analytics Components

### Role-Specific Analytics
1. Super Admin
   - `/src/features/dashboard/roles/super-admin/DonationAnalytics.tsx`
   - `/src/features/dashboard/roles/super-admin/analytics/GlobalAnalytics.tsx`
   - `/src/pages/SuperAdmin/Analytics.tsx`
   - `/src/pages/SuperAdmin/components/GlobalAnalytics.tsx`

2. Shelter Admin
   - `/src/features/dashboard/roles/shelter-admin/ShelterDetailAnalytics.tsx`
   - `/src/layouts/dashboard/roles/components/ShelterAdminDashboard.tsx`

3. Donor
   - `/src/layouts/dashboard/roles/components/DonorDashboard.tsx`
   - `/src/pages/SuperAdmin/donors/DonorDetailAnalytics.tsx`

4. Participant
   - `/src/features/dashboard/roles/participant/ParticipantDetailAnalytics.tsx`
   - `/src/layouts/dashboard/roles/components/ParticipantDashboard.tsx`

### Metric Components
- `/src/features/dashboard/shared/analytics/metrics/`
  - `MetricCard.tsx`
  - `DonationTrends.tsx`
  - `ShelterStats.tsx`
  - `ShelterOverview.tsx`
  - `ShelterMap.tsx`
  - `ShelterTable.tsx`
  - `TransactionTable.tsx`

### Map Components
- `/src/features/dashboard/shared/analytics/maps/`
  - `DonationMap.tsx`

### Shared Analytics
- `/src/layouts/dashboard/shared/analytics/DashboardAnalytics.tsx`
- `/src/lib/services/analyticsService.ts`

## Libraries Used
1. react-chartjs-2
   - Used in base chart components
   - Simpler, more React-friendly API

2. recharts
   - Used in analytics components
   - More customizable, better for complex visualizations

## Type Definitions
- `/src/types/analytics.ts`
- `/src/types/core/index.ts`

## Implementation Notes
1. Two chart libraries in use:
   - Consider standardizing on one (recommend recharts for consistency)
   - Most newer components use recharts

2. Duplicate implementations:
   - Multiple AreaChart implementations
   - Consider consolidating

3. Migration Path:
   - Use existing metrics components from `/src/features/dashboard/shared/analytics/metrics/`
   - Leverage existing analytics services
   - Standardize on recharts for new visualizations

## Next Steps
1. Audit duplicate implementations
2. Standardize chart library usage
3. Create shared component library
4. Document component APIs
5. Implement consistent theming 