import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { parseProjectDocs } from '@/lib/utils/docs-parser';
import type { ProjectStatus as ProjectStatusType } from '@/lib/utils/docs-parser';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Server,
  Gauge,
  GitCommit
} from 'lucide-react';
import { StatusCard } from './StatusCard';

interface ProjectStatusProps {
  className?: string;
}

export function ProjectStatus({ className = '' }: ProjectStatusProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [status, setStatus] = React.useState<ProjectStatusType['status']>('inProgress');
  const [projectStatus, setProjectStatus] = React.useState<ProjectStatusType | null>(null);

  React.useEffect(() => {
    async function loadStatus() {
      try {
        const { status } = await parseProjectDocs();
        setProjectStatus(status);
        setStatus(status.status);
      } catch (error) {
        console.error('Failed to load project status:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStatus();
  }, []);

  if (isLoading || !projectStatus) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-gray-800/10 rounded-lg p-4 ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800/30 rounded-lg p-3 animate-pulse">
              <div className="h-6 bg-gray-700/50 rounded mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-700/50 rounded w-3/4" />
                <div className="h-4 bg-gray-700/50 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`space-y-8 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard title="Status" icon={Activity} delay={0.1} variant="compact">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Version {projectStatus.version}</span>
            <StatusBadge status={status} />
          </div>
        </StatusCard>

        <StatusCard title="Environment" icon={Server} delay={0.2} variant="compact">
          <div className="space-y-1">
            {Object.entries(projectStatus.environment).map(([env, status]) => (
              <div key={env} className="flex justify-between items-center">
                <span className="text-gray-400 text-sm capitalize">{env}</span>
                <span>{status}</span>
              </div>
            ))}
          </div>
        </StatusCard>

        <StatusCard title="Performance" icon={Gauge} delay={0.3} variant="compact">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Bundle</span>
              <span className="text-indigo-400">{projectStatus.metrics.bundleSize}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Paint</span>
              <span className="text-indigo-400">{projectStatus.metrics.firstPaint}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Score</span>
              <span className="text-indigo-400">{projectStatus.metrics.lighthouseScore}/100</span>
            </div>
          </div>
        </StatusCard>

        <StatusCard title="Build" icon={GitCommit} delay={0.4} variant="compact">
          <div className="font-mono text-indigo-400 text-lg">
            {projectStatus.buildNumber}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Last updated: {format(projectStatus.lastUpdated, 'MMM d, yyyy')}
          </div>
        </StatusCard>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: ProjectStatusType['status'] }) {
  const colors = {
    critical: 'bg-red-500/10 text-red-400',
    stable: 'bg-green-500/10 text-green-400',
    inProgress: 'bg-yellow-500/10 text-yellow-400'
  };

  const icons = {
    critical: AlertTriangle,
    stable: CheckCircle2,
    inProgress: Activity
  };

  const Icon = icons[status];

  return (
    <span className={`px-2 py-0.5 rounded-md flex items-center text-xs ${colors[status]}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </span>
  );
} 