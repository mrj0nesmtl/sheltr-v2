import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all ${
        theme === 'light' 
          ? 'bg-gray-100 hover:bg-gray-200' 
          : 'bg-gray-800 hover:bg-gray-700'
      }`}
      aria-label="Toggle theme"
    >
      <Icon
        name={theme === 'light' ? 'moon' : 'sun'}
        className={`w-5 h-5 transition-colors ${
          theme === 'light' 
            ? 'text-gray-600' 
            : 'text-yellow-400'
        }`}
      />
    </button>
  );
} 