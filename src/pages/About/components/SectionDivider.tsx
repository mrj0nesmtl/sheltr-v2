import { motion } from 'framer-motion';

interface SectionDividerProps {
  title: string;
  subtitle?: string;
}

export function SectionDivider({ title, subtitle }: SectionDividerProps) {
  return (
    <motion.div 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>
      {subtitle && (
        <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
} 