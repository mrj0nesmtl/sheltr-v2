import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Icon } from './Icon';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' }
] as const;

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="text-gray-400 hover:text-white flex items-center p-1 rounded-md hover:bg-gray-800">
        <Icon name="globe" className="h-5 w-5" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 bottom-full mb-2 w-40 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange(language.code)}
                    className={`
                      ${active ? 'bg-gray-700' : ''}
                      ${language.code === currentLanguage.code ? 'text-green-500' : 'text-gray-300'}
                      group flex w-full items-center px-4 py-2 text-sm
                    `}
                  >
                    <span className="mr-2">{language.flag}</span>
                    <span>{language.label}</span>
                    {language.code === currentLanguage.code && (
                      <Icon name="check" className="ml-auto h-4 w-4" />
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 