export type NavigationItem = {
  path: string;
  label: string;
  icon?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  roles?: string[];
};

export const navigationConfig: NavigationItem[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/about',
    label: 'About',
  },
  {
    path: '/how-it-works',
    label: 'How It Works',
  },
  // Add other routes...
]; 