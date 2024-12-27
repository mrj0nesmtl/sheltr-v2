import { AUTH_ROLES } from '@/auth/types/auth.types';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';
import { useAuthStore } from '@/auth/stores/authStore';
import { toast } from "@/components/ui/Toast";
import { supabase } from '@/lib/supabase/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Add form validation schema
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

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { setUser, setRole } = useAuthStore();

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
    
    if (!validateForm()) return;
    setIsLoading(true);
    
    try {
      console.log('🚀 Starting login process...');

      // 1. First authenticate with Supabase
      console.log('📡 Authenticating with Supabase...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        console.error('❌ Auth Error:', authError);
        throw authError;
      }
      
      console.log('✅ Auth successful:', {
        userId: authData.user?.id,
        email: authData.user?.email
      });

      if (!authData.user?.id) {
        throw new Error('No user ID received from authentication');
      }

      // 2. Fetch profile data
      console.log('📡 Fetching profile data...');
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role, id, first_name, last_name')
        .eq('id', authData.user.id)
        .single();

      console.log('📥 Profile query response:', { profileData, profileError });

      if (profileError) {
        console.error('❌ Profile Error:', profileError);
        throw profileError;
      }

      if (!profileData?.role) {
        console.error('❌ No role found in profile');
        throw new Error('User role not found in profile');
      }

      // 3. Update auth store
      console.log('💾 Updating auth store...', {
        role: profileData.role,
        userId: authData.user.id
      });

      const userWithRole = {
        ...authData.user,
        role: profileData.role,
        firstName: profileData.first_name,
        lastName: profileData.last_name
      };

      await setUser(userWithRole);
      await setRole(profileData.role as AUTH_ROLES);

      // 4. Navigate to dashboard
      const dashboardPath = getDashboardPath(profileData.role as AUTH_ROLES);
      console.log('🧭 Navigating to dashboard:', { 
        role: profileData.role,
        path: dashboardPath 
      });

      navigate(dashboardPath, { replace: true });
      
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
        variant: "default"
      });

    } catch (error) {
      console.error('❌ Login error:', error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Authentication failed"
      });
    } finally {
      setIsLoading(false);
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
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
} 