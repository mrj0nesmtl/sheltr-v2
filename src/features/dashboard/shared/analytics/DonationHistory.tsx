import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

interface DonationData {
  date: string;
  amount: number;
}

interface DonationHistoryProps {
  donations?: any[];
  className?: string;
}

export function DonationHistory({ donations = [], className }: DonationHistoryProps) {
  return (
    <div className={cn("bg-white/10 backdrop-blur-lg rounded-xl p-6", className)}>
      <h3 className="text-lg font-semibold mb-4">Donation History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={donations}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}