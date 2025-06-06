import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from "react";

export type Theme = "dark" | "light" | "cyberpunk" | "ocean" | "forest" | "sunset" | "midnight" | "neon";

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  availableThemes: Theme[];
  getThemeColors: (theme: Theme) => ThemeColors;
  isTransitioning: boolean;
};

export type ThemeColors = {
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
    primary: "#0a0a0a",
    secondary: "#00f5ff",
    accent: "#ff3366",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)",
    foreground: "#ffffff",
    muted: "rgba(26, 26, 46, 0.85)",
    border: "rgba(0, 245, 255, 0.4)",
    card: "rgba(26, 26, 46, 0.95)",
    gradient: "linear-gradient(135deg, #00f5ff 0%, #ff3366 30%, #4ecdc4 70%, #45b7d1 100%)"
  },
  light: {
    primary: "#ffffff",
    secondary: "#6366f1",
    accent: "#ec4899",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 20%, #e0e7ff 60%, #f1f5f9 100%)",
    foreground: "#1e293b",
    muted: "rgba(248, 250, 252, 0.95)",
    border: "rgba(99, 102, 241, 0.25)",
    card: "rgba(255, 255, 255, 0.98)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #ec4899 70%, #f59e0b 100%)"
  },
  cyberpunk: {
    primary: "#0a0a0a",
    secondary: "#ff0099",
    accent: "#00ffcc",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 25%, #0a1a1a 50%, #1a0a2e 75%, #0a0a1a 100%)",
    foreground: "#ffffff",
    muted: "rgba(26, 10, 26, 0.9)",
    border: "rgba(255, 0, 153, 0.5)",
    card: "rgba(26, 10, 26, 0.95)",
    gradient: "linear-gradient(135deg, #ff0099 0%, #00ffcc 25%, #9900ff 50%, #ff3300 75%, #00ff99 100%)"
  },
  ocean: {
    primary: "#0a1929",
    secondary: "#0ea5e9",
    accent: "#06b6d4",
    background: "linear-gradient(135deg, #0a1929 0%, #0f2027 50%, #203a43 100%)",
    foreground: "#e0f7fa",
    muted: "rgba(15, 32, 39, 0.8)",
    border: "rgba(14, 165, 233, 0.3)",
    card: "rgba(15, 32, 39, 0.9)",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0891b2 100%)"
  },
  forest: {
    primary: "#0f2027",
    secondary: "#10b981",
    accent: "#34d399",
    background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5530 100%)",
    foreground: "#ecfdf5",
    muted: "rgba(32, 58, 67, 0.8)",
    border: "rgba(16, 185, 129, 0.3)",
    card: "rgba(32, 58, 67, 0.9)",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #059669 100%)"
  },
  sunset: {
    primary: "#1e1b4b",
    secondary: "#f97316",
    accent: "#fbbf24",
    background: "linear-gradient(135deg, #1e1b4b 0%, #7c2d12 50%, #ea580c 100%)",
    foreground: "#fef3c7",
    muted: "rgba(124, 45, 18, 0.8)",
    border: "rgba(249, 115, 22, 0.3)",
    card: "rgba(124, 45, 18, 0.9)",
    gradient: "linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #dc2626 100%)"
  },
  midnight: {
    primary: "#000000",
    secondary: "#8b5cf6",
    accent: "#a855f7",
    background: "linear-gradient(135deg, #000000 0%, #1e1b4b 50%, #312e81 100%)",
    foreground: "#f3f4f6",
    muted: "rgba(30, 27, 75, 0.8)",
    border: "rgba(139, 92, 246, 0.3)",
    card: "rgba(30, 27, 75, 0.9)",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #7c3aed 100%)"
  },
  neon: {
    primary: "#0a0a0a",
    secondary: "#00ff66",
    accent: "#ff1155",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 20%, #0d1b2a 40%, #1a0a2a 60%, #0a1a0a 80%, #2a0a1a 100%)",
    foreground: "#ffffff",
    muted: "rgba(26, 26, 26, 0.9)",
    border: "rgba(0, 255, 102, 0.4)",
    card: "rgba(26, 26, 26, 0.95)",
    gradient: "linear-gradient(135deg, #00ff66 0%, #ff1155 20%, #ffff00 40%, #ff6600 60%, #6600ff 80%, #00ffff 100%)"
  }
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  toggleTheme: () => null,
  availableThemes: Object.keys(themeColors) as Theme[],
  getThemeColors: (theme: Theme) => themeColors[theme],
  isTransitioning: false,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "portfolio-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  // Ultra-optimized theme application with minimal lag
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement;
    const colors = themeColors[newTheme];

    // Prevent multiple rapid theme changes
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Start transition
    setIsTransitioning(true);

    // Use double requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Batch all DOM operations together
        root.classList.add('theme-transitioning');

        // Remove all theme classes efficiently with a single regex
        root.className = root.className.replace(/\b(dark|light|cyberpunk|ocean|forest|sunset|midnight|neon)\b/g, '');
        root.classList.add(newTheme);

        // Batch CSS custom property updates
        const cssText = Object.entries(colors)
          .map(([key, value]) => `--theme-${key}: ${value}`)
          .join('; ');

        // Apply all properties at once
        root.style.cssText += `; ${cssText}`;

        // Optimized body style updates
        const bodyStyle = document.body.style;
        bodyStyle.setProperty('background', colors.background);
        bodyStyle.setProperty('color', colors.foreground);

        // End transition with optimized timing
        transitionTimeoutRef.current = setTimeout(() => {
          root.classList.remove('theme-transitioning');
          setIsTransitioning(false);
        }, 200); // Reduced from 300ms for snappier feel
      });
    });
  }, []);

  useEffect(() => {
    applyTheme(theme);
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [theme, applyTheme]);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const optimizedSetTheme = useCallback((newTheme: Theme) => {
    if (newTheme !== theme && !isTransitioning) {
      setTheme(newTheme);
    }
  }, [theme, isTransitioning]);

  const toggleTheme = useCallback(() => {
    if (!isTransitioning) {
      const themes = Object.keys(themeColors) as Theme[];
      const currentIndex = themes.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      optimizedSetTheme(themes[nextIndex]);
    }
  }, [theme, isTransitioning, optimizedSetTheme]);

  const getThemeColors = useCallback((selectedTheme: Theme) => themeColors[selectedTheme], []);

  const value = {
    theme,
    setTheme: optimizedSetTheme,
    toggleTheme,
    availableThemes: Object.keys(themeColors) as Theme[],
    getThemeColors,
    isTransitioning,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
