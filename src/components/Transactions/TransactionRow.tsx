import { formatDistanceToNow } from 'date-fns';

interface TransactionRowProps {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  address: string;
  timestamp: Date;
}

export function TransactionRow({ type, amount, address, timestamp }: TransactionRowProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${
          type === 'receive' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
        }`}>
          {type === 'receive' ? '↓' : '↑'}
        </div>
        <div>
          <p className="text-white font-medium">{type === 'receive' ? 'Received' : 'Sent'}</p>
          <p className="text-sm text-gray-400">{address.slice(0, 8)}...{address.slice(-6)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">${amount.toLocaleString()}</p>
        <p className="text-sm text-gray-400">
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
} 