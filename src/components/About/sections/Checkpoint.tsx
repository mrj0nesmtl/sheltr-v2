import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Checkpoint() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800/50 rounded-xl p-8">
      <div className="flex items-center mb-6">
        <CheckCircle name="check-circle-2" className="h-8 w-8 text-indigo-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Development Checkpoint</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Testing Coverage */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Testing Coverage</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Unit Tests</span>
              <span className="text-green-400">95% 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Integration</span>
              <span className="text-green-400">92% 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Security</span>
              <span className="text-green-400">90% 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">E2E</span>
              <span className="text-yellow-400">85% 🟡</span>
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

        {/* Feature Status */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Feature Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Role Navigation</span>
              <span className="text-green-400">Complete 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Path Validation</span>
              <span className="text-green-400">Complete 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Security Monitor</span>
              <span className="text-yellow-400">In Progress 🟡</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Analytics</span>
              <span className="text-yellow-400">Pending 🟡</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Role Resolution</span>
              <span className="text-green-400">&lt; 10ms 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Path Validation</span>
              <span className="text-green-400">&lt; 20ms 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Security Checks</span>
              <span className="text-green-400">&lt; 5ms 🟢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Navigation Mount</span>
              <span className="text-green-400">&lt; 50ms 🟢</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 