export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    console.log('Language switched to:', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-gray-400 hover:text-white transition-colors"
    >
      {i18n.language === 'en' ? 'Français' : 'English'}
    </button>
  );
} 