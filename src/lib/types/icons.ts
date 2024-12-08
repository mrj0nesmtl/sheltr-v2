import type { LucideProps } from 'lucide-react';

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
  | 'user-plus';

export interface IconProps extends Partial<LucideProps> {
  name: IconName;
} 