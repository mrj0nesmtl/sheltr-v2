import { ResponsiveContainer, AreaChart as RechartsArea, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface AreaChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  height?: number;
}

export function AreaChart({ data, height = 300 }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsArea data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="label" 
          stroke="#9ca3af"
        />
        <YAxis 
          stroke="#9ca3af"
        />
        <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#f9fafb'
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#6366f1"
          fill="url(#colorValue)"
        />
      </RechartsArea>
    </ResponsiveContainer>
  );
} 