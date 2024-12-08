import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MobileMenu } from './Navigation/MobileMenu';
import { MainNav } from './Navigation/MainNav';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { Footer } from '@/components/ui/Footer';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo - Visible on both mobile and desktop with reduced size */}
            <div className="flex-shrink-0 mr-6">
              <Link to="/" className="flex items-center">
                <Logo className="h-6 w-auto" />
                <span className="sr-only">SHELTR</span>
              </Link>
            </div>

            {/* Desktop Navigation & Buttons - Hidden on Mobile */}
            <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1">
              {/* Main Navigation */}
              <div className="flex items-center space-x-8">
                <MainNav />
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-6">
                <Link
                  to="/scan"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Icon name="qr-code" className="h-4 w-4 mr-2" />
                  <span>Scan & Donate</span>
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <span>Sign Up</span>
                </Link>

                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>

                <button className="text-gray-300 hover:text-white transition-colors p-1">
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