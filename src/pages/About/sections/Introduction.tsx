import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import engContent from '../content/sheltr_intro_eng.md?raw';
import frContent from '../content/sheltr_intro_fr.md?raw';

export function Introduction() {
  const [content] = useState(engContent);

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