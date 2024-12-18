import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';

export function Whitepaper() {
  const { t } = useTranslation();

  const tocSections = Object.entries(t('about.whitepaper.toc.sections', { returnObjects: true }));

  return (
    <div className="bg-gray-800/50 rounded-xl p-8">
      <div className="flex items-center mb-6">
        <Icon name="file-text" className="h-8 w-8 text-indigo-400 mr-3" />
        <div>
          <h2 className="text-2xl font-bold text-white">
            {t('about.whitepaper.title')}
          </h2>
          <p className="text-gray-400 mt-1">
            {t('about.whitepaper.subtitle')}
          </p>
        </div>
      </div>

      {/* Abstract */}
      <div className="bg-gray-700/50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Abstract</h3>
        <p className="text-gray-300 leading-relaxed">
          {t('about.whitepaper.abstract')}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-700/50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">
          {t('about.whitepaper.toc.title')}
        </h3>
        <div className="space-y-3">
          {tocSections.map(([key, title], index) => (
            <div key={key} className="flex items-center text-gray-300">
              <span className="w-6 text-indigo-400">{index + 1}.</span>
              <span>{title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <a
          href="/blockchain/whitepaper"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Icon name="external-link" className="h-5 w-5 mr-2" />
          {t('about.whitepaper.readMore')}
        </a>
      </div>
    </div>
  );
} 