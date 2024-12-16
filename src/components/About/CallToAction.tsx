import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CallToAction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-gray-800/50 to-transparent rounded-2xl p-12 max-w-4xl mx-auto text-center"
    >
      <motion.h2 
        className="text-4xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Want to Learn More?
      </motion.h2>

      <motion.p 
        className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Read our technical whitepaper for a comprehensive overview of SHELTR's architecture and implementation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Button 
          size="lg" 
          className="bg-indigo-600 hover:bg-indigo-500 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-indigo-500/25"
          asChild
        >
          <a 
            href="/blockchain/whitepaper"
            className="inline-flex items-center px-8 py-4 text-lg font-medium"
          >
            <FileText className="w-6 h-6 mr-3" />
            Read the Whitepaper
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}
