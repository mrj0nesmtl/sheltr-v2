import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400">Platform-wide analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Content>
            <h3 className="text-lg font-semibold text-white mb-4">Donation Trends</h3>
            {/* Add donation trends chart */}
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <h3 className="text-lg font-semibold text-white mb-4">Participant Growth</h3>
            {/* Add participant growth chart */}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
} 