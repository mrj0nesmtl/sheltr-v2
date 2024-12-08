import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          {t('about.title')}
        </h1>
        
        <div className="prose prose-invert">
          <p className="text-xl text-gray-300 mb-8">
            {t('about.intro.content')}
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            {t('about.mission.title')}
          </h2>
          <p className="text-gray-300">
            {t('about.mission.content')}
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            {t('about.vision.title')}
          </h2>
          <p className="text-gray-300">
            {t('about.vision.content')}
          </p>
        </div>
      </div>
    </div>
  );
} 