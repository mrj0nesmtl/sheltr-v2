import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignOutButtonProps {
  className?: string;
  variant?: 'menu' | 'header';
  onSignOutStart?: () => void;
  onSignOutComplete?: () => void;
}

export function SignOutButton({ 
  className = '', 
  variant = 'menu',
  onSignOutStart,
  onSignOutComplete 
}: SignOutButtonProps) {
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      onSignOutStart?.();
      
      await logout();
      
      // Cleanup and navigation
      setIsLoading(false);
      onSignOutComplete?.();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Sign out failed:', error);
      setIsLoading(false);
      // You might want to add toast notification here
    }
  };

  if (variant === 'menu') {
    return (
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <Icon name="loader" className="h-5 w-5 mr-3 animate-spin" />
        ) : (
          <Icon name="log-out" className="h-5 w-5 mr-3" />
        )}
        <span className="text-base font-medium">
          {isLoading ? t('nav.signingOut') : t('nav.signOut')}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={`flex items-center px-4 py-2 text-sm font-medium text-red-400 border border-red-400 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <Icon name="loader" className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Icon name="log-out" className="h-4 w-4 mr-2" />
      )}
      {isLoading ? t('nav.signingOut') : t('nav.signOut')}
    </button>
  );
} 