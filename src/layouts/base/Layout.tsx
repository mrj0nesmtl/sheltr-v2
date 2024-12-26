import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { PageLayout } from './PageLayout';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
  // Check if we're on a dashboard route
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-900">
      {/* Main Navigation - Only show on non-dashboard routes */}
      {!isDashboardRoute && <Navigation />}
      
      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto px-4">
        <div className={`${!isDashboardRoute ? 'pt-16' : ''} pb-16`}>
          <PageLayout>
            {children}
          </PageLayout>
        </div>
      </main>

      {/* Footer - Fixed positioning */}
      <div className="w-full bg-gray-900"> {/* Removed absolute positioning, added bg color */}
        <Footer />
      </div>

      {/* Status indicator */}
      <div className="fixed bottom-4 right-4 text-sm text-white/50">
        Status: {isAuthenticated ? `Logged in${user?.email ? ` as ${user.email}` : ''}` : 'Not logged in'}
      </div>
    </div>
  );
}

export default Layout;