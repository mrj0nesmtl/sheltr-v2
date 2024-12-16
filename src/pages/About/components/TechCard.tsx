import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TechCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
  delay?: number;
}

export function TechCard({ title, description, icon: Icon, items, delay = 0 }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-indigo-500/20 rounded-lg">
          <Icon className="h-6 w-6 text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <p className="text-gray-300 mb-6">{description}</p>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-gray-400">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
