import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useAuthStore, getDashboardPath } from '../../stores/authStore';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

interface UserProfile {
  id: string;
  role: string;
  // Add other profile properties as needed
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, error, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Attempting sign in with:', email);
      const profile = await signIn(email, password);
      console.log('Sign in response:', profile);
      
      if (profile) {
        const from = location.state?.from?.pathname || getDashboardPath(profile.role);
        console.log('Redirecting to:', from);
        navigate(from, { replace: true });
      } else {
        console.log('No profile returned from signIn');
      }
    } catch (error) {
      console.error('Login attempt failed:', error);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <div className="text-center mb-8">
            <Icon name="login" className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">{t('auth.login.title')}</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-md text-red-200">
              {t(`auth.login.errors.${error}`)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                {t('auth.login.email')}
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
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                {t('auth.login.password')}
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
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className={cn(
                "w-full flex justify-center py-2 px-4 border border-transparent",
                "rounded-md shadow-sm text-sm font-medium text-white",
                "bg-indigo-600 hover:bg-indigo-700",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? t('auth.login.signingIn') : t('auth.login.signIn')}
            </button>

            <div className="text-center">
              <Link
                to="/signup"
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                {t('auth.login.noAccount')} {t('auth.login.signUp')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}