import { useState } from 'react';
import { Shield, Book, Activity, Clock, Github, FileText, GitBranch, Sparkles, Timer, LineChart, BookOpen, GitCommit } from 'lucide-react';
import { WikiHeader } from './components/WikiHeader';
import { WikiSidebar } from './components/WikiSidebar';
import { WikiMobileNav } from './components/WikiMobileNav';
import { StatusOverview } from './components/StatusOverview';
import { SprintProgress } from './components/SprintProgress';
import { PlatformStatusSection } from './components/PlatformStatusSection';
import { MetricsGrid } from './components/MetricsGrid';
import { DocumentationGrid } from './components/DocumentationGrid';
import { useWikiData } from './hooks/useWikiData';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ChangelogSection } from './components/ChangelogSection';
import { cn } from '@/lib/utils';
import { 
  PieChart,
  BarChart,
  AreaChart 
} from '@/features/shared/analytics/charts';
import { ChartDataPoint } from '@/features/shared/analytics/types';
import { OverviewSection } from '@/pages/Wiki/components/OverviewSection';
import overviewContent from '/docs/core/overview.md?raw';

const StatusIndicator = ({ status, pulse = false }) => (
  <span className={cn(
    "inline-block w-2 h-2 rounded-full",
    status === 'healthy' && "bg-green-400",
    status === 'warning' && "bg-yellow-400",
    status === 'error' && "bg-red-400",
    pulse && "animate-pulse"
  )} />
);

const SearchBar = () => (
  <div className="relative">
    <input 
      type="search"
      placeholder="Search documentation..."
      className="w-full bg-gray-700/50 rounded-lg px-4 py-2"
    />
    <kbd className="absolute right-3 top-2.5 text-xs text-gray-400">⌘K</kbd>
  </div>
);

const MetricsVisualizer = () => {
  return (
    <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <LineChart 
          className="w-6 h-6 text-violet-500"
        />
        <h2 className="text-xl font-bold text-white">Metrics</h2>
      </div>
      {/* ... rest of the metrics content ... */}
    </section>
  );
};

const Wiki = () => {
  const { data, isLoading, error } = useWikiData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentVersion = {
    number: "0.6.4",
    date: "2024-01-20",
    status: "stable",
    notes: "Comprehensive security and monitoring implementation with enhanced UI/UX improvements and performance optimizations.",
    changelog: {
      added: [
        "Real-time security monitoring system",
        "Comprehensive performance tracking",
        "Automated threat detection",
        "Security metrics dashboard",
        "Enhanced monitoring capabilities",
        "Automated alert system",
        "Real-time analytics integration",
        "Performance optimization tools"
      ],
      changed: [
        "Enhanced UI/UX components",
        "Improved navigation system",
        "Optimized component mounting",
        "Updated security protocols",
        "Enhanced documentation structure",
        "Improved error handling",
        "Updated deployment process",
        "Enhanced monitoring setup"
      ],
      fixed: [
        "Security monitoring gaps",
        "Performance bottlenecks",
        "Navigation state issues",
        "Component mounting delays",
        "Documentation inconsistencies",
        "Deployment configurations",
        "Monitoring alerts",
        "Security validations"
      ],
      security: [
        "Implemented real-time monitoring",
        "Enhanced threat detection",
        "Added security metrics",
        "Improved alert system",
        "Enhanced access controls",
        "Updated security protocols",
        "Added monitoring tools",
        "Enhanced validation"
      ]
    },
    metrics: {
      performance: 98,
      security: 100,
      coverage: 95
    }
  };

  const versionHistory = [
    {
      number: "0.6.3",
      date: "2024-01-15",
      status: "stable" as const,
      changelog: {
        added: ["Navigation system overhaul", "Component optimization"],
        changed: ["Enhanced navigation system", "Improved component structure"],
        fixed: ["Navigation issues", "Component performance"]
      },
      notes: "Navigation system overhaul and component optimization"
    },
    {
      number: "0.6.2",
      date: "2024-01-10",
      status: "stable" as const,
      changelog: {
        added: ["Security measures", "Performance tools"],
        changed: ["Enhanced security", "Improved performance"],
        fixed: ["Security issues", "Performance bottlenecks"]
      },
      notes: "Security implementation and performance optimization"
    },
    {
      number: "0.6.1",
      date: "2024-01-05",
      status: "stable" as const,
      changelog: {
        added: ["Basic security", "Initial monitoring"],
        changed: ["Documentation structure", "Performance baseline"],
        fixed: ["Initial issues", "Setup problems"]
      },
      notes: "Initial security and monitoring setup"
    }
  ];

  const wikiSections: SidebarSection[] = [
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

  const documentationLinks = {
    core: [
      { title: 'API Documentation', path: '/public/docs/core/api.md', icon: 'api' },
      { title: 'System Architecture', path: '/public/docs/core/architecture.md', icon: 'architecture' },
      { title: 'Security Framework', path: '/public/docs/core/security.md', icon: 'security' },
      { title: 'Technical Specs', path: '/public/docs/core/technical.md', icon: 'technical' }
    ],
    guides: [
      { title: 'Best Practices', path: '/public/docs/guides/best-practices.md', icon: 'practices' },
      { title: 'Implementation Guide', path: '/public/docs/guides/buildout_implementation.md', icon: 'implementation' },
      { title: 'Deployment Guide', path: '/public/docs/guides/deployment.md', icon: 'deployment' }
    ],
    wiki: [
      { title: 'Wiki Overview', path: '/public/docs/wiki/overview.md', icon: 'overview' },
      { title: 'Real-time Updates', path: '/public/docs/wiki/real-time.md', icon: 'realtime' },
      { title: 'Component Architecture', path: '/public/docs/wiki/components.md', icon: 'components' }
    ]
  };

  if (isLoading) return <LoadingSpinner size="lg" />;

  if (error || !data) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-red-400">Error loading Wiki data: {error?.message || 'No data available'}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Navigation */}
      <WikiMobileNav 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        sections={wikiSections}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <WikiSidebar 
          isOpen={sidebarOpen}
          sections={wikiSections}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 ml-0 md:ml-64">
          {/* Header */}
          <WikiHeader 
            title="SHELTR Documentation"
            version={currentVersion.number}
            lastUpdated={data.lastUpdated}
            status={currentVersion.status}
          />

          {/* Overview Section */}
          <section id="platform-overview" className="scroll-mt-16">
            <OverviewSection content={overviewContent} />
          </section>

          {/* Content Grid */}
          <div className="space-y-8 mt-8">
            {/* Status Overview */}
            <section id="platform-status" className="scroll-mt-16">
              <PlatformStatusSection 
                systemStatus={data.systemStatus}
                metrics={data.metrics}
              />
            </section>

            {/* Sprint Progress */}
            <section id="sprint-progress" className="scroll-mt-16">
              <SprintProgress 
                currentSprint={data.currentSprint}
                tasks={data.sprintTasks}
              />
            </section>

            {/* Metrics Grid */}
            <section id="metrics" className="scroll-mt-16">
              <MetricsGrid metrics={data.metrics} />
            </section>

            {/* Documentation Grid */}
            <section id="documentation" className="scroll-mt-16">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Documentation
                </h2>
                <DocumentationGrid 
                  core={documentationLinks.core}
                  guides={documentationLinks.guides}
                  wiki={documentationLinks.wiki}
                />
              </div>
            </section>

            {/* Changelog Section */}
            <section id="changelog" className="scroll-mt-16">
              <ChangelogSection 
                currentVersion={currentVersion}
                versionHistory={versionHistory}
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wiki; 