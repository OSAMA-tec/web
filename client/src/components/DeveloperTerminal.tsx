import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface TerminalCommand {
  command: string;
  output: string[];
  delay?: number;
}

const terminalCommands: TerminalCommand[] = [
  {
    command: 'whoami',
    output: ['osama-hashmi'],
    delay: 500
  },
  {
    command: 'pwd',
    output: ['/home/osama/projects/portfolio'],
    delay: 300
  },
  {
    command: 'ls -la',
    output: [
      'total 48',
      'drwxr-xr-x  8 osama osama 4096 Dec 15 12:00 .',
      'drwxr-xr-x  3 osama osama 4096 Dec 15 11:30 ..',
      'drwxr-xr-x  8 osama osama 4096 Dec 15 12:00 .git',
      '-rw-r--r--  1 osama osama  156 Dec 15 11:45 .gitignore',
      'drwxr-xr-x  2 osama osama 4096 Dec 15 12:00 client',
      'drwxr-xr-x  2 osama osama 4096 Dec 15 12:00 server',
      '-rw-r--r--  1 osama osama 2048 Dec 15 11:50 package.json',
      '-rw-r--r--  1 osama osama 1024 Dec 15 11:55 README.md'
    ],
    delay: 800
  },
  {
    command: 'git status',
    output: [
      'On branch main',
      'Your branch is up to date with \'origin/main\'.',
      '',
      'Changes to be committed:',
      '  (use "git reset HEAD <file>..." to unstage)',
      '',
      '\t\x1b[32mmodified:   client/src/components/Portfolio.tsx\x1b[0m',
      '\t\x1b[32mnew file:   client/src/components/CodeEditor.tsx\x1b[0m',
      '\t\x1b[32mmodified:   server/routes/api.js\x1b[0m'
    ],
    delay: 600
  },
  {
    command: 'npm run dev',
    output: [
      '',
      '> portfolio@1.0.0 dev',
      '> concurrently "npm run server" "npm run client"',
      '',
      '[0] > server@1.0.0 server',
      '[0] > nodemon server/index.js',
      '[1] > client@1.0.0 client', 
      '[1] > vite',
      '[0] 🚀 Server running on port 8800',
      '[1] ⚡ Vite dev server running on http://localhost:3000',
      '[1] 📦 Building for development...',
      '[1] ✅ Build completed in 2.3s',
      '[0] 📊 Database connected successfully',
      '[1] 🎉 Ready to code!'
    ],
    delay: 1200
  }
];

export default function DeveloperTerminal({ className = '' }: { className?: string }) {
  const { getThemeColors, theme } = useTheme();
  const { isMobile } = useAdvancedMobile();
  const colors = getThemeColors(theme);
  
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentOutput, setCurrentOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentOutput]);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Command execution simulation
  useEffect(() => {
    if (currentCommandIndex >= terminalCommands.length) return;

    const command = terminalCommands[currentCommandIndex];
    const timer = setTimeout(() => {
      setIsTyping(true);
      
      // Add command output line by line
      let lineIndex = 0;
      const outputTimer = setInterval(() => {
        if (lineIndex < command.output.length) {
          setCurrentOutput(prev => [...prev, command.output[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(outputTimer);
          setIsTyping(false);
          
          // Move to next command after a delay
          setTimeout(() => {
            setCurrentCommandIndex(prev => prev + 1);
          }, 1000);
        }
      }, 100);

      return () => clearInterval(outputTimer);
    }, command.delay || 500);

    return () => clearTimeout(timer);
  }, [currentCommandIndex]);

  const formatOutput = (line: string) => {
    // Handle null/undefined lines
    if (!line || typeof line !== 'string') {
      return { text: '', color: colors.foreground };
    }

    // Handle ANSI color codes
    const colorMap: { [key: string]: string } = {
      '\x1b[32m': colors.secondary, // Green
      '\x1b[31m': colors.accent,    // Red
      '\x1b[33m': '#f59e0b',        // Yellow
      '\x1b[36m': '#06b6d4',        // Cyan
      '\x1b[0m': colors.foreground  // Reset
    };

    let formattedLine = line;
    let currentColor = colors.foreground;

    Object.entries(colorMap).forEach(([code, color]) => {
      if (formattedLine && formattedLine.includes(code)) {
        currentColor = color;
        formattedLine = formattedLine.replace(code, '');
      }
    });

    return { text: formattedLine || '', color: currentColor };
  };

  return (
    <motion.div
      className={`developer-terminal ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: '#1e1e1e',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        fontSize: isMobile ? '12px' : '14px',
        maxHeight: '400px',
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          backgroundColor: '#2d2d2d',
          padding: '8px 16px',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27ca3f' }} />
        </div>
        <span style={{ color: colors.foreground, fontSize: '12px', marginLeft: '8px' }}>
          osama@portfolio:~
        </span>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        style={{
          padding: '16px',
          height: '320px',
          overflowY: 'auto',
          backgroundColor: '#1e1e1e',
        }}
      >
        {/* Welcome message */}
        <div style={{ color: colors.secondary, marginBottom: '16px' }}>
          <div>Welcome to Osama's Development Environment</div>
          <div style={{ color: colors.muted, fontSize: '12px' }}>
            Last login: {new Date().toLocaleString()}
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={{ color: colors.accent }}>$</span> Ready to explore my projects? 🚀
          </div>
        </div>

        {/* Command history */}
        {terminalCommands.slice(0, currentCommandIndex + 1).map((cmd, cmdIndex) => (
          <div key={cmdIndex} style={{ marginBottom: '12px' }}>
            {/* Command prompt */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ color: colors.secondary }}>osama@portfolio</span>
              <span style={{ color: colors.foreground }}>:</span>
              <span style={{ color: colors.accent }}>~/projects/portfolio</span>
              <span style={{ color: colors.foreground }}>$ </span>
              <span style={{ color: colors.foreground }}>{cmd.command}</span>
            </div>

            {/* Command output */}
            {cmdIndex < currentCommandIndex && (
              <div style={{ marginLeft: '8px' }}>
                {cmd.output && cmd.output.map((line, lineIndex) => {
                  const formatted = formatOutput(line);
                  return (
                    <div
                      key={lineIndex}
                      style={{
                        color: formatted.color,
                        lineHeight: '1.4',
                        whiteSpace: 'pre',
                      }}
                    >
                      {formatted.text}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Current command output (typing) */}
            {cmdIndex === currentCommandIndex && (
              <div style={{ marginLeft: '8px' }}>
                {currentOutput && currentOutput.map((line, lineIndex) => {
                  const formatted = formatOutput(line);
                  return (
                    <div
                      key={lineIndex}
                      style={{
                        color: formatted.color,
                        lineHeight: '1.4',
                        whiteSpace: 'pre',
                      }}
                    >
                      {formatted.text}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Current prompt */}
        {currentCommandIndex >= terminalCommands.length && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: colors.secondary }}>osama@portfolio</span>
            <span style={{ color: colors.foreground }}>:</span>
            <span style={{ color: colors.accent }}>~/projects/portfolio</span>
            <span style={{ color: colors.foreground }}>$ </span>
            <motion.span
              animate={{ opacity: showCursor ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              style={{ color: colors.secondary }}
            >
              █
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
