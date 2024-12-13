import { Link, useLocation } from 'react-router-dom';
import type { NavigationItem } from '@/lib/navigation/config';

interface MainNavProps {
  items: NavigationItem[];
}

export function MainNav({ items }: MainNavProps) {
  const location = useLocation();

  return (
    <nav className="flex space-x-8">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-sm font-medium transition-colors ${
            location.pathname === item.path
              ? 'text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
} 