import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import React from 'react';
import { DollarSign } from 'lucide-react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';

// Define icon type
export type IconName = keyof typeof icons;
export type IconComponent = LucideIcon;

interface IconProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof LucideProps> {
  name: IconName;
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

// Complete icons object with strict typing
const icons = {
  // Navigation & Arrows
  menu: Icons.Menu,
  'chevron-down': Icons.ChevronDown,
  'chevron-right': Icons.ChevronRight,
  'chevron-up': Icons.ChevronUp,
  'arrow-right': Icons.ArrowRight,
  'arrow-left': Icons.ArrowLeft,
  'external-link': Icons.ExternalLink,
  'x': Icons.X,
  
  // Media & Player Controls
  'play': Icons.Play,
  'spotify': Icons.Music, // Using Music as fallback for Spotify
  'pause': Icons.Pause,
  'skip-forward': Icons.SkipForward,
  'skip-back': Icons.SkipBack,
  'volume': Icons.Volume2,
  
  // User & Profile
  user: Icons.User,
  'user-plus': Icons.UserPlus,
  'user-check': Icons.UserCheck,
  users: Icons.Users,
  settings: Icons.Settings,
  camera: Icons.Camera,
  edit: Icons.Edit2,
  trash: Icons.Trash2,
  
  // Status & Notifications
  bell: Icons.Bell,
  alert: Icons.AlertTriangle,
  'alert-circle': Icons.AlertCircle,
  'alert-triangle': Icons.AlertTriangle,
  'alert-octagon': Icons.AlertOctagon,
  info: Icons.Info,
  loader: Icons.Loader2,
  'check-circle': Icons.CheckCircle,
  'x-circle': Icons.XCircle,
  check: Icons.Check,
  'help-circle': Icons.HelpCircle,
  
  // Analytics & Charts
  'bar-chart': Icons.BarChart2,
  'line-chart': Icons.LineChart,
  'pie-chart': Icons.PieChart,
  'trending-up': Icons.TrendingUp,
  'trending-down': Icons.TrendingDown,
  activity: Icons.Activity,
  
  // System & UI
  search: Icons.Search,
  filter: Icons.Filter,
  key: Icons.Key,
  lock: Icons.Lock,
  unlock: Icons.Unlock,
  'map-pin': Icons.MapPin,
  phone: Icons.Phone,
  mail: Icons.Mail,
  'building2': Icons.Building2,
  scan: Icons.Scan,
  
  // Additional icons used in forms and UI
  hash: Icons.Hash,
  calendar: Icons.Calendar,
  clock: Icons.Clock,
  dollar: Icons.DollarSign,
  heart: Icons.Heart,
  star: Icons.Star,
  shield: Icons.Shield,
  'file-text': Icons.FileText,
  home: Icons.Home,
  'log-out': Icons.LogOut,
  'phone-call': Icons.PhoneCall,
  'dollar-sign': DollarSign,
} as const;

export function Icon({ 
  name, 
  className, 
  size = 24,
  color,
  strokeWidth = 2,
  ...props 
}: IconProps) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon "${name}" not found in icons object. Available icons: ${Object.keys(icons).join(', ')}`);
    }
    return null;
  }

  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <IconComponent 
        size={size} 
        color={color} 
        strokeWidth={strokeWidth}
      />
    </div>
  );
}

// Export the icons object for type checking
export { icons };

// Export individual icon components for direct usage
export const IconComponents = Icons;