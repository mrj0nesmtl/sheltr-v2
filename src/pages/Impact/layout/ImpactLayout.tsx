import { ReactNode } from 'react';
import { ImpactSidebar } from '../components/ImpactSidebar';
import { ImpactMobileNav } from '../components/ImpactMobileNav';
import impactBg from '/images/backgrounds/impact-bg.jpg';

interface ImpactLayoutProps {
  children: ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function ImpactLayout({ children, sidebarOpen, setSidebarOpen }: ImpactLayoutProps) {
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Background with multiple layers */}
      <div className="fixed inset-0 z-0">
        {/* Base background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${impactBg})`,
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      {/* Mobile Navigation */}
      <ImpactMobileNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <ImpactSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-72 relative z-10">
        {children}
      </div>
    </div>
  );
} 