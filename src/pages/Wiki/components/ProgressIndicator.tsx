import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  value: number;
  max: number;
  className?: string;
}

export const ProgressIndicator = ({ value, max, className }: ProgressIndicatorProps) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className={cn("w-full bg-gray-700/50 rounded-full h-2", className)}>
      <div 
        className="bg-blue-500 h-full rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}; 