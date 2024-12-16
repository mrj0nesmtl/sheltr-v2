import { motion } from 'framer-motion';
import { Shield, QrCode, Brain } from 'lucide-react';
import { FeatureCard } from '@/components/ui/FeatureCard';

export function Overview() {
  const features = [
    {
      title: 'Blockchain Transparency',
      description: 'Track every donation with complete transparency.',
      icon: Shield,
      color: 'indigo'
    },
    {
      title: 'QR Code Integration',
      description: 'Seamless donation process through QR codes.',
      icon: QrCode,
      color: 'purple'
    },
    {
      title: 'AI-Powered Insights',
      description: 'Smart allocation of resources using AI.',
      icon: Brain,
      color: 'blue'
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
          How SHELTR Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              {...feature}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
