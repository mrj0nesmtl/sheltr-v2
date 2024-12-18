import React, { useEffect, useState } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface WhitepaperSection {
  id: string;
  title: string;
  content: string;
  icon: IconName;
}

interface TableOfContents {
  sections: Array<{
    id: string;
    title: string;
    subsections?: Array<{ id: string; title: string }>;
  }>;
}

const sections: WhitepaperSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: '# Introduction\n\nSHELTR is revolutionizing charitable giving...',
    icon: 'user'
  },
  {
    id: 'technology',
    title: 'Technology Stack',
    content: '# Technology\n\nOur blockchain implementation...',
    icon: 'menu'
  },
  {
    id: 'tokenomics',
    title: 'Tokenomics',
    content: '# Tokenomics\n\nThe SHELTR token economy...',
    icon: 'x'
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    content: '# Project Roadmap\n\nOur development timeline...',
    icon: 'search'
  }
];

export function WhitepaperPage() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadWhitepaper = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/docs/whitepaper_${i18n.language === 'fr' ? 'fr' : 'eng'}.md`
        );
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading whitepaper:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWhitepaper();
  }, [i18n.language]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', `#${sectionId}`);
  };

  const downloadWhitepaper = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/docs/whitepaper_${i18n.language === 'fr' ? 'fr' : 'eng'}.pdf`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SHELTR_Whitepaper_${i18n.language.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="loader" className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {t('whitepaper.title')}
          </h1>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            {t('whitepaper.description')}
          </p>
          <Button
            onClick={downloadWhitepaper}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Icon 
              name="search" 
              className={`mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} 
            />
            {t('whitepaper.download')}
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <motion.li
                    key={section.id}
                    whileHover={{ x: 4 }}
                    className={`cursor-pointer rounded-lg ${
                      activeSection === section.id
                        ? 'bg-indigo-600'
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className="w-full px-4 py-3 flex items-center gap-3"
                    >
                      <Icon name={section.icon} className="h-5 w-5" />
                      <span>{t(`whitepaper.sections.${section.id}.title`)}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="fixed bottom-4 right-4">
          <Button
            variant="ghost"
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
            className="flex items-center space-x-2"
          >
            <Icon name="search" className="w-5 h-5" />
            <span>{i18n.language === 'en' ? 'Français' : 'English'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WhitepaperPage; 