import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, 
  Mail, 
  Heart, 
  CreditCard, 
  ArrowLeft,
  Check,
  Loader2 
} from 'lucide-react';
import { AUTH_ROLES } from '@/types/auth';
import { donorSignUpSchema, type DonorSignUpFormData } from '@/features/donor/types/donor';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { createSocialFeed, initializeNotifications } from '@/features/social/utils';
import { 
  SocialConnectionRequest, 
  ImpactCircleInvite, 
  ShelterFollowNotification 
} from '@/features/social/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  onBack: () => void;
  isSubmitting: boolean;
  onSubmit: (data: DonorSignUpFormData) => Promise<void>;
}

const STORAGE_KEY = 'donor-signup-progress';

interface DonorProfile {
  id: string;
  user_id: string;
  display_name: string;
  email: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  website?: string;
  avatar_url?: string;
  bio?: string;
}

interface DonorStats {
  donor_id: string;
  anonymous_donations: boolean;
  current_streak: number;
  longest_streak: number;
  last_donation_date: string | null;
  total_donated: number;
  donation_count: number;
  impact_score: number;
  people_helped: number;
  notification_frequency: 'daily' | 'weekly' | 'monthly';
  preferred_causes: string[];
  created_at: string;
  updated_at: string;
}

interface DonorSocialConnections {
  donor_id: string;
  connected_donors: string[];
  followed_shelters: string[];
  impact_circle: string[];
  created_at: string;
  updated_at: string;
}

interface SocialInitializationData {
  donor_id: string;
  display_name: string;
  email: string;
  social_preferences: {
    visibility: 'public' | 'connections' | 'private';
    allow_donor_connections: boolean;
    allow_shelter_following: boolean;
  };
}

const initializeSocialSystems = async (data: SocialInitializationData) => {
  const { donor_id, display_name, social_preferences } = data;
  const timestamp = new Date().toISOString();

  try {
    // 1. Initialize Social Feed
    const { error: feedError } = await supabase
      .from('social_feeds')
      .insert({
        owner_id: donor_id,
        feed_type: 'donor',
        visibility: social_preferences.visibility,
        created_at: timestamp,
        updated_at: timestamp,
        last_activity: timestamp
      });

    if (feedError) throw feedError;

    // 2. Set up Connection Request Handling
    if (social_preferences.allow_donor_connections) {
      const { error: connectionError } = await supabase
        .from('connection_settings')
        .insert({
          donor_id,
          auto_accept: false,
          blacklist: [],
          connection_limit: 1000,
          created_at: timestamp,
          updated_at: timestamp
        });

      if (connectionError) throw connectionError;
    }

    // 3. Initialize Impact Circle
    const { error: circleError } = await supabase
      .from('impact_circles')
      .insert({
        owner_id: donor_id,
        circle_name: `${display_name}'s Impact Circle`,
        members: [],
        pending_invites: [],
        created_at: timestamp,
        updated_at: timestamp
      });

    if (circleError) throw circleError;

    // 4. Set up Shelter Following System
    if (social_preferences.allow_shelter_following) {
      const { error: followError } = await supabase
        .from('shelter_follows')
        .insert({
          donor_id,
          followed_shelters: [],
          notification_settings: {
            new_needs: true,
            impact_updates: true,
            success_stories: true
          },
          created_at: timestamp,
          updated_at: timestamp
        });

      if (followError) throw followError;
    }

    // 5. Initialize Welcome Notifications
    const welcomeNotifications = [
      {
        recipient_id: donor_id,
        type: 'welcome',
        title: 'Welcome to SHELTR!',
        content: 'Start your giving journey by exploring shelters in your area.',
        priority: 'high',
        read: false
      },
      {
        recipient_id: donor_id,
        type: 'tutorial',
        title: 'Complete Your Profile',
        content: 'Add more details to your profile to increase your impact visibility.',
        priority: 'medium',
        read: false
      },
      {
        recipient_id: donor_id,
        type: 'social',
        title: 'Join the Community',
        content: 'Connect with other donors and follow shelters to grow your impact.',
        priority: 'medium',
        read: false
      }
    ];

    const { error: notifError } = await supabase
      .from('notifications')
      .insert(welcomeNotifications);

    if (notifError) throw notifError;

  } catch (error) {
    console.error('Social initialization error:', error);
    throw error;
  }
};

export const DonorSignUpForm = ({ onBack, isSubmitting: formSubmitting, onSubmit }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isStepLoading, setIsStepLoading] = useState(false);
  const [submitAttemptTime, setSubmitAttemptTime] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch, reset, getValues } = useForm<DonorSignUpFormData>({
    resolver: zodResolver(donorSignUpSchema),
    defaultValues: {
      notification_preferences: [],
      donation_preferences: {
        preferred_causes: [],
        notification_frequency: 'weekly',
        anonymous_donations: false,
        auto_share: true
      }
    }
  });

  const steps = [
    { number: 1, title: 'Basic Info', icon: User },
    { number: 2, title: 'Profile Details', icon: Heart },
    { number: 3, title: 'Security', icon: CreditCard }
  ];

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      const { step, completed, formData } = JSON.parse(savedProgress);
      setCurrentStep(step);
      setCompletedSteps(completed);
      // Reset form with saved data
      reset(formData);
    }
  }, []);

  // Save progress on step change
  useEffect(() => {
    const formData = getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      step: currentStep,
      completed: completedSteps,
      formData
    }));
  }, [currentStep, completedSteps]);

  const handleStepClick = async (stepNumber: number) => {
    setIsStepLoading(true);
    try {
      // Simulate loading for development
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep(stepNumber);
      const previousSteps = Array.from(
        { length: stepNumber - 1 }, 
        (_, i) => i + 1
      );
      setCompletedSteps(previousSteps);
    } finally {
      setIsStepLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8 relative">
      {/* Progress Line */}
      <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-700/50">
        <div 
          className="h-full bg-indigo-600/50 transition-all duration-500 ease-in-out"
          style={{ 
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
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
              onClick={() => handleStepClick(step.number)}
              disabled={isStepLoading}
              className={cn(
                "flex flex-col items-center group z-10",
                "transition-all duration-300",
                isStepLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "transition-all duration-300 ease-in-out",
                isCurrent && !isStepLoading && "scale-110",
                isCurrent 
                  ? "bg-indigo-600 text-white"
                  : isCompleted
                    ? "bg-green-500/20 text-green-500"
                    : "bg-gray-800 text-gray-400",
                "hover:bg-gray-700"
              )}>
                {isStepLoading && isCurrent ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <span className={cn(
                "text-sm mt-2",
                isCurrent ? "text-white" : "text-gray-400"
              )}>
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="your@email.com"
              icon="mail"
              className="bg-gray-800/50"
            />
            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="••••••••"
              icon="lock"
              className="bg-gray-800/50"
            />
            <Input
              label="Display Name"
              {...register('display_name')}
              error={errors.display_name?.message}
              placeholder="How should we call you?"
              icon="user"
              className="bg-gray-800/50"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Donation Preferences</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('donation_preferences.anonymous_donations')}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="text-sm text-gray-300">Make donations anonymous by default</span>
                </label>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Notification Frequency
                </label>
                <select
                  {...register('notification_preferences.frequency')}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Preferred Causes
                </label>
                {['Housing', 'Food Security', 'Healthcare', 'Education'].map((cause) => (
                  <label key={cause} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register('donation_preferences.preferred_causes')}
                      value={cause.toLowerCase()}
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                    />
                    <span className="text-sm text-gray-300">{cause}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Social Preferences</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Impact Circle Visibility
                </label>
                <select
                  {...register('social_preferences.visibility')}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                >
                  <option value="public">Public - Share my impact with everyone</option>
                  <option value="connections">Connections Only - Share with my network</option>
                  <option value="private">Private - Keep my impact private</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Connect & Follow
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('social_preferences.allow_donor_connections')}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="text-sm text-gray-300">Allow other donors to connect with me</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('social_preferences.allow_shelter_following')}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="text-sm text-gray-300">Allow following shelters and their updates</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const processSubmit = async (data: DonorSignUpFormData) => {
    const now = Date.now();
    const cooldownPeriod = 16000;
    
    if (submitAttemptTime && (now - submitAttemptTime) < cooldownPeriod) {
      const remaining = Math.ceil((cooldownPeriod - (now - submitAttemptTime)) / 1000);
      toast.error(`Please wait ${remaining} seconds before trying again`);
      setCooldownRemaining(remaining);
      return;
    }
    
    setSubmitAttemptTime(now);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: 'donor',
            display_name: data.display_name,
            user_metadata: {
              role: 'donor',
              display_name: data.display_name,
              social_preferences: data.social_preferences
            }
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?role=donor`
        }
      });

      if (authError) throw authError;

      navigate('/registration-confirmation', { 
        state: { 
          email: data.email,
          role: 'donor',
          display_name: data.display_name
        },
        replace: true
      });

    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
    }
  };

  // Add social event handlers
  const handleConnectionRequest = async (requesterId: string, recipientId: string) => {
    const { error } = await supabase
      .from('connection_requests')
      .insert({
        requester_id: requesterId,
        recipient_id: recipientId,
        status: 'pending',
        created_at: new Date().toISOString()
      });

    if (error) throw error;
  };

  const handleImpactCircleInvite = async (circleId: string, inviteeId: string) => {
    const { error } = await supabase
      .from('impact_circle_invites')
      .insert({
        circle_id: circleId,
        invitee_id: inviteeId,
        status: 'pending',
        created_at: new Date().toISOString()
      });

    if (error) throw error;
  };

  const handleShelterFollow = async (donorId: string, shelterId: string) => {
    const { error } = await supabase
      .from('shelter_follows')
      .update({
        followed_shelters: supabase.raw('array_append(followed_shelters, ?)', [shelterId])
      })
      .match({ donor_id: donorId });

    if (error) throw error;
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-8">
      <button 
        type="button"
        onClick={onBack}
        className="flex items-center text-gray-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Create Donor Account</h1>
        <p className="text-gray-400 mt-2">Join our community of donors making a difference</p>
      </div>

      {renderStepIndicator()}
      {renderStepContent()}

      <div className="flex justify-between pt-6">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => handleStepClick(currentStep - 1)}
            disabled={isStepLoading}
          >
            Previous
          </Button>
        )}
        {currentStep < steps.length ? (
          <Button
            type="button"
            onClick={() => handleStepClick(currentStep + 1)}
            disabled={isStepLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {isStepLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Next'
            )}
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={formSubmitting || cooldownRemaining > 0}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {formSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : cooldownRemaining > 0 ? (
              `Wait ${cooldownRemaining}s`
            ) : (
              'Complete Registration'
            )}
          </Button>
        )}
      </div>
    </form>
  );
};

export default DonorSignUpForm