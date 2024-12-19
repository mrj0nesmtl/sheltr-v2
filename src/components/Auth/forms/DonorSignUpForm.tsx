import { type FC } from 'react'
import { donorSignUpSchema } from '@/auth/schemas'
import { useAuthStore } from '@/auth/stores/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { AUTH_ROLES, type DonorSignUpFormData } from '@/types/auth'

interface Props {
  onBack: () => void
  isSubmitting: boolean
  onSubmit: (data: DonorSignUpFormData) => Promise<void>
}

export const DonorSignUpForm: FC<Props> = ({ 
  onBack, 
  isSubmitting, 
  onSubmit 
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DonorSignUpFormData>({
    resolver: zodResolver(donorSignUpSchema),
    defaultValues: {
      role: AUTH_ROLES.DONOR
    }
  })

  // Remove unused signUpDonor if not being used
  // const signUpDonor = useAuthStore(state => state.signUpDonor)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <button 
        type="button"
        onClick={onBack}
        className="mb-4 text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          id="email"
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
          Password
        </label>
        <input
          id="password"
          {...register('password')}
          type="password"
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Donor Account'}
      </button>
    </form>
  )
}

export default DonorSignUpForm