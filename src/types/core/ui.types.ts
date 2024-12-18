import type { LucideProps } from 'lucide-react';
import type { BaseComponentProps } from './shared';

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardProps extends BaseComponentProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: boolean | string;
}

export interface InputProps extends BaseComponentProps {
  label?: string;
  error?: string;
  type?: string;
  placeholder?: string;
}

export interface SelectProps extends BaseComponentProps {
  options: Array<{ label: string; value: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
}

// Re-export LucideProps for consistency
export type { LucideProps }; 