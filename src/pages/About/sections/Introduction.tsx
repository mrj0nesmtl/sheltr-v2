import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

export function Introduction() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/src/pages/About/content/sheltr_intro_eng.md');
        if (!response.ok) throw new Error('Failed to load content');
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading content:', error);
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Icon name="loader" className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-12">
        <Icon name="alert-triangle" className="h-8 w-8 mx-auto mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 px-4"
    >
      <div className="prose prose-invert max-w-4xl mx-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.section>
  );
} 