import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';

export function Roadmap() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
      <div className="flex items-center mb-6">
        <Icon name="git-branch-plus" className="h-8 w-8 text-indigo-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">
          {t('about.roadmap.title')}
        </h2>
        <span className="ml-3 text-sm text-gray-400">v0.6.4</span>
      </div>

      <div className="space-y-8">
        {/* Phase 1 */}
        <div className="relative pl-8 border-l-2 border-green-500">
          <div className="absolute -left-2.5 top-0">
            <div className="w-5 h-5 rounded-full bg-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Phase 1: Foundation</h3>
          <p className="text-gray-300">Completed December 2023</p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>✅ Core authentication system</li>
            <li>✅ Basic user roles</li>
            <li>✅ Initial database schema</li>
            <li>✅ Project structure</li>
            <li>✅ Security framework</li>
            <li>✅ UI Component Library</li>
          </ul>
        </div>

        {/* Phase 2 */}
        <div className="relative pl-8 border-l-2 border-green-500">
          <div className="absolute -left-2.5 top-0">
            <div className="w-5 h-5 rounded-full bg-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Phase 2: Core Features</h3>
          <p className="text-gray-300">Current - January 2024</p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>✅ QR code scanning system</li>
            <li>✅ Multi-language support</li>
            <li>✅ Role-based dashboards</li>
            <li>✅ Blockchain integration</li>
            <li>✅ Component organization</li>
            <li>✅ UI/UX improvements</li>
            <li>🟡 Security monitoring (80%)</li>
            <li>🟡 Documentation (75%)</li>
          </ul>
        </div>

        {/* Upcoming Phase */}
        <div className="relative pl-8 border-l-2 border-blue-500">
          <div className="absolute -left-2.5 top-0">
            <div className="w-5 h-5 rounded-full bg-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Phase 3: Data Integration</h3>
          <p className="text-gray-300">Upcoming - February 2024</p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>⏳ API Integration</li>
            <li>⏳ Real-Time Updates</li>
            <li>⏳ Analytics Enhancement</li>
            <li>⏳ Performance Monitoring</li>
            <li>⏳ Advanced Security Measures</li>
          </ul>
        </div>

        {/* Future Phase */}
        <div className="relative pl-8 border-l-2 border-gray-500">
          <div className="absolute -left-2.5 top-0">
            <div className="w-5 h-5 rounded-full bg-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Phase 4: Enhancement</h3>
          <p className="text-gray-300">Planned - March 2024</p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>⭕ Performance Optimization</li>
            <li>⭕ Mobile Optimization</li>
            <li>⭕ Testing Coverage</li>
            <li>⭕ Documentation Updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 