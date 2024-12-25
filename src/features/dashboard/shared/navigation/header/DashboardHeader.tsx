import { useAuth } from '@/hooks/useAuth';
import { forceLogout } from '@/lib/supabase/client';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1>Welcome back, {user?.email || 'User'}</h1>
        <div className="space-x-4">
          <button 
            onClick={forceLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Force Logout
          </button>
        </div>
      </div>
    </header>
  );
} 