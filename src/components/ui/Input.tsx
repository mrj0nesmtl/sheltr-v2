import { cn } from '@/lib/utils';
import React from 'react';
import { Icon, type IconName } from './Icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconName;
  leftAddon?: string;
}

export function Input({
  className,
  label,
  error,
  icon,
  leftAddon,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {leftAddon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400">{leftAddon}</span>
          </div>
        )}
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon name={icon} className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50',
            'px-3 py-2 text-sm text-white placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            leftAddon && 'pl-7',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 