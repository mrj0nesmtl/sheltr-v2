import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function Introduction() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/src/pages/About/content/sheltr_intro_eng.md')
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load introduction:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <div className="prose prose-invert prose-lg">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.section>
  );
} 