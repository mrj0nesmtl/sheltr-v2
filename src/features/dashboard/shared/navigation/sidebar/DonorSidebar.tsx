import { 
  LayoutDashboard, 
  Heart, 
  Trophy 
} from 'lucide-react';
import { BaseSidebar } from './BaseSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/ui/Logo';

export function DonorSidebar() {
  const { user } = useAuth();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/donor/dashboard',
      iconColor: 'text-indigo-400'
    },
    {
      icon: Heart,
      label: 'My Donations',
      path: '/donor/donations',
      iconColor: 'text-rose-400'
    },
    {
      icon: Trophy,
      label: 'Impact',
      path: '/donor/impact',
      iconColor: 'text-amber-400'
    }
  ];

  return (
    <BaseSidebar
      title="Donor Dashboard"
      menuItems={menuItems}
      userInfo={user ? {
        email: user.email,
        role: 'Donor',
        avatar: user.email?.[0]?.toUpperCase()
      } : undefined}
      logo={<Logo className="h-8 w-auto" />}
    />
  );
}

export default DonorSidebar;
