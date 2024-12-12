import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/stores/authStore';
import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';

export function Navigation() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">SHELTR</span>
          </Link>

          {/* Desktop Navigation */}
          <MainNav />

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Button
                variant="ghost"
                onClick={() => useAuthStore.getState().signOut()}
                className="text-gray-300"
              >
                <Icon name="log-out" className="w-4 h-4 mr-2" />
                {t('auth.signOut')}
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-300">
                    {t('auth.login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                    {t('auth.signUp')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name="menu" className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <MobileNav />
        </div>
      )}
    </nav>
  );
} 