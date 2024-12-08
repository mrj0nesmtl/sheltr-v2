import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

function AccordionItem({ title, icon, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-white transition-colors"
      >
        <Icon name={icon} className="mr-2 text-gray-400" />
        <span>{title}</span>
        <Icon 
          name="chevron-down" 
          className={cn(
            "ml-auto text-gray-400 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>
      
      {isOpen && (
        <div className="p-4 bg-gray-800/30 rounded-lg mt-2 text-white animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
}

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          {t('about.title')}
        </h1>

        <AccordionItem title={t('about.intro.title')} icon="info">
          <div className="prose prose-invert">
            <p>{t('about.intro.content')}</p>
            <ul>
              <li>{t('about.intro.features.blockchain')}</li>
              <li>{t('about.intro.features.ai')}</li>
              <li>{t('about.intro.features.qr')}</li>
            </ul>
          </div>
        </AccordionItem>

        <AccordionItem title={t('about.tech.title')} icon="code">
          <div className="prose prose-invert">
            <h3>{t('about.tech.stack.title')}</h3>
            <ul>
              <li>React 18 + TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Supabase</li>
              <li>Blockchain Integration</li>
            </ul>
          </div>
        </AccordionItem>

        <AccordionItem title={t('about.team.title')} icon="users">
          <div className="prose prose-invert">
            <p>{t('about.team.content')}</p>
          </div>
        </AccordionItem>
      </div>
    </div>
  );
} 