import { mainNavigation } from '@/lib/navigation/config';
import { useLocation } from 'react-router-dom';

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