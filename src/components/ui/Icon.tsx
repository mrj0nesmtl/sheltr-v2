import React from 'react';
import * as Icons from 'lucide-react';
import type { LucideProps, LucideIcon } from 'lucide-react';

// Define all available icon names
export type IconName =
  | 'home'
  | 'user'
  | 'settings'
  | 'shield'
  | 'shield-check'
  | 'shield-alert'
  | 'lock-keyhole'
  | 'brain'
  | 'brain-circuit'
  | 'lock'
  | 'refresh'
  | 'map-pin'
  | 'trending-up'
  | 'users'
  | 'circle'
  | 'info'
  | 'code'
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
  | 'qr-code'
  | 'book'
  | 'layout-dashboard'
  | 'history'
  | 'bar-chart'
  | 'youtube'
  | 'headphones'
  | 'video'
  | 'linkedin'
  | 'mail'
  | 'log-in'
  | 'log-out'
  | 'menu'
  | 'x'
  | 'user-plus'
  | 'building'
  | 'landmark'
  | 'list'
  | 'dollar-sign'
  | 'check'
  | 'chart-bar'
  | 'check-circle'
  | 'credit-card'
  | 'user-check'
  | 'external-link'
  | 'wallet-cards'
  | 'wallet'
  | 'scan'
  | 'map'
  | 'pin'
  | 'location'
  | 'heart'
  | 'heart-filled'
  | 'heart-off'
  | 'star'
  | 'star-filled'
  | 'star-off'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'share'
  | 'send'
  | 'alert'
  | 'alert-circle'
  | 'alert-triangle'
  | 'bell'
  | 'bell-off'
  | 'calendar'
  | 'clock'
  | 'filter'
  | 'search'
  | 'chevron-right'
  | 'shield-lock'
  | 'arrow-left';

// Direct import of icons we use
const iconComponents: Record<IconName, LucideIcon> = {
  'home': Icons.Home,
  'user': Icons.User,
  'settings': Icons.Settings,
  'shield': Icons.Shield,
  'shield-check': Icons.ShieldCheck,
  'shield-alert': Icons.ShieldAlert,
  'lock-keyhole': Icons.LockKeyhole,
  'brain': Icons.Brain,
  'brain-circuit': Icons.CircuitBoard,
  'lock': Icons.Lock,
  'refresh': Icons.RefreshCw,
  'map-pin': Icons.MapPin,
  'trending-up': Icons.TrendingUp,
  'users': Icons.Users,
  'circle': Icons.Circle,
  'info': Icons.Info,
  'code': Icons.Code,
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
  'qr-code': Icons.QrCode,
  'book': Icons.Book,
  'layout-dashboard': Icons.LayoutDashboard,
  'history': Icons.History,
  'bar-chart': Icons.BarChart,
  'youtube': Icons.Youtube,
  'headphones': Icons.Headphones,
  'video': Icons.Video,
  'linkedin': Icons.Linkedin,
  'mail': Icons.Mail,
  'log-in': Icons.LogIn,
  'log-out': Icons.LogOut,
  'menu': Icons.Menu,
  'x': Icons.X,
  'user-plus': Icons.UserPlus,
  'building': Icons.Building2,
  'landmark': Icons.Landmark,
  'list': Icons.List,
  'dollar-sign': Icons.DollarSign,
  'check': Icons.Check,
  'chart-bar': Icons.BarChart,
  'check-circle': Icons.CheckCircle,
  'credit-card': Icons.CreditCard,
  'user-check': Icons.UserCheck,
  'external-link': Icons.ExternalLink,
  'wallet-cards': Icons.Wallet,
  'wallet': Icons.Wallet,
  'scan': Icons.Scan,
  'map': Icons.Map,
  'pin': Icons.Pin,
  'location': Icons.MapPin,
  'heart': Icons.Heart,
  'heart-filled': Icons.Heart,
  'heart-off': Icons.HeartOff,
  'star': Icons.Star,
  'star-filled': Icons.Star,
  'star-off': Icons.StarOff,
  'thumbs-up': Icons.ThumbsUp,
  'thumbs-down': Icons.ThumbsDown,
  'share': Icons.Share2,
  'send': Icons.Send,
  'alert': Icons.AlertTriangle,
  'alert-circle': Icons.AlertCircle,
  'alert-triangle': Icons.AlertTriangle,
  'bell': Icons.Bell,
  'bell-off': Icons.BellOff,
  'calendar': Icons.Calendar,
  'clock': Icons.Clock,
  'filter': Icons.Filter,
  'search': Icons.Search,
  'chevron-right': Icons.ChevronRight,
  'shield-lock': Icons.Lock,
  'arrow-left': Icons.ArrowLeft
};

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  className?: string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...props }, ref) => {
    // Add warning for common mistakes
    const commonMistakes: Record<string, IconName> = {
      'login': 'log-in',
      'logout': 'log-out',
      'email': 'mail',
      'warning': 'alert-triangle',
      'error': 'alert-circle',
      'success': 'check-circle',
      'ai': 'brain-circuit',
      'security': 'lock-keyhole',
      'circuit': 'brain-circuit',
      'secure': 'lock-keyhole'
    };

    let IconComponent: LucideIcon;

    if (commonMistakes[name]) {
      IconComponent = iconComponents[commonMistakes[name]];
    } else {
      IconComponent = iconComponents[name as IconName];
    }

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }
    
    return <IconComponent ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon';