import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { donorSignUpSchema, type DonorSignUpForm as DonorFormType } from '@/types/auth/schemas'
import { useAuthStore } from '@/auth/stores/authStore'

interface Props {
  onBack: () => void
  isSubmitting: boolean
}

export const DonorSignUpForm = ({ onBack, isSubmitting }: Props) => {
  const signUpDonor = useAuthStore(state => state.signUpDonor)
  const { register, handleSubmit, formState: { errors } } = useForm<DonorFormType>({
    resolver: zodResolver(donorSignUpSchema)
  })

  const onSubmit = async (data: DonorFormType) => {
    try {
      await signUpDonor(data)
      // Use existing navigation/notification system
    } catch (error) {
      // Use existing error handling
    }
  }

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