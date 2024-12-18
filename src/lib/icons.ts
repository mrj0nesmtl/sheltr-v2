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
  fingerprint: Fingerprint,
  home: Home,
  user: User,
  settings: Settings,
  logout: LogOut,
  login: LogIn,
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  qrCode: QrCode,
  info: Info,
  building: Building,
  building2: Building2,
  userPlus: UserPlus,
  dashboard: LayoutDashboard,
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
  trendingUp: TrendingUp,
  calendar: Calendar,
  xCircle: XCircle,
  tag: Tag,
  save: Save,
  camera: Camera,
  userCog: UserCog,
  globe: Globe,
  alertTriangle: AlertTriangle,
  link: Link,
} as const;

export type IconName = keyof typeof Icons; 