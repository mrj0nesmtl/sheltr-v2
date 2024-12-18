import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';

export function TokenPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            $SHELTR
            <Icon name="verified" className="ml-2 h-6 w-6 text-blue-400" />
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('token.description')}
          </p>
        </div>

        {/* Token Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: 'Total Supply', value: '1,000,000,000', icon: 'coins' },
            { label: 'Holders', value: '12,345', icon: 'users' },
            { label: 'Market Cap', value: '$10.5M', icon: 'chartBar' }
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-800/50 rounded-lg p-6 text-center">
              <Icon name={stat.icon} className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Token Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('token.governance')}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Icon name="check" className="h-6 w-6 text-green-400 mt-1 mr-3" />
                <span className="text-gray-300">{t('token.governancePoint1')}</span>
              </li>
              {/* Add more governance points */}
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('token.utility')}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Icon name="check" className="h-6 w-6 text-green-400 mt-1 mr-3" />
                <span className="text-gray-300">{t('token.utilityPoint1')}</span>
              </li>
              {/* Add more utility points */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 