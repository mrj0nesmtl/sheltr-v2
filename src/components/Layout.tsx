import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MobileMenu } from './Navigation/MobileMenu';
import { MainNav } from './Navigation/MainNav';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { Footer } from '@/components/ui/Footer';
import { useAuthStore } from '@/stores/authStore';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 mr-6">
              <Link to="/" className="flex items-center">
                <Logo className="h-6 w-auto" />
                <span className="sr-only">SHELTR</span>
              </Link>
            </div>

            {/* Desktop Navigation & Buttons */}
            <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1">
              {/* Main Navigation */}
              <MainNav />
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-6">
                <Link
                  to="/scan"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Icon name="qr-code" className="h-4 w-4 mr-2" />
                  <span>{t('nav.scanDonate')}</span>
                </Link>

                {!user ? (
                  <>
                    <Link
                      to="/signup"
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <span>{t('nav.signUp')}</span>
                    </Link>

                    <Link
                      to="/login"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {t('nav.login')}
                    </Link>
                  </>
                ) : (
                  <Link
                    to={`/dashboard`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon name="user" className="h-5 w-5" />
                  </Link>
                )}

                <button 
                  className="text-gray-300 hover:text-white transition-colors p-1"
                  aria-label={t('nav.language')}
                >
                  <Icon name="globe" className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden ml-auto">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-400 hover:text-white p-2"
                aria-label="Open menu"
              >
                <Icon name="menu" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
}