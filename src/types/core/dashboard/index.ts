import { AUTH_ROLES } from '../auth';

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
