import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { LanguageToggle } from '../ui/LanguageToggle';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`fixed inset-0 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <Logo className="h-8 w-auto" />
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-6">
          <div className="space-y-4">
            <Link
              to="/how-it-works"
              className="block text-lg text-gray-300 hover:text-white"
              onClick={onClose}
            >
              {t('nav.solutions_menu.howItWorks')}
            </Link>
            <Link
              to="/solutions"
              className="block text-lg text-gray-300 hover:text-white"
              onClick={onClose}
            >
              {t('nav.solutions_menu.solutions')}
            </Link>
            <Link
              to="/scan-donate"
              className="block text-lg text-gray-300 hover:text-white"
              onClick={onClose}
            >
              {t('nav.scanDonate')}
            </Link>
            <Link
              to="/impact"
              className="block text-lg text-gray-300 hover:text-white"
              onClick={onClose}
            >
              {t('nav.solutions_menu.impact')}
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-800">
            <LanguageToggle className="mb-4" />
            <div className="space-y-4">
              <Link
                to="/login"
                className="block text-center w-full py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={onClose}
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/signup"
                className="block text-center w-full py-2 px-4 border border-gray-600 rounded-md text-gray-300 hover:text-white hover:border-gray-500"
                onClick={onClose}
              >
                {t('nav.signUp')}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
} 