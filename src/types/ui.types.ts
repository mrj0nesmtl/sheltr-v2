import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconType = LucideIcon;

export interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  onClick?: () => void;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface WithIconProps extends BaseComponentProps {
  icon?: IconType;
  iconClassName?: string;
} 