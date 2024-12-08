import { WhitepaperView } from './WhitepaperView';

interface WhitepaperLayoutProps {
  variant?: 'full' | 'accordion';
}

export function WhitepaperLayout({ variant = 'full' }: WhitepaperLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-gray-900 py-16",
      variant === 'accordion' && "min-h-0 py-0"
    )}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <WhitepaperView variant={variant} />
      </div>
    </div>
  );
} 