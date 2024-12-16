import { motion } from 'framer-motion';
import { FileText, Book, Github } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Documentation() {
  const resources = [
    {
      title: 'Technical Whitepaper',
      description: 'Comprehensive overview of SHELTR architecture',
      icon: FileText,
      action: 'Learn More',
      href: '/whitepaper'
    },
    {
      title: 'API Documentation',
      description: 'Integration guides and API references',
      icon: Book,
      action: 'Learn More',
      href: '/docs'
    },
    {
      title: 'GitHub Repository',
      description: 'Open source code and contribution guides',
      icon: Github,
      action: 'Learn More',
      href: 'https://github.com/sheltr'
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
          Documentation & Resources
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <resource.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
              </div>

              <p className="text-gray-300 mb-6">{resource.description}</p>

              <Button asChild>
                <a href={resource.href}>{resource.action}</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
