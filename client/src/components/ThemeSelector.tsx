import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { Palette, Check, Sparkles } from "lucide-react";

const themeDisplayNames = {
  dark: "Dark",
  light: "Light", 
  cyberpunk: "Cyberpunk",
  ocean: "Ocean",
  forest: "Forest",
  sunset: "Sunset",
  midnight: "Midnight",
  neon: "Neon"
};

const themeDescriptions = {
  dark: "Classic dark theme with cyan accents",
  light: "Clean light theme for daytime coding",
  cyberpunk: "Futuristic pink and cyan vibes",
  ocean: "Deep blue oceanic atmosphere",
  forest: "Natural green forest ambiance",
  sunset: "Warm orange and red sunset colors",
  midnight: "Pure black with purple highlights",
  neon: "Electric green and red neon lights"
};

export default function ThemeSelector() {
  const { theme, setTheme, availableThemes, getThemeColors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-full shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: `linear-gradient(135deg, ${getThemeColors(theme).card}90, ${getThemeColors(theme).muted}90)`,
          boxShadow: `0 4px 20px ${getThemeColors(theme).secondary}20`
        }}
      >
        <Palette className="w-5 h-5" style={{ color: getThemeColors(theme).secondary }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Theme selector panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-16 right-0 w-80 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl shadow-2xl backdrop-blur-md overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${getThemeColors(theme).card}95, ${getThemeColors(theme).muted}95)`,
                boxShadow: `0 20px 40px ${getThemeColors(theme).secondary}20`
              }}
            >
              {/* Header */}
              <div className="p-4 border-b border-[var(--theme-border)]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" style={{ color: getThemeColors(theme).accent }} />
                  <h3 className="font-semibold" style={{ color: getThemeColors(theme).foreground }}>
                    Choose Theme
                  </h3>
                </div>
                <p className="text-sm mt-1 opacity-70" style={{ color: getThemeColors(theme).foreground }}>
                  Select your preferred color scheme
                </p>
              </div>

              {/* Theme grid */}
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {availableThemes.map((themeName) => {
                    const colors = getThemeColors(themeName);
                    const isSelected = theme === themeName;
                    
                    return (
                      <motion.button
                        key={themeName}
                        onClick={() => {
                          setTheme(themeName);
                          setIsOpen(false);
                        }}
                        className="relative p-3 rounded-lg border-2 transition-all duration-300 group"
                        style={{
                          borderColor: isSelected ? colors.secondary : 'transparent',
                          background: `linear-gradient(135deg, ${colors.background}90, ${colors.muted}90)`
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Theme preview */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: colors.primary }}
                            />
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: colors.secondary }}
                            />
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: colors.accent }}
                            />
                          </div>
                          
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              <Check className="w-4 h-4" style={{ color: colors.secondary }} />
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="text-left">
                          <div 
                            className="font-medium text-sm"
                            style={{ color: colors.foreground }}
                          >
                            {themeDisplayNames[themeName]}
                          </div>
                          <div 
                            className="text-xs opacity-70 mt-1"
                            style={{ color: colors.foreground }}
                          >
                            {themeDescriptions[themeName]}
                          </div>
                        </div>

                        {/* Gradient preview bar */}
                        <div 
                          className="w-full h-1 rounded-full mt-2"
                          style={{ background: colors.gradient }}
                        />

                        {/* Hover effect */}
                        <motion.div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10"
                          style={{ background: colors.gradient }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[var(--theme-border)]">
                <div className="text-xs opacity-60 text-center" style={{ color: getThemeColors(theme).foreground }}>
                  Theme preferences are saved automatically
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
