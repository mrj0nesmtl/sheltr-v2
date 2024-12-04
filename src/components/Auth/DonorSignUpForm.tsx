import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import { donorSignUpSchema, type DonorSignUpFormData } from '../../lib/validation/authValidation';
import { cn } from '../../lib/utils';

export function DonorSignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, error: authError, isLoading } = useAuthStore();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<DonorSignUpFormData>>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    city: '',
    address: '',
    taxReceiptRequired: false,
    defaultDonation: '10',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      const validatedData = donorSignUpSchema.parse(formData);
      await signUp({
        ...validatedData,
        role: 'donor'
      });
      navigate('/dashboard');
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
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            {t('signUp.donor.form.title')}
          </h2>

          {authError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-md">
              <div className="flex items-center gap-2 text-red-200">
                <AlertCircle className="h-5 w-5" />
                <p>{authError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                {t('signUp.donor.form.email')}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
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
                <p className="mt-1 text-sm text-red-400">{t(validationErrors.email)}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  {t('signUp.donor.form.password')}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
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
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.password)}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  {t('signUp.donor.form.confirmPassword')}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
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
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.confirmPassword)}</p>
                )}
              </div>
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                  {t('signUp.donor.form.city')}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
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
                  <p className="mt-1 text-sm text-red-400">{t(validationErrors.city)}</p>
                )}
              </div>
            </div>

            {/* Default Donation */}
            <div>
              <label htmlFor="defaultDonation" className="block text-sm font-medium text-gray-300">
                {t('signUp.donor.form.defaultDonation')}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="defaultDonation"
                  min="1"
                  step="1"
                  value={formData.defaultDonation}
                  onChange={(e) => setFormData({ ...formData, defaultDonation: e.target.value })}
                  className={cn(
                    "bg-white/5 border text-white block w-full pl-10 pr-3 py-2 rounded-md",
                    "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
                    validationErrors.defaultDonation
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-600 focus:ring-indigo-500"
                  )}
                />
              </div>
              {validationErrors.defaultDonation && (
                <p className="mt-1 text-sm text-red-400">{t(validationErrors.defaultDonation)}</p>
              )}
            </div>

            {/* Tax Receipt Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="taxReceiptRequired"
                checked={formData.taxReceiptRequired}
                onChange={(e) => setFormData({ ...formData, taxReceiptRequired: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-white/5"
              />
              <label htmlFor="taxReceiptRequired" className="ml-2 block text-sm text-gray-300">
                {t('signUp.donor.form.taxReceipt')}
              </label>
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
              {isLoading ? t('signUp.donor.form.submitting') : t('signUp.donor.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}