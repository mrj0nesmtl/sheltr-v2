import { ResponsiveContainer, LineChart as RechartsLine, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartDataPoint } from '../types';

// Define theme constants directly to avoid undefined errors
const CHART_THEME = {
  text: {
    secondary: '#9CA3AF'  // gray-400
  },
  charts: {
    grid: {
      stroke: '#374151'   // gray-700
    },
    tooltip: {
      background: '#1F2937', // gray-800
      border: '#374151'    // gray-700
    },
    colors: {
      primary: ['#818CF8']  // indigo-400
    }
  }
};

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
          stroke={CHART_THEME.text.secondary}
          tick={{ fill: CHART_THEME.text.secondary }}
        />
        <YAxis 
          stroke={CHART_THEME.text.secondary}
          tick={{ fill: CHART_THEME.text.secondary }}
        />
        {showGrid && <CartesianGrid stroke={CHART_THEME.charts.grid.stroke} />}
        <Tooltip
          contentStyle={{ 
            backgroundColor: CHART_THEME.charts.tooltip.background,
            borderColor: CHART_THEME.charts.tooltip.border
          }}
        />
        <Line
          type={curved ? "monotone" : "linear"}
          dataKey="value"
          stroke={CHART_THEME.charts.colors.primary[0]}
          strokeWidth={2}
          dot={{ fill: CHART_THEME.charts.colors.primary[0] }}
          activeDot={{ r: 6 }}
        />
      </RechartsLine>
    </ResponsiveContainer>
  );
} 