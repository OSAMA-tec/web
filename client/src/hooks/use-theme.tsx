
import { useContext } from "react";
import { ThemeProviderContext } from "./theme-context";

// Custom hook to access theme context
export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
