import { ResponsiveContainer, BarChart as RechartsBar, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { analyticsTheme } from '../utils/theme';
import { ChartDataPoint } from '../types';

interface BarChartProps {
  data: ChartDataPoint[];
  height?: number;
  showGrid?: boolean;
}

export function BarChart({ data, height = 300, showGrid = true }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="label"
          stroke={analyticsTheme.text.secondary}
          tick={{ fill: analyticsTheme.text.secondary }}
        />
        <YAxis
          stroke={analyticsTheme.text.secondary}
          tick={{ fill: analyticsTheme.text.secondary }}
        />
        {showGrid && <CartesianGrid stroke={analyticsTheme.charts.grid.stroke} />}
        <Tooltip
          contentStyle={{ backgroundColor: analyticsTheme.charts.tooltip.background }}
          labelStyle={{ color: analyticsTheme.text.primary }}
        />
        <Bar
          dataKey="value"
          fill={analyticsTheme.colors.primary[0]}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBar>
    </ResponsiveContainer>
  );
} 