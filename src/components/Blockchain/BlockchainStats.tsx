import React from 'react';
import { Card } from '@/components/ui/Card';

export function BlockchainStats() {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Blockchain Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/40 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Total Transactions</p>
          <p className="text-2xl font-semibold text-gray-200">1,234</p>
        </div>
        <div className="bg-gray-800/40 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Block Height</p>
          <p className="text-2xl font-semibold text-gray-200">8,901</p>
        </div>
        <div className="bg-gray-800/40 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Gas Used</p>
          <p className="text-2xl font-semibold text-gray-200">156.3k</p>
        </div>
        <div className="bg-gray-800/40 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Success Rate</p>
          <p className="text-2xl font-semibold text-gray-200">99.9%</p>
        </div>
      </div>
    </div>
  );
}
