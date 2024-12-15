import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function ParticipantManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Participant Management</h1>
          <p className="text-gray-400">Monitor and manage program participants</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Icon name="user-plus" className="w-4 h-4 mr-2" />
          Add Participant
        </Button>
      </div>

      <Card>
        <Card.Content>
          {/* Add participant management interface here */}
          <div className="text-white">Participant management content coming soon</div>
        </Card.Content>
      </Card>
    </div>
  );
} 