// src/features/roles/super-admin/components/index.ts
// System-wide management
export * from './analytics/GlobalAnalytics';
export * from './analytics/NetworkPerformance';
export * from './analytics/SystemMetrics';
export * from './profile/Profile';
export * from './settings/SystemSettings';

// Dashboard components
export * from './dashboard/AlertsAndIncidents';
export * from './dashboard/SystemHealthMonitor';
export * from './dashboard/DonationAnalytics';
export * from './dashboard/ShelterPerformanceChart';
export * from './dashboard/QuickStatCard';
export { SuperAdminDashboard } from './dashboard/SuperAdminDashboard';

// Common components
export * from './common/NotificationCenter';
export * from './common/SuperAdminSidebar';
