import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, MonitorSmartphone, Settings2 } from 'lucide-react';

// The available themes
const themes = [
  {
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
  },
  {
    id: 'onedark',
    name: 'One Dark',
    colors: {
      background: '#282c34',
      foreground: '#abb2bf',
      accent: '#61afef',
      secondary: '#c678dd',
      muted: '#3e4451'
    },
    description: 'Inspired by Atom editor'
  },
  {
    id: 'dracula',
    name: 'Dracula',
    colors: {
      background: '#282a36',
      foreground: '#f8f8f2',
      accent: '#bd93f9',
      secondary: '#ff79c6',
      muted: '#44475a'
    },
    description: 'Dark theme for night coding'
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    colors: {
      background: '#241b2f',
      foreground: '#f9f8fa',
      accent: '#fe4450',
      secondary: '#72f1b8',
      muted: '#34294f'
    },
    description: '80s retro synthwave vibes'
  },
  {
    id: 'coral',
    name: 'Coral',
    colors: {
      background: '#1a1a2e',
      foreground: '#e6e6e9',
      accent: '#ff9292',
      secondary: '#4ecca3',
      muted: '#242442'
    },
    description: 'Deep sea coral glow'
  }
];

export type ThemeType = typeof themes[0];

interface ThemeSelectorProps {
  currentTheme: string;
  onChange: (theme: ThemeType) => void;
}

export default function ThemeSelector({ currentTheme, onChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return themes.find(theme => theme.id === currentTheme) || themes[0];
  });

  useEffect(() => {
    // Update the selected theme when the currentTheme prop changes
    const theme = themes.find(theme => theme.id === currentTheme) || themes[0];
    setSelectedTheme(theme);
  }, [currentTheme]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleThemeChange = (theme: ThemeType) => {
    onChange(theme);
    setSelectedTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      {/* Theme selector button */}
      <motion.button
        onClick={toggleOpen}
        className="fixed right-6 top-24 bg-[#1E1E2A] p-3 rounded-full shadow-lg border border-[#64ffda]/20 text-[#64ffda]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1 }}
        aria-label="Change theme"
      >
        <Settings2 size={18} />
      </motion.button>

      {/* Theme selector dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed right-6 top-36 w-64 bg-[#1E1E2A] rounded-lg shadow-xl border border-[#64ffda]/20 overflow-hidden"
        >
          <div className="p-3 border-b border-[#64ffda]/10">
            <h3 className="text-sm font-medium text-[#e6f1ff]">Select Theme</h3>
            <p className="text-xs text-[#e6f1ff]/60">MonkeyType-inspired themes</p>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => handleThemeChange(theme)}
                className={`w-full flex items-start p-3 hover:bg-[#0a192f] text-left ${selectedTheme.id === theme.id ? 'bg-[#0a192f]/50' : ''}`}
                whileHover={{ x: 5 }}
              >
                <div 
                  className="w-8 h-8 rounded mr-3 flex-shrink-0" 
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary})`,
                    border: selectedTheme.id === theme.id ? '2px solid white' : 'none'
                  }}
                ></div>
                <div>
                  <div className="text-sm font-medium text-[#e6f1ff]">{theme.name}</div>
                  <div className="text-xs text-[#e6f1ff]/60">{theme.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="p-3 border-t border-[#64ffda]/10 flex justify-between">
            <button 
              onClick={toggleOpen} 
              className="text-xs text-[#e6f1ff]/60 hover:text-[#e6f1ff]"
            >
              Close
            </button>
            
            <div className="flex space-x-2">
              <button className="p-1 rounded hover:bg-[#0a192f]" aria-label="Light mode">
                <Sun size={14} className="text-[#e6f1ff]/60" />
              </button>
              <button className="p-1 rounded hover:bg-[#0a192f]" aria-label="Dark mode">
                <Moon size={14} className="text-[#e6f1ff]/60" />
              </button>
              <button className="p-1 rounded hover:bg-[#0a192f]" aria-label="System mode">
                <MonitorSmartphone size={14} className="text-[#64ffda]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}