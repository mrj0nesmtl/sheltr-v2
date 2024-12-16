import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Revolutionizing Charitable Giving
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Empowering change through blockchain transparency, QR code donations,
          and AI-driven insights.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto px-8 py-3 text-base font-medium"
            size="lg"
          >
            Get Started
          </Button>
          <Button 
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full sm:w-auto px-8 py-3 text-base font-medium"
            size="lg"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
