import { Link } from 'react-scroll';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sparkles, Activity, Timer, LineChart, BookOpen, GitCommit } from 'lucide-react';

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

const sections: SidebarSection[] = [
  {
    id: 'platform-overview',
    label: 'Platform Overview',
    icon: Sparkles,
    color: 'text-indigo-500'
  },
  {
    id: 'platform-status',
    label: 'Platform Status',
    icon: Activity,
    color: 'text-emerald-500'
  },
  {
    id: 'sprint-progress',
    label: 'Sprint Progress',
    icon: Timer,
    color: 'text-blue-500'
  },
  {
    id: 'metrics',
    label: 'Metrics',
    icon: LineChart,
    color: 'text-violet-500'
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: BookOpen,
    color: 'text-amber-500'
  },
  {
    id: 'changelog',
    label: 'Changelog',
    icon: GitCommit,
    color: 'text-rose-500'
  }
];

interface WikiSidebarProps {
  isOpen: boolean;
}

export const WikiSidebar = ({ isOpen }: WikiSidebarProps) => (
  <aside 
    className={cn(
      "fixed inset-y-0 left-0 w-64 bg-gray-800/95 backdrop-blur-sm",
      "transform transition-all duration-200 ease-in-out z-30",
      "border-r border-gray-700/50",
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0'
    )}
  >
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700/50">
        <h2 className="text-lg font-semibold text-white">Navigation</h2>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.id}
            spy={true}
            smooth={true}
            duration={500}
            offset={-100}
            isDynamic={true}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-gray-300",
              "hover:text-white hover:bg-gray-700/50 rounded-lg",
              "transition-all duration-200 ease-in-out",
              "cursor-pointer group"
            )}
            activeClass="bg-gray-700/70 text-white shadow-lg shadow-gray-900/20"
          >
            <section.icon 
              className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                "group-hover:scale-110",
                section.color
              )} 
            />
            <span className="font-medium">{section.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700/50">
        <div className="text-xs text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  </aside>
); 