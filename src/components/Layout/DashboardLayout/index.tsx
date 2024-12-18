import { useAuthStore } from '@/auth/stores/authStore';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { ShelterAdminSidebar } from './Sidebar/ShelterAdminSidebar';

interface DashboardLayoutProps {
  title: string;
}

export function DashboardLayout({ title }: DashboardLayoutProps) {
  const { user, signOut, role, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log('DashboardLayout:', { user, role, isAuthenticated });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-white">SHELTR</h1>
          </div>
          {role === 'shelter_admin' && <ShelterAdminSidebar />}
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/75">
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-700">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                {user?.email}
              </span>
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('common.signOut')}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}