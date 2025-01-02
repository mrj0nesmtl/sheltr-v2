import { ResponsiveContainer, AreaChart as RechartsArea, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { analyticsTheme } from '../utils/theme';
import { ChartDataPoint } from '../types';

interface AreaChartProps {
  data: ChartDataPoint[];
  height?: number;
  gradient?: boolean;
}

export function AreaChart({ data, height = 300, gradient = true }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsArea data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {gradient && (
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={analyticsTheme.colors.primary[0]} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={analyticsTheme.colors.primary[0]} stopOpacity={0}/>
            </linearGradient>
          )}
        </defs>
        <XAxis 
          dataKey="label" 
          stroke={analyticsTheme.text.secondary}
          tick={{ fill: analyticsTheme.text.secondary }}
        />
        <YAxis 
          stroke={analyticsTheme.text.secondary}
          tick={{ fill: analyticsTheme.text.secondary }}
        />
        <CartesianGrid stroke={analyticsTheme.charts.grid.stroke} />
        <Tooltip 
          contentStyle={{ backgroundColor: analyticsTheme.charts.tooltip.background }}
          labelStyle={{ color: analyticsTheme.text.primary }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={analyticsTheme.colors.primary[0]}
          fill={gradient ? "url(#colorValue)" : analyticsTheme.colors.primary[0]}
        />
      </RechartsArea>
    </ResponsiveContainer>
  );
} 