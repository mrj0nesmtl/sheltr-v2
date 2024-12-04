import React from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from '@/components/ui/Accordion';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

export function AboutPage() {
  const { t } = useTranslation();

  const documents = [
    {
      id: 'intro',
      title: t('about.intro.title'),
      content: t('about.intro.content'),
      icon: 'info' as const,
      mdFile: 'SHELTR_INTRO'
    },
    {
      id: 'readme',
      title: t('about.readme.title'),
      content: t('about.readme.content'),
      icon: 'book' as const,
      mdFile: 'README'
    },
    {
      id: 'techstack',
      title: t('about.techstack.title'),
      content: t('about.techstack.content'),
      icon: 'code' as const,
      mdFile: 'TECH_STACK'
    },
    {
      id: 'whitepaper',
      title: t('about.whitepaper.title'),
      content: t('about.whitepaper.content'),
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
                      {doc.content}
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