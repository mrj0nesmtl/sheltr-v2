import { cn } from '@/lib/utils';
import React from 'react';
import { Icon, type IconName } from './Icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconName;
  leftAddon?: string;
  required?: boolean;
  helperText?: string;
  rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  icon,
  leftAddon,
  required,
  helperText,
  rightAddon,
  id,
  ...props
}: InputProps, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
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
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : 
            undefined
          }
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50',
            'px-3 py-2 text-sm text-white placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            icon && 'pl-10',
            leftAddon && 'pl-7',
            rightAddon && 'pr-10',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          required={required}
          {...props}
        />
        {rightAddon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightAddon}
          </div>
        )}
      </div>
      {error && (
        <p 
          id={`${inputId}-error`}
          className="text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p 
          id={`${inputId}-helper`}
          className="text-sm text-gray-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input'; 