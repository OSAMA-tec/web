
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light" | "cyberpunk" | "ocean" | "forest" | "sunset" | "midnight" | "neon";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  availableThemes: Theme[];
  getThemeColors: (theme: Theme) => ThemeColors;
};

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  card: string;
  gradient: string;
};

const themeColors: Record<Theme, ThemeColors> = {
  dark: {
    primary: "#0a192f",
    secondary: "#64ffda",
    accent: "#8b5cf6",
    background: "#0a192f",
    foreground: "#e6f1ff",
    muted: "#1E1E2A",
    border: "#64ffda30",
    card: "#1E1E2A",
    gradient: "linear-gradient(135deg, #64ffda, #8b5cf6)"
  },
  light: {
    primary: "#ffffff",
    secondary: "#0066cc",
    accent: "#6366f1",
    background: "#ffffff",
    foreground: "#1a202c",
    muted: "#f7fafc",
    border: "#e2e8f0",
    card: "#ffffff",
    gradient: "linear-gradient(135deg, #0066cc, #6366f1)"
  },
  cyberpunk: {
    primary: "#0d0208",
    secondary: "#ff006e",
    accent: "#00f5ff",
    background: "#0d0208",
    foreground: "#ffffff",
    muted: "#1a0e1a",
    border: "#ff006e50",
    card: "#1a0e1a",
    gradient: "linear-gradient(135deg, #ff006e, #00f5ff)"
  },
  ocean: {
    primary: "#001122",
    secondary: "#00d4ff",
    accent: "#0099cc",
    background: "#001122",
    foreground: "#e6f7ff",
    muted: "#002244",
    border: "#00d4ff30",
    card: "#002244",
    gradient: "linear-gradient(135deg, #00d4ff, #0099cc)"
  },
  forest: {
    primary: "#0f2027",
    secondary: "#2eb398",
    accent: "#a8e6cf",
    background: "#0f2027",
    foreground: "#ffffff",
    muted: "#203a43",
    border: "#2eb39830",
    card: "#203a43",
    gradient: "linear-gradient(135deg, #2eb398, #a8e6cf)"
  },
  sunset: {
    primary: "#2d1b69",
    secondary: "#ff6b6b",
    accent: "#feca57",
    background: "#2d1b69",
    foreground: "#ffffff",
    muted: "#3c2a7a",
    border: "#ff6b6b30",
    card: "#3c2a7a",
    gradient: "linear-gradient(135deg, #ff6b6b, #feca57)"
  },
  midnight: {
    primary: "#000000",
    secondary: "#6c5ce7",
    accent: "#a29bfe",
    background: "#000000",
    foreground: "#ffffff",
    muted: "#1a1a1a",
    border: "#6c5ce730",
    card: "#1a1a1a",
    gradient: "linear-gradient(135deg, #6c5ce7, #a29bfe)"
  },
  neon: {
    primary: "#0a0a0a",
    secondary: "#39ff14",
    accent: "#ff073a",
    background: "#0a0a0a",
    foreground: "#ffffff",
    muted: "#1a1a1a",
    border: "#39ff1430",
    card: "#1a1a1a",
    gradient: "linear-gradient(135deg, #39ff14, #ff073a)"
  }
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  toggleTheme: () => null,
  availableThemes: Object.keys(themeColors) as Theme[],
  getThemeColors: (theme: Theme) => themeColors[theme],
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "portfolio-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes
    Object.keys(themeColors).forEach(themeName => {
      root.classList.remove(themeName);
    });

    // Add current theme class
    root.classList.add(theme);

    // Apply CSS custom properties for the current theme
    const colors = themeColors[theme];
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Also update body background for immediate visual feedback
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.foreground;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const toggleTheme = () => {
    const themes = Object.keys(themeColors) as Theme[];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeColors = (selectedTheme: Theme) => themeColors[selectedTheme];

  const value = {
    theme,
    setTheme,
    toggleTheme,
    availableThemes: Object.keys(themeColors) as Theme[],
    getThemeColors,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
