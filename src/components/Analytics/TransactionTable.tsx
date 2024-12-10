import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  type: 'direct' | 'housing' | 'operations';
  status: 'completed' | 'pending' | 'failed';
  hash: string;
}

const recentTransactions: Transaction[] = [
  {
    id: '1',
    timestamp: '2024-03-15T10:30:00Z',
    amount: 500,
    type: 'direct',
    status: 'completed',
    hash: '0x1234...5678'
  },
  {
    id: '2',
    timestamp: '2024-03-15T10:28:00Z',
    amount: 1200,
    type: 'housing',
    status: 'completed',
    hash: '0x5678...9012'
  },
  {
    id: '3',
    timestamp: '2024-03-15T10:25:00Z',
    amount: 300,
    type: 'operations',
    status: 'pending',
    hash: '0x9012...3456'
  },
  {
    id: '4',
    timestamp: '2024-03-15T10:20:00Z',
    amount: 750,
    type: 'direct',
    status: 'completed',
    hash: '0x3456...7890'
  }
];

export function TransactionTable() {
  const { t } = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refetchTransactions = async () => {
    setIsRefreshing(true);
    // Add your refetch logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'text-green-400',
      pending: 'text-yellow-400',
      failed: 'text-red-400'
    };
    return colors[status] || 'text-gray-400';
  };

  const getTypeIcon = (type: string): IconName => {
    const icons: Record<string, IconName> = {
      direct: 'user',
      housing: 'home',
      operations: 'settings'
    };
    return icons[type] || 'circle';
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          {t('impact.transactions.title')}
        </h2>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetchTransactions()}
            className="text-gray-400 hover:text-white"
          >
            <Icon name="refresh" className="h-4 w-4 mr-2" />
            {t('common.refresh')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-indigo-400 hover:text-indigo-300"
          >
            {t('impact.transactions.viewAll')}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400">
              <th className="pb-4">{t('impact.transactions.timestamp')}</th>
              <th className="pb-4">{t('impact.transactions.type')}</th>
              <th className="pb-4">{t('impact.transactions.amount')}</th>
              <th className="pb-4">{t('impact.transactions.status')}</th>
              <th className="pb-4">{t('impact.transactions.hash')}</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="text-gray-300 transition-colors cursor-default"
              >
                <td className="py-3">
                  {new Date(tx.timestamp).toLocaleString()}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Icon name={getTypeIcon(tx.type)} className="h-4 w-4" />
                    {t(`impact.transactions.types.${tx.type}`)}
                  </div>
                </td>
                <td className="py-3">${tx.amount.toLocaleString()}</td>
                <td className="py-3">
                  <span className={getStatusColor(tx.status)}>
                    {t(`impact.transactions.statuses.${tx.status}`)}
                  </span>
                </td>
                <td className="py-3">
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    {tx.hash}
                  </a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 