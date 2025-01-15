import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { CompleteProfile } from '@/components/Dashboard/CompleteProfile';

interface ShelterSetupGuardProps {
  children: React.ReactNode;
}

export const ShelterSetupGuard: FC<ShelterSetupGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkOrganizationSetup = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: org } = await supabase
        .from('organizations')
        .select('status')
        .eq('user_id', user.id)
        .single();

      setNeedsSetup(!org || org.status === 'pending_documents');
      setIsLoading(false);
    };

    checkOrganizationSetup();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (needsSetup) {
    return <CompleteProfile />;
  }

  return <>{children}</>;
}; 