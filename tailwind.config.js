/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-primary': 'var(--accent-primary)',
        'christmas-red': 'var(--christmas-red)',
        'christmas-green': 'var(--christmas-green)',
        'christmas-gold': 'var(--christmas-gold)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};