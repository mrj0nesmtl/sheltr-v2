import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

export function VerifyPage() {
  const { t } = useTranslation();
  const [txHash, setTxHash] = useState('');

  const handleVerify = async () => {
    // Add verification logic here
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('verify.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('verify.description')}
          </p>
        </div>

        {/* Verification Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="txHash" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('verify.transactionHash')}
                </label>
                <input
                  type="text"
                  id="txHash"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500"
                  placeholder="0x..."
                />
              </div>
              <button
                onClick={handleVerify}
                className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Icon name="search" className="h-5 w-5 mr-2" />
                {t('verify.verifyButton')}
              </button>
            </div>

            {/* Results Section (initially hidden) */}
            <div className="mt-8 hidden">
              <h3 className="text-lg font-medium text-white mb-4">
                {t('verify.results')}
              </h3>
              {/* Add verification results here */}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {t('verify.howItWorks')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-6 text-center">
                <Icon name={step.icon} className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  {t(step.title)}
                </h3>
                <p className="text-gray-400">{t(step.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 