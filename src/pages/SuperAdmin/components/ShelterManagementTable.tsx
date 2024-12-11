import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function ShelterManagementTable() {
  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Shelter Management</h3>
          <Button variant="outline" size="sm">
            <Icon name="plus" className="mr-2 h-4 w-4" />
            Add Shelter
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        {/* Add table content */}
      </Card.Content>
    </Card>
  );
} 