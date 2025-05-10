import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType } from './ThemeSelector';

// Default theme colors
const defaultTheme = {
  id: 'default',
  name: 'Matrix',
  colors: {
    background: '#0a192f',
    foreground: '#e6f1ff',
    accent: '#64ffda',
    secondary: '#8b5cf6',
    muted: '#1E1E2A'
  },
  description: 'Terminal-inspired matrix theme'
};

// Create theme context
interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {}
});

// Custom hook for using the theme
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme state with the default theme or a saved theme from localStorage
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  // Update the document CSS variables when the theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-bg', theme.colors.background);
    root.style.setProperty('--color-fg', theme.colors.foreground);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-muted', theme.colors.muted);
    
    // Save theme preference to localStorage
    localStorage.setItem('portfolio-theme', JSON.stringify(theme));
  }, [theme]);

  // Theme context provider
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}