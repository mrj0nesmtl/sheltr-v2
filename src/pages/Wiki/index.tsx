export { default } from './Wiki';
export * from './components';
export * from './hooks';
export * from './types';

export function WikiPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      {/* Main Container - Add max-width and center */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            SHELTR Documentation
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 text-gray-400 text-sm">
            <span className="flex items-center">
              <GitBranch className="w-4 h-4 mr-1" />
              Version 0.6.4
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Last updated: 2025-01-31T05:50:13.845Z
            </span>
          </div>
        </div>

        {/* Platform Overview Section */}
        <div className="space-y-4 mb-8">
          <Card className="p-4 w-full overflow-hidden">
            <h2 className="flex items-center text-xl font-semibold text-white mb-4">
              <Star className="w-5 h-5 text-indigo-400 mr-2" />
              Platform Overview
            </h2>
            {/* Card content */}
          </Card>
        </div>

        {/* Platform Status Section */}
        <div className="space-y-4">
          <h2 className="flex items-center text-xl font-semibold text-white mb-4">
            <Activity className="w-5 h-5 text-emerald-400 mr-2" />
            Platform Status
          </h2>
          
          {/* Status Cards Grid - Update grid settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* System Status */}
            <Card className="p-4 min-w-0"> {/* Add min-w-0 to prevent overflow */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Server className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">System Status</p>
                    <p className="text-lg font-semibold text-white">Operational</p>
                  </div>
                </div>
                <Badge variant="success">success</Badge>
              </div>
            </Card>

            {/* Role Navigation */}
            <Card className="p-4 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Navigation className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Role Navigation</p>
                    <p className="text-lg font-semibold text-white">Active</p>
                  </div>
                </div>
                <Badge variant="success">success</Badge>
              </div>
            </Card>

            {/* Additional status cards follow the same pattern */}
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  );
} 