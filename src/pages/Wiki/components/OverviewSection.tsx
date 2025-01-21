import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';

// Initialize mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,  // Important: we'll manually initialize
  theme: 'dark',
  securityLevel: 'loose',
  darkMode: true,
  htmlLabels: true,
  themeVariables: {
    fontFamily: 'inter',
    primaryColor: '#4f46e5',
    primaryTextColor: '#fff',
    primaryBorderColor: '#6366f1',
    lineColor: '#6366f1',
    secondaryColor: '#3730a3',
    tertiaryColor: '#312e81'
  }
});

interface OverviewSectionProps {
  content: string;
}

const TechStackDisplay = ({ content }) => {
  const stack = {
    frontend: {
      framework: 'React 18',
      language: 'TypeScript 5.0',
      state: 'Zustand',
      styling: 'Tailwind CSS',
      ui: 'Shadcn/ui'
    },
    backend: {
      database: 'Supabase',
      api: 'REST + WebSocket',
      blockchain: 'Polygon',
      analytics: 'Custom + Recharts'
    },
    infrastructure: {
      hosting: 'Vercel',
      ci_cd: 'GitHub Actions',
      monitoring: 'Sentry'
    }
  };

  return (
    <div className="space-y-6 bg-gray-800/50 rounded-lg p-6">
      {Object.entries(stack).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-200 capitalize">{category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(items).map(([key, value]) => (
              <div key={key} className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 capitalize">{key}</div>
                <div className="text-white font-medium">{value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const OverviewSection = ({ content }: OverviewSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const initializeMermaid = useCallback(async () => {
    try {
      // Reset any existing diagrams
      document.querySelectorAll('.mermaid').forEach(node => {
        node.removeAttribute('data-processed');
      });
      // Initialize all mermaid diagrams
      await mermaid.run();
    } catch (error) {
      console.error('Mermaid initialization failed:', error);
    }
  }, []);

  useEffect(() => {
    if (isExpanded) {
      // Add a small delay to ensure content is rendered
      setTimeout(initializeMermaid, 100);
    }
  }, [isExpanded, initializeMermaid]);

  return (
    <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-bold text-white">Platform Overview</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>

      <div className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        isExpanded 
          ? "visible opacity-100 h-auto" 
          : "invisible opacity-0 h-0"
      )}>
        <div className="prose prose-invert max-w-none mt-4">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    {children}
                  </table>
                </div>
              ),
              code: ({node, inline, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                if (!inline && match?.[1] === 'mermaid') {
                  return (
                    <div className="mermaid bg-gray-900/50 p-4 rounded-lg my-4">
                      {String(children).replace(/\\n/g, '\n')}
                    </div>
                  );
                }
                // Special case for tech stack
                if (!inline && match?.[1] === 'typescript' && 
                    String(children).includes('interface TechStack')) {
                  return <TechStackDisplay content={String(children)} />;
                }
                return <code className={className} {...props}>{children}</code>;
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}; 