import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

export function Roadmap() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800/50 rounded-xl p-8">
      <div className="flex items-center mb-6">
        <Icon name="git-branch-plus" className="h-8 w-8 text-indigo-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">
          {t('about.roadmap.title')}
        </h2>
      </div>

      <div className="space-y-8">
        {/* Phase 1 */}
        <div className="relative pl-8 border-l-2 border-green-500">
          <div className="absolute -left-2.5 top-0">
            <div className="w-5 h-5 rounded-full bg-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Phase 1: Foundation</h3>
          <p className="text-gray-300">Completed Q4 2023</p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>✅ Core authentication system</li>
            <li>✅ Basic user roles</li>
            <li>✅ Initial database schema</li>
            <li>✅ Project structure</li>
          </ul>
        </div>

        {/* Phase 2 */}
        <div className="relative pl-8 border-l-2 border-green-500">
          <div className="absolute -left-2.5 top-0">
            <div className="w-5 h-5 rounded-full bg-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Phase 2: Core Features</h3>
          <p className="text-gray-300">Completed Q1 2024</p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>✅ QR code scanning system</li>
            <li>✅ Multi-language support</li>
            <li>✅ Role-based dashboards</li>
            <li>✅ Blockchain integration</li>
          </ul>
        </div>

        {/* Current Phase */}
        <div className="relative pl-8 border-l-2 border-yellow-500">
          <div className="absolute -left-2.5 top-0">
            <div className="w-5 h-5 rounded-full bg-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Phase 3: Enhancement</h3>
          <p className="text-gray-300">Current - Q2 2024</p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>⏳ Analytics integration</li>
            <li>⏳ Payment processing</li>
            <li>⏳ Smart contract auditing</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 