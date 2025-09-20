import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
// Define available themes
export type ThemeType = 'light' | 'dark' | 'system';
interface ThemeContextType {
  theme: ThemeType;
  currentTheme: 'light' | 'dark'; // The actual theme being applied (resolves system)
  setTheme: (theme: ThemeType) => void;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  currentTheme: 'light',
  setTheme: () => {}
});
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Try to get saved theme from localStorage to avoid flash of incorrect theme
  const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') as ThemeType || 'system' : 'light';
  const [theme, setTheme] = useState<ThemeType>(savedTheme);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  // Save theme preference to localStorage
  const handleSetTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  // Detect system theme and update when it changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      if (theme === 'system') {
        setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setCurrentTheme(theme as 'light' | 'dark');
      }
    };
    // Initial theme setup
    updateTheme();
    // Listen for changes in system theme
    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      }
    };
    // Use modern API if available
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, [theme]);
  // Apply the theme to the document
  useEffect(() => {
    // Use requestAnimationFrame for smoother theme transitions
    requestAnimationFrame(() => {
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }, [currentTheme]);
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    currentTheme,
    setTheme: handleSetTheme
  }), [theme, currentTheme]);
  return <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>;
};
// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);