import { ResponsiveContainer, LineChart as RechartsLine, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { analyticsTheme } from '../utils/theme';
import { ChartDataPoint } from '../types';

interface LineChartProps {
  data: ChartDataPoint[];
  height?: number;
  showGrid?: boolean;
  curved?: boolean;
  isLoading?: boolean;
}

export function LineChart({ 
  data, 
  height = 300, 
  showGrid = true, 
  curved = true,
  isLoading = false 
}: LineChartProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse flex items-center justify-center" style={{ height }}>
        <div className="w-full h-[80%] bg-gray-700/50 rounded" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLine data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          contentStyle={{ 
            backgroundColor: analyticsTheme.charts.tooltip.background,
            borderColor: analyticsTheme.charts.tooltip.border
          }}
        />
        <Line
          type={curved ? "monotone" : "linear"}
          dataKey="value"
          stroke={analyticsTheme.colors.primary[0]}
          strokeWidth={2}
          dot={{ fill: analyticsTheme.colors.primary[0] }}
          activeDot={{ r: 6 }}
        />
      </RechartsLine>
    </ResponsiveContainer>
  );
} 