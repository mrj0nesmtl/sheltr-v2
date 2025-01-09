import React from 'react';
import { cn } from '@/lib/utils';

interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(({
  className,
  label,
  error,
  helperText,
  required,
  id,
  ...props
}, ref) => {
  const inputId = id || `file-${label?.toLowerCase().replace(/\s+/g, '-')}`;

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
        <input
          ref={ref}
          id={inputId}
          type="file"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : 
            undefined
          }
          className={cn(
            'flex w-full rounded-md border border-gray-700 bg-gray-800/50',
            'text-sm text-white file:mr-4 file:py-2 file:px-4',
            'file:border-0 file:bg-gray-700 file:text-white',
            'file:hover:bg-gray-600 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          required={required}
          {...props}
        />
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

FileUpload.displayName = 'FileUpload'; 