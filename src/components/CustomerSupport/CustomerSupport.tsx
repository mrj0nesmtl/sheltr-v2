import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';

export function CustomerSupport() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          {t('support.needHelp')}
        </h2>
        <p className="text-indigo-100 mb-8">
          {t('support.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone Support */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Icon name="phone" className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {t('support.callUs')}
            </h3>
            <p className="text-indigo-100 mb-4">
              {t('support.callDescription')}
            </p>
            <a
              href="tel:1-800-SHELTR"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              1-800-SHELTR
            </a>
          </div>

          {/* Chat Support */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Icon name="messageSquare" className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {t('support.chatWithUs')}
            </h3>
            <p className="text-indigo-100 mb-4">
              {t('support.chatDescription')}
            </p>
            <button
              onClick={() => {/* Open chat bot */}}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              {t('support.startChat')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 