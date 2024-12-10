import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language.split('-')[0];
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    
    i18n.changeLanguage(newLang).then(() => {
      localStorage.setItem('i18nextLng', newLang);
    }).catch(error => {
      console.error('Failed to switch language:', error);
    });
  };

  const getDisplayLanguage = () => {
    const currentLang = i18n.language.split('-')[0];
    return currentLang === 'fr' ? 'English' : 'Français';
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "px-3 py-2 rounded-md",
        "text-gray-300 hover:text-white hover:bg-gray-700",
        "text-sm font-medium",
        "transition-colors duration-200",
        className
      )}
      aria-label={`Switch to ${getDisplayLanguage()}`}
      title={`Switch to ${getDisplayLanguage()}`}
    >
      {getDisplayLanguage()}
    </button>
  );
}