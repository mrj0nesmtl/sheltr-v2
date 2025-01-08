import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react'; // Assuming you're using lucide-react for icons

const WikiMobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-lg"
      >
        {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
      </button>

      {isOpen && (
        <nav className="fixed inset-0 bg-gray-800/95 backdrop-blur-sm z-40">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            {/* Same navigation items as sidebar */}
          </div>
        </nav>
      )}
    </div>
  );
};

export default WikiMobileNav;
