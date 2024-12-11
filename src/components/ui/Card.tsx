import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ 
  children, 
  className 
}: CardProps) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-b border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Content = function CardContent({ 
  children, 
  className 
}: CardProps) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ 
  children, 
  className 
}: CardProps) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
}; 