import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative py-24 flex items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Revolutionizing Charitable Giving
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Empowering change through blockchain transparency, QR code donations, and AI-driven insights.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            variant="default" 
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-gray-600 hover:bg-gray-800"
          >
            Learn More
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
