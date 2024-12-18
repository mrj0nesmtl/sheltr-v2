import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { ParticipantRegistrationService } from '@/services/participantRegistration';
import { Dialog } from '@headlessui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export function ParticipantRegistrationModal({ isOpen, onClose, onSuccess }: RegistrationModalProps) {
  const { t } = useTranslation();
  const [step, setStep] = React.useState(1);
  const [registrationData, setRegistrationData] = React.useState<any>({});
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const steps = [
    { id: 1, title: t('admin.participant.registration.steps.personal') },
    { id: 2, title: t('admin.participant.registration.steps.contact') },
    { id: 3, title: t('admin.participant.registration.steps.needs') },
    { id: 4, title: t('admin.participant.registration.steps.verification') }
  ];

  const onStepSubmit = async (data: any) => {
    if (step < steps.length) {
      setRegistrationData({ ...registrationData, ...data });
      setStep(step + 1);
    } else {
      try {
        const finalData = { ...registrationData, ...data };
        const result = await ParticipantRegistrationService.registerParticipant(finalData);
        onSuccess(result);
        reset();
        setStep(1);
        onClose();
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl w-full bg-gray-800 rounded-xl shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-2xl font-bold text-white">
                {t('admin.participant.registration.title')}
              </Dialog.Title>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <Icon name="x" className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                {steps.map((s) => (
                  <div key={s.id} className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${step >= s.id ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'}
                    `}>
                      {s.id}
                    </div>
                    <div className="ml-2 text-sm text-gray-400">{s.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <form onSubmit={handleSubmit(onStepSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={t('admin.participant.registration.firstName')}
                      {...register('firstName', { required: true })}
                      error={errors.firstName}
                    />
                    <Input
                      label={t('admin.participant.registration.lastName')}
                      {...register('lastName', { required: true })}
                      error={errors.lastName}
                    />
                  </div>
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
              )}

              {step === 2 && (
                <div className="space-y-6">
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
                  <div className="grid grid-cols-2 gap-4">
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
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <Select
                    label={t('admin.participant.registration.housingStatus')}
                    {...register('housingStatus', { required: true })}
                    options={[
                      { value: 'emergency', label: t('admin.participant.housing.emergency') },
                      { value: 'transitional', label: t('admin.participant.housing.transitional') },
                      { value: 'at_risk', label: t('admin.participant.housing.atRisk') }
                    ]}
                  />
                  <Select
                    label={t('admin.participant.registration.employmentStatus')}
                    {...register('employmentStatus', { required: true })}
                    options={[
                      { value: 'unemployed', label: t('admin.participant.employment.unemployed') },
                      { value: 'part_time', label: t('admin.participant.employment.partTime') },
                      { value: 'full_time', label: t('admin.participant.employment.fullTime') }
                    ]}
                  />
                  <Textarea
                    label={t('admin.participant.registration.specialNeeds')}
                    {...register('specialNeeds')}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t('admin.participant.registration.verification.title')}
                    </h3>
                    <p className="text-gray-300">
                      {t('admin.participant.registration.verification.description')}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={t('admin.participant.registration.idType')}
                      {...register('identification.type', { required: true })}
                      error={errors.identification?.type}
                    />
                    <Input
                      label={t('admin.participant.registration.idNumber')}
                      {...register('identification.number', { required: true })}
                      error={errors.identification?.number}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-gray-700">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    {t('common.back')}
                  </Button>
                )}
                <Button
                  type="submit"
                  className="ml-auto"
                >
                  {step === steps.length 
                    ? t('admin.participant.registration.submit')
                    : t('common.next')}
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 