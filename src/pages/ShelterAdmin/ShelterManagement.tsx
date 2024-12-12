import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function ShelterManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Shelter Management</h1>
          <p className="text-gray-400">Manage and monitor all registered shelters</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Icon name="plus" className="w-4 h-4 mr-2" />
          Add New Shelter
        </Button>
      </div>

      <Card>
        <Card.Content>
          {/* Add shelter management table/grid here */}
          <div className="text-white">Shelter management content coming soon</div>
        </Card.Content>
      </Card>
    </div>
  );
} 