import { useTranslation } from 'react-i18next';
import { SignUpForm } from '@/components/Auth/SignUpForm';

export default function SignUpPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full">
        <SignUpForm />
      </div>
    </div>
  );
} 