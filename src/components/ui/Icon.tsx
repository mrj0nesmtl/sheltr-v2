import React from 'react';
import {
  User, Link, Menu, TrendingUp, Fingerprint, Home, Settings, LogOut,
  LogIn, X, ChevronDown, ChevronRight, Facebook, Twitter, Instagram,
  Linkedin, QrCode, Info, Building, Building2, UserPlus, LayoutDashboard,
  BarChart, Shield, Heart, Wallet, ArrowRight, Mail, Lock, MapPin,
  DollarSign, AlertCircle, Users, Phone, Send, CheckCircle, Trophy,
  Calendar, XCircle, Tag, Save, Camera, UserCog, Globe, AlertTriangle,
  Activity
} from 'lucide-react';

const Icons = {
  user: User,
  link: Link,
  menu: Menu,
  trendingUp: TrendingUp,
  fingerprint: Fingerprint,
  home: Home,
  settings: Settings,
  logout: LogOut,
  login: LogIn,
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
  calendar: Calendar,
  xCircle: XCircle,
  tag: Tag,
  save: Save,
  camera: Camera,
  userCog: UserCog,
  globe: Globe,
  alertTriangle: AlertTriangle,
  activity: Activity
} as const;

export type IconName = keyof typeof Icons;

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      className={className} 
      aria-hidden="true"
      {...props}
    />
  );
}; 