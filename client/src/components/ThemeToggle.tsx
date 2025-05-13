
import { useTheme } from "@/hooks/use-theme";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 bg-background/10 backdrop-blur-sm 
                text-[#e6f1ff] hover:text-[#64ffda] transition-all duration-300 
                border border-[rgba(100,255,218,0.1)] hover:border-[#64ffda]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[#64ffda]" />
      ) : (
        <Moon className="h-5 w-5 text-[#8b5cf6]" />
      )}
    </Button>
  );
}
