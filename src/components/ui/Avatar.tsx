import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  name?: string;
}

export function Avatar({ src, alt, size = 'md', name }: AvatarProps) {
  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'rounded-full bg-indigo-500/20 flex items-center justify-center overflow-hidden',
        {
          'w-8 h-8': size === 'sm',
          'w-10 h-10': size === 'md',
          'w-12 h-12': size === 'lg',
        }
      )}
    >
      {src ? (
        <img src={src} alt={alt || name || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span className="text-indigo-200 font-medium">{initials}</span>
      )}
    </div>
  );
} 