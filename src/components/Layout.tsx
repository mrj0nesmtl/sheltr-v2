import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { NavigationItems } from './Navigation/NavigationItems';
import { MobileMenu } from './Navigation/MobileMenu';
import { Footer } from './Footer/Footer';
import { Icon } from '@/components/ui/Icon';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine if current route should have dark theme
  const isDarkTheme = !location.pathname.includes('/auth/');
  
  // Determine if current route should have background image
  const hasBackgroundImage = ['/', '/how-it-works', '/solutions', '/impact'].includes(location.pathname);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`${isDarkTheme ? 'bg-gray-800/95' : 'bg-white'} backdrop-blur-sm sticky top-0 z-50 border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className={`font-bold text-xl ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                SHELTR
              </Link>
            </div>

            <div className="hidden lg:block w-full ml-10">
              <NavigationItems isDark={isDarkTheme} />
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                aria-label="Open menu"
              >
                <Icon name="menu" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative">
        {hasBackgroundImage && (
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
        )}
        <div className={`relative ${hasBackgroundImage ? '' : 'bg-opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem-3.5rem)]">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isDark={isDarkTheme} />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDark={isDarkTheme}
      />
    </div>
  );
}