import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { NavigationItems } from './NavigationItems';
import { cn } from '@/lib/utils';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        <span className="sr-only">Open main menu</span>
        <Icon name={isOpen ? 'close' : 'menu'} className="h-6 w-6" />
      </button>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="relative min-h-screen bg-gray-900 px-4 pt-5 pb-4 sm:px-6">
          <div className="absolute right-4 top-4">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Icon name="close" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-16">
            <NavigationItems 
              mobile 
              onItemClick={() => setIsOpen(false)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}