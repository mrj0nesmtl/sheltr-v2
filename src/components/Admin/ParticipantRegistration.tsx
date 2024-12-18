import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { ParticipantRegistrationService } from '@/services/participantRegistration';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  primaryLanguage: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  specialNeeds: string[];
  housingStatus: string;
  employmentStatus: string;
}

export function ParticipantRegistration() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationFormData>();

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const result = await ParticipantRegistrationService.registerParticipant(data, user!.id);
      
      // Show success message with QR code and verification token
      console.log('Registration successful:', result);
      
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        {t('admin.participant.registration.title')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={t('admin.participant.registration.firstName')}
            {...register('firstName', { required: true })}
            error={errors.firstName}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message || 'First name is required'}</p>
          )}
          <Input
            label={t('admin.participant.registration.lastName')}
            {...register('lastName', { required: true })}
            error={errors.lastName}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message || 'Last name is required'}</p>
          )}
          <Input
            type="email"
            label={t('admin.participant.registration.email')}
            {...register('email', { required: true })}
            error={errors.email}
          />
          <Input
            type="tel"
            label={t('admin.participant.registration.phone')}
            {...register('phone', { required: true })}
            error={errors.phone}
          />
          <Input
            type="date"
            label={t('admin.participant.registration.dateOfBirth')}
            {...register('dateOfBirth', { required: true })}
            error={errors.dateOfBirth}
          />
          <Select
            label={t('admin.participant.registration.gender')}
            {...register('gender')}
            options={[
              { value: 'male', label: t('common.gender.male') },
              { value: 'female', label: t('common.gender.female') },
              { value: 'other', label: t('common.gender.other') },
              { value: 'prefer_not_to_say', label: t('common.gender.preferNotToSay') }
            ]}
          />
        </div>

        {/* Emergency Contact */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {t('admin.participant.registration.emergencyContact')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t('admin.participant.registration.emergencyName')}
              {...register('emergencyContact.name', { required: true })}
              error={errors.emergencyContact?.name}
            />
            <Input
              type="tel"
              label={t('admin.participant.registration.emergencyPhone')}
              {...register('emergencyContact.phone', { required: true })}
              error={errors.emergencyContact?.phone}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting}
        >
          {t('admin.participant.registration.submit')}
        </Button>
      </form>
    </div>
  );
} 