import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

interface TechItem {
  name: string;
  description: string;
  icon: string;
}

export function TechStack() {
  const { t } = useTranslation();

  const techItems: TechItem[] = [
    {
      name: 'Frontend',
      description: 'React 18, TypeScript, Tailwind CSS',
      icon: 'layout'
    },
    {
      name: 'Backend',
      description: 'Node.js, Supabase, PostgreSQL',
      icon: 'database'
    },
    {
      name: 'Blockchain',
      description: 'Polygon, Smart Contracts, Web3',
      icon: 'blocks'
    },
    {
      name: 'Authentication',
      description: 'Multi-factor, Role-based Access',
      icon: 'shield'
    },
    {
      name: 'Mobile',
      description: 'PWA, QR Scanner Integration',
      icon: 'smartphone'
    },
    {
      name: 'DevOps',
      description: 'GitHub Actions, Docker, Vercel',
      icon: 'git-merge'
    }
  ];

  return (
    <div className="bg-gray-800/50 rounded-xl p-8">
      <div className="flex items-center mb-6">
        <Icon name="code-2" className="h-8 w-8 text-indigo-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">
          {t('about.techStack.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techItems.map((item) => (
          <div 
            key={item.name}
            className="bg-gray-700/50 p-6 rounded-lg hover:bg-gray-700/70 transition-colors"
          >
            <div className="flex items-center mb-4">
              <Icon name={item.icon} className="h-6 w-6 text-indigo-400 mr-2" />
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            </div>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 