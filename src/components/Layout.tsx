import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { NavigationItems } from './Navigation/NavigationItems';
import { MobileMenu } from './Navigation/MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                SHELTR
              </Link>
            </div>

            <div className="hidden lg:block w-full ml-10">
              <NavigationItems />
            </div>

            <MobileMenu />
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}