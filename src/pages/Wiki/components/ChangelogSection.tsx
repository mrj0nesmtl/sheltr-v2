import { FC } from 'react';
import { GitBranch, FileText, Clock, Tag, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Version {
  number: string;
  date: string;
  status: 'stable' | 'beta' | 'alpha' | 'rc';
  changelog: {
    added: string[];
    changed: string[];
    fixed?: string[];
    deprecated?: string[];
    removed?: string[];
    security?: string[];
  };
  notes?: string;
  metrics?: {
    performance?: number;
    security?: number;
    coverage?: number;
  };
}

interface ChangelogSectionProps {
  currentVersion: Version;
  versionHistory: Version[];
}

export const ChangelogSection: FC<ChangelogSectionProps> = ({ 
  currentVersion, 
  versionHistory 
}) => {
  const getStatusColor = (status: Version['status']) => {
    const colors = {
      stable: 'bg-green-900/50 text-green-300',
      beta: 'bg-blue-900/50 text-blue-300',
      alpha: 'bg-yellow-900/50 text-yellow-300',
      rc: 'bg-purple-900/50 text-purple-300'
    };
    return colors[status];
  };

  const renderChangelogSection = (
    title: string, 
    items?: string[], 
    icon?: React.ElementType,
    colorClass = 'text-gray-300'
  ) => {
    if (!items?.length) return null;
    const Icon = icon || FileText;
    
    return (
      <div>
        <h4 className={cn("font-semibold mb-2 flex items-center gap-2", colorClass)}>
          <Icon className="w-4 h-4" />
          {title}
        </h4>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
              <span className="mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMetrics = (metrics?: Version['metrics']) => {
    if (!metrics) return null;
    
    return (
      <div className="grid grid-cols-3 gap-4 my-4">
        {metrics.performance && (
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <div className="text-blue-300 text-sm font-semibold">Performance</div>
            <div className="text-2xl font-bold text-blue-400">
              {metrics.performance}%
            </div>
          </div>
        )}
        {metrics.security && (
          <div className="bg-green-900/30 p-3 rounded-lg">
            <div className="text-green-300 text-sm font-semibold">Security</div>
            <div className="text-2xl font-bold text-green-400">
              {metrics.security}%
            </div>
          </div>
        )}
        {metrics.coverage && (
          <div className="bg-purple-900/30 p-3 rounded-lg">
            <div className="text-purple-300 text-sm font-semibold">Coverage</div>
            <div className="text-2xl font-bold text-purple-400">
              {metrics.coverage}%
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="changelog" className="scroll-mt-16">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <GitBranch className="w-6 h-6 mr-2" />
          Changelog
        </h2>
        
        {/* Current Version */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Current Version</span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                {currentVersion.number}
                <span className={cn(
                  "text-sm px-3 py-1 rounded-full",
                  getStatusColor(currentVersion.status)
                )}>
                  {currentVersion.status}
                </span>
              </h3>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Released: {new Date(currentVersion.date).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Release Notes */}
          {currentVersion.notes && (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Release Notes
              </h4>
              <p className="text-gray-300 text-sm">{currentVersion.notes}</p>
            </div>
          )}

          {/* Add metrics display */}
          {renderMetrics(currentVersion.metrics)}

          {/* Changes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderChangelogSection('Added', currentVersion.changelog.added, Tag, 'text-green-400')}
            {renderChangelogSection('Changed', currentVersion.changelog.changed, GitBranch, 'text-blue-400')}
            {renderChangelogSection('Fixed', currentVersion.changelog.fixed, AlertCircle, 'text-yellow-400')}
            {renderChangelogSection('Deprecated', currentVersion.changelog.deprecated, Clock, 'text-orange-400')}
            {renderChangelogSection('Removed', currentVersion.changelog.removed, FileText, 'text-red-400')}
            {renderChangelogSection('Security', currentVersion.changelog.security, AlertCircle, 'text-purple-400')}
          </div>

          {/* Version History */}
          <div className="mt-8 border-t border-gray-700 pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Version History</h4>
            <div className="space-y-4">
              {versionHistory.map((version, index) => (
                <div 
                  key={version.number}
                  className="p-4 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-white">
                        {version.number}
                      </span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        getStatusColor(version.status)
                      )}>
                        {version.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(version.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {version.notes && (
                      <p className="mb-2">{version.notes}</p>
                    )}
                    <div className="space-y-1">
                      {version.changelog.added?.length > 0 && (
                        <span className="text-green-400">
                          {version.changelog.added.length} additions
                        </span>
                      )}
                      {version.changelog.changed?.length > 0 && (
                        <span className="text-blue-400 ml-3">
                          {version.changelog.changed.length} changes
                        </span>
                      )}
                      {version.changelog.fixed?.length > 0 && (
                        <span className="text-yellow-400 ml-3">
                          {version.changelog.fixed.length} fixes
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a 
            href="https://github.com/mrj0nesmtl/sheltr-v2/blob/main/public/docs/project/changelog.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-4"
          >
            <FileText className="w-4 h-4 mr-2" />
            View full changelog
          </a>
        </div>
      </div>
    </section>
  );
}; 