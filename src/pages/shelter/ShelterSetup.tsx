import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

export const ShelterSetup: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const createInitialOrg = async () => {
      if (!user) return;

      // Create organization with pending status
      const { data: org, error } = await supabase
        .from('organizations')
        .insert({
          user_id: user.id,
          status: 'pending',
          name: user.user_metadata?.shelterName || 'New Shelter',
          email: user.email
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to create organization:', error);
        return;
      }

      // Redirect to complete profile
      navigate(`/shelter/${org.id}/complete-profile`);
    };

    createInitialOrg();
  }, [user, navigate]);

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 text-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Setting Up Your Shelter</h1>
      <p className="text-gray-300">Please wait while we prepare your dashboard...</p>
    </div>
  );
}; 