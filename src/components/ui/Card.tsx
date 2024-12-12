import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "rounded-lg border border-gray-700 bg-gray-800/50 shadow-sm",
        className
      )} 
      {...props}
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