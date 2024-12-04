import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function MobileMenu({ isOpen, onToggle, children }: MobileMenuProps) {
  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onToggle}
        className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="sr-only">
          {isOpen ? 'Close menu' : 'Open menu'}
        </span>
        {isOpen ? (
          <X className="block h-6 w-6" />
        ) : (
          <Menu className="block h-6 w-6" />
        )}
      </button>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm"
          onClick={onToggle}
          aria-hidden="true"
        />

        {/* Menu content */}
        <div className="relative min-h-screen w-full max-w-xs bg-gray-900 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-gray-900 px-4 pt-5 pb-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-white">Menu</div>
              <button
                type="button"
                onClick={onToggle}
                className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="px-4 py-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}