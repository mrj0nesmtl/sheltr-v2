import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/Toast";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('🔑 Step 1: Attempting authentication...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) throw authError;
      console.log('✅ Authentication successful:', authData.user?.id);

      console.log('👤 Step 2: Fetching profile data using function...');
      const { data: profileData, error: profileError } = await supabase
        .rpc('get_user_profile', { user_id: authData.user?.id })
        .single();

      if (profileError) {
        console.error('❌ Profile fetch error:', profileError);
        throw profileError;
      }
      
      console.log('📋 Profile data:', profileData);

      if (profileData?.role === 'super_admin') {
        console.log('🎯 Navigating to super admin dashboard...');
        navigate('/super-admin/dashboard');
      } else {
        console.warn('⚠️ Not a super admin:', profileData?.role);
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have super admin privileges"
        });
      }
      
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200"
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-primary text-white p-2 rounded hover:bg-primary/90 transition-colors"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
} 