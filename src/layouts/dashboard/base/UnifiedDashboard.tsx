import { useAuthStore } from '@/auth/stores/authStore';
import { DashboardShell } from '@/layouts/dashboard/shared/DashboardShell';
import { DashboardNavigation } from '@/layouts/dashboard/navigation/DashboardNavigation';
import { RoleRouter } from '@/layouts/dashboard/roles/RoleRouter';

export const UnifiedDashboard = () => {
  const { user, role } = useAuthStore();

  if (!user || !role) {
    return null; // Or loading state
  }

  return (
    <DashboardShell>
      <div className="flex h-screen">
        <DashboardNavigation role={role} />
        <main className="flex-1 overflow-y-auto">
          <RoleRouter role={role} />
        </main>
      </div>
    </DashboardShell>
  );
};
