import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function LoginForm({ isAdminLogin = false }: { isAdminLogin?: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    try {
      const profile = await login(email, password);
      
      if (profile) {
        // If admin login, verify role
        if (isAdminLogin && !['super_admin', 'shelter_admin'].includes(profile.role)) {
          throw new Error('insufficient_permissions');
        }

        const dashboardRoutes = {
          super_admin: '/super-admin/dashboard',
          shelter_admin: '/shelter-admin/dashboard',
          donor: '/donor/dashboard',
          participant: '/participant/dashboard',
          staff: '/staff/dashboard'
        };

        navigate(dashboardRoutes[profile.role] || '/dashboard', { replace: true });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
      <div className="text-center mb-8">
        <Icon 
          name={isAdminLogin ? "lock" : "log-in"} 
          className="h-12 w-12 text-indigo-500 mx-auto mb-4" 
        />
        <h2 className="text-2xl font-bold text-white">
          {t(isAdminLogin ? 'auth.login.adminTitle' : 'auth.login.title')}
        </h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-md text-red-200">
          {t(`auth.errors.${error}`)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            {t('auth.fields.email')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="mail" className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              required
              className={cn(
                "bg-white/5 border border-gray-600 text-white block w-full",
                "pl-10 pr-3 py-2 rounded-md",
                "focus:ring-indigo-500 focus:border-indigo-500"
              )}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            {t('auth.fields.password')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="lock" className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              required
              className={cn(
                "bg-white/5 border border-gray-600 text-white block w-full",
                "pl-10 pr-3 py-2 rounded-md",
                "focus:ring-indigo-500 focus:border-indigo-500"
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email || !password}
          className={cn(
            "w-full flex justify-center py-2 px-4 border border-transparent",
            "rounded-md shadow-sm text-sm font-medium text-white",
            "bg-indigo-600 hover:bg-indigo-700",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSubmitting 
            ? t('auth.login.signingIn')
            : t('auth.login.signIn')
          }
        </button>
      </form>
    </div>
  );
} 