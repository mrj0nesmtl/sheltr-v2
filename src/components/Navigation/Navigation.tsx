import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { MobileMenu } from './MobileMenu';
import { Logo } from '@/components/ui/Logo';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <Logo className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link to="/how-it-works" className="text-gray-300 hover:text-white">
                {t('nav.howItWorks')}
              </Link>
              <Link to="/solutions" className="text-gray-300 hover:text-white">
                {t('nav.solutions')}
              </Link>
              <Link to="/scan" className="text-gray-300 hover:text-white">
                {t('nav.scanDonate')}
              </Link>
              <Link to="/impact" className="text-gray-300 hover:text-white">
                {t('nav.impact')}
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white">
                {t('nav.about')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-400 hover:text-white p-2"
              >
                <Icon name="menu" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
} 