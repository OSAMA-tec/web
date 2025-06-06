import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface CodeEditorProps {
  language?: 'javascript' | 'typescript' | 'python' | 'react' | 'nodejs';
  theme?: 'dark' | 'light';
  showLineNumbers?: boolean;
  autoType?: boolean;
  className?: string;
}

const codeSnippets = {
  javascript: `// Modern JavaScript ES6+
const developer = {
  name: "Osama Hashmi",
  skills: ["JavaScript", "React", "Node.js"],
  passion: "Building amazing web experiences",
  
  createProject: async (idea) => {
    const project = await this.buildWithLove(idea);
    return project.deploy();
  }
};

console.log("Ready to code! 🚀");`,

  typescript: `// TypeScript Interface Design
interface Developer {
  name: string;
  skills: string[];
  experience: number;
  currentFocus: 'Frontend' | 'Backend' | 'Fullstack';
}

class SoftwareDeveloper implements Developer {
  constructor(
    public name: string = "Osama Hashmi",
    public skills: string[] = ["TypeScript", "React", "Node.js"],
    public experience: number = 3,
    public currentFocus: 'Fullstack' = 'Fullstack'
  ) {}

  async buildProject<T>(requirements: T): Promise<T> {
    return await this.code(requirements);
  }
}`,

  python: `# Python Backend Development
class FullStackDeveloper:
    def __init__(self):
        self.name = "Osama Hashmi"
        self.languages = ["Python", "JavaScript", "TypeScript"]
        self.frameworks = ["Django", "FastAPI", "React", "Next.js"]
        self.databases = ["PostgreSQL", "MongoDB", "Redis"]
    
    def solve_problem(self, challenge):
        solution = self.analyze(challenge)
        code = self.implement(solution)
        return self.optimize(code)
    
    def __str__(self):
        return f"Developer passionate about clean code 🐍"

dev = FullStackDeveloper()
print(dev.solve_problem("Build amazing applications"))`,

  react: `// React Component Architecture
import React, { useState, useEffect } from 'react';

const DeveloperProfile: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      const techStack = [
        'React', 'TypeScript', 'Node.js',
        'MongoDB', 'PostgreSQL', 'Docker',
        'AWS', 'Git', 'REST APIs'
      ];
      
      setSkills(techStack);
      setIsLoading(false);
    };

    loadSkills();
  }, []);

  return (
    <div className="developer-profile">
      <h1>Osama Hashmi</h1>
      <p>Full Stack Developer</p>
      {!isLoading && (
        <SkillsList skills={skills} />
      )}
    </div>
  );
};`,

  nodejs: `// Node.js Backend API
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/api/developer', (req, res) => {
  res.json({
    name: "Osama Hashmi",
    role: "Full Stack Developer",
    location: "Islamabad, Pakistan",
    status: "Available for opportunities",
    techStack: ["Node.js", "Express", "MongoDB", "React"]
  });
});

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});`
};

export default function CodeEditor({
  language = 'javascript',
  theme = 'dark',
  showLineNumbers = true,
  autoType = false,
  className = ''
}: CodeEditorProps) {
  const { getThemeColors } = useTheme();
  const { isMobile } = useAdvancedMobile();
  const colors = getThemeColors(theme as any);
  
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(1);
  const code = codeSnippets[language];

  // Auto-typing effect
  useEffect(() => {
    if (!autoType) {
      setDisplayedCode(code);
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index < code.length) {
        setDisplayedCode(code.slice(0, index + 1));
        if (code[index] === '\n') {
          setCurrentLine(prev => prev + 1);
        }
        index++;
      } else {
        clearInterval(timer);
      }
    }, isMobile ? 30 : 20);

    return () => clearInterval(timer);
  }, [code, autoType, isMobile]);

  const lines = displayedCode.split('\n');

  const getTokenColor = (token: string) => {
    // Keywords
    if (/^(const|let|var|function|class|interface|type|import|export|from|async|await|return|if|else|for|while|try|catch)$/.test(token)) {
      return colors.secondary;
    }
    // Strings
    if (/^["'`].*["'`]$/.test(token)) {
      return '#98c379';
    }
    // Numbers
    if (/^\d+$/.test(token)) {
      return '#d19a66';
    }
    // Comments
    if (token.startsWith('//') || token.startsWith('#')) {
      return '#5c6370';
    }
    // Methods/Functions
    if (/\w+\(/.test(token)) {
      return '#61dafb';
    }
    return colors.foreground;
  };

  const highlightSyntax = (line: string) => {
    const tokens = line.split(/(\s+|[(){}[\];,.])/);
    return tokens.map((token, index) => (
      <span key={index} style={{ color: getTokenColor(token) }}>
        {token}
      </span>
    ));
  };

  return (
    <motion.div
      className={`code-editor ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        fontSize: isMobile ? '12px' : '14px',
      }}
    >
      {/* Editor Header */}
      <div
        style={{
          backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f5f5f5',
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
          {language}.{language === 'python' ? 'py' : language === 'typescript' ? 'ts' : 'js'}
        </span>
      </div>

      {/* Code Content */}
      <div style={{ padding: '16px', maxHeight: '400px', overflowY: 'auto' }}>
        {lines.map((line, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              minHeight: '20px',
              lineHeight: '20px',
            }}
          >
            {showLineNumbers && (
              <span
                style={{
                  color: colors.muted,
                  marginRight: '16px',
                  minWidth: '30px',
                  textAlign: 'right',
                  userSelect: 'none',
                  fontSize: '12px',
                }}
              >
                {index + 1}
              </span>
            )}
            <span style={{ flex: 1 }}>
              {highlightSyntax(line)}
              {autoType && index === lines.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ color: colors.secondary }}
                >
                  |
                </motion.span>
              )}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
