import React from 'react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

// Define all available icons
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
  
  // System & Monitoring
  cpu: Icons.Cpu,
  database: Icons.Database,
  'hard-drive': Icons.HardDrive,
  server: Icons.Server,
  terminal: Icons.Terminal,
  wifi: Icons.Wifi,
  shield: Icons.Shield,
  
  // Media & Communication
  'video-camera': Icons.Video,
  linkedin: Icons.Linkedin,
  youtube: Icons.Youtube,
  video: Icons.Video,
  headphones: Icons.Headphones,
  mail: Icons.Mail,
  
  // Finance & Business
  'dollar-sign': Icons.DollarSign,
  'credit-card': Icons.CreditCard,
  wallet: Icons.Wallet,
  building: Icons.Building2,
  briefcase: Icons.Briefcase,
  
  // Files & Documents
  'file-text': Icons.FileText,
  download: Icons.Download,
  book: Icons.BookOpen,
  
  // Misc UI Elements
  globe: Icons.Globe,
  home: Icons.Home,
  'log-out': Icons.LogOut,
  'log-in': Icons.LogIn,
  calendar: Icons.Calendar,
  clock: Icons.Clock,
  target: Icons.Target,
  'qr-code': Icons.QrCode,
  scan: Icons.Scan,
  
  // Shopping & Commerce
  'shopping-bag': Icons.ShoppingBag,
  'shopping-cart': Icons.ShoppingCart,
  package: Icons.Package,
  gift: Icons.Gift,
  
  // Blockchain & Crypto
  coins: Icons.Coins,
  layers: Icons.Layers,
  
  // Social & Sharing
  share: Icons.Share2,
  'message-circle': Icons.MessageCircle,
  'message-square': Icons.MessageSquare,
  heart: Icons.Heart,
  
  // Device & Hardware
  smartphone: Icons.Smartphone,
  tablet: Icons.Tablet,
  laptop: Icons.Laptop,
  
  // Security & Access
  lock: Icons.Lock,
  unlock: Icons.Unlock,
  key: Icons.Key,
  
  // Weather & Environment
  sun: Icons.Sun,
  moon: Icons.Moon,
  cloud: Icons.Cloud,
  'cloud-rain': Icons.CloudRain,
  
  // Misc Actions
  plus: Icons.Plus,
  minus: Icons.Minus,
  'zoom-in': Icons.ZoomIn,
  'zoom-out': Icons.ZoomOut,
  refresh: Icons.RefreshCw,
  filter: Icons.Filter,
  search: Icons.Search,
  more: Icons.MoreHorizontal,
  power: Icons.Power,
  zap: Icons.Zap
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconName;
  className?: string;
}

export function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <IconComponent className="w-full h-full" />
    </div>
  );
}