import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { NavigationItems } from './Navigation/NavigationItems';
import { MobileMenu } from './Navigation/MobileMenu';
import { Footer } from './Footer/Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
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

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}