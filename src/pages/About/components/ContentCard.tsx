import React from 'react';

interface ContentCardProps {
  title: string;
  content: string;
  icon?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({ title, content, icon }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {icon && <div className="text-3xl mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  );
}; 