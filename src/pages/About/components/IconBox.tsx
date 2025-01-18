import React from 'react';

interface IconBoxProps {
  icon: string;
  label: string;
  className?: string;
}

export const IconBox: React.FC<IconBoxProps> = ({ icon, label, className = '' }) => {
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}; 