import {
  Area,
  AreaChart as RechartsArea,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface AreaChartProps {
  data: Array<{
    month: string;
    amount: number;
  }>;
  height?: number | string;
  className?: string;
}

export function AreaChart({ data, height = 400, className }: AreaChartProps) {
  return (
    <div className={`h-[${height}px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsArea data={data}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#F9FAFB'
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </RechartsArea>
      </ResponsiveContainer>
    </div>
  );
} 