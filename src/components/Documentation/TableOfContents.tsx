import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

interface TableOfContentsProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
  className?: string;
}

export function TableOfContents({ activeSection, onSectionClick, className }: TableOfContentsProps) {
  const { t } = useTranslation();
  
  const sections = [
    { id: 'introduction', title: t('whitepaper.toc.introduction') },
    { id: 'technology', title: t('whitepaper.toc.technology') },
    { id: 'userflow', title: t('whitepaper.toc.userflow') },
    { id: 'depot', title: t('whitepaper.toc.depot') },
    { id: 'financial', title: t('whitepaper.toc.financial') },
    { id: 'social', title: t('whitepaper.toc.social') },
    { id: 'operations', title: t('whitepaper.toc.operations') },
    { id: 'legal', title: t('whitepaper.toc.legal') },
    { id: 'marketing', title: t('whitepaper.toc.marketing') },
    { id: 'conclusion', title: t('whitepaper.toc.conclusion') }
  ];

  return (
    <nav className={cn("sticky top-20 bg-white/10 backdrop-blur-lg rounded-xl p-6", className)}>
      <h2 className="text-lg font-semibold text-white mb-4">
        {t('whitepaper.toc.title')}
      </h2>
      <ul className="space-y-2">
        {sections.map(section => (
          <li key={section.id}>
            <button
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                activeSection === section.id
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}