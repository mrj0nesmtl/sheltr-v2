import { useLocation } from 'react-router-dom';
import { mainNavigation } from '@/lib/navigation/config';

export function useNavigation() {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return {
    mainNavigation,
    isActiveRoute,
  };
} 