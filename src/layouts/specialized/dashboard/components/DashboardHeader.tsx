import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/auth/stores/authStore';
import { LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  title?: string;
}

export function DashboardHeader({ title = 'Dashboard' }: DashboardHeaderProps) {
  const { logout } = useAuthStore();

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <Button 
          variant="ghost" 
          onClick={logout}
          className="text-gray-400 hover:text-white"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
} 