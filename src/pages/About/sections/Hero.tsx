import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/50" />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/images/backgrounds/about-bg.jpg)',
          filter: 'brightness(0.8)'
        }} 
      />

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About SHELTR
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Give Without Take
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
