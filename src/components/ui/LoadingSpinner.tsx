import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  fullScreen = true,
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-2',
    lg: 'h-16 w-16 border-3'
  };

  return (
    <div className={cn(
      "flex items-center justify-center",
      fullScreen && "min-h-screen",
      className
    )}>
      <div className={cn(
        "animate-spin rounded-full",
        "border-t-indigo-600 border-r-transparent",
        "border-b-indigo-600 border-l-transparent",
        sizeClasses[size]
      )}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
} 