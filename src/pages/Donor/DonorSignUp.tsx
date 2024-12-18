import DonorSignUpForm from '@/components/Auth/forms/DonorSignUpForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { DonorSignUpForm as DonorFormType } from '@/auth/schemas';

export default function DonorSignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: DonorFormType) => {
    setIsSubmitting(true);
    try {
      // Handle donor signup
      console.log('Donor signup:', data);
    } catch (error) {
      console.error('Signup error:', error);
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