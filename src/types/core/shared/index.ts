import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  testId?: string;
}

export interface BasePageProps extends BaseComponentProps {
  title?: string;
  description?: string;
  metaTags?: MetaTags;
}

export interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: Error | null;
}

export type IconType = LucideIcon;

export interface IconProps extends BaseComponentProps {
  icon: IconType;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  onClick?: () => void;
}

export interface WithIconProps extends BaseComponentProps {
  icon?: IconType;
  iconClassName?: string;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

