import { useAuth } from '@/hooks/useAuth';
import { ProfileMenu } from '@/components/ui/ProfileMenu';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <ProfileMenu user={user} />
      </div>
    </header>
  );
} 