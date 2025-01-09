import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { DonorSignUpForm } from '@/components/Auth/forms/DonorSignUpForm';
import type { DonorSignUpFormData } from '@/features/donor/types/donor';
import { AUTH_ROLES } from '@/types/auth';

export default function DonorSignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: DonorSignUpFormData) => {
    setIsSubmitting(true);
    try {
      // Handle Supabase auth signup
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: AUTH_ROLES.DONOR,
            display_name: data.display_name,
            notification_preferences: data.notification_preferences
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
          display_name: data.display_name,
          email: data.email,
          phone: data.phone,
          donation_preferences: data.donation_preferences,
          social_connections: data.social_connections
        });

      if (profileError) throw profileError;

      // Initialize donor stats
      const { error: statsError } = await supabase
        .from('donor_stats')
        .insert({
          donor_id: authData.user?.id,
          total_donated: 0,
          impact_score: 0,
          donation_streak: 0,
          people_helped: 0,
          total_donations: 0
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
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <DonorSignUpForm 
            onSubmit={handleSubmit}
            onBack={() => navigate('/signup')}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
} 