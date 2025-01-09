import { type FC, useState } from 'react';
import { shelterRegistrationSchema } from '@/lib/types/organization';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { FileUpload } from '@/components/ui/FileUpload';
import type { ShelterRegistrationFormData } from '@/lib/types/organization';
import { cn } from '@/lib/utils';
import { 
  Building2, 
  Contact, 
  ClipboardList, 
  UserCog, 
  FileText,
  ArrowLeft,
  Check,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface Props {
  onBack: () => void;
  isSubmitting: boolean;
  onSubmit: (data: ShelterRegistrationFormData) => Promise<void>;
}

export const ShelterRegistrationForm: FC<Props> = ({ onBack, isSubmitting, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<ShelterRegistrationFormData>({
    resolver: zodResolver(shelterRegistrationSchema),
    mode: 'onSubmit'
  });

  const steps = [
    { number: 1, title: 'Basic Information', icon: Building2 },
    { number: 2, title: 'Contact Information', icon: Contact },
    { number: 3, title: 'Shelter Details', icon: ClipboardList },
    { number: 4, title: 'Administrator', icon: UserCog },
    { number: 5, title: 'Documents', icon: FileText }
  ];

  const renderStepIndicator = () => (
    <div className="mb-8 relative">
      <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-700">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-in-out"
          style={{ 
            width: `${(Math.max(0, (currentStep - 1) * 25))}%`
          }}
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
              onClick={() => setCurrentStep(step.number)}
              className="flex flex-col items-center group z-10"
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "transition-all duration-300 ease-in-out transform",
                "border-2",
                isCurrent && "scale-110 border-indigo-400",
                isCompleted 
                  ? "bg-green-500 border-green-400 text-white" 
                  : isCurrent
                    ? "bg-indigo-600 text-white border-indigo-400"
                    : "bg-gray-700 text-gray-300 border-gray-600 group-hover:bg-gray-600",
                "group-hover:shadow-lg group-hover:scale-105",
              )}>
                <div className="relative">
                  <div className={cn(
                    "transition-all duration-300 ease-in-out",
                    isCompleted ? "opacity-0 scale-50" : "opacity-100 scale-100"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    "transition-all duration-300 ease-in-out",
                    isCompleted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  )}>
                    <Check className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <span className={cn(
                "text-sm mt-2 transition-colors duration-200",
                isCurrent ? "text-white" : "text-gray-400 group-hover:text-gray-300"
              )}>
                {step.title}
              </span>
              {isCompleted && !isCurrent && (
                <span className="text-xs text-green-500 mt-1">Completed</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const getCurrentStepIcon = () => {
    const currentStepData = steps.find(step => step.number === currentStep);
    const Icon = currentStepData?.icon;
    return Icon ? <Icon className="w-6 h-6 text-indigo-400" /> : null;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>
            <div className="grid gap-6">
              <Input
                label="Email Address"
                required
                icon="mail"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                label="Password"
                type="password"
                required
                icon="lock"
                {...register('password')}
                error={errors.password?.message}
              />
              <Input
                label="Shelter Name"
                required
                icon="building"
                {...register('shelterName')}
                error={errors.shelterName?.message}
              />
            </div>
          </section>
        );

      case 2:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Contact Information</h2>
            <div className="grid gap-6">
              <Input
                label="Phone Number"
                required
                icon="phone"
                placeholder="(555) 555-5555"
                {...register('phone')}
                error={errors.phone?.message}
              />
              <Input
                label="Street Address"
                required
                icon="map-pin"
                placeholder="123 Main St"
                {...register('streetAddress')}
                error={errors.streetAddress?.message}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  required
                  icon="city"
                  {...register('city')}
                  error={errors.city?.message}
                />
                <Input
                  label="Postal Code"
                  required
                  icon="mail"
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
            <h2 className="text-xl font-semibold text-white">Shelter Details</h2>
            <div className="grid gap-6">
              <Input
                label="Registration Number"
                required
                icon="hash"
                {...register('registrationNumber')}
                error={errors.registrationNumber?.message}
              />
              <Input
                label="Capacity"
                type="number"
                required
                icon="users"
                {...register('capacity')}
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
                        className="form-checkbox h-5 w-5 text-indigo-600"
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
            <h2 className="text-xl font-semibold text-white">Administrator Information</h2>
            <div className="grid gap-6">
              <Input
                label="Administrator Name"
                required
                icon="user"
                placeholder="Full name of shelter administrator"
                {...register('administrator.name')}
                error={errors.administrator?.name?.message}
              />
              <Input
                label="Administrator Title"
                required
                icon="briefcase"
                placeholder="e.g., Executive Director"
                {...register('administrator.title')}
                error={errors.administrator?.title?.message}
              />
              <Input
                label="Administrator Email"
                type="email"
                required
                icon="mail"
                placeholder="admin@shelter.org"
                {...register('administrator.email')}
                error={errors.administrator?.email?.message}
              />
              <Input
                label="Administrator Phone"
                required
                icon="phone"
                placeholder="(555) 555-5555"
                {...register('administrator.phone')}
                error={errors.administrator?.phone?.message}
              />
            </div>
          </section>
        );

      case 5:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Required Documents</h2>
            <div className="grid gap-6">
              <FileUpload
                label="Registration Document"
                required
                accept=".pdf,.doc,.docx"
                helperText="Upload official registration document (PDF, DOC)"
                {...register('documents.registration')}
                error={errors.documents?.registration?.message}
              />
              <FileUpload
                label="Tax Document"
                accept=".pdf,.doc,.docx"
                helperText="Upload tax exemption document if applicable"
                {...register('documents.tax')}
                error={errors.documents?.tax?.message}
              />
              <FileUpload
                label="Insurance Document"
                accept=".pdf,.doc,.docx"
                helperText="Upload insurance documentation"
                {...register('documents.insurance')}
                error={errors.documents?.insurance?.message}
              />
              <FileUpload
                label="Organization Logo"
                accept="image/*"
                helperText="Upload your organization's logo (PNG, JPG)"
                {...register('logo')}
                error={errors.logo?.message}
              />
            </div>
          </section>
        );
    }
  };

  const handleNextStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    setCurrentStep(prev => prev + 1);
  };

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

        <div className="flex items-center gap-3 mb-8">
          {getCurrentStepIcon()}
          <h1 className="text-3xl font-bold text-white">
            Register Your Shelter
          </h1>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {renderStep()}

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
            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="group"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? 'Registering...' : 'Complete Registration'}
              </Button>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 mb-2">Development Navigation:</p>
            <div className="flex gap-2">
              {steps.map((step) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setCurrentStep(step.number)}
                  className={cn(
                    "px-2 py-1 text-xs rounded",
                    currentStep === step.number 
                      ? "bg-indigo-600 text-white" 
                      : "bg-gray-700 text-gray-300"
                  )}
                >
                  Step {step.number}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShelterRegistrationForm; 