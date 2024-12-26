import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { PageLayout } from './PageLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-900">
      {/* Main Navigation - Fixed at top */}
      <Navigation />
      
      {/* Main Content Area - Flexible height with padding for nav */}
      <main className="flex-1 w-full mx-auto px-4">
        <div className="pt-16 pb-16"> {/* Reduced bottom padding */}
          <PageLayout>
            {children}
          </PageLayout>
        </div>
      </main>

      {/* Footer - Fixed positioning */}
      <div className="w-full bg-gray-900"> {/* Removed absolute positioning, added bg color */}
        <Footer />
      </div>

      <div className="fixed bottom-4 right-4 text-sm text-white/50">
        Status: {isAuthenticated ? `Logged in${user?.email ? ` as ${user.email}` : ''}` : 'Not logged in'}
      </div>
    </div>
  );
}

export default Layout;