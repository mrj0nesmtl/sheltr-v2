import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Dialog } from '@headlessui/react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const sendNotification = async () => {
    // Implement notification sending logic
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-gray-800 rounded-xl shadow-xl">
          <div className="p-6">
            <Dialog.Title className="text-xl font-semibold text-white mb-6">
              Notification Center
            </Dialog.Title>
            
            <div className="space-y-6">
              <Select
                label="Recipient Type"
                options={[
                  { value: 'all', label: 'All Users' },
                  { value: 'shelters', label: 'Shelter Admins' },
                  { value: 'donors', label: 'Donors' },
                  { value: 'participants', label: 'Participants' }
                ]}
              />
              
              <Input
                label="Subject"
                placeholder="Notification subject..."
              />
              
              <Textarea
                label="Message"
                placeholder="Enter your message..."
                rows={4}
              />
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  className="rounded border-gray-600 bg-gray-700 text-indigo-500"
                />
                <label htmlFor="urgent" className="text-sm text-gray-300">
                  Mark as urgent
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => sendNotification({})}>
                Send Notification
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 