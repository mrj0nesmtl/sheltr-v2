import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from '@/components/ui/Accordion';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function AboutPage() {
  const { t, i18n } = useTranslation();
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadMarkdownFiles = async () => {
      const files = {
        'SHELTR_INTRO': i18n.language === 'fr' 
          ? '/docs/shelter_inro_fr.md'
          : '/docs/sheltr_intro_eng.md',
        'README': '/docs/README.md',
        'TECH_STACK': '/docs/TECH_STACK.md',
        'WHITE_PAPER': i18n.language === 'fr'
          ? '/docs/whitepaper_fr.md'
          : '/docs/whitepaper_eng.md'
      };

      const content: Record<string, string> = {};
      
      for (const [key, path] of Object.entries(files)) {
        try {
          const response = await fetch(path);
          content[key] = await response.text();
        } catch (error) {
          console.error(`Error loading ${key}:`, error);
          content[key] = 'Error loading content';
        }
      }

      setMarkdownContent(content);
    };

    loadMarkdownFiles();
  }, [i18n.language]);

  const documents = [
    {
      id: 'intro',
      title: t('about.intro.title'),
      content: markdownContent['SHELTR_INTRO'] || t('about.intro.content'),
      icon: 'info' as const,
      mdFile: 'SHELTR_INTRO'
    },
    {
      id: 'readme',
      title: t('about.readme.title'),
      content: markdownContent['README'] || t('about.readme.content'),
      icon: 'book' as const,
      mdFile: 'README'
    },
    {
      id: 'techstack',
      title: t('about.techstack.title'),
      content: markdownContent['TECH_STACK'] || t('about.techstack.content'),
      icon: 'code' as const,
      mdFile: 'TECH_STACK'
    },
    {
      id: 'whitepaper',
      title: t('about.whitepaper.title'),
      content: markdownContent['WHITE_PAPER'] || t('about.whitepaper.content'),
      icon: 'fileText' as const,
      mdFile: 'WHITE_PAPER'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          {t('about.title')}
        </h1>
        
        <div className="grid grid-cols-1 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="bg-gray-800 border-gray-700">
              <Accordion 
                type="single" 
                collapsible 
                className="w-full"
              >
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
  );
} 