import React from 'react';
import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// Define all available icon names
export type IconName =
  | 'info'
  | 'code'
  | 'users'
  | 'file-text'
  | 'coins'
  | 'activity'
  | 'shopping-bag'
  | 'blocks'
  | 'chevron-down'
  | 'chevron-up'
  | 'globe'
  | 'loader'
  | 'help-circle'
  | 'settings'
  | 'qr-code'
  | 'trending-up'
  | 'book'
  | 'layout-dashboard'
  | 'home'
  | 'history'
  | 'bar-chart'
  | 'youtube'
  | 'headphones'
  | 'video'
  | 'linkedin'
  | 'mail'
  | 'lock'
  | 'user'
  | 'log-in'
  | 'log-out'
  | 'menu'
  | 'x'
  | 'user-plus'
  | 'building'
  | 'landmark'
  | 'list'
  | 'dollar'
  | 'check'
  | 'chart-bar'
  | 'check-circle';

// Define the icon component props
export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

// Direct import of icons we use
const iconComponents = {
  'info': Icons.Info,
  'code': Icons.Code,
  'users': Icons.Users,
  'file-text': Icons.FileText,
  'coins': Icons.Coins,
  'activity': Icons.Activity,
  'shopping-bag': Icons.ShoppingBag,
  'blocks': Icons.Blocks,
  'chevron-down': Icons.ChevronDown,
  'chevron-up': Icons.ChevronUp,
  'globe': Icons.Globe,
  'loader': Icons.Loader,
  'help-circle': Icons.HelpCircle,
  'settings': Icons.Settings,
  'qr-code': Icons.QrCode,
  'trending-up': Icons.TrendingUp,
  'book': Icons.Book,
  'layout-dashboard': Icons.LayoutDashboard,
  'home': Icons.Home,
  'history': Icons.History,
  'bar-chart': Icons.BarChart,
  'youtube': Icons.Youtube,
  'headphones': Icons.Headphones,
  'video': Icons.Video,
  'linkedin': Icons.Linkedin,
  'mail': Icons.Mail,
  'lock': Icons.Lock,
  'user': Icons.User,
  'log-in': Icons.LogIn,
  'log-out': Icons.LogOut,
  'menu': Icons.Menu,
  'x': Icons.X,
  'user-plus': Icons.UserPlus,
  'building': Icons.Building2,
  'landmark': Icons.Landmark,
  'list': Icons.List,
  'dollar': Icons.DollarSign,
  'check': Icons.Check,
  'chart-bar': Icons.BarChart,
  'check-circle': Icons.CheckCircle
} as const;

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...props }, ref) => {
    const IconComponent = iconComponents[name];
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }
    return <IconComponent ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon'; 