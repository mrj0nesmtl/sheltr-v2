import { UserRole } from '../auth';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  userRole?: UserRole;
}

export interface SidebarItemProps {
  isActive?: boolean;
  icon?: string;
  label: string;
  path: string;
  key?: string;
  roles?: UserRole[];
}

export interface DashboardMetrics {
  totalDonations?: number;
  activeParticipants?: number;
  impactScore?: number;
  lastUpdated?: Date;
}
