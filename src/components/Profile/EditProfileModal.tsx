import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  initialData: any;
}

export function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  initialData
}: EditProfileModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData
  });

  const onSubmit = async (data: any) => {
    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-gray-800 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <Dialog.Title className="text-xl font-semibold text-white mb-6">
              Edit Profile
            </Dialog.Title>
            
            <div className="space-y-6">
              <Input
                label="Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name}
              />

              <Textarea
                label="Bio"
                {...register('bio')}
                error={errors.bio}
                placeholder="Tell us about yourself..."
              />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Social Links</h3>
                <Input
                  label="Twitter"
                  {...register('socialLinks.twitter')}
                  error={errors.socialLinks?.twitter}
                  placeholder="https://twitter.com/username"
                />
                <Input
                  label="LinkedIn"
                  {...register('socialLinks.linkedin')}
                  error={errors.socialLinks?.linkedin}
                  placeholder="https://linkedin.com/in/username"
                />
                <Input
                  label="Website"
                  {...register('socialLinks.website')}
                  error={errors.socialLinks?.website}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Preferences</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('preferences.notifications')}
                    className="rounded border-gray-600 bg-gray-700 text-indigo-500"
                  />
                  <label className="text-sm text-gray-300">
                    Receive email notifications
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 