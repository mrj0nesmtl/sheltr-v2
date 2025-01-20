import { type FC, useState, useEffect } from 'react';
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
import { z } from 'zod';

interface Props {
  onBack: () => void;
}

// Add step validation schemas
const stepValidationSchemas = {
  1: z.object({
    email: shelterRegistrationSchema.shape.email,
    password: shelterRegistrationSchema.shape.password,
    shelterName: shelterRegistrationSchema.shape.shelterName,
    organizationEmail: shelterRegistrationSchema.shape.organizationEmail,
    website: shelterRegistrationSchema.shape.website,
    tax_id: shelterRegistrationSchema.shape.tax_id,
  }),
  2: z.object({
    phone: shelterRegistrationSchema.shape.phone,
    streetAddress: shelterRegistrationSchema.shape.streetAddress,
    city: shelterRegistrationSchema.shape.city,
    postalCode: shelterRegistrationSchema.shape.postalCode,
  }),
  3: z.object({
    registrationNumber: shelterRegistrationSchema.shape.registrationNumber,
    capacity: shelterRegistrationSchema.shape.capacity,
    services: shelterRegistrationSchema.shape.services,
  }),
  4: z.object({
    administrator: shelterRegistrationSchema.shape.administrator,
  }),
};

// Add auto-save functionality
const AUTO_SAVE_DELAY = 1000; // 1 second

// Add registration number generator function
const generateRegistrationNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `REG-${year}-${random}`;
};

// Add available services array
const availableServices = [
  { id: 'emergency', label: 'Emergency Shelter' },
  { id: 'transitional', label: 'Transitional Housing' },
  { id: 'permanent', label: 'Permanent Housing' },
  { id: 'meals', label: 'Meal Services' },
  { id: 'medical', label: 'Medical Care' },
  { id: 'mental_health', label: 'Mental Health Services' },
  { id: 'substance', label: 'Substance Use Support' },
  { id: 'employment', label: 'Employment Assistance' },
  { id: 'case_management', label: 'Case Management' },
  { id: 'education', label: 'Education & Training' }
];

interface RegistrationError {
  step: 'auth' | 'profile' | 'organization' | 'staff';
  error: any;
}

const handleRegistrationError = (error: RegistrationError) => {
  switch(error.step) {
    case 'auth':
      // Handle auth-specific errors
      break;
    case 'profile':
      // Handle profile-specific errors
      break;
    // etc.
  }
};

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
  const [showSummary, setShowSummary] = useState(false);

  // Form Validation
  const {
    handleSubmit,
    getValues,
    register,
    watch,
    setValue,
    setError,
    formState: { errors, touchedFields }
  } = useForm<ShelterRegistrationFormData>({
    resolver: zodResolver(shelterRegistrationSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      shelterName: '',
      website: '',
      phone: '',
      streetAddress: '',
      city: '',
      postalCode: '',
      administrator: {
        name: '',
        title: '',
        phone: ''
      },
      organizationEmail: '',
      tax_id: '',
      capacity: 0,
      services: [],
      status: 'pending',
      verified: false,
      registrationNumber: generateRegistrationNumber(),
      housing_fund_balance: '0',
      token_balance: '0',
      country: 'Canada'
    }
  });

  const navigate = useNavigate();

  // Define steps with built-in IDs
  const steps = [
    {
      id: 'basic',
      title: 'Basic',
      icon: Building2,
      fields: ['email', 'password', 'shelterName', 'streetAddress', 'city', 'postalCode', 'website', 'phone']
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: UserCog,
      fields: ['administrator.name', 'administrator.title', 'administrator.phone']
    },
    {
      id: 'details',
      title: 'Details',
      icon: ClipboardList,
      fields: ['organizationEmail', 'tax_id', 'capacity', 'services']
    }
  ];

  // Add state for storing form data between steps
  const [formData, setFormData] = useState<Partial<ShelterRegistrationFormData>>({});

  // Auto-save functionality
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        const timeoutId = setTimeout(() => {
          localStorage.setItem('shelterRegistrationDraft', JSON.stringify(value));
          console.log('Form auto-saved');
        }, AUTO_SAVE_DELAY);
        
        return () => clearTimeout(timeoutId);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch]);

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('shelterRegistrationDraft');
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      Object.entries(parsedDraft).forEach(([key, value]) => {
        setValue(key as keyof ShelterRegistrationFormData, value);
      });
    }
  }, [setValue]);

  // Validate current step
  const validateStep = async () => {
    const currentValues = getValues();
    const stepSchema = stepValidationSchemas[currentStep];
    
    try {
      await stepSchema.parseAsync(currentValues);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Only show errors for touched fields
        error.errors.forEach((err) => {
          if (touchedFields[err.path[0] as keyof typeof touchedFields]) {
            setError(err.path[0] as any, {
              type: 'manual',
              message: err.message,
            });
          }
        });
      }
      return false;
    }
  };

  // Main Form Submission Handler with proper types
  const handleFormSubmission = async (data: ShelterRegistrationFormData) => {
    try {
      console.log('Starting form submission with data:', data);
      
      // Validate required fields
      if (!data.email || !data.organizationEmail || !data.password || !data.shelterName) {
        console.error('Missing required fields:', {
          hasEmail: !!data.email,
          hasOrgEmail: !!data.organizationEmail,
          hasPassword: !!data.password,
          hasShelterName: !!data.shelterName
        });
        setStatus({ 
          type: 'error', 
          message: 'Please fill in all required fields' 
        });
        return;
      }

      setIsLoading(true);
      setStatus({ type: 'loading', message: 'Creating your account...' });

      // Add registration tracking ID
      const registrationId = `reg_${format(new Date(), 'yyyyMMdd_HHmmss')}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log(`[${registrationId}] Starting shelter registration process`, {
        email: data.email,
        shelterName: data.shelterName,
        timestamp: new Date().toISOString()
      });

      // At the start of handleFormSubmission
      const { error: txError } = await supabase.rpc('begin_transaction');
      if (txError) throw txError;

      try {
        // First create the auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              role: 'shelter_admin'
            }
          }
        });

        if (authError) throw authError;

        // Sign in immediately after signup to establish session
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (signInError) throw signInError;

        // Now try to create the profile with established session
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user?.id,
            user_id: authData.user?.id,
            email: data.email,
            role: 'shelter_admin'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw profileError;
        }

        // Then create organization
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: data.shelterName,
            registration_number: data.registrationNumber,
            email: data.organizationEmail,
            phone: data.phone,
            website: data.website,
            address: data.streetAddress,
            city: data.city,
            postal_code: data.postalCode,
            user_id: authData.user?.id
          });

        if (orgError) throw orgError;

        // After organization creation
        const { error: staffError } = await supabase
          .from('organization_staff')
          .insert({
            user_id: authData.user?.id,
            organization_id: orgData[0].id, // Need to capture org ID from insert
            role: 'shelter_admin',
            status: 'active'
          });

        if (staffError) throw staffError;

        setStatus({
          type: 'success',
          message: 'Registration successful! Please check your email to verify your account.'
        });

        navigate('/registration-confirmation');

        // Commit the transaction
        await supabase.rpc('commit_transaction');
      } catch (error) {
        // Rollback the transaction
        await supabase.rpc('rollback_transaction');
        throw error;
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error?.message?.includes('security purposes')) {
        const waitSeconds = error.message.match(/\d+/)[0];
        setStatus({
          type: 'error',
          message: `Please wait ${waitSeconds} seconds before trying again.`
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Registration failed. Please try again or contact support.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update next step handler with validation
  const handleNextStep = async () => {
    const currentValues = getValues();
    
    // Debug log to see what's being validated
    console.log('Attempting to validate:', currentValues);

    const requiredFields = [
      'email',
      'password',
      'shelterName',
      'phone',
      'streetAddress',
      'city',
      'postalCode'
    ];

    const missingFields = requiredFields.filter(
      field => !currentValues[field]
    );

    if (missingFields.length > 0) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    // Clear status by setting to null
    setStatus(null);
    setCurrentStep(prev => prev + 1);
  };

  // Update back button handler
  const handlePreviousStep = () => {
    const currentValues = getValues();
    setFormData(prev => ({
      ...prev,
      ...currentValues
    }));
    setCurrentStep(prev => prev - 1);
  };

  // Add effect to restore data when switching steps
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof ShelterRegistrationFormData, value);
    });
  }, [currentStep, setValue, formData]);

  // Status Message Component
  const StatusMessage = () => {
    if (!status) return null;  // Early return if status is null
    
    return (
      <div
        className={cn(
          "p-4 rounded-md mt-4",
          status.type === 'error' && "bg-red-900/50 text-red-200",
          status.type === 'success' && "bg-green-900/50 text-green-200"
        )}
      >
        <p className="text-sm">{status.message}</p>
      </div>
    );
  };

  // Step Navigation and UI Components
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between items-center mb-8">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isActive = currentStep === steps.indexOf(step) + 1;
          const isCompleted = currentStep > steps.indexOf(step) + 1;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative">
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200",
                  isActive && "bg-indigo-600 ring-4 ring-indigo-600/30",
                  isCompleted && "bg-green-600",
                  !isActive && !isCompleted && "bg-gray-700",
                  "group hover:bg-indigo-500"
                )}
              >
                <StepIcon 
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isActive && "text-white",
                    isCompleted && "text-white",
                    !isActive && !isCompleted && "text-gray-400 group-hover:text-white"
                  )} 
                />
              </div>
              <span className={cn(
                "mt-2 text-sm font-medium",
                isActive && "text-white",
                !isActive && "text-gray-400"
              )}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // Form Steps UI
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>
            <div className="grid gap-6">
              <Input
                label="Email Address"
                type="email"
                required
                {...register('email')}
                error={touchedFields.email ? errors.email?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Password"
                type="password"
                required
                {...register('password')}
                error={touchedFields.password ? errors.password?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Shelter Name"
                required
                {...register('shelterName')}
                error={touchedFields.shelterName ? errors.shelterName?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Website"
                placeholder="https://"
                {...register('website')}
                error={touchedFields.website ? errors.website?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Shelter Phone"
                type="tel"
                required
                {...register('phone')}
                error={touchedFields.phone ? errors.phone?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Street Address"
                required
                {...register('streetAddress')}
                error={touchedFields.streetAddress ? errors.streetAddress?.message : undefined}
                className="mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  required
                  {...register('city')}
                  error={touchedFields.city ? errors.city?.message : undefined}
                  className="mb-4"
                />
                <Input
                  label="Postal Code"
                  required
                  {...register('postalCode')}
                  error={touchedFields.postalCode ? errors.postalCode?.message : undefined}
                  className="mb-4"
                />
              </div>
            </div>
          </section>
        );
      case 2:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Contact Information</h2>
            <div className="grid gap-6">
              <Input
                label="Administrator Name"
                required
                {...register('administrator.name')}
                error={touchedFields.administrator?.name ? errors.administrator?.name?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Administrator Title"
                required
                {...register('administrator.title')}
                error={touchedFields.administrator?.title ? errors.administrator?.title?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Administrator Phone"
                type="tel"
                required
                {...register('administrator.phone')}
                error={touchedFields.administrator?.phone ? errors.administrator?.phone?.message : undefined}
                className="mb-4"
              />
            </div>
          </section>
        );
      case 3:
        return (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Shelter Details</h2>
            <div className="grid gap-6">
              <Input
                label="Organization Email"
                type="email"
                required
                {...register('organizationEmail')}
                error={touchedFields.organizationEmail ? errors.organizationEmail?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Tax ID"
                required
                {...register('tax_id')}
                error={touchedFields.tax_id ? errors.tax_id?.message : undefined}
                className="mb-4"
              />
              <Input
                label="Registration Number"
                disabled
                value={getValues().registrationNumber}
                {...register('registrationNumber')}
              />
              <Input
                label="Capacity"
                type="number"
                required
                {...register('capacity')}
                error={touchedFields.capacity ? errors.capacity?.message : undefined}
                className="mb-4"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Services Offered <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {availableServices.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <input
                        type="checkbox"
                        {...register('services')}
                        value={service.id}
                        className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600"
                      />
                      <span className="text-gray-200">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
    }
  };

  // Add Summary component
  const RegistrationSummary = () => {
    const values = getValues();
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Registration Summary</h2>
        
        <div className="grid gap-4 p-4 bg-gray-800/50 rounded-lg">
          <SummarySection title="Basic Information">
            <SummaryItem label="Shelter Name" value={values.shelterName} />
            <SummaryItem label="Address" value={`${values.streetAddress}, ${values.city}`} />
            <SummaryItem label="Postal Code" value={values.postalCode} />
            <SummaryItem label="Website" value={values.website} />
            <SummaryItem label="Shelter Phone" value={values.phone} />
          </SummarySection>

          <SummarySection title="Contact Information">
            <SummaryItem label="Administrator Name" value={values.administrator?.name} required />
            <SummaryItem label="Title" value={values.administrator?.title} required />
            <SummaryItem label="Admin Phone" value={values.administrator?.phone} required />
            <SummaryItem label="Login Email" value={values.email} />
            <SummaryItem label="Organization Email" value={values.organizationEmail} />
          </SummarySection>

          <SummarySection title="Shelter Details">
            <SummaryItem label="Registration Number" value={values.registrationNumber} />
            <SummaryItem label="Capacity" value={values.capacity?.toString()} />
            <SummaryItem 
              label="Services" 
              value={formatServices(values.services || [])}
            />
            <SummaryItem label="Tax ID" value={values.tax_id} />
          </SummarySection>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSummary(false)}
          >
            Edit Information
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !values.administrator?.name}
            onClick={() => handleFormSubmission(values)}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Check className="w-4 h-4 mr-2" />
            )}
            Confirm & Submit
          </Button>
        </div>
      </div>
    );
  };

  // Helper function to format services
  const formatServices = (services: string[]) => {
    return services
      .map(service => service
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      )
      .join(', ');
  };

  // Add navigation buttons component
  const NavigationButtons = () => (
    <div className="flex justify-between pt-6">
      {currentStep > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={handlePreviousStep}
          className="group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Previous
        </Button>
      )}
      
      {currentStep === steps.length ? (
        <Button
          type="button"  // Changed from submit to prevent form submission
          disabled={isLoading}
          className="ml-auto group"
          onClick={() => setShowSummary(true)}  // Show summary instead of direct submission
        >
          Review Registration
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleNextStep}
          className={cn("group", currentStep === 1 && "ml-auto")}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      )}
    </div>
  );

  console.log('Form State:', {
    errors,
    touchedFields,
    values: getValues(),
    currentStep,
    isLoading
  });

  // Update error display to only show after interaction
  const renderFieldError = (fieldName: string) => {
    const error = errors[fieldName as keyof typeof errors];
    const touched = touchedFields[fieldName as keyof typeof touchedFields];
    
    if (error && touched) {
      return <span className="text-red-400 text-sm mt-1">{error.message}</span>;
    }
    return null;
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

        <form onSubmit={handleSubmit(handleFormSubmission)} className="space-y-8">
          {showSummary ? (
            <RegistrationSummary />
          ) : (
            <>
              {renderStepIndicator()}
              {renderStep()}
              <StatusMessage />
              <NavigationButtons />  {/* Add navigation buttons here */}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

// Helper components for Summary
const SummarySection: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-medium text-white">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const SummaryItem: FC<{ 
  label: string; 
  value?: string; 
  required?: boolean 
}> = ({ label, value, required }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">
      {label}{required && ' *'}:
    </span>
    <span className={cn(
      "text-white",
      (!value && required) && "text-red-400"
    )}>
      {value || 'Not provided'}
    </span>
  </div>
);

export default ShelterRegistrationForm;


