import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Settings2 } from 'lucide-react';

// Available themes with monkeytype inspiration
const themes = [
  {
    id: 'matrix',
    name: 'Matrix',
    colors: { 
      primary: '#64ffda', 
      secondary: '#8b5cf6',
      background: '#0a192f'
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    colors: { 
      primary: '#fe4450', 
      secondary: '#72f1b8',
      background: '#241b2f'
    }
  },
  {
    id: 'dracula',
    name: 'Dracula',
    colors: { 
      primary: '#bd93f9', 
      secondary: '#ff79c6',
      background: '#282a36'
    }
  },
  {
    id: 'coral',
    name: 'Coral',
    colors: { 
      primary: '#ff9292', 
      secondary: '#4ecca3',
      background: '#1a1a2e'
    }
  },
  {
    id: 'nord',
    name: 'Nord',
    colors: { 
      primary: '#88c0d0', 
      secondary: '#b48ead',
      background: '#2e3440'
    }
  }
];

export default function ThemeToggle() {
  const [showMenu, setShowMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const handleThemeChange = (theme: typeof themes[0]) => {
    setCurrentTheme(theme);
    setShowMenu(false);
    
    // Apply theme colors to CSS variables
    document.documentElement.style.setProperty('--color-bg', theme.colors.background);
    document.documentElement.style.setProperty('--color-accent', theme.colors.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.colors.secondary);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-[#1E1E2A] p-2.5 rounded-full shadow-lg border border-[#64ffda]/20 text-[#64ffda] relative z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Theme settings"
      >
        <Settings2 size={20} />
      </motion.button>
      
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-12 right-0 bg-[#1E1E2A] rounded-lg shadow-xl border border-[#64ffda]/20 w-48 overflow-hidden"
        >
          <div className="p-2 border-b border-[#64ffda]/10 flex justify-between items-center">
            <span className="text-[#e6f1ff] text-sm">Theme</span>
            <div className="flex space-x-1">
              <button className="p-1 rounded hover:bg-[#0a192f]/50 text-[#e6f1ff]/70">
                <Sun size={14} />
              </button>
              <button className="p-1 rounded hover:bg-[#0a192f]/50 text-[#e6f1ff]/70">
                <Moon size={14} />
              </button>
            </div>
          </div>
          
          <div className="p-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme)}
                className={`w-full flex items-center space-x-2 p-2 rounded-md text-left
                  ${currentTheme.id === theme.id ? 'bg-[#0a192f]/70' : 'hover:bg-[#0a192f]/40'}`}
              >
                <div 
                  className="w-5 h-5 rounded-full" 
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                  }}
                />
                <span className="text-[#e6f1ff] text-sm">{theme.name}</span>
                {currentTheme.id === theme.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#64ffda] ml-auto"></div>
                )}
              </button>
            ))}
          </div>
          
          <div className="p-2 border-t border-[#64ffda]/10">
            <button 
              className="w-full text-xs text-[#e6f1ff]/70 hover:text-[#e6f1ff] text-center"
              onClick={() => setShowMenu(false)}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}