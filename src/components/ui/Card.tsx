import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-lg border border-gray-800 bg-gray-900 text-gray-100", className)}>
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

export default Card; 