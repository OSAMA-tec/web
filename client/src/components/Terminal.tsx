import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface TerminalProps {
  isActive: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

interface Command {
  input: string;
  output: React.ReactNode;
  isError?: boolean;
}

export default function Terminal({ isActive, onClose, onNavigate }: TerminalProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, getThemeColors } = useTheme();
  const colors = getThemeColors(theme);
  
  // Auto focus the input when terminal opens
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);
  
  // Scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);
  
  // Process the command when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim() !== '') {
      processCommand(currentInput);
      
      // Add to command history
      setCommandHistory(prev => [currentInput, ...prev]);
      setHistoryIndex(-1);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateCommandHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateCommandHistory('down');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autocompleteCommand();
    }
  };
  
  // Navigate through command history
  const navigateCommandHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;
    
    if (direction === 'up') {
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setCurrentInput(commandHistory[newIndex]);
    } else {
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex === -1) {
        setCurrentInput('');
      } else {
        setCurrentInput(commandHistory[newIndex]);
      }
    }
  };
  
  // Simple autocompletion
  const autocompleteCommand = () => {
    const commonCommands = [
      'help', 'about', 'projects', 'skills', 'contact', 
      'clear', 'home', 'social', 'exit'
    ];
    
    if (currentInput) {
      const match = commonCommands.find(cmd => 
        cmd.startsWith(currentInput.toLowerCase())
      );
      
      if (match) {
        setCurrentInput(match);
      }
    }
  };
  
  // Process and execute commands
  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode;
    let isError = false;
    
    // Simple command router
    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="space-y-1">
            <p>Available commands:</p>
            <p><span className="text-[#64ffda] font-bold">about</span> - Learn about Osama Hashmi</p>
            <p><span className="text-[#64ffda] font-bold">projects</span> - View my projects</p>
            <p><span className="text-[#64ffda] font-bold">skills</span> - See my technical skills</p>
            <p><span className="text-[#64ffda] font-bold">contact</span> - How to reach me</p>
            <p><span className="text-[#64ffda] font-bold">social</span> - Links to my social profiles</p>
            <p><span className="text-[#64ffda] font-bold">home</span> - Go to home section</p>
            <p><span className="text-[#64ffda] font-bold">clear</span> - Clear terminal</p>
            <p><span className="text-[#64ffda] font-bold">exit</span> - Close terminal</p>
          </div>
        );
        break;
        
      case 'about':
        output = (
          <div className="space-y-2">
            <p className="text-[#64ffda] font-bold">$ cat about.md</p>
            <p>Hello! I'm Osama Hashmi, a passionate Full Stack Developer focusing on building exceptional digital experiences.</p>
            <p>With experience in both frontend and backend development, I enjoy creating responsive, accessible, and performant web applications.</p>
          </div>
        );
        onNavigate('#about');
        break;
        
      case 'projects':
        output = (
          <div className="space-y-2">
            <p className="text-[#64ffda] font-bold">$ ls -la ~/projects/</p>
            <p>Navigating to projects section...</p>
          </div>
        );
        onNavigate('#projects');
        break;
        
      case 'skills':
        output = (
          <div className="space-y-2">
            <p className="text-[#64ffda] font-bold">$ grep -r "skills" .</p>
            <p>Navigating to skills section...</p>
          </div>
        );
        onNavigate('#skills');
        break;
        
      case 'contact':
        output = (
          <div className="space-y-2">
            <p className="text-[#64ffda] font-bold">$ ping contact.osamahashmi.dev</p>
            <p>Navigating to contact section...</p>
          </div>
        );
        onNavigate('#contact');
        break;
        
      case 'social':
        output = (
          <div className="space-y-2">
            <p className="text-[#64ffda] font-bold">$ curl -s api.github.com/users/osamahashmi</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1E1E2A] hover:bg-[#64ffda]/20 px-3 py-2 rounded text-center transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1E1E2A] hover:bg-[#64ffda]/20 px-3 py-2 rounded text-center transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1E1E2A] hover:bg-[#64ffda]/20 px-3 py-2 rounded text-center transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        );
        break;
        
      case 'clear':
        setCommands([]);
        return;
        
      case 'home':
        output = (
          <div className="space-y-2">
            <p className="text-[#64ffda] font-bold">$ cd ~/</p>
            <p>Navigating to home section...</p>
          </div>
        );
        onNavigate('#home');
        break;
        
      case 'exit':
        output = "Closing terminal...";
        setTimeout(() => {
          onClose();
        }, 500);
        break;
        
      default:
        if (trimmedCmd.startsWith('cd ')) {
          const section = trimmedCmd.replace('cd ', '').trim();
          if (['home', 'about', 'projects', 'skills', 'contact'].includes(section)) {
            output = `Navigating to ${section} section...`;
            onNavigate(`#${section}`);
          } else {
            output = `Directory not found: ${section}`;
            isError = true;
          }
        } else if (trimmedCmd.startsWith('ls')) {
          output = (
            <div>
              <p className="text-[#64ffda] font-mono">Available sections:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                <div className="bg-[#1E1E2A] px-3 py-1 rounded cursor-pointer hover:bg-[#64ffda]/20 transition-colors"
                     onClick={() => onNavigate('#home')}>
                  home/
                </div>
                <div className="bg-[#1E1E2A] px-3 py-1 rounded cursor-pointer hover:bg-[#64ffda]/20 transition-colors"
                     onClick={() => onNavigate('#about')}>
                  about/
                </div>
                <div className="bg-[#1E1E2A] px-3 py-1 rounded cursor-pointer hover:bg-[#64ffda]/20 transition-colors"
                     onClick={() => onNavigate('#projects')}>
                  projects/
                </div>
                <div className="bg-[#1E1E2A] px-3 py-1 rounded cursor-pointer hover:bg-[#64ffda]/20 transition-colors"
                     onClick={() => onNavigate('#skills')}>
                  skills/
                </div>
                <div className="bg-[#1E1E2A] px-3 py-1 rounded cursor-pointer hover:bg-[#64ffda]/20 transition-colors"
                     onClick={() => onNavigate('#contact')}>
                  contact/
                </div>
              </div>
            </div>
          );
        } else {
          output = `Command not found: ${trimmedCmd}. Type 'help' for a list of commands.`;
          isError = true;
        }
    }
    
    setCommands(prev => [...prev, { input: cmd, output, isError }]);
  };
  
  // If the terminal is not active, don't render anything
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-3xl bg-[#0a192f] border border-[#64ffda]/30 rounded-lg shadow-xl overflow-hidden"
      >
        {/* Terminal header */}
        <div className="bg-[#1E1E2A] px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-[#e6f1ff]/80 text-sm font-mono">ohash@portfolio:~$</div>
          <button 
            className="text-[#e6f1ff]/50 hover:text-[#e6f1ff] transition-colors"
            onClick={onClose}
            aria-label="Close terminal"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Terminal output */}
        <div 
          ref={terminalRef}
          className="p-4 h-80 overflow-y-auto font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="text-[#64ffda] mb-4">
            <p>Osama Hashmi's Portfolio Terminal v1.0.0</p>
            <p>Type 'help' to see available commands.</p>
          </div>
          
          {/* Command history */}
          {commands.map((cmd, index) => (
            <div key={index} className="mb-3">
              <div className="flex">
                <span className="text-[#8b5cf6] mr-2">❯</span>
                <span>{cmd.input}</span>
              </div>
              <div className={`mt-1 ml-4 ${cmd.isError ? 'text-red-400' : 'text-[#e6f1ff]/80'}`}>
                {cmd.output}
              </div>
            </div>
          ))}
          
          {/* Current input */}
          <div className="flex items-center">
            <span className="text-[#8b5cf6] mr-2">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent focus:outline-none flex-1 text-[#e6f1ff]"
              autoFocus
            />
          </div>
        </div>
        
        {/* Terminal footer */}
        <div className="bg-[#1E1E2A] px-4 py-2 text-xs text-[#e6f1ff]/50 flex justify-between">
          <div>
            Press <kbd className="bg-[#64ffda]/20 text-[#64ffda] px-1 rounded">Tab</kbd> to autocomplete
          </div>
          <div>
            <kbd className="bg-[#64ffda]/20 text-[#64ffda] px-1 rounded">↑</kbd> <kbd className="bg-[#64ffda]/20 text-[#64ffda] px-1 rounded">↓</kbd> for history
          </div>
        </div>
      </div>
    </div>
  );
}