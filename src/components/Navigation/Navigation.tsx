import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { MobileNav } from './MobileNav';

export function Navigation() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0">
              <Logo className="h-8 w-auto" />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/how-it-works" className="text-gray-300 hover:text-white">
                {t('nav.solutions_menu.howItWorks')}
              </Link>
              <Link to="/solutions" className="text-gray-300 hover:text-white">
                {t('nav.solutions_menu.solutions')}
              </Link>
              <Link to="/scan-donate" className="text-gray-300 hover:text-white">
                {t('nav.scanDonate')}
              </Link>
              <Link to="/impact" className="text-gray-300 hover:text-white">
                {t('nav.solutions_menu.impact')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-gray-300 hover:text-white">
              {t('nav.login')}
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 px-4 py-2 rounded-md text-white hover:bg-indigo-700"
            >
              {t('nav.signUp')}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </nav>
  );
}