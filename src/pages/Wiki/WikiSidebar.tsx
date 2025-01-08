import React from 'react';
import { Link } from 'react-scroll';
import { cn } from '@/lib/utils';

interface WikiNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode; // Optional icon support
}

const navItems: WikiNavItem[] = [
  { id: 'overview', label: 'Platform Overview' },
  { id: 'roadmap', label: 'Development Roadmap' },
  { id: 'status', label: 'Status Report' },
  { id: 'checkpoint', label: 'Development Checkpoint' }
];

interface WikiSidebarProps {
  className?: string;
}

const WikiSidebar: React.FC<WikiSidebarProps> = ({ className }) => {
  return (
    <aside className={cn(
      "w-64 h-screen bg-gray-800/95 p-4 backdrop-blur-sm",
      "border-r border-gray-700",
      "hidden md:block", // Hide on mobile, show on medium screens and up
      className
    )}>
      <div className="sticky top-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-20}
              duration={500}
              className={cn(
                "block px-4 py-2 rounded-lg",
                "text-gray-300 hover:text-white",
                "hover:bg-gray-700/50",
                "transition-colors duration-200",
                "cursor-pointer"
              )}
              activeClass="bg-gray-700 text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default WikiSidebar;
