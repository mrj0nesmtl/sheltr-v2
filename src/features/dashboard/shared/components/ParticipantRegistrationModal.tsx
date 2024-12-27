import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface ParticipantRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: unknown) => void;
}

export const ParticipantRegistrationModal = ({
  isOpen,
  onClose,
  onSuccess
}: ParticipantRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">Register New Participant</h2>
        
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          onSuccess(formData);
        }}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}; 