import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function DonorSignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, error: authError, loading } = useAuthStore();
  
  const donorSignUpSchema = z.object({
    email: z.string().email(t('auth.validation.email')),
    password: z.string()
      .min(8, t('auth.validation.passwordLength'))
      .regex(/[A-Z]/, t('auth.validation.passwordUppercase'))
      .regex(/[a-z]/, t('auth.validation.passwordLowercase'))
      .regex(/[0-9]/, t('auth.validation.passwordNumber')),
    confirmPassword: z.string(),
    name: z.string().min(2, t('auth.validation.nameLength')),
    city: z.string().optional(),
    defaultDonation: z.number().min(1).default(10),
    taxReceiptRequired: z.boolean().default(false)
  }).refine(data => data.password === data.confirmPassword, {
    message: t('auth.validation.passwordsMatch'),
    path: ['confirmPassword']
  });

  type DonorSignUpFormData = z.infer<typeof donorSignUpSchema>;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<DonorSignUpFormData>({
    resolver: zodResolver(donorSignUpSchema),
    defaultValues: {
      defaultDonation: 10,
      taxReceiptRequired: false
    }
  });

  const onSubmit = async (data: DonorSignUpFormData) => {
    try {
      const profile = await signUp({
        ...data,
        role: 'donor'
      });
      
      if (profile) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-indigo-500/10 p-3 rounded-full w-fit mx-auto mb-4">
          <Icon name="heart" className="h-8 w-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          {t('auth.donor.signup.title')}
        </h2>
        <p className="text-gray-400 mt-2">
          {t('auth.donor.signup.subtitle')}
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
        {/* Name Field */}
        <div>
          <Input
            label={t('auth.fields.name')}
            {...register('name')}
            error={errors.name?.message}
            icon="user"
          />
        </div>

        {/* Email Field */}
        <div>
          <Input
            label={t('auth.fields.email')}
            type="email"
            {...register('email')}
            error={errors.email?.message}
            icon="mail"
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('auth.fields.password')}
            type="password"
            {...register('password')}
            error={errors.password?.message}
            icon="lock"
          />
          <Input
            label={t('auth.fields.confirmPassword')}
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            icon="lock"
          />
        </div>

        {/* City Field */}
        <div>
          <Input
            label={t('auth.fields.city')}
            {...register('city')}
            error={errors.city?.message}
            icon="map-pin"
          />
        </div>

        {/* Default Donation */}
        <div>
          <Input
            label={t('auth.fields.defaultDonation')}
            type="number"
            min={1}
            step={1}
            {...register('defaultDonation', { valueAsNumber: true })}
            error={errors.defaultDonation?.message}
            icon="dollar-sign"
            leftAddon="$"
          />
        </div>

        {/* Tax Receipt Checkbox */}
        <div>
          <Checkbox
            label={t('auth.fields.taxReceipt')}
            {...register('taxReceiptRequired')}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? t('auth.donor.signup.submitting')
            : t('auth.donor.signup.submit')
          }
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            {t('auth.donor.signup.haveAccount')}{' '}
            <Button
              variant="link"
              onClick={() => navigate('/login')}
              className="text-indigo-400 hover:text-indigo-300"
            >
              {t('auth.donor.signup.login')}
            </Button>
          </p>
        </div>
      </form>
    </Card>
  );
}