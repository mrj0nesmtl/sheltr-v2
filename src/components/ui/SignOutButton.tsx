import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from './Icon';

export function SignOutButton() {
  const { t } = useTranslation();
  const { signOut } = useAuthStore();

  return (
    <button
      onClick={signOut}
      className="fixed top-4 right-4 flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
    >
      <Icon name="log-out" className="h-4 w-4 mr-2" />
      {t('nav.signOut')}
    </button>
  );
} 