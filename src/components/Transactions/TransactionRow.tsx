import { formatDistanceToNow } from 'date-fns';

interface TransactionRowProps {
  id: string;
  type: 'donation' | 'distribution' | 'allocation';
  amount: string;
  from: string;
  to: string;
  status: 'completed' | 'pending';
  timestamp: string;
}

export function TransactionRow({ 
  type, 
  amount, 
  from, 
  to, 
  status, 
  timestamp 
}: TransactionRowProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${
          type === 'donation' ? 'bg-green-500/20 text-green-400' : 
          type === 'distribution' ? 'bg-blue-500/20 text-blue-400' :
          'bg-purple-500/20 text-purple-400'
        }`}>
          {type === 'donation' ? '↓' : '↑'}
        </div>
        <div>
          <p className="text-white font-medium capitalize">{type}</p>
          <p className="text-sm text-gray-400">
            From: {from.length > 20 ? `${from.slice(0, 8)}...${from.slice(-6)}` : from}
          </p>
          <p className="text-sm text-gray-400">
            To: {to}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{amount}</p>
        <p className={`text-sm ${status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
          {status}
        </p>
        <p className="text-sm text-gray-400">
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
} 