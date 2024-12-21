import { useMarkdownContent } from '@/hooks/useMarkdownContent';
import { motion } from 'framer-motion';

interface MarkdownViewerProps {
  path: string;
}

export function MarkdownViewer({ path }: MarkdownViewerProps) {
  const { content, isLoading } = useMarkdownContent(path);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose prose-invert max-w-none"
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </motion.div>
  );
} 