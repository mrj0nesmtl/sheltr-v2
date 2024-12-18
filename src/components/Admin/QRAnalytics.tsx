import { Card } from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface Analytics {
  totalScans: number;
  successRate: number;
  scansByType: Record<string, number>;
  recentEvents: any[];
  scansByTime: any[];
}

interface TimeGroupData {
  hour: number;
  count: number;
}

function calculateSuccessRate(events: any[]): number {
  if (events.length === 0) return 0;
  const successfulEvents = events.filter(event => event.status === 'success');
  return (successfulEvents.length / events.length) * 100;
}

function groupByType(events: any[]): Record<string, number> {
  return events.reduce((acc, event) => {
    const type = event.type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function groupByTime(events: any[]): TimeGroupData[] {
  const timeGroups = events.reduce((acc: number[], event) => {
    const date = new Date(event.timestamp);
    const hour = date.getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, Array(24).fill(0));

  return timeGroups.map((count: number, hour: number): TimeGroupData => ({
    hour,
    count
  }));
}

export function QRAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalScans: 0,
    successRate: 0,
    scansByType: {},
    recentEvents: [],
    scansByTime: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    const { data: events } = await supabase
      .from('qr_code_events')
      .select('*')
      .order('timestamp', { ascending: false });

    if (events) {
      setAnalytics({
        totalScans: events.length,
        successRate: calculateSuccessRate(events),
        scansByType: groupByType(events),
        recentEvents: events.slice(0, 10),
        scansByTime: groupByTime(events)
      });
    }
  }

  const metrics = [
    {
      label: 'Total Scans',
      value: analytics.totalScans,
      icon: 'scan' as IconName,
    },
    {
      label: 'Success Rate',
      value: `${Math.round(analytics.successRate)}%`,
      icon: 'check-circle' as IconName,
    },
    {
      label: 'Recent Events',
      value: analytics.recentEvents.length,
      icon: 'clock' as IconName,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <Card.Header className="flex items-center space-x-2">
              <Icon name={metric.icon} className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-white">{metric.label}</h3>
            </Card.Header>
            <Card.Content>
              <p className="text-2xl font-bold">{metric.value}</p>
            </Card.Content>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charts will go here */}
      </div>

      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Recent Events</h3>
        </Card.Header>
        <Card.Content>
          {analytics.recentEvents.map((event, index) => (
            <div key={index} className="py-2">
              <p className="text-sm text-gray-300">
                {event.type} - {new Date(event.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </Card.Content>
      </Card>
    </div>
  );
} 