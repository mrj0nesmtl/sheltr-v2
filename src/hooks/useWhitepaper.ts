import { useEffect, useState } from 'react';

export function useWhitepaper(language: string = 'en') {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Use the correct path to the whitepaper content
        const response = await fetch(`/docs/whitepaper_${language === 'fr' ? 'fr' : 'eng'}.md`);
        if (!response.ok) {
          throw new Error(`Failed to load whitepaper: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error('Error loading whitepaper:', err);
        // Fallback to English if French fails
        if (language === 'fr') {
          try {
            const enResponse = await fetch('/docs/whitepaper_eng.md');
            if (!enResponse.ok) throw new Error('Failed to load English content');
            const enText = await enResponse.text();
            setContent(enText);
            setError(null);
          } catch (fallbackErr) {
            setError('Failed to load whitepaper content');
            setContent('');
          }
        } else {
          setError('Failed to load whitepaper content');
          setContent('');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [language]);

  return { content, isLoading, error };
} 