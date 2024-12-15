import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';
import type { TranslationKey } from '@/lib/i18n';
import { useAuthStore } from '../../stores/authStore';
import { shelterAdminSignUpSchema, type ShelterAdminSignUpFormData } from '../../lib/validation/authValidation';
import { cn } from '../../lib/utils';

export function ShelterSignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, error: authError, isLoading } = useAuthStore();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<ShelterAdminSignUpFormData>>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: '',
    registrationNumber: '',
    city: '',
    address: '',
    capacity: 0,
    services: [],
    contactPhone: '',
    emergencyContact: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const availableServices = [
    'Emergency Shelter',
    'Transitional Housing',
    'Food Services',
    'Medical Care',
    'Mental Health Services',
    'Job Training',
    'Case Management',
    'Substance Abuse Treatment'
  ].map(service => ({
    value: service,
    label: t(`signUp.shelter.form.services.options.${service.toLowerCase().replace(/\s+/g, '')}`)
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      const validatedData = shelterAdminSignUpSchema.parse(formData);
      await signUp({
        ...validatedData,
        role: 'shelter_admin'
      });
      navigate('/admin/dashboard');
    } catch (error: any) {
      if (error.errors) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            {t('signUp.shelter.form.title' as TranslationKey)}
          </h2>

          {authError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-md">
              <div className="flex items-center gap-2 text-red-200">
                <Icon name="alertCircle" className="h-5 w-5" />
                <p>{authError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-300">
                  {t('signUp.shelter.form.organization' as TranslationKey)}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon name="building2" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className={cn(
                      "bg-white/5 border text-white block w-full pl-10 pr-3 py-2 rounded-md",
                      "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                      validationErrors.organization
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-indigo-500"
                    )}
                  />
                </div>
                {validationErrors.organization && (
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.organization as TranslationKey)}</p>
                )}
              </div>

              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-300">
                  {t('signUp.shelter.form.registrationNumber' as TranslationKey)}
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className={cn(
                      "bg-white/5 border text-white block w-full px-3 py-2 rounded-md",
                      "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                      validationErrors.registrationNumber
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-indigo-500"
                    )}
                  />
                </div>
                {validationErrors.registrationNumber && (
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.registrationNumber as TranslationKey)}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  {t('signUp.shelter.form.email' as TranslationKey)}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon name="mail" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn(
                      "bg-white/5 border text-white block w-full pl-10 pr-3 py-2 rounded-md",
                      "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                      validationErrors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-indigo-500"
                    )}
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.email as TranslationKey)}</p>
                )}
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-300">
                  {t('signUp.shelter.form.contactPhone' as TranslationKey)}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon name="phone" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className={cn(
                      "bg-white/5 border text-white block w-full pl-10 pr-3 py-2 rounded-md",
                      "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                      validationErrors.contactPhone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-indigo-500"
                    )}
                  />
                </div>
                {validationErrors.contactPhone && (
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.contactPhone as TranslationKey)}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                  {t('signUp.shelter.form.city' as TranslationKey)}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon name="mapPin" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={cn(
                      "bg-white/5 border text-white block w-full pl-10 pr-3 py-2 rounded-md",
                      "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                      validationErrors.city
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-indigo-500"
                    )}
                  />
                </div>
                {validationErrors.city && (
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.city as TranslationKey)}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                  {t('signUp.shelter.form.address' as TranslationKey)}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={cn(
                      "bg-white/5 border text-white block w-full px-3 py-2 rounded-md",
                      "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                      validationErrors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-indigo-500"
                    )}
                  />
                </div>
                {validationErrors.address && (
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.address as TranslationKey)}</p>
                )}
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-300">
                {t('signUp.shelter.form.capacity' as TranslationKey)}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Icon name="users" className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className={cn(
                    "bg-white/5 border text-white block w-full pl-10 pr-3 py-2 rounded-md",
                    "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                    validationErrors.capacity
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  )}
                />
              </div>
              {validationErrors.capacity && (
                <p className="mt-1 text-sm text-red-400">{t(validationErrors.capacity as TranslationKey)}</p>
              )}
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('signUp.shelter.form.services.title' as TranslationKey)}
              </label>
              <div className="grid grid-cols-2 gap-4">
                {availableServices.map(({ value, label }) => (
                  <label key={value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.services?.includes(value)}
                      onChange={(e) => {
                        const services = formData.services || [];
                        setFormData({
                          ...formData,
                          services: e.target.checked
                            ? [...services, value]
                            : services.filter(s => s !== value)
                        });
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-white/5"
                    />
                    <span className="ml-2 text-sm text-gray-300">{label}</span>
                  </label>
                ))}
              </div>
              {validationErrors.services && (
                <p className="mt-1 text-sm text-red-400">{t(validationErrors.services as TranslationKey)}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  {t('signUp.shelter.form.password' as TranslationKey)}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon name="lock" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={cn(
                      "bg-white/5 border text-white block w-full pl-10 pr-3 py-2 rounded-md",
                      "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                      validationErrors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-indigo-500"
                    )}
                  />
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.password as TranslationKey)}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  {t('signUp.shelter.form.confirmPassword' as TranslationKey)}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon name="lock" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={cn(
                      "bg-white/5 border text-white block w-full pl-10 pr-3 py-2 rounded-md",
                      "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                      validationErrors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-indigo-500"
                    )}
                  />
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.confirmPassword as TranslationKey)}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex justify-center py-2 px-4 border border-transparent rounded-md",
                "text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? t('signUp.shelter.form.submitting' as TranslationKey) : t('signUp.shelter.form.submit' as TranslationKey)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}