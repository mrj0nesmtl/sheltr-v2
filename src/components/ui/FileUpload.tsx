import React, { type FC } from 'react';
import { cn } from '@/lib/utils';

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const FileUpload: FC<FileUploadProps> = ({
  label,
  error,
  icon,
  className,
  children,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={cn(
        "relative rounded-lg border border-gray-700",
        "hover:border-gray-600 transition-colors",
        error && "border-red-500",
        className
      )}>
        <input
          type="file"
          className={cn(
            "block w-full text-sm text-gray-300",
            "file:mr-4 file:py-2 file:px-4",
            "file:rounded-l-lg file:border-0",
            "file:text-sm file:font-medium",
            "file:bg-gray-700 file:text-gray-300",
            "hover:file:bg-gray-600",
            "cursor-pointer"
          )}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {children}
    </div>
  );
}; 