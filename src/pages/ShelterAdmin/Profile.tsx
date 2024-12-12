import React from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore } from '@/stores/authStore';

export function ShelterAdminProfile() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Shelter Profile</h1>
        <p className="text-gray-400">Manage your shelter information and settings</p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Icon name="building" className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{user?.organization}</h2>
              <p className="text-gray-400">Shelter Administrator</p>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Add more profile sections as needed */}
    </div>
  );
} 