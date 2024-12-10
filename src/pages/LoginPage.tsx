import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/components/Auth/LoginForm';

export function LoginPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  );
} 