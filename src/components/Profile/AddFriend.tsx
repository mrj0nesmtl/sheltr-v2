import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

export function AddFriend() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add friend logic here
      await sendFriendRequest(email);
    } catch (error) {
      console.error('Failed to add friend:', error);
    } finally {
      setIsLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        {t('profile.friends.add')}
      </h3>
      <form onSubmit={handleAddFriend} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="friend@example.com"
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Icon name="user-plus" className="h-5 w-5 mr-2" />
          {isLoading ? 'Sending...' : t('profile.friends.add')}
        </button>
      </form>
    </div>
  );
} 