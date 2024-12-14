import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from './Icon';

interface SignOutButtonProps {
  className?: string;
  variant?: 'menu' | 'header';
}

export function SignOutButton({ className = '', variant = 'menu' }: SignOutButtonProps) {
  const { t } = useTranslation();
  const { logout } = useAuthStore();

  if (variant === 'menu') {
    return (
      <button
        onClick={logout}
        className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors"
      >
        <Icon name="log-out" className="h-5 w-5 mr-3" />
        <span className="text-base font-medium">
          {t('nav.signOut')}
        </span>
      </button>
    );
  }

  // Header variant (for admin dashboard)
  return (
    <button
      onClick={logout}
      className={`flex items-center px-4 py-2 text-sm font-medium text-red-400 border border-red-400 rounded-lg hover:bg-red-500/10 transition-colors ${className}`}
    >
      <Icon name="log-out" className="h-4 w-4 mr-2" />
      {t('nav.signOut')}
    </button>
  );
} 