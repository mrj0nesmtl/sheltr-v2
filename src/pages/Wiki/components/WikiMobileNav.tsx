import { useState } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, LucideIcon } from 'lucide-react';

interface WikiMobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  sections: Array<{
    id: string;
    label: string;
    icon: LucideIcon;
  }>;
}

export const WikiMobileNav = ({ isOpen, onToggle, sections }: WikiMobileNavProps) => {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
      </button>

      {isOpen && (
        <nav className="fixed inset-0 bg-gray-800/95 backdrop-blur-sm z-40 animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-6 p-4">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.id}
                spy={true}
                smooth={true}
                offset={-64}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors w-full max-w-sm"
                onClick={onToggle}
              >
                <section.icon className="w-5 h-5" />
                <span className="font-medium">{section.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};
