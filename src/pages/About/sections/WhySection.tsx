import { motion } from 'framer-motion';

export function WhySection() {
  const features = [
    {
      title: "No Cost to Shelters",
      description: "SHELTR is entirely funded by Arcana Concept's Lab-Studio-Fund model."
    },
    {
      title: "Not-For-Profit Mission",
      description: "Designed to empower without adding financial burdens."
    },
    {
      title: "Transparent Operations",
      description: "Every process, from blockchain integration to material fulfillment, is publicly accountable."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Why SHELTR is Different
        </h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 