import React from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/stores/authStore';
import { DashboardHeader } from '@/components/Layout/DashboardLayout/DashboardHeader';

export function DonorDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Donor Dashboard</h1>
        <p className="text-gray-400">Track your donations and impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Icon name="heart" className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Donated</p>
                <p className="text-2xl font-bold text-white">$0</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Add more dashboard cards */}
      </div>
    </div>
  );
} 