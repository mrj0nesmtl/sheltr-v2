import { useEffect, useState } from 'react';

export function useMarkdownContent(path: string) {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error(`Error loading markdown content from ${path}:`, err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
        setContent('');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [path]);

  return { content, isLoading, error };
} 