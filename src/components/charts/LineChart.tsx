import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';

interface LineChartProps {
  data: number[];
  color: string;
  height?: number;
  showTooltip?: boolean;
  showAxis?: boolean;
  showLabels?: boolean;
  maxHeight?: number;
}

export function LineChart({ 
  data, 
  color, 
  height = 100, 
  showTooltip = false,
  showAxis = false,
  showLabels = false,
  maxHeight = 400
}: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, Math.min(height, maxHeight));
    gradient.addColorStop(0, `${color}33`);
    gradient.addColorStop(1, 'transparent');

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: Array(data.length).fill(''),
        datasets: [
          {
            data,
            borderColor: color,
            borderWidth: 2,
            fill: true,
            backgroundColor: gradient,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 750,
        },
        layout: {
          padding: {
            top: 5,
            bottom: 5
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: showTooltip,
            mode: 'index',
            intersect: false,
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#374151',
            borderWidth: 1,
            padding: 8,
            displayColors: false,
          },
        },
        scales: {
          x: {
            display: showAxis || showLabels,
            grid: {
              display: showAxis,
              color: '#374151',
            },
          },
          y: {
            display: showAxis || showLabels,
            grid: {
              display: showAxis,
              color: '#374151',
            },
            min: Math.min(...data) * 0.95,
            max: Math.max(...data) * 1.05,
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, color, height, showTooltip, showAxis, showLabels, maxHeight]);

  return (
    <div style={{ height: Math.min(height, maxHeight), maxHeight: maxHeight }}>
      <canvas ref={chartRef} />
    </div>
  );
} 