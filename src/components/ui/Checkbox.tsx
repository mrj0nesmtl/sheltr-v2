import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export function Checkbox({ 
  label, 
  error, 
  className, 
  ...props 
}: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border-gray-600 bg-gray-700/50 text-indigo-600",
          "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900",
          "hover:border-gray-500 transition-colors",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {label && (
        <label 
          htmlFor={props.id} 
          className={cn(
            "ml-2 text-sm text-gray-300",
            error && "text-red-400"
          )}
        >
          {label}
        </label>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
} 