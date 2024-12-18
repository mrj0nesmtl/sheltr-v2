import { Button } from '@/components/ui/Button';
import { useWhitepaper } from '@/hooks/useWhitepaper';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

interface WhitepaperViewProps {
  variant?: 'full' | 'accordion';
}

export function WhitepaperView({ variant = 'full' }: WhitepaperViewProps) {
  const { i18n } = useTranslation();
  const { content, isLoading } = useWhitepaper(i18n.language);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div>
      {variant === 'full' && (
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
          >
            {i18n.language === 'en' ? 'Français' : 'English'}
          </Button>
        </div>
      )}
      <div className={cn(
        "prose prose-invert max-w-none",
        variant === 'accordion' && "prose-sm"
      )}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
} 