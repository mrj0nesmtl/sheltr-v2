import { PageLayout } from '@/layouts';
import { useMarkdownContent } from '@/hooks/useMarkdownContent';
import { MarkdownContent } from '@/components/About/MarkdownContent';
import {
  Hero,
  Technology,
  MediaSection,
  Newsletter
} from './sections';
import { PageBackground } from '@/components/ui/PageBackground';

export default function About() {
  const { content, isLoading, error } = useMarkdownContent('/src/pages/About/content/sheltr_intro_eng.md');

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">Loading...</div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="text-center text-red-500 p-8">
          Error loading content: {error}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <PageBackground
          imagePath="/images/backgrounds/about-bg.jpg"
          alt="About SHELTR Background"
          opacity={30}
          overlay={true}
          fadeHeight="75vh"
        />

        <Hero />

        <div className="container mx-auto px-4 space-y-24 relative z-10">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <MarkdownContent content={content} />
          </div>

          <Technology />
          <MediaSection />
          <Metrics />
          <Newsletter />
        </div>
      </div>
    </PageLayout>
  );
} 