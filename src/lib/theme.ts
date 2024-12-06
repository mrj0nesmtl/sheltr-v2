export const applyTheme = (theme: 'light' | 'dark' | 'christmas') => {
  // Apply to html element
  document.documentElement.setAttribute('data-theme', theme);
  
  // Apply to body
  document.body.classList.remove('light-theme', 'dark-theme', 'christmas-theme');
  document.body.classList.add(`${theme}-theme`);
  
  // Store theme
  localStorage.setItem('theme', theme);
};

export const getStoredTheme = () => {
  return localStorage.getItem('theme') as 'light' | 'dark' | 'christmas' || 'dark';
}; 