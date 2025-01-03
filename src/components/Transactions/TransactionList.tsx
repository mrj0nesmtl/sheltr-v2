import React from 'react';
import { Table } from '@/components/ui/Table';

const mockTransactions = [
  {
    id: 'tx_001',
    type: 'Donation',
    amount: '$250.00',
    from: '0x1234...5678',
    to: 'Hope Haven',
    status: 'Completed',
    timestamp: '2024-01-02 15:30'
  },
  {
    id: 'tx_002',
    type: 'Allocation',
    amount: '$175.00',
    from: 'Mercy House',
    to: 'Food Program',
    status: 'Completed',
    timestamp: '2024-01-02 14:45'
  },
  {
    id: 'tx_003',
    type: 'Donation',
    amount: '$500.00',
    from: '0x8765...4321',
    to: 'Safe Harbor',
    status: 'Completed',
    timestamp: '2024-01-02 13:15'
  }
];

export function TransactionList() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Recent Transactions</h2>
        <span className="text-sm text-gray-400">Last 24 hours</span>
      </div>
      <div className="bg-gray-800/40 rounded-lg overflow-hidden">
        <Table>
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">From</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">To</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-700/25 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-300">{tx.type}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{tx.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{tx.from}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{tx.to}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
} 