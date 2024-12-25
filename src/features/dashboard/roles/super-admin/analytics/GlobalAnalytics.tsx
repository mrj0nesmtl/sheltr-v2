import { Card } from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface GlobalStats {
  total_users: number;
  active_shelters: number;
  total_donations: number;
  monthly_stats: any[];
}

export function GlobalAnalytics() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.rpc('get_global_analytics');
        if (error) throw error;
        setStats(data);
      } catch (e) {
        console.error('Error fetching analytics:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card>
        <Card.Content>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-32 bg-gray-700 rounded"></div>
          </div>
        </Card.Content>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Content>
          <div className="text-red-400">Unable to load analytics</div>
        </Card.Content>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card>
      <Card.Header>
        <h2 className="text-lg font-semibold text-white">Detailed Analytics</h2>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {/* Growth Trends */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-md font-medium text-gray-400 mb-4">Growth Trends</h3>
            <div className="h-48 flex items-center justify-center text-gray-500">
              Chart Coming Soon
            </div>
          </div>

          {/* User Activity */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-md font-medium text-gray-400 mb-4">User Activity</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400">Active Today</div>
                <div className="text-xl font-bold text-white">--</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Weekly Active</div>
                <div className="text-xl font-bold text-white">--</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-md font-medium text-gray-400 mb-4">Recent Activity</h3>
            <div className="text-sm text-gray-500">
              Activity feed coming soon
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
} 