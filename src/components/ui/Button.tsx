import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  asChild?: boolean;
}

export function Button({
  children,
  className,
  variant = 'default',
  size = 'md',
  isLoading = false,
  disabled,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? 'span' : 'button';
  
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'default',
          'border border-gray-700 bg-transparent hover:bg-gray-700/50': variant === 'outline',
          'hover:bg-gray-700/50': variant === 'ghost',
          'text-indigo-500 hover:text-indigo-600 p-0 bg-transparent': variant === 'link',
          'h-9 px-4 py-2': size === 'md',
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-6': size === 'lg',
        },
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Comp>
  );
} 