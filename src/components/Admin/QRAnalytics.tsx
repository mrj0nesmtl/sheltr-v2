import { Card } from '@/components/ui/Card';
import { LineChart, BarChart } from '@/components/ui/Charts';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function QRAnalytics() {
  const [analytics, setAnalytics] = useState({
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

    // Process analytics data
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Analytics cards */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charts */}
      </div>

      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Recent Events</h3>
        </Card.Header>
        <Card.Content>
          {/* Event list */}
        </Card.Content>
      </Card>
    </div>
  );
} 