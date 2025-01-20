import { FC } from 'react';
import { FileText, Book, Code, Shield, Terminal, Rocket, Cpu, Workflow, GitBranch } from 'lucide-react';
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
    practices: Book,
    implementation: Workflow,
    deployment: Rocket,
    overview: FileText,
    realtime: GitBranch,
    components: Cpu
  };
  return icons[iconName as keyof typeof icons] || FileText;
};

export const DocumentationGrid: FC<DocumentationGridProps> = ({ core, guides, wiki }) => {
  const renderSection = (title: string, links: DocLink[]) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => {
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
  );

  return (
    <div className="space-y-8">
      {renderSection('Core Documentation', core)}
      {renderSection('Development Guides', guides)}
      {renderSection('Wiki Documentation', wiki)}
    </div>
  );
}; 