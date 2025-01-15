import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export const EmailVerificationError: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 text-center">
      <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
      <h1 className="text-2xl font-bold mb-4 text-white">Verification Link Expired</h1>
      <p className="text-gray-300 mb-8">
        The verification link has expired or is invalid. 
        Please try registering again with a new email address.
      </p>
      <div className="space-y-4">
        <Button 
          onClick={() => navigate('/signup')}
          className="w-full"
        >
          Register Again
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="w-full text-gray-300 hover:text-white border-gray-700 hover:border-indigo-500"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
}; 