import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'donation' | 'withdrawal';
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

interface TransactionListProps {
  userId?: string;
  limit?: number;
}

export function TransactionList({ userId, limit = 5 }: TransactionListProps) {
  const { t } = useTranslation();

  // Mock data - replace with real data fetching
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-03-15',
      amount: 50.00,
      type: 'donation',
      status: 'completed',
      description: 'Monthly donation'
    },
    // Add more mock transactions
  ];

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {transactions.slice(0, limit).map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${
              transaction.type === 'donation' ? 'bg-green-500/20' : 'bg-blue-500/20'
            }`}>
              <Icon 
                name={transaction.type === 'donation' ? 'arrowDown' : 'arrowUp'} 
                className={`h-5 w-5 ${
                  transaction.type === 'donation' ? 'text-green-400' : 'text-blue-400'
                }`} 
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {transaction.description}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              ${transaction.amount.toFixed(2)}
            </p>
            <p className={`text-xs ${getStatusColor(transaction.status)}`}>
              {t(`transaction.status.${transaction.status}`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 