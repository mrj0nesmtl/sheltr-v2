import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Mail } from 'lucide-react';

const RegistrationConfirmation: FC = () => {
  const navigate = useNavigate();

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