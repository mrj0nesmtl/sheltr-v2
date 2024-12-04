import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TableOfContents } from './TableOfContents';
import { cn } from '../../lib/utils';

export function WhitepaperPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('introduction');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

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

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Fixed on Desktop */}
          <div className="hidden lg:block">
            <TableOfContents
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-invert prose-lg max-w-none">
              <h1>{t('whitepaper.title')}</h1>

              <section id="introduction" className="mb-16">
                <h2>{t('whitepaper.sections.introduction.title')}</h2>
                <h3>{t('whitepaper.sections.introduction.vision.title')}</h3>
                <p>{t('whitepaper.sections.introduction.vision.content')}</p>
              </section>

              <section id="technology" className="mb-16">
                <h2>{t('whitepaper.sections.technology.title')}</h2>
                <h3>{t('whitepaper.sections.technology.blockchain.title')}</h3>
                <p>{t('whitepaper.sections.technology.blockchain.content')}</p>
                <ul>
                  <li>{t('whitepaper.sections.technology.blockchain.allocation.direct')}</li>
                  <li>{t('whitepaper.sections.technology.blockchain.allocation.housing')}</li>
                  <li>{t('whitepaper.sections.technology.blockchain.allocation.operations')}</li>
                </ul>
              </section>

              {/* Continue with other sections following the same pattern */}
              {/* Each section should have an id matching the TableOfContents */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}