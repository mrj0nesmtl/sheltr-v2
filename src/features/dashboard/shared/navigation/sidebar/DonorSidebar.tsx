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
      path: `/dashboard/donor/${user?.id}`,
      iconColor: 'text-indigo-400'
    },
    {
      icon: Heart,
      label: 'My Donations',
      path: `/dashboard/donor/${user?.id}/donations`,
      iconColor: 'text-rose-400'
    },
    {
      icon: Trophy,
      label: 'Impact',
      path: `/dashboard/donor/${user?.id}/impact`,
      iconColor: 'text-amber-400'
    }
  ];

  return (
    <BaseSidebar
      title={<Logo className="h-8 w-auto" />}
      menuItems={menuItems}
      showUserInfo={false}
    />
  );
}

export default DonorSidebar;
