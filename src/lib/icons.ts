import {
    AlertCircle,
    AlertTriangle,
    ArrowRight,
    BarChart,
    Building,
    Building2,
    Calendar,
    Camera,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    DollarSign,
    Facebook,
    Fingerprint,
    Globe,
    Heart,
    Home,
    Info,
    Instagram,
    LayoutDashboard,
    Link,
    Linkedin,
    Lock,
    LogIn,
    LogOut,
    Mail,
    MapPin,
    Menu,
    Phone,
    QrCode,
    Save,
    Send,
    Settings,
    Shield,
    Tag,
    TrendingUp,
    Trophy,
    Twitter,
    User,
    UserCog,
    UserPlus,
    Users,
    Wallet,
    X,
    XCircle,
} from 'lucide-react';

export const Icons = {
  // Analytics & Data
  barChart: BarChart,
  trendingUp: TrendingUp,
  
  // Navigation & Layout
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  
  // Authentication & Security
  fingerprint: Fingerprint,
  shield: Shield,
  lock: Lock,
  login: LogIn,
  logout: LogOut,
  
  // Users & Profiles
  user: User,
  users: Users,
  userCog: UserCog,
  userPlus: UserPlus,
  
  // Social Media
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  
  // Status & Feedback
  alertCircle: AlertCircle,
  alertTriangle: AlertTriangle,
  checkCircle: CheckCircle,
  xCircle: XCircle,
  info: Info,
  
  // Features & Actions
  qrCode: QrCode,
  heart: Heart,
  wallet: Wallet,
  arrowRight: ArrowRight,
  save: Save,
  send: Send,
  settings: Settings,
  
  // Communication & Contact
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  
  // Organization & Structure
  building: Building,
  building2: Building2,
  dashboard: LayoutDashboard,
  calendar: Calendar,
  tag: Tag,
  link: Link,
  globe: Globe,
  dollarSign: DollarSign,
  camera: Camera,
  trophy: Trophy,
} as const;

export type IconName = keyof typeof Icons;

// Helper function to get icon component with type safety
export const getIcon = (name: IconName) => Icons[name];

// Helper function to check if an icon exists
export const hasIcon = (name: string): name is IconName => name in Icons; 