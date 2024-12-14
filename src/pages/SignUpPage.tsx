import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DonorSignUpForm } from '@/components/Auth/DonorSignUpForm';
import { ShelterSignUpForm } from '@/components/Auth/ShelterSignUpForm';
import { Heart, Building2 } from 'lucide-react';

export default function SignUpPage() {
  const { t } = useTranslation();
  const [selectedForm, setSelectedForm] = useState<'donor' | 'shelter' | null>(null);

  if (selectedForm === 'donor') {
    return <DonorSignUpForm onBack={() => setSelectedForm(null)} />;
  }

  if (selectedForm === 'shelter') {
    return <ShelterSignUpForm onBack={() => setSelectedForm(null)} />;
  }

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Join the SHELTR Community
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Choose how you want to make a difference
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Donor Card */}
        <div 
          onClick={() => setSelectedForm('donor')}
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all cursor-pointer"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-500/10 rounded-full">
              <Heart className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Become a Donor</h2>
          <p className="text-gray-300 mb-8">
            Support individuals directly and track your impact with our transparent
            donation system.
          </p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Get Started
          </button>
        </div>

        {/* Shelter Card */}
        <div 
          onClick={() => setSelectedForm('shelter')}
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-green-500 transition-all cursor-pointer"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-500/10 rounded-full">
              <Building2 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Register Your Shelter
          </h2>
          <p className="text-gray-300 mb-8">
            Partner with us to manage participants and track fund allocation
            effectively.
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Partner Now
          </button>
        </div>
      </div>

      <div className="mt-12 text-gray-400">
        Already have an account?{' '}
        <a href="/login" className="text-indigo-400 hover:text-indigo-300">
          Sign in
        </a>
      </div>
    </div>
  );
} 