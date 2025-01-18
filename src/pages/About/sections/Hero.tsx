import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          About SHELTR
        </h1>
        <p className="text-xl md:text-2xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Hacking Homelessness with technology and transparency
        </p>
        {/* Decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
};
