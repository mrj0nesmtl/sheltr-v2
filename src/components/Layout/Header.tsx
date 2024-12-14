import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { MainNav } from '@/components/Navigation/MainNav';
import { MobileMenu } from '@/components/Navigation/MobileMenu';
import { UserNav } from '@/components/Navigation/UserNav';
import { navigationConfig } from '@/lib/navigation/config';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const { t } = useTranslation();

  const navItems = navigationConfig.filter(item => 
    !item.requiresAuth || (user && (!item.roles || item.roles.includes(user.role)))
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <svg 
                className="h-8 w-auto" 
                viewBox="0 0 564 132" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer 1">
                  <path className="fill-white" d="m28.8 87.4c0 16.7 13 23.2 27.8 23.2 9.6 0 24.4-2.8 24.4-15.7 0-13.5-18.8-15.8-37.3-20.7-18.6-5-37.5-12.2-37.5-35.8 0-25.6 24.3-38 47-38 26.2 0 50.4 11.5 50.4 40.5h-26.8c-0.9-15.1-11.6-19-24.8-19-8.8 0-19 3.7-19 14.3 0 9.6 6 10.9 37.5 19 9.1 2.3 37.3 8.1 37.3 36.6 0 23-18.1 40.3-52.3 40.3-27.8 0-53.8-13.7-53.5-44.7z"/>
                  <path className="fill-white" d="m111.6 3.4h27.6v48.2h50.9v-48.2h27.6v125.7h-27.6v-54.2h-50.9v54.2h-27.6z"/>
                  <path className="fill-white" d="m224.4 3.4h94v23.3h-66.4v26.9h60.9v21.5h-60.9v30.8h67.8v23.2h-95.4z"/>
                  <path className="fill-white" d="m324.4 3.4h27.6v102.5h61.3v23.2h-88.9z"/>
                  <path className="fill-white" d="m454.1 3.4h67.8c22.5 0 36.8 15.7 36.8 34.7 0 14.8-6 25.9-19.9 31.5v0.4c13.5 3.5 17.4 16.7 18.3 29.3 0.5 8 0.3 22.7 5.2 29.8h-27.6c-3.3-7.9-3-20.1-4.4-30.1-1.9-13.2-7-19-20.9-19h-27.7v49.1h-27.6zm27.6 56.8h30.3c12.3 0 19-5.2 19-17.9 0-12.2-6.7-17.4-19-17.4h-30.3z"/>
                  <path className="fill-white" d="m448 128.2h-27.6v-102.4h-61.2v-23.2h88.8z"/>
                </g>
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <MainNav items={navItems} />
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center">
            {user ? (
              <UserNav user={user} />
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex md:hidden ml-4">
              <button
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {!user && (
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2 space-y-1">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}