import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang.startsWith('en') ? 'fr' : 'en-US';
    
    i18n.changeLanguage(newLang).then(() => {
      localStorage.setItem('i18nextLng', newLang);
      window.location.reload();
    }).catch(error => {
      console.error('Failed to switch language:', error);
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md",
        "text-gray-300 hover:text-white hover:bg-gray-700",
        "transition-colors duration-200",
        className
      )}
    >
      <Globe className="h-5 w-5" />
      <span className="text-sm font-medium">
        {i18n.language.startsWith('en') ? 'Français' : 'English'}
      </span>
    </button>
  );
}