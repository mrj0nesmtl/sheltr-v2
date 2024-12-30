import { PageLayout } from '@/layouts';
import { Hero, Introduction } from './sections';
import { Link } from 'react-router-dom';

// Use direct path since image is in public folder
const homelessPersonBench = '/images/homeless-person-bench.jpg';

export default function About() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 space-y-24">
        {/* Hero with gradient overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900 to-gray-900/0 pointer-events-none" />
          <Hero />
        </div>

        {/* Mission & Vision */}
        <Introduction />

        {/* How It Works CTA with background image - Updated to point to Wiki */}
        <section className="relative my-16 rounded-2xl overflow-hidden min-h-[300px]">
          {/* Background image with overlay */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={homelessPersonBench} 
              alt="Background" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/80 backdrop-blur-[2px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Want to know how it all works?
            </h2>
            <Link 
              to="/wiki"
              className="inline-flex items-center gap-2 px-8 py-4 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                hover:from-indigo-500 hover:to-purple-500
                text-white font-semibold rounded-lg
                transform transition-all duration-300
                hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              <span>View Our Development Progress</span>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Link>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Learn about our blockchain transparency, QR code donations, and AI-driven insights
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
} 