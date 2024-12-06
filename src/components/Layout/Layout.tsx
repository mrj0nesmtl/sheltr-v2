import { useTheme } from '@/contexts/ThemeContext';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer/Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen theme-transition">
      <div className="bg-primary min-h-screen">
        <Navigation className="bg-secondary border-b border-text-secondary" />
        
        <main className="container mx-auto px-4 py-8 text-primary">
          {children}
        </main>
        
        <Footer className="bg-secondary border-t border-text-secondary" />
      </div>
    </div>
  );
} 