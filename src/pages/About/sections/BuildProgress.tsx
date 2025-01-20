import { GitBranch, GitCommit, GitPullRequest, Shield, Navigation } from 'lucide-react';
import { TechCard } from '../components/TechCard';

export function BuildProgress() {
  const buildDocs = [
    {
      title: 'Technical Architecture',
      description: 'Core systems and security implementation',
      icon: GitBranch,
      items: [
        'Role-based Navigation',
        'Path Validation',
        'Security Monitoring'
      ],
      link: '/docs/project/architecture.md'
    },
    {
      title: 'Security Framework',
      description: 'Advanced security and access control',
      icon: Shield,
      items: [
        'Role Management',
        'Path Security',
        'Access Validation'
      ],
      link: '/docs/project/security.md'
    },
    {
      title: 'Navigation System',
      description: 'Optimized routing and validation',
      icon: Navigation,
      items: [
        'Role Resolution',
        'Path Checking',
        'Performance Metrics'
      ],
      link: '/docs/project/navigation.md'
    },
    {
      title: 'Development Progress',
      description: 'Current sprint achievements',
      icon: GitCommit,
      items: [
        'Security Implementation',
        'Navigation Optimization',
        'Performance Monitoring'
      ],
      link: '/docs/project/progress.md'
    },
    {
      title: 'Roadmap & Planning',
      description: 'Upcoming features and milestones',
      icon: GitPullRequest,
      items: [
        'Component Organization',
        'Analytics Integration',
        'Performance Enhancement'
      ],
      link: '/docs/project/roadmap.md'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {buildDocs.map((doc, index) => (
        <TechCard 
          key={doc.title}
          {...doc}
          delay={index * 0.15}
        />
      ))}
    </div>
  );
}

export default BuildProgress; 