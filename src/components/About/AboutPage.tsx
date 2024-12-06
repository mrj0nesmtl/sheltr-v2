import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from '@/components/ui/Accordion';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageMeta } from '@/components/Meta/PageMeta';

// Import markdown files
import introEng from '../../../docs/sheltr_intro_eng.md?raw';
import introFr from '../../../docs/shelter_inro_fr.md?raw';
import techStack from '../../../docs/tech_stack.md?raw';
import whitepaperEng from '../../../docs/whitepaper_eng.md?raw';
import whitepaperFr from '../../../docs/whitepaper_fr.md?raw';

export function AboutPage() {
  const { t, i18n } = useTranslation();
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Load markdown content based on language
      const content = {
        'SHELTR_INTRO': i18n.language === 'fr' ? introFr : introEng,
        'TECH_STACK': techStack,
        'WHITE_PAPER': i18n.language === 'fr' ? whitepaperFr : whitepaperEng
      };

      setMarkdownContent(content);
    } catch (error) {
      console.error('Error loading markdown content:', error);
    } finally {
      setIsLoading(false);
    }
  }, [i18n.language]);

  const documents = [
    {
      id: 'intro',
      title: t('about.intro.title'),
      content: markdownContent['SHELTR_INTRO'] || t('about.intro.content'),
      icon: 'info' as const
    },
    {
      id: 'techstack',
      title: t('about.techstack.title'),
      content: markdownContent['TECH_STACK'] || t('about.techstack.content'),
      icon: 'code' as const
    },
    {
      id: 'whitepaper',
      title: t('about.whitepaper.title'),
      content: markdownContent['WHITE_PAPER'] || t('about.whitepaper.content'),
      icon: 'fileText' as const
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 flex items-center justify-center">
        <Icon name="loader" className="h-8 w-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <PageMeta 
        title={t('about.title')}
        description={t('about.intro.content')}
      />
      
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">
            {t('about.title')}
          </h1>
          
          <div className="grid grid-cols-1 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="bg-gray-800 border-gray-700">
                <Accordion type="single" collapsible className="w-full">
                  <Accordion.Item value={doc.id}>
                    <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left">
                      <div className="flex items-center space-x-3">
                        <Icon name={doc.icon} className="h-5 w-5 text-indigo-400" />
                        <span className="text-lg font-medium text-white">
                          {doc.title}
                        </span>
                      </div>
                      <Icon name="chevronDown" className="h-5 w-5 text-gray-400 transform transition-transform" />
                    </Accordion.Trigger>
                    <Accordion.Content className="p-4 text-gray-300">
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {doc.content}
                        </ReactMarkdown>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 