import { AUTH_ROLES } from '@/auth/types/auth.types';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';
import { useAuthStore } from '@/auth/stores/authStore';
import { toast } from "@/components/ui/Toast";
import { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

// Move schema outside component
const loginSchema = {
  email: (value: string) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
    return null;
  },
  password: (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return null;
  }
};

export const LoginForm = memo(() => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { 
    login, 
    isAuthenticated, 
    user, 
    role,
    isLoading: storeLoading,
    hasInitialized 
  } = useAuthStore();

  // Only log in development and when values actually change
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('LoginForm State:', {
        isSubmitting,
        storeLoading,
        hasInitialized,
        isAuthenticated,
        role
      });
    }
  }, [isSubmitting, storeLoading, hasInitialized, isAuthenticated, role]);

  // Separate initialization from submission loading
  const isInitializing = storeLoading || !hasInitialized;
  const isLoading = isSubmitting || isInitializing;

  // Add validation function
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    const emailError = loginSchema.email(email);
    const passwordError = loginSchema.password(password);
    
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;
    
    setIsSubmitting(true);
    try {
      await login({
        email: email.trim().toLowerCase(),
        password,
      });
      
      // Remove all redirect logic from here
      // Let LoginPage handle all redirects
      
    } catch (error) {
      console.error('❌ Login error:', error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Authentication failed"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700/50 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700/50 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isInitializing ? 'Initializing...' : 
           isSubmitting ? 'Signing in...' : 
           'Sign in'}
        </button>
      </div>
    </form>
  );
});

LoginForm.displayName = 'LoginForm'; 