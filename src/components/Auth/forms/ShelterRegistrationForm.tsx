import { type FC, useState } from 'react';
import { shelterRegistrationSchema } from '@/lib/types/organization';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FileUpload } from '@/components/ui/FileUpload';
import type { ShelterRegistrationFormData } from '@/lib/types/organization';
import { supabase } from '@/lib/supabase';
import { AUTH_ROLES } from '@/auth/types/auth.types';
import { cn } from '@/lib/utils';
import { 
  Building2, Contact, ClipboardList, 
  UserCog, FileText, ArrowLeft,
  Check, ArrowRight, Loader2, AlertTriangle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface Props {
  onBack: () => void;
}

export const ShelterRegistrationForm: FC<Props> = ({ onBack }) => {
  console.log('Form Component Rendering');

  // Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Form Validation
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors, touchedFields }
  } = useForm<ShelterRegistrationFormData>({
    resolver: zodResolver(shelterRegistrationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      status: 'pending',
      verified: false,
      current_capacity: 0,
      housing_fund_balance: '0',
      token_balance: '0',
      country: 'Canada',
      operating_hours: {},
      emergency_contacts: [],
      registration_number: `SH-${format(new Date(), 'yyyyMMdd')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    }
  });

  const navigate = useNavigate();

  // Step Configuration
  const steps = [
    { number: 1, title: 'Basic Information', icon: Building2 },
    { number: 2, title: 'Contact Information', icon: Contact },
    { number: 3, title: 'Shelter Details', icon: ClipboardList },
    { number: 4, title: 'Administrator', icon: UserCog }
  ];

  // Main Form Submission Handler with proper types
  const handleFormSubmission = async (data: ShelterRegistrationFormData) => {
    try {
      setIsLoading(true);
      
      // 1. Create auth user only
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: AUTH_ROLES.SHELTER_ADMIN
          }
        }
      });
      
      if (authError) throw authError;
      
      // 2. Sign in explicitly after signup
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) throw signInError;

      // 3. Verify we have a session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error('Failed to authenticate after signup');
      }
      
      console.log('Successfully authenticated:', session.user.id);

      // 2. Show success message
      setStatus({ 
        type: 'success', 
        message: 'Registration started! Please check your email to verify your account. After verification, you can complete your shelter profile.' 
      });

      // 3. Redirect to confirmation page
      navigate('/registration-confirmation');

    } catch (error) {
      console.error('❌ Registration error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Registration failed' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step Navigation
  const handleNextStep = () => {
    const formData = getValues();
    localStorage.setItem('shelter-registration-progress', JSON.stringify(formData));
    
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    setCurrentStep(prev => prev + 1);
  };

  // Status Message Component
  const StatusMessage = () => {
    if (status.type === 'idle') return null;

    return (
      <div className={cn(
        "mt-4 p-4 rounded-lg flex items-center gap-2",
        status.type === 'loading' && "bg-blue-500/10 text-blue-200",
        status.type === 'success' && "bg-green-500/10 text-green-200",
        status.type === 'error' && "bg-red-500/10 text-red-200"
      )}>
        {status.type === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status.type === 'success' && <Check className="w-4 h-4" />}
        {status.type === 'error' && <AlertTriangle className="w-4 h-4" />}
        <p>{status.message}</p>
      </div>
    );
  };

  // Step Navigation and UI Components
  const renderStepIndicator = () => (
    <div className="mb-8 relative">
      <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-700">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-in-out"
          style={{ width: `${(Math.max(0, (currentStep - 1) * 25))}%` }}
        />
      </div>

      <div className="flex justify-between items-center relative">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setCurrentStep(step.number)}
              className={cn(
                "flex flex-col items-center group z-10",
                isCompleted && "text-green-500",
                isCurrent && "text-indigo-400"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "transition-all duration-300 ease-in-out transform",
                "border-2",
                isCurrent && "scale-110 border-indigo-400",
                isCompleted 
                  ? "bg-green-500/10 border-green-500 text-green-500" 
                  : isCurrent
                    ? "bg-indigo-600/10 text-indigo-400 border-indigo-400"
                    : "bg-gray-800 text-gray-400 border-gray-700"
              )}>
                {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
              </div>
              <span className="text-sm mt-2">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Form Steps UI
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Basic Information
            </h2>
            <div className="grid gap-6">
              <Input
                label="Email Address"
                type="email"
                required
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                label="Password"
                type="password"
                required
                {...register('password')}
                error={errors.password?.message}
              />
              <Input
                label="Shelter Name"
                required
                {...register('shelterName')}
                error={errors.shelterName?.message}
              />
            </div>
          </section>
        );

      case 2:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Contact className="w-5 h-5 text-indigo-400" />
              Contact Information
            </h2>
            <div className="grid gap-6">
              <Input
                label="Phone Number"
                required
                {...register('phone')}
                error={errors.phone?.message}
              />
              <Input
                label="Street Address"
                required
                {...register('streetAddress')}
                error={errors.streetAddress?.message}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  required
                  {...register('city')}
                  error={errors.city?.message}
                />
                <Input
                  label="Postal Code"
                  required
                  {...register('postalCode')}
                  error={errors.postalCode?.message}
                />
              </div>
            </div>
          </section>
        );

      case 3:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-400" />
              Shelter Details
            </h2>
            <div className="grid gap-6">
              <Input
                label="Registration Number"
                required
                {...register('registrationNumber')}
                error={errors.registrationNumber?.message}
              />
              <Input
                label="Capacity"
                type="number"
                required
                min="0"
                {...register('capacity', { 
                  valueAsNumber: true
                })}
                error={errors.capacity?.message}
              />
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  Services Offered
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'emergency_shelter', label: 'Emergency Shelter' },
                    { id: 'transitional_housing', label: 'Transitional Housing' },
                    { id: 'meals', label: 'Meals' },
                    { id: 'counseling', label: 'Counseling' },
                    { id: 'job_training', label: 'Job Training' },
                    { id: 'healthcare', label: 'Healthcare' }
                  ].map((service) => (
                    <label key={service.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        {...register('services')}
                        value={service.id}
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-600 bg-gray-700"
                      />
                      <span className="text-sm text-gray-300">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 4:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <UserCog className="w-5 h-5 text-indigo-400" />
              Administrator Information
            </h2>
            <div className="grid gap-6">
              <Input
                label="Administrator Name"
                required
                placeholder="Full Name"
                {...register('administrator.name')}
                error={errors.administrator?.name?.message}
              />
              <Input
                label="Administrator Title"
                required
                placeholder="e.g. Executive Director"
                {...register('administrator.title')}
                error={errors.administrator?.title?.message}
              />
              <Input
                label="Administrator Phone"
                required
                placeholder="(555) 555-5555"
                {...register('administrator.phone')}
                error={errors.administrator?.phone?.message}
              />
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  console.log('Form State:', {
    errors,
    touchedFields,
    values: getValues(),
    currentStep,
    isLoading
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
        <button 
          type="button"
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Form Submit Event Triggered');
            handleSubmit(handleFormSubmission)(e);
          }} 
          className="space-y-8"
        >
          {renderStepIndicator()}
          {renderStep()}

          <StatusMessage />

          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Previous
              </Button>
            )}
            
            {currentStep === steps.length ? (
              <Button
                type="submit"
                disabled={isLoading}
                className="ml-auto group"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Complete Registration Button Clicked');
                  console.log('Current Form Values:', getValues());
                  console.log('Form Errors:', errors);
                  
                  // Add detailed validation check
                  const formData = getValues();
                  console.log('Administrator Data:', formData.administrator);
                  
                  handleSubmit((data) => {
                    console.log('Form Submission Data:', data);
                    return handleFormSubmission(data);
                  })(e);
                }}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 mr-2" />
                )}
                Complete Registration
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNextStep}
                className="group"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default ShelterRegistrationForm;

