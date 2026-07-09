import { useEffect } from 'react';

export type Theme = 'dark';

export const useTheme = () => {
  const theme: Theme = 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Theme toggling is disabled as lightmode has been removed.
  };

  return { theme, toggleTheme };
};
