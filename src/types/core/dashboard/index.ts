import { AUTH_ROLES } from '../auth';
import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  userRole?: AUTH_ROLES;
}

export interface SidebarItemProps {
  isActive?: boolean;
  icon?: string;
  label: string;
  path: string;
  key?: string;
  roles?: AUTH_ROLES[];
}

export interface DashboardMetrics {
  totalDonations?: number;
  activeParticipants?: number;
  impactScore?: number;
  lastUpdated?: Date;
}
