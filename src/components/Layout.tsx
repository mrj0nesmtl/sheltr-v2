import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { NavigationItems } from './Navigation/NavigationItems';
import { MobileMenu } from './Navigation/MobileMenu';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { useTranslation } from 'react-i18next';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  // Define dropdown content
  const solutionsDropdown = [
    {
      path: '/how-it-works',
      label: t('nav.solutions_menu.howItWorks'),
      icon: 'help-circle',
      description: t('nav.solutions_menu.howItWorksDesc')
    },
    {
      path: '/solutions',
      label: t('nav.solutions_menu.solutions'),
      icon: 'settings',
      description: t('nav.solutions_menu.solutionsDesc')
    }
  ];

  const blockchainDropdown = [
    {
      path: '/blockchain/whitepaper',
      label: t('nav.blockchain.menu.whitepaper'),
      icon: 'file-text',
      description: t('nav.blockchain.menu.whitepaperDesc')
    },
    {
      path: '/blockchain/token',
      label: t('nav.blockchain.menu.token'),
      icon: 'coins',
      description: t('nav.blockchain.menu.tokenDesc')
    },
    {
      path: '/blockchain/transactions',
      label: t('nav.blockchain.menu.transactions'),
      icon: 'activity',
      description: t('nav.blockchain.menu.transactionsDesc')
    },
    {
      path: '/blockchain/depot',
      label: t('nav.blockchain.menu.depot'),
      icon: 'shopping-bag',
      description: t('nav.blockchain.menu.depotDesc')
    }
  ];

  // Dropdown menu component
  const DropdownMenu = ({ items }: { items: typeof solutionsDropdown }) => (
    <div className="absolute left-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="relative bg-gray-800 px-5 py-6">
          <div className="grid gap-6">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center p-3 -m-3 rounded-lg hover:bg-gray-700/50 transition duration-150 ease-in-out group/item"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-700/50 group-hover/item:bg-indigo-500/20 transition-colors">
                  <Icon 
                    name={item.icon} 
                    className="h-6 w-6 text-indigo-400 group-hover/item:text-indigo-300" 
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-white group-hover/item:text-indigo-300">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <Logo className="h-8 w-auto" />
              </Link>
            </div>

            {/* Primary Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {/* About */}
              <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
                About
              </Link>

              {/* Solutions Dropdown */}
              <div className="relative group">
                <button className="text-gray-300 group-hover:text-white px-3 py-2 inline-flex items-center transition-colors">
                  <span>Solutions</span>
                  <Icon name="chevron-down" className="ml-1 h-4 w-4 group-hover:text-indigo-400 transition-colors" />
                </button>
                <DropdownMenu items={solutionsDropdown} />
              </div>

              {/* Impact */}
              <Link to="/impact" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Impact
              </Link>

              {/* Blockchain Dropdown */}
              <div className="relative group">
                <button className="text-gray-300 group-hover:text-white px-3 py-2 inline-flex items-center transition-colors">
                  <span>Blockchain</span>
                  <Icon name="chevron-down" className="ml-1 h-4 w-4 group-hover:text-indigo-400 transition-colors" />
                </button>
                <DropdownMenu items={blockchainDropdown} />
              </div>

              {/* Blog */}
              <Link to="/blog" className="text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Blog
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/scan"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Icon name="qr-code" className="h-4 w-4 mr-2 inline-block" />
                Scan & Donate
              </Link>

              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-4 py-2"
              >
                Login
              </Link>

              {/* Language Toggle */}
              <button className="text-gray-300 hover:text-white">
                <Icon name="globe" className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
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

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
}