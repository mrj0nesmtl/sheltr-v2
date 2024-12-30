import { motion } from 'framer-motion';
import { Blocks, Code, Database } from 'lucide-react';
import { TechCard } from '../components/TechCard';

export function Technology() {
  const techStack = [
    {
      title: 'Frontend',
      description: 'React 18, TypeScript, Tailwind CSS',
      icon: Code,
      items: ['React 18', 'TypeScript', 'Tailwind CSS']
    },
    {
      title: 'Backend',
      description: 'Node.js, Supabase, PostgreSQL',
      icon: Database,
      items: ['Node.js', 'Supabase', 'PostgreSQL']
    },
    {
      title: 'Blockchain',
      description: 'Polygon, Smart Contracts, Web3',
      icon: Blocks,
      items: ['Polygon', 'Smart Contracts', 'Web3.js']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {techStack.map((tech, index) => (
        <TechCard 
          key={tech.title}
          {...tech}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
}
