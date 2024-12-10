import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Introduction,
  Roadmap,
  Checkpoint,
  TechStack,
  Whitepaper
} from '../components/About/sections';

export function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          {t('about.title')}
        </h1>

        <div className="space-y-24">
          <Introduction />
          <Roadmap />
          <Checkpoint />
          <TechStack />
          <Whitepaper />
        </div>
      </div>
    </div>
  );
} 