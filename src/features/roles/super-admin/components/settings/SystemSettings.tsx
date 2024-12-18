import { Card } from '@/components/ui/Card';

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-gray-400">Configure platform-wide settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Content>
            <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
            {/* Add general settings form */}
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
            {/* Add security settings form */}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
} 