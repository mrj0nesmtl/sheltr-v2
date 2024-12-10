export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* AI Tools Feature */}
      <div className="bg-gray-800/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-500/20 rounded-lg">
            <Icon name="brain-circuit" className="h-6 w-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            AI-Powered Tools
          </h3>
        </div>
        <p className="text-gray-300">
          Intelligent financial guidance and resource allocation for participants.
        </p>
      </div>

      {/* Security Feature */}
      <div className="bg-gray-800/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Icon name="lock-keyhole" className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Multi-Factor Security
          </h3>
        </div>
        <p className="text-gray-300">
          Advanced security measures protecting all transactions and user data.
        </p>
      </div>
    </div>
  );
} 