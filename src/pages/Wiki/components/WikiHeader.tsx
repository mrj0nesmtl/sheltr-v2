import { Clock, GitBranch, Search } from 'lucide-react';

interface WikiHeaderProps {
  title: string;
  version: string;
  lastUpdated: string;
}

export const WikiHeader = ({ title, version, lastUpdated }: WikiHeaderProps) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center text-gray-400">
          <GitBranch className="w-4 h-4 mr-1" />
          <span>Version {version}</span>
        </div>
      </div>
    </div>
    <div className="mt-4 md:mt-0 flex items-center gap-4">
      <div className="flex items-center text-gray-400">
        <Clock className="w-4 h-4 mr-1" />
        <span className="text-sm">Last updated: {lastUpdated}</span>
      </div>
    </div>
  </header>
); 