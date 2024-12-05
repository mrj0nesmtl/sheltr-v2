import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Icon } from '@/components/ui/Icon';

export function WhitepaperPage() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');

  React.useEffect(() => {
    async function loadWhitepaper() {
      try {
        const response = await fetch(
          `/docs/whitepaper_${i18n.language === 'fr' ? 'fr' : 'eng'}.md`
        );
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading whitepaper:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadWhitepaper();
  }, [i18n.language]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="loader" className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Language Toggle */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
          className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Icon name="globe" className="w-5 h-5" />
          <span>{i18n.language === 'en' ? 'Français' : 'English'}</span>
        </button>
      </div>
    </div>
  );
} 