import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  fallback?: string;
  className?: string;
  onClick?: () => void;
}

export function Avatar({ src, fallback, className, onClick }: AvatarProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative inline-block rounded-full overflow-hidden bg-gray-700",
        onClick && "cursor-pointer",
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          {fallback}
        </div>
      )}
    </div>
  );
} 