import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

export function Checkpoint() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800/50 rounded-xl p-8">
      <div className="flex items-center mb-6">
        <Icon name="check-circle-2" className="h-8 w-8 text-indigo-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Development Checkpoint</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Testing Coverage */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Testing Coverage</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Unit Tests</span>
              <span className="text-green-400">75% 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Integration</span>
              <span className="text-yellow-400">60% 🟡</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">E2E</span>
              <span className="text-yellow-400">40% 🟡</span>
            </div>
          </div>
        </div>

        {/* Environment Status */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Environment Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Production</span>
              <span className="text-green-400">Operational 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Staging</span>
              <span className="text-green-400">Operational 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Development</span>
              <span className="text-yellow-400">Active Dev 🟡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 