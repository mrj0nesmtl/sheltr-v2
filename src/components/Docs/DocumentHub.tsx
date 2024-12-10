import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';

interface DocSection {
  title: string;
  icon: IconName;
  docs: {
    title: string;
    description: string;
    path: string;
    language?: 'en' | 'fr';
  }[];
}

const documents: DocSection[] = [
  {
    title: "Technical Documentation",
    icon: "code",
    docs: [
      {
        title: "Technical White Paper",
        description: "Detailed technical overview of SHELTR's architecture and features",
        path: "/docs/whitepaper",
        language: "en"
      },
      {
        title: "Livre Blanc Technique",
        description: "Aperçu technique détaillé de l'architecture et des fonctionnalités de SHELTR",
        path: "/docs/whitepaper-fr",
        language: "fr"
      },
      {
        title: "Tech Stack",
        description: "Overview of technologies used in SHELTR",
        path: "/docs/tech-stack"
      }
    ]
  },
  {
    title: "Project Overview",
    icon: "book",
    docs: [
      {
        title: "SHELTR Introduction",
        description: "Introduction to SHELTR and its mission",
        path: "/docs/intro",
        language: "en"
      },
      {
        title: "Introduction SHELTR",
        description: "Introduction à SHELTR et sa mission",
        path: "/docs/intro-fr",
        language: "fr"
      }
    ]
  },
  {
    title: "Status & Roadmap",
    icon: "chart-bar",
    docs: [
      {
        title: "Status Report",
        description: "Current project status and metrics",
        path: "/docs/status"
      },
      {
        title: "Roadmap",
        description: "Future development plans and milestones",
        path: "/docs/roadmap"
      }
    ]
  }
];

export function DocumentHub() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            SHELTR Documentation Hub
          </h1>
          <p className="text-gray-400">
            Comprehensive documentation and resources for the SHELTR platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((section) => (
            <div key={section.title} className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Icon name={section.icon} className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.docs.map((doc) => (
                  <Link
                    key={doc.path}
                    to={doc.path}
                    className="block p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">
                        {doc.title}
                      </h3>
                      {doc.language && (
                        <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">
                          {doc.language.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">
                      {doc.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 