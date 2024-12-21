import { PageLayout } from '@/layouts';
import { MetricCard, TechCard } from './components';
import { 
  BuildProgress,
  Contact,
  Documentation,
  Hero,
  Metrics,
  Overview,
  Technology
} from './sections';

export default function About() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <Overview />
        <Metrics />
        <Technology />
        <BuildProgress />
        <Documentation />
        <Contact />
      </div>
    </PageLayout>
  );
} 