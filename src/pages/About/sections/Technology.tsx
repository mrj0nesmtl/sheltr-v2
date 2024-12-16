import { motion } from 'framer-motion';
import { Database, Code, Blocks } from 'lucide-react';
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
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technology Stack
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techStack.map((tech, index) => (
            <TechCard 
              key={tech.title}
              {...tech}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
