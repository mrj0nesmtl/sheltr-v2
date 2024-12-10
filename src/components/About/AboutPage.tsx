import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { Link } from 'react-router-dom';

// Individual section components
import { Introduction } from './sections/Introduction';
import { Roadmap } from './sections/Roadmap';
import { Checkpoint } from './sections/Checkpoint';
import { TechStack } from './sections/TechStack';
import { Whitepaper } from './sections/Whitepaper';

interface NavBubbleProps {
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function NavBubble({ href, isActive, onClick, children }: NavBubbleProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`
        px-4 py-2 rounded-full transition-all duration-300
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg scale-105' 
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }
      `}
    >
      {children}
    </a>
  );
}

export function AboutPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = React.useState('introduction');
  const sectionRefs = {
    introduction: useRef<HTMLElement>(null),
    roadmap: useRef<HTMLElement>(null),
    checkpoint: useRef<HTMLElement>(null),
    techstack: useRef<HTMLElement>(null),
    whitepaper: useRef<HTMLElement>(null),
  };

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach(
      (ref) => ref.current && observer.observe(ref.current)
    );

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            {t('about.subtitle')}
          </p>

          {/* Navigation Bubbles */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <NavBubble
              href="#introduction"
              isActive={activeSection === 'introduction'}
              onClick={() => scrollToSection('introduction')}
            >
              {t('about.intro.title')}
            </NavBubble>
            <NavBubble
              href="#roadmap"
              isActive={activeSection === 'roadmap'}
              onClick={() => scrollToSection('roadmap')}
            >
              {t('about.roadmap.title')}
            </NavBubble>
            <NavBubble
              href="#checkpoint"
              isActive={activeSection === 'checkpoint'}
              onClick={() => scrollToSection('checkpoint')}
            >
              {t('about.checkpoint.title')}
            </NavBubble>
            <NavBubble
              href="#techstack"
              isActive={activeSection === 'techstack'}
              onClick={() => scrollToSection('techstack')}
            >
              {t('about.techStack.title')}
            </NavBubble>
            <NavBubble
              href="#whitepaper"
              isActive={activeSection === 'whitepaper'}
              onClick={() => scrollToSection('whitepaper')}
            >
              {t('about.whitepaper.title')}
            </NavBubble>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-24 mb-12">
          <section id="introduction" ref={sectionRefs.introduction} className="scroll-mt-32">
            <Introduction />
          </section>

          <section id="roadmap" ref={sectionRefs.roadmap} className="scroll-mt-32">
            <Roadmap />
          </section>

          <section id="checkpoint" ref={sectionRefs.checkpoint} className="scroll-mt-32">
            <Checkpoint />
          </section>

          <section id="tech-stack" ref={sectionRefs.techstack} className="scroll-mt-32">
            <TechStack />
          </section>

          <section id="whitepaper" ref={sectionRefs.whitepaper} className="scroll-mt-32">
            <Whitepaper />
          </section>
        </div>

        {/* Know It All Button - Centered */}
        <div className="flex justify-center mt-16">
          <Link 
            to="/docs" 
            className="inline-flex items-center px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
          >
            <Icon name="book" className="h-5 w-5 mr-2" />
            <span className="font-medium">Know It All</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 