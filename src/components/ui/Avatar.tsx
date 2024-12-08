import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  fallback: string;
  className?: string;
}

export function Avatar({ src, fallback, className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt="User avatar"
        className={cn(
          "rounded-full object-cover",
          className
        )}
      />
    );
  }

  return (
    <div className={cn(
      "flex items-center justify-center bg-indigo-600 text-white rounded-full",
      className
    )}>
      <span className="text-sm font-medium">
        {fallback}
      </span>
    </div>
  );
} 