import { FC } from 'react';
import { FileText, BookOpen, Code, Shield, Terminal, Rocket, Cpu, Workflow, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocLink {
  title: string;
  path: string;
  icon: string;
}

interface DocumentationGridProps {
  core: DocLink[];
  guides: DocLink[];
  wiki: DocLink[];
}

const getIcon = (iconName: string) => {
  const icons = {
    api: Code,
    architecture: Cpu,
    security: Shield,
    technical: Terminal,
    practices: BookOpen,
    implementation: Workflow,
    deployment: Rocket,
    overview: FileText,
    realtime: GitBranch,
    components: Cpu
  };
  return icons[iconName as keyof typeof icons] || FileText;
};

export const DocumentationGrid: FC<DocumentationGridProps> = ({ core, guides, wiki }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-amber-500" />
        <h2 className="text-xl font-bold text-white">Documentation</h2>
      </div>

      <div className="space-y-8">
        <h3 className="text-lg font-semibold text-white">Core Documentation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {core.map((link) => {
            const Icon = getIcon(link.icon);
            return (
              <a
                key={link.path}
                href={`https://github.com/mrj0nesmtl/sheltr-v2/tree/main${link.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
              >
                <Icon className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-white">{link.title}</span>
              </a>
            );
          })}
        </div>

        <h3 className="text-lg font-semibold text-white">Development Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((link) => {
            const Icon = getIcon(link.icon);
            return (
              <a
                key={link.path}
                href={`https://github.com/mrj0nesmtl/sheltr-v2/tree/main${link.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
              >
                <Icon className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-white">{link.title}</span>
              </a>
            );
          })}
        </div>

        <h3 className="text-lg font-semibold text-white">Wiki Documentation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wiki.map((link) => {
            const Icon = getIcon(link.icon);
            return (
              <a
                key={link.path}
                href={`https://github.com/mrj0nesmtl/sheltr-v2/tree/main${link.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
              >
                <Icon className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-white">{link.title}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 