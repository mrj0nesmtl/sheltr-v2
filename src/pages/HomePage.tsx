import { Hero } from '@/components/Hero';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        {/* Optional: Add subtle animated background patterns */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/50 -z-10" />
        
        <Hero />
      </div>
    </div>
  );
} 