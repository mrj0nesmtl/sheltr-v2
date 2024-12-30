import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';
import { TechCard } from '../components/TechCard';

export function BuildProgress() {
  const buildDocs = [
    {
      title: 'Technical Architecture',
      description: 'Our tech stack and implementation details',
      icon: GitBranch,
      items: [
        'Dashboard Architecture',
        'RBAC Implementation',
        'Blockchain Integration'
      ],
      link: '/docs/project/dashboard_arch.md'
    },
    {
      title: 'Development Progress',
      description: 'Track our build journey and milestones',
      icon: GitCommit,
      items: [
        'Changelog',
        'Sprint Progress',
        'Implementation Status'
      ],
      link: '/docs/project/changelog.md'
    },
    {
      title: 'Roadmap & Planning',
      description: 'Future plans and development goals',
      icon: GitPullRequest,
      items: [
        'Technical Roadmap',
        'Feature Pipeline',
        'Milestone Tracking'
      ],
      link: '/docs/project/roadmap.md'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {buildDocs.map((doc, index) => (
        <TechCard 
          key={doc.title}
          {...doc}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
}

export default BuildProgress; 