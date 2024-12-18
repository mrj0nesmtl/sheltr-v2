import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function DonorManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Donor Management</h1>
          <p className="text-gray-400">Track and manage donor relationships</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Icon name="heart" className="w-4 h-4 mr-2" />
          Add Donor
        </Button>
      </div>

      <Card>
        <Card.Content>
          {/* Add donor management interface here */}
          <div className="text-white">Donor management content coming soon</div>
        </Card.Content>
      </Card>
    </div>
  );
} 