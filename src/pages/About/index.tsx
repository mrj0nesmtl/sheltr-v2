import { PageLayout } from '@/components/layouts';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
    Contact,
    Documentation,
    Hero,
    Metrics,
    Overview,
    Technology
} from './sections';

export function About() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <PageLayout>
      {/* Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Hero />
        <Overview />
        <Metrics />
        <Technology />
        <Documentation />
        <Contact />
      </div>
    </PageLayout>
  );
}

export default About; 