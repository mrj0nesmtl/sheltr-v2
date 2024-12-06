import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          {t('about.title')}
        </h1>

        {/* Introduction Accordion */}
        <div className="mb-4">
          <button className="flex items-center w-full p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-white">
            <Icon name="info" className="mr-2 text-gray-400" />
            <span>Introduction to SHELTR</span>
            <Icon name="chevronDown" className="ml-auto text-gray-400" />
          </button>
        </div>

        {/* Technology Stack Accordion */}
        <div className="mb-4">
          <button className="flex items-center w-full p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-white">
            <Icon name="code" className="mr-2 text-gray-400" />
            <span>Technology Stack</span>
            <Icon name="chevronDown" className="ml-auto text-gray-400" />
          </button>
        </div>

        {/* White Paper Accordion */}
        <div className="mb-4">
          <button className="flex items-center w-full p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-white">
            <Icon name="fileText" className="mr-2 text-gray-400" />
            <span>White Paper</span>
            <Icon name="chevronDown" className="ml-auto text-gray-400" />
          </button>
          <div className="p-4 bg-gray-800/30 rounded-lg mt-2 text-white">
            <h2 className="text-2xl font-bold mb-4">SHELTR V2: Technical White Paper</h2>
            
            <h3 className="text-xl mb-4">Table of Contents</h3>
            <ul className="space-y-2 mb-6 text-gray-300">
              <li>Overview</li>
              <li>Vision and Mission</li>
              <li>Core Features
                <ul className="ml-4 mt-2 space-y-2">
                  <li>QR Scan and Give</li>
                  <li>Blockchain Transparency & Public Ledger</li>
                  <li>Multi-Auth User Roles</li>
                  <li>Homeless Depot: Shopify Integration</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 