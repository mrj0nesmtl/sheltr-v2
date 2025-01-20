import { useState } from 'react';
import { Shield, Book, Activity, Clock, Github, FileText, GitBranch } from 'lucide-react';
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
  LineChart,
  PieChart,
  BarChart,
  AreaChart 
} from '@/features/shared/analytics/charts';
import { ChartDataPoint } from '@/features/shared/analytics/types';

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

const MetricsVisualizer = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Network Activity</h3>
      <LineChart 
        data={data.network}
        height={250}
        showGrid={true}
        curved={true}
      />
    </div>
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Resource Allocation</h3>
      <PieChart 
        data={data.allocation}
        height={250}
      />
    </div>
  </div>
);

const Wiki = () => {
  const { data, isLoading, error } = useWikiData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentVersion = {
    number: "0.6.2",
    date: "2025-01-19",
    status: "stable",
    changelog: {
      added: [
        "Role-based navigation system",
        "Path validation framework",
        "Navigation security measures",
        "Component organization by role",
        "Performance monitoring tools"
      ],
      changed: [
        "Enhanced navigation architecture",
        "Improved role validation patterns",
        "Updated path structure",
        "Optimized component mounting"
      ]
    }
  };

  const versionHistory = [
    {
      number: "0.6.1",
      date: "2025-01-18",
      status: "stable" as const,
      changelog: {
        added: ["Navigation state management", "Security monitoring"],
        changed: ["Enhanced documentation", "Refined security measures"],
        fixed: ["Role validation issues", "Path resolution errors"]
      },
      notes: "Major security and navigation improvements"
    },
    {
      number: "0.6.0",
      date: "2025-01-17",
      status: "stable" as const,
      changelog: {
        added: ["i18n framework", "Performance monitoring"],
        changed: ["Navigation mounting", "State management"],
        fixed: ["Component re-render issues", "Bundle loading"]
      },
      notes: "Internationalization and performance update"
    },
    // ... add more version history
  ];

  const sections = [
    { id: 'status', label: 'Platform Status', icon: Shield },
    { id: 'progress', label: 'Sprint Progress', icon: Activity },
    { id: 'metrics', label: 'Metrics', icon: Clock },
    { id: 'docs', label: 'Documentation', icon: FileText },
    { id: 'changelog', label: 'Changelog', icon: GitBranch }
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
        sections={sections}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <WikiSidebar 
          isOpen={sidebarOpen}
          sections={sections}
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

          {/* Content Grid */}
          <div className="space-y-8 mt-8">
            {/* Status Overview */}
            <section id="status" className="scroll-mt-16">
              <PlatformStatusSection 
                systemStatus={data.systemStatus}
                metrics={data.metrics}
              />
            </section>

            {/* Sprint Progress */}
            <section id="progress" className="scroll-mt-16">
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
            <section id="docs" className="scroll-mt-16">
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

            {/* Metrics Visualizer */}
            <section id="metrics-visualizer" className="scroll-mt-16">
              <MetricsVisualizer data={data.metrics} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wiki; 