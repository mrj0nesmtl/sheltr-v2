import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AUTH_ROLES, type ShelterAdminSignUpFormData } from '@/types/auth';
import { shelterAdminSignUpSchema } from '@/auth/schemas';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
  isSubmitting: boolean;
  onSubmit: (data: ShelterAdminSignUpFormData) => Promise<void>;
}

export const ShelterSignUpForm: FC<Props> = ({ onBack, isSubmitting, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ShelterAdminSignUpFormData>({
    resolver: zodResolver(shelterAdminSignUpSchema),
    defaultValues: {
      role: AUTH_ROLES.SHELTER_ADMIN
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <button 
        type="button"
        onClick={onBack}
        className="mb-4 text-gray-400 hover:text-white flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">Shelter Registration</h2>

        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
              placeholder="shelter@organization.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password *
            </label>
            <input
              {...register('password')}
              type="password"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Shelter Name *
            </label>
            <input
              {...register('name')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Information</h3>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200">
              Phone Number
            </label>
            <input
              {...register('phoneNumber')}
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-200">
              Street Address
            </label>
            <input
              {...register('address')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-200">
              City
            </label>
            <input
              {...register('city')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
            />
          </div>
        </div>

        {/* Shelter Details */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-white">Shelter Details</h3>

          <div>
            <label htmlFor="registration_number" className="block text-sm font-medium text-gray-200">
              Registration Number *
            </label>
            <input
              {...register('registration_number')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
            />
            {errors.registration_number && (
              <p className="mt-1 text-sm text-red-500">{errors.registration_number.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-200">
              Capacity *
            </label>
            <input
              {...register('capacity', { valueAsNumber: true })}
              type="number"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
            />
            {errors.capacity && (
              <p className="mt-1 text-sm text-red-500">{errors.capacity.message}</p>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-white">Emergency Contact</h3>

          <div>
            <label htmlFor="emergency_contact.name" className="block text-sm font-medium text-gray-200">
              Contact Name
            </label>
            <input
              {...register('emergency_contact.name')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
            />
          </div>

          <div>
            <label htmlFor="emergency_contact.phone" className="block text-sm font-medium text-gray-200">
              Contact Phone
            </label>
            <input
              {...register('emergency_contact.phone')}
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
            />
          </div>

          <div>
            <label htmlFor="emergency_contact.email" className="block text-sm font-medium text-gray-200">
              Contact Email
            </label>
            <input
              {...register('emergency_contact.email')}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Account...' : 'Register Shelter'}
          </button>
        </div>
      </div>
    </form>
  )
}