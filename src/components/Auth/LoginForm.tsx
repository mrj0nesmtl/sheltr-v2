import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const profile = await login({ email, password });
      console.log('Login response:', { 
        success: !!profile,
        role: profile?.role,
      });
      
      if (profile?.role) {
        const route = getDashboardPath(profile.role);
        navigate(route, { replace: true });
      } else {
        throw new Error('No role assigned to user');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className={cn(
              "mt-1 block w-full rounded-lg",
              "bg-white/5 border border-gray-600",
              "text-white placeholder-gray-400",
              "focus:ring-2 focus:ring-indigo-500"
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className={cn(
              "mt-1 block w-full rounded-lg",
              "bg-white/5 border border-gray-600",
              "text-white placeholder-gray-400",
              "focus:ring-2 focus:ring-indigo-500"
            )}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-2 px-4 rounded-lg",
            "bg-indigo-600 hover:bg-indigo-700",
            "text-white font-medium",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            "disabled:opacity-50"
          )}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
} 