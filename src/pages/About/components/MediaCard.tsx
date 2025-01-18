import React from 'react';

interface MediaCardProps {
  type: 'podcast' | 'blog';
  title: string;
  platform: string;
  url: string;
  icon: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({ type, title, platform, url, icon }) => {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer" 
      className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <div className="text-sm uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {platform}
          </div>
          <h3 className="text-xl font-semibold mt-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {type === 'podcast' ? 'Listen to Episode' : 'Read Article'} →
          </p>
        </div>
      </div>
    </a>
  );
}; 