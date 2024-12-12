import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('auth.validation.email'),
  password: z.string().min(1, 'auth.validation.required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn, error: authError } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const profile = await signIn(data.email, data.password);
      
      if (profile) {
        switch (profile.role) {
          case 'super_admin':
            navigate('/super-admin/dashboard');
            break;
          case 'shelter_admin':
            navigate('/shelter/dashboard');
            break;
          case 'donor':
            navigate('/donor/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-indigo-500/10 p-3 rounded-full w-fit mx-auto mb-4">
          <Icon name="log-in" className="h-8 w-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          {t('auth.login.title')}
        </h2>
        <p className="text-gray-400 mt-2">
          {t('auth.login.subtitle')}
        </p>
      </div>

      {authError && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <div className="flex items-center gap-2 text-red-200">
            <Icon name="alert-circle" className="h-5 w-5" />
            <p>{t(`auth.errors.${authError}`)}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label={t('auth.fields.email')}
          type="email"
          {...register('email')}
          error={errors.email?.message}
          icon="mail"
        />

        <Input
          label={t('auth.fields.password')}
          type="password"
          {...register('password')}
          error={errors.password?.message}
          icon="lock"
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? t('auth.login.signingIn')
            : t('auth.login.signIn')
          }
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            {t('auth.login.noAccount')}{' '}
            <Button
              variant="link"
              onClick={() => navigate('/signup')}
              className="text-indigo-400 hover:text-indigo-300"
            >
              {t('auth.login.signUp')}
            </Button>
          </p>
        </div>
      </form>
    </Card>
  );
} 