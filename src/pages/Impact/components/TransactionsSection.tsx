import { History } from 'lucide-react';
import { motion } from 'framer-motion';
import { TransactionTable } from '@/features/dashboard/shared/analytics/metrics/TransactionTable';

export function TransactionsSection() {
  return (
    <section id="transactions" className="py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <History className="w-6 h-6 mr-2" />
          Recent Transactions
        </h2>

        {/* Using the existing TransactionTable component */}
        <TransactionTable />
      </motion.div>
    </section>
  );
} 