import React from 'react';
import { marked } from 'marked';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ 
  content, 
  className = '' 
}) => {
  const html = marked(content);

  return (
    <div 
      className={`prose prose-lg dark:prose-invert mx-auto
        [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4
        [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-3
        [&>p]:text-gray-600 [&>p]:dark:text-gray-300 [&>p]:mb-4
        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
        [&>blockquote]:border-l-4 [&>blockquote]:border-primary-500 [&>blockquote]:pl-4
        [&>*>strong]:text-primary-600 [&>*>strong]:dark:text-primary-400
        ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}; 