import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'super-admin' | 'shelter-admin' | 'donor';
}

export interface DashboardWidgetProps {
  title: string;
  data: any;
  loading?: boolean;
  error?: Error;
} 