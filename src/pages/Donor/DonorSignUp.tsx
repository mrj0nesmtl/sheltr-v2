import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import DonorSignUpForm from '@/components/Auth/forms/DonorSignUpForm';
import type { DonorSignUpForm as DonorFormType } from '@/auth/schemas';

export default function DonorSignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: DonorFormType) => {
    setIsSubmitting(true);
    try {
      // Handle Supabase auth signup
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: 'donor',
            name: data.name
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      // Create donor profile
      const { error: profileError } = await supabase
        .from('donor_profiles')
        .insert({
          user_id: authData.user?.id,
          display_name: data.name,
          email: data.email
        });

      if (profileError) throw profileError;

      // Initialize donor stats
      const { error: statsError } = await supabase
        .from('donor_stats')
        .insert({
          donor_id: authData.user?.id,
          total_donated: 0,
          donation_count: 0
        });

      if (statsError) throw statsError;

      toast.success('Please check your email to verify your account');
      navigate('/auth/verify-email');

    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Create Donor Account
        </h1>
        
        <DonorSignUpForm 
          onSubmit={handleSubmit}
          onBack={() => navigate('/signup')}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
} 