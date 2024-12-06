import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg'
};

export function Avatar({ src, fallback, size = 'md', className }: AvatarProps) {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    setError(true);
  };

  if (!src || error) {
    return (
      <div
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-gray-700',
          sizeClasses[size],
          className
        )}
      >
        <span className="font-medium text-gray-300 uppercase">
          {fallback?.slice(0, 2)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Avatar"
      onError={handleError}
      className={cn(
        'rounded-full object-cover',
        sizeClasses[size],
        className
      )}
    />
  );
} 