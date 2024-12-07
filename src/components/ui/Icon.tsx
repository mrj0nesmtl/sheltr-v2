import React from 'react';
import {
  User,
  Search,
  Loader,
  Menu,
  Code,
  FileText,
  Info,
  ChevronDown,
  ChevronRight,
  X,
  Globe,
  Headphones,
  Youtube,
  Linkedin,
  Video,
  Link,
  TrendingUp,
  Fingerprint,
  Home,
  Settings,
  LogOut,
  LogIn,
  LayoutDashboard,
  BarChart,
  Shield,
  Heart,
  Wallet,
  ArrowRight,
  Mail,
  Lock,
  MapPin,
  DollarSign,
  AlertCircle,
  Users,
  Phone,
  Send,
  CheckCircle,
  Trophy,
  Calendar,
  XCircle,
  Tag,
  Save,
  Camera,
  UserCog,
  AlertTriangle,
  Activity,
  Book,
  File,
  ScrollText,
  Newspaper,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Globe2,
  Clock,
  Play,
  Pause,
  Check,
  Coins,
  BarChart3,
  Handshake,
  UserPlus,
  QrCode,
  Gift,
  Sun,
  Moon,
  Building
} from 'lucide-react';
import { ChristmasTreeIcon } from './CustomIcons';

export type IconName = 
  | 'arrowLeft'
  | 'arrowRight'
  | 'building'
  | 'building2'
  | 'chevronDown'
  | 'chevronRight'
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'lineChart'
  | 'tiktok'
  | 'youtube'
  | 'linkedin'
  | 'globe'
  | 'helpCircle'
  | 'settings'
  | 'qrCode'
  | 'trendingUp'
  | 'info'
  | 'x'
  | 'logIn'
  | 'logOut'
  | 'userPlus'
  | 'user'
  | 'search'
  | 'loader'
  | 'menu'
  | 'code'
  | 'fileText'
  | 'headphones'
  | 'mail'
  | 'lock'
  | 'mapPin'
  | 'dollarSign'
  | 'alertCircle'
  | 'users'
  | 'phone'
  | 'send'
  | 'checkCircle'
  | 'trophy'
  | 'calendar'
  | 'xCircle'
  | 'tag'
  | 'save'
  | 'camera'
  | 'userCog'
  | 'alertTriangle'
  | 'activity'
  | 'book'
  | 'file'
  | 'scrollText'
  | 'newspaper'
  | 'messageCircle'
  | 'messageSquare'
  | 'video'
  | 'globe2'
  | 'clock'
  | 'play'
  | 'pause'
  | 'check'
  | 'coins'
  | 'barChart3'
  | 'handshake'
  | 'userPlus'
  | 'qrCode'
  | 'verified'
  | 'login'
  | 'logout'
  | 'helpCircle'
  | 'christmas-tree'
  | 'gift'
  | 'sun'
  | 'moon'
  | 'building';

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const icons: Record<IconName, React.ElementType> = {
    user: User,
    search: Search,
    loader: Loader,
    menu: Menu,
    code: Code,
    fileText: FileText,
    info: Info,
    chevronDown: ChevronDown,
    chevronRight: ChevronRight,
    x: X,
    globe: Globe,
    headphones: Headphones,
    youtube: Youtube,
    linkedin: Linkedin,
    tiktok: Video,
    link: Link,
    trendingUp: TrendingUp,
    fingerprint: Fingerprint,
    home: Home,
    settings: Settings,
    logOut: LogOut,
    logIn: LogIn,
    layoutDashboard: LayoutDashboard,
    barChart: BarChart,
    shield: Shield,
    heart: Heart,
    wallet: Wallet,
    arrowRight: ArrowRight,
    mail: Mail,
    lock: Lock,
    mapPin: MapPin,
    dollarSign: DollarSign,
    alertCircle: AlertCircle,
    users: Users,
    phone: Phone,
    send: Send,
    checkCircle: CheckCircle,
    trophy: Trophy,
    calendar: Calendar,
    xCircle: XCircle,
    tag: Tag,
    save: Save,
    camera: Camera,
    userCog: UserCog,
    alertTriangle: AlertTriangle,
    activity: Activity,
    book: Book,
    file: File,
    scrollText: ScrollText,
    newspaper: Newspaper,
    messageCircle: MessageCircle,
    arrowUp: ArrowUp,
    arrowDown: ArrowDown,
    messageSquare: MessageSquare,
    video: Video,
    globe2: Globe2,
    clock: Clock,
    play: Play,
    pause: Pause,
    check: Check,
    coins: Coins,
    barChart3: BarChart3,
    handshake: Handshake,
    userPlus: UserPlus,
    qrCode: QrCode,
    verified: CheckCircle,
    login: LogIn,
    logout: LogOut,
    helpCircle: AlertCircle,
    'christmas-tree': ChristmasTreeIcon,
    'gift': Gift,
    sun: Sun,
    moon: Moon,
    building: Building
  };

  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={className} />;
} 