import { PageLayout } from '@/layouts';
import { Hero, Introduction, WhySection, MediaSection, Newsletter } from './sections';

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Hero />
        <Introduction />
        <WhySection />
        <MediaSection />
        <Newsletter />
      </div>
    </PageLayout>
  );
} 