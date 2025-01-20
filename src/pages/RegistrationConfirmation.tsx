import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/auth/stores/authStore';
import { getDashboardPath } from "@/lib/navigation/roleNavigation";

const RegistrationConfirmation: FC = () => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const { isAuthenticated, user, role } = useAuthStore();

  const handleResendConfirmation = async () => {
    try {
      setIsResending(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: 'joel.yaffe+admin@gmail.com',
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      setResendStatus({
        type: 'success',
        message: 'Confirmation email has been resent. Please check your inbox.'
      });
    } catch (error) {
      console.error('Error resending confirmation:', error);
      setResendStatus({
        type: 'error',
        message: `Failed to send confirmation email: ${error.message || 'Unknown error'}`
      });
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.email_confirmed_at) {
      // User is already verified, redirect to appropriate dashboard
      const dashboardPath = getDashboardPath(role);
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, user, role, navigate]);

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 text-center">
      <Mail className="w-16 h-16 mx-auto mb-6 text-indigo-500" />
      <h1 className="text-2xl font-bold mb-4 text-white">Check Your Email</h1>
      <p className="text-gray-300 mb-8">
        We've sent a confirmation email to your inbox. 
        Please click the verification link to complete your registration.
      </p>
      <p className="text-sm text-gray-400 mb-6">
        After verification, you'll be able to access your dashboard and complete your shelter profile.
      </p>

      {/* Resend Button */}
      <Button 
        variant="outline" 
        onClick={handleResendConfirmation}
        disabled={isResending}
        className="text-gray-300 hover:text-white border-gray-700 hover:border-indigo-500 mb-4"
      >
        {isResending ? 'Sending...' : 'Resend Confirmation Email'}
      </Button>

      {/* Status Message */}
      {resendStatus.message && (
        <p className={`text-sm mb-6 ${
          resendStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
        }`}>
          {resendStatus.message}
        </p>
      )}

      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="text-gray-300 hover:text-white border-gray-700 hover:border-indigo-500"
      >
        Return to Home
      </Button>
    </div>
  );
};

export default RegistrationConfirmation; 