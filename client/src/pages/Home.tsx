import { useEffect, useState, useRef } from "react";
import useScrollReveal from "@/lib/useScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAdvancedMobile, useIsMobile } from "@/hooks/use-mobile";
import ResponsiveContainer from "@/components/ResponsiveContainer";
import {
  Eye, Layers, Code, Database, Mail, Github, Linkedin, Twitter, X,
  MessageSquare, ChevronsRight, Terminal, Cpu, GitBranch, Coffee, Zap,
  ChevronDown, Sparkles, Sun, Moon, ExternalLink, Rocket, Star
} from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { useTheme } from "@/hooks/use-theme";

import CodeEditor from "@/components/CodeEditor";
import DeveloperTerminal from "@/components/DeveloperTerminal";
import GitHubContributions from "@/components/GitHubContributions";
import ProjectShowcase from "@/components/ProjectShowcase";
import { fadeInUp, staggerContainer, staggerItem, hoverLift } from "@/lib/animations";

// Code animation component for developer-themed sections
function CodeBlock({ 
  fileName, 
  language = "javascript", 
  children, 
  delay = 0 
}: { 
  fileName: string; 
  language?: string; 
  children: React.ReactNode; 
  delay?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="code-block mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: isMobile ? 0.1 : delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="code-block-header">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-[#e6f1ff]/70 text-sm">{fileName}</div>
        </div>
        <div className="text-[#e6f1ff]/50 text-xs uppercase">{language}</div>
      </div>
      
      <div className={`code-block-content ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="line-numbers">
          {Array.from({ length: (children?.toString()?.split('\n').length || 1) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="code-content">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// Interactive project card with 3D terminal-like theme
function ProjectCard({ 
  title, 
  description, 
  tags, 
  image, 
  link, 
  githubLink, 
  delay = 0 
}: { 
  title: string; 
  description: string; 
  tags: string[]; 
  image: string; 
  link?: string; 
  githubLink?: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="relative group perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isMobile ? 0.1 : delay }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      {/* Terminal-like header */}
      <div className="absolute -top-5 left-0 right-0 bg-[#0a192f] rounded-t-lg border-t border-l border-r border-[#64ffda]/30 px-3 py-1 z-20 flex items-center">
        <div className="flex space-x-1.5 mr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-[#e6f1ff]/70 font-mono overflow-hidden whitespace-nowrap">
          ~/{title.toLowerCase().replace(/\s/g, '-')}
        </div>
      </div>
      
      <div 
        className={`
          bg-[#1E1E2A] rounded-lg overflow-hidden shadow-xl border border-[#64ffda]/30
          transform transition-all duration-300 will-change-transform
          ${isHovered ? 'shadow-[0_10px_50px_-12px_rgba(100,255,218,0.25)]' : ''}
        `}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className={`
              w-full h-full object-cover
              transition-all duration-500 will-change-transform
              ${isHovered ? 'scale-105 filter contrast-125 brightness-110' : ''}
            `}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2A] to-transparent"></div>
          
          {/* Animated overlay on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-[#8b5cf6]/20 opacity-0"
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Tag pills positioned at the top right */}
          <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-2 max-w-[70%]">
            {tags.map((tag, index) => (
              <motion.span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-[#0a192f]/80 backdrop-blur-sm text-[#64ffda] border border-[#64ffda]/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: isMobile ? 0.1 + (index * 0.05) : delay + (index * 0.1) }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(100, 255, 218, 0.2)" }}
              >
                #{tag.toLowerCase().replace(/\s|\./g, '')}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div className="p-6 relative">
          {/* Glowing border effect on hover */}
          <motion.div 
            className="absolute inset-0 rounded-b-lg opacity-0"
            style={{ 
              background: 'linear-gradient(to right, rgba(100, 255, 218, 0.1), rgba(139, 92, 246, 0.1))',
              boxShadow: 'inset 0 0 15px rgba(100, 255, 218, 0.2)' 
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">
            {/* Title with code-like syntax */}
            <div className="font-mono text-xs text-[#8b5cf6] mb-2">const projectName = </div>
            <h3 className="text-xl font-bold mb-3 gradient-text">{title};</h3>
            
            {/* Description with typing animation effect on hover */}
            <div className="h-16 mb-6 overflow-hidden">
              <motion.p 
                className="text-[#e6f1ff]/70 text-sm"
                initial={{ y: 0 }}
                animate={{ y: isHovered ? [-2, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                {description}
              </motion.p>
            </div>
            
            <div className="font-mono text-xs text-[#8b5cf6] mb-2">{"// Links"}</div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {githubLink && (
                  <motion.a 
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e6f1ff] p-2 bg-[#0a192f] rounded-full hover:bg-[#64ffda]/20 transition-colors"
                    aria-label="View GitHub repository"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                )}
                {link && (
                  <motion.a 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e6f1ff] p-2 bg-[#0a192f] rounded-full hover:bg-[#64ffda]/20 transition-colors"
                    aria-label="View live project"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
              
              {/* Animated view details button */}
              <motion.div 
                className="relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#64ffda] to-[#8b5cf6] opacity-0"
                  animate={{ opacity: isHovered ? 0.2 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <button 
                  className="px-3 py-1.5 border border-[#64ffda] text-[#64ffda] text-sm rounded-md 
                  font-mono hover:bg-[#64ffda]/10 transition-colors flex items-center gap-1"
                >
                  <span className="text-[#8b5cf6]">{">"}</span> view_details()
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced skill card component with improved animations
function SkillCard({
  title,
  icon,
  skills,
  delay = 0
}: {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: string; percentage: number; color: string }[];
  delay?: number;
}) {
  const isMobile = useIsMobile();
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);

  const header = (
    <div className="relative">
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full filter blur-3xl opacity-60"
           style={{ backgroundColor: `${colors.secondary}20` }}></div>
      <div className="flex items-center relative z-10">
        <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: `${colors.secondary}10` }}>
          {icon}
        </div>
        <div>
          <div className="font-mono text-xs" style={{ color: colors.accent }}># category</div>
          <h3 className="text-xl font-bold" style={{ color: colors.foreground }}>{title}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: isMobile ? 0.1 : delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div
        className="h-full p-6 rounded-lg border"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        {header}
        <div className="space-y-5">
          {skills.map((skill, skillIndex) => (
            <motion.div
              key={skillIndex}
              className="group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: isMobile ? 0.1 : 0.3 + skillIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span
                    className="font-medium group-hover:transition-colors duration-300"
                    style={{
                      color: colors.foreground,
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="ml-2 px-2 py-0.5 text-xs rounded-full"
                    style={{
                      backgroundColor: `${colors.secondary}10`,
                      color: colors.secondary
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
                <span className="font-mono text-sm" style={{ color: colors.accent }}>
                  {skill.percentage}%
                </span>
              </div>

              <div
                className="h-2.5 rounded-full overflow-hidden relative"
                style={{ backgroundColor: colors.muted }}
              >
                <motion.div
                  className="h-full rounded-full absolute top-0 left-0"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0, opacity: 0.5 }}
                  whileInView={{ width: `${skill.percentage}%`, opacity: 1 }}
                  transition={{ duration: 1.2, delay: isMobile ? 0.1 : skillIndex * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />

                {/* Enhanced glow effect */}
                <motion.div
                  className="absolute top-0 bottom-0 w-20 bg-white/20 skew-x-30 -translate-x-20"
                  animate={{
                    translateX: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: 1 + skillIndex * 0.2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                  style={{ filter: "blur(8px)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Main Home component
export default function Home() {
  const [typedText, setTypedText] = useState("");
  const typingRef = useRef<HTMLSpanElement>(null);
  const { isMobile, isTablet, isLowPowerMode, touchDevice, screenSize } = useAdvancedMobile();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const { theme, getThemeColors } = useTheme();

  const colors = getThemeColors(theme);

  // Set title and meta description on mount
  useEffect(() => {
    document.title = "Osama Hashmi - Full Stack Developer";
  }, []);

  // Initialize scroll animations
  useScrollReveal();
  
  // Cursor blinking effect
  useEffect(() => {
    if (!typingRef.current) return;
    
    // Simulate terminal typing for intro text
    const textToType = "I'm a Full Stack Developer specializing in MERN stack development with a focus on creating scalable and performant web applications.";
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setTypedText(textToType.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40); // Faster typing for better responsiveness
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="relative">
      {/* Simple background gradient - no heavy animations */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: colors.background,
          opacity: 0.8
        }}
      />

      {/* Hero Section - Developer Themed */}
      <ResponsiveContainer
        className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden"
        mobileClassName="pt-12 px-4"
        tabletClassName="pt-14 px-6"
        optimizeForTouch={true}
      >
        <section id="home">
        {/* Enhanced tech-themed background with mobile optimization */}
        <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
          <motion.div
            className={`absolute ${isMobile ? 'top-5 left-5 text-4xl' : 'top-10 left-10 text-6xl'}`}
            style={{ color: colors.secondary }}
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'{'}
          </motion.div>
          <motion.div
            className={`absolute ${isMobile ? 'top-10 right-10 text-3xl' : 'top-20 right-20 text-4xl'}`}
            style={{ color: colors.accent }}
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {'</>'}
          </motion.div>
          <motion.div
            className={`absolute ${isMobile ? 'bottom-20 left-10 text-4xl' : 'bottom-20 left-20 text-5xl'}`}
            style={{ color: colors.secondary }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            {'()'}
          </motion.div>
          <motion.div
            className={`absolute ${isMobile ? 'bottom-5 right-5 text-2xl' : 'bottom-10 right-10 text-3xl'}`}
            style={{ color: colors.accent }}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 0.9, 1.1, 1]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            {';'}
          </motion.div>

          {/* Additional floating elements for larger screens */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute top-1/3 left-1/4 text-2xl opacity-5"
                style={{ color: colors.secondary }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                ⚡
              </motion.div>
              <motion.div
                className="absolute top-2/3 right-1/3 text-2xl opacity-5"
                style={{ color: colors.accent }}
                animate={{
                  y: [0, 15, 0],
                  x: [0, -15, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3
                }}
              >
                💻
              </motion.div>
            </>
          )}
        </div>

        <div className="container mx-auto px-4 sm:px-6 z-10 relative">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="inline-block font-mono mb-4 text-sm px-3 py-1 rounded-md border-l-2"
              style={{
                color: colors.secondary,
                backgroundColor: colors.muted,
                borderColor: colors.secondary
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              $ whoami
            </motion.div>

            <motion.h1
              className={`font-bold mb-6 leading-tight ${
                screenSize === 'xs' ? 'text-2xl mobile-text-2xl' :
                screenSize === 'sm' ? 'text-3xl mobile-text-3xl' :
                screenSize === 'md' ? 'text-4xl' :
                'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
              }`}
              style={{
                fontFamily: 'var(--font-display)',
                textShadow: `0 0 30px ${colors.secondary}20`,
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.span
                style={{ color: colors.foreground }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Osama
              </motion.span>
              <motion.span
                style={{ color: colors.secondary }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                .
              </motion.span>
              <motion.span
                style={{ color: colors.foreground }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Hashmi
              </motion.span>
              <motion.span
                style={{ color: colors.accent }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 150 }}
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  color: colors.secondary
                }}
              >
                ()
              </motion.span>
              <motion.span
                style={{
                  color: colors.secondary,
                  fontFamily: 'var(--font-mono)',
                  fontSize: screenSize === 'xs' ? '0.6em' :
                           screenSize === 'sm' ? '0.7em' : '0.8em'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="block sm:inline"
              >
                {isMobile ? (
                  <>
                    <br />
                    <span className="text-sm">// Full Stack Developer</span>
                  </>
                ) : (
                  ' // Full Stack Developer'
                )}
              </motion.span>
            </motion.h1>
            
            {/* Developer Terminal */}
            <motion.div
              className="mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DeveloperTerminal />
            </motion.div>
            
            <motion.div
              className={`flex flex-wrap gap-4 ${isMobile ? 'justify-center' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <motion.button
                className={`flex items-center gap-2 rounded-xl font-semibold transition-all glass ${
                  isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${colors.secondary}, ${colors.secondary}90)`,
                  color: colors.primary,
                  boxShadow: `0 8px 32px ${colors.secondary}30`,
                  border: `1px solid ${colors.secondary}60`,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: `0 12px 40px ${colors.secondary}40`,
                  background: `linear-gradient(135deg, ${colors.secondary}90, ${colors.secondary})`
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <Code size={isMobile ? 16 : 18} />
                <span className="font-display">View Projects</span>
              </motion.button>

              <motion.button
                className={`flex items-center gap-2 rounded-xl font-semibold transition-all glass ${
                  isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}90)`,
                  color: 'white',
                  boxShadow: `0 8px 32px ${colors.accent}30`,
                  border: `1px solid ${colors.accent}60`,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: `0 12px 40px ${colors.accent}40`,
                  background: `linear-gradient(135deg, ${colors.accent}90, ${colors.accent})`
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <Rocket size={isMobile ? 16 : 18} />
                <span className="font-display">Let's Connect</span>
              </motion.button>

              <motion.button
                className={`flex items-center gap-2 rounded-xl font-semibold border transition-all glass-dark ${
                  isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'
                }`}
                style={{
                  backgroundColor: 'transparent',
                  color: colors.foreground,
                  borderColor: colors.border,
                  boxShadow: `0 4px 16px ${colors.foreground}10`,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  backgroundColor: colors.muted,
                  borderColor: colors.secondary,
                  boxShadow: `0 8px 24px ${colors.secondary}20`
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://github.com/OSAMA-tec', '_blank')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
              >
                <Github size={isMobile ? 16 : 18} />
                <span className="font-display">GitHub</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          style={{ opacity }}
        >
          <motion.div
            className="mb-2 text-sm font-mono"
            style={{ color: `${colors.foreground}60` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            scroll.down()
          </motion.div>
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <ChevronDown className="w-6 h-6" style={{ color: colors.secondary }} />
          </motion.div>
        </motion.div>
        </section>
      </ResponsiveContainer>
      
      {/* About Section - Code-themed */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#0a192f] to-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">01.</span> About Me
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <CodeBlock fileName="about.js" delay={0.2}>
              <div>
                <span className="code-keyword">const</span> <span className="code-function">aboutMe</span> <span>=</span> {`{`}
                <div className="ml-4">
                  <span className="code-property">name</span>: <span className="code-string">'Osama Hashmi'</span>,
                  <div><span className="code-property">title</span>: <span className="code-string">'Full Stack Developer'</span>,</div>
                  <div><span className="code-property">focus</span>: <span className="code-string">'Building exceptional digital experiences'</span>,</div>
                  <div><span className="code-property">experience</span>: <span className="code-string">'5+ years'</span>,</div>
                  <div><span className="code-property">location</span>: <span className="code-string">'San Francisco, CA'</span>,</div>
                  <div><span className="code-property">interests</span>: [<span className="code-string">'Web Development'</span>, <span className="code-string">'UI/UX'</span>, <span className="code-string">'Open Source'</span>, <span className="code-string">'3D Graphics'</span>],</div>
                  <div>
                    <span className="code-property">bio</span>: <span className="code-function">function</span>() {`{`}
                    <div className="ml-4">
                      <span className="code-keyword">return</span> <span className="code-string">'Hello! I\'m Osama, a passionate Full Stack Developer with a love for creating interactive and efficient web applications. My journey in web development started back in 2015, and since then I\'ve worked with a range of technologies to deliver solutions that solve real-world problems.'</span>;
                    </div>
                    {`}`}
                  </div>
                </div>
                {`};`}
              </div>
            </CodeBlock>
            
            <CodeBlock fileName="philosophy.js" delay={0.4}>
              <div>
                <span className="code-comment">// My Development Philosophy</span>
                <div>
                  <span className="code-keyword">const</span> <span className="code-function">philosophy</span> <span>=</span> [
                  <div className="ml-4">
                    <div><span className="code-string">'Clean, maintainable code over quick fixes'</span>,</div>
                    <div><span className="code-string">'Performance and accessibility as core priorities'</span>,</div>
                    <div><span className="code-string">'User-centered design and development'</span>,</div>
                    <div><span className="code-string">'Continuous learning and adaptation'</span></div>
                  </div>
                  ];
                </div>
              </div>
            </CodeBlock>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-[#0a192f]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">02.</span> Experience
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
            <p className="text-center text-[#e6f1ff]/70 max-w-2xl mx-auto">
              My professional journey in the tech world.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 bg-gradient-to-b from-[#64ffda]/50 to-[#8b5cf6]/50"></div>
            
            {/* Experience Timeline Items */}
            {[
              {
                company: "BufferSol Technologies",
                title: "Backend Engineer",
                period: "August 2023 - Present",
                description: "Engineered a scalable microservices architecture using Node.js and Kubernetes, enhancing system efficiency and reducing deployment times across services.",
                technologies: ["Node.js", "Kubernetes", "Microservices", "Docker", "Express"],
                highlight: "Enhanced system efficiency by 60% and reduced deployment times by 50% across all services"
              },
              {
                company: "Web Stacking",
                title: "Backend Engineer",
                period: "October 2024 - January 2025",
                description: "Engineered microservices architecture with Twilio Voice/SMS and WebRTC integration for seamless real-time communication services.",
                technologies: ["Microservices", "Twilio", "WebRTC", "Docker", "Kubernetes"],
                highlight: "Improved system scalability by 150% through Docker and Kubernetes orchestration"
              },
              {
                company: "KawanBantu",
                title: "Frontend Developer",
                period: "September 2022 - December 2022",
                description: "Engineered interactive user interfaces for web applications, leveraging React and Redux to enhance user experience satisfaction metrics.",
                technologies: ["React", "Redux", "JavaScript", "HTML/CSS", "REST APIs"],
                highlight: "Improved client-side rendering speed by 50% through optimized component architecture"
              }
            ].map((exp, index) => (
              <motion.div 
                key={index}
                className={`relative z-10 flex mb-12 ${
                  isMobile ? 'pl-8' : 
                  index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'
                } items-center`}
                initial={{ opacity: 0, x: isMobile ? -20 : (index % 2 === 0 ? -50 : 50) }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline dot */}
                <div className={`absolute ${isMobile ? 'left-0' : 'left-1/2'} transform ${isMobile ? '' : '-translate-x-1/2'} w-5 h-5 rounded-full bg-[#64ffda] border-4 border-[#0a192f] shadow-glow`}></div>
                
                {/* Timeline content */}
                <div 
                  className={`w-full md:w-5/12 p-6 bg-[#1E1E2A] rounded-lg border border-[#64ffda]/20
                   hover:shadow-[0_10px_40px_-15px_rgba(100,255,218,0.2)] transition-all duration-300
                   ${isMobile ? '' : (index % 2 === 0 ? 'md:mr-12' : 'md:ml-12')}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="font-mono text-xs text-[#8b5cf6] mb-1">// {exp.period}</div>
                    <h3 className="text-xl font-bold gradient-text mb-1">{exp.company}</h3>
                    <div className="text-[#64ffda] font-medium mb-3">{exp.title}</div>
                    <p className="text-[#e6f1ff]/70 text-sm mb-4">{exp.description}</p>
                    
                    {/* Key Achievement */}
                    <div className="mb-4 p-3 bg-[#8b5cf6]/10 border-l-2 border-[#8b5cf6] rounded">
                      <div className="text-xs text-[#64ffda] font-mono mb-1">{"// Key Achievement:"}</div>
                      <div className="text-[#e6f1ff]/90 text-sm italic">{exp.highlight}</div>
                    </div>
                    
                    {/* Technologies */}
                    <div className="mt-auto">
                      <div className="text-xs text-[#64ffda] font-mono mb-2">{"// Technologies:"}</div>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="text-xs px-2 py-1 bg-[#0a192f] text-[#e6f1ff]/80 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* GitHub Activity Section */}
      <section id="activity" className="py-20 relative" style={{ background: `linear-gradient(135deg, ${colors.muted}10, ${colors.background})` }}>
        <ResponsiveContainer>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                background: `linear-gradient(135deg, ${colors.foreground}, ${colors.secondary})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontFamily: 'var(--font-display)'
              }}
            >
              <span style={{ color: colors.secondary }}>03.</span> Development Activity
            </h2>
            <div
              className="h-1 w-32 mb-6 mx-auto rounded-full"
              style={{ background: colors.gradient }}
            />
            <p
              className="max-w-2xl mx-auto text-sm md:text-base"
              style={{
                color: colors.muted,
                fontFamily: 'var(--font-primary)'
              }}
            >
              My coding journey and contribution patterns over the past year
            </p>
          </motion.div>

          <GitHubContributions />
        </ResponsiveContainer>
        {/* Background code pattern - reduced for mobile */}
        <div className="absolute inset-0 opacity-[0.07] z-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 h-full overflow-hidden">
            {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
              <motion.div 
                key={i}
                className="font-mono text-xs text-[#64ffda] opacity-90 overflow-hidden"
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  transition: { 
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.1
                  }
                }}
              >
                {Array.from({ length: isMobile ? 15 : 30 }).map((_, j) => (
                  <div key={j} className="my-1 overflow-hidden whitespace-nowrap">
                    {[
                      'function calculateSkill(years, projects) {',
                      '  return Math.min(years * 10 + projects * 2, 100);',
                      '}',
                      'const expertise = ["React", "Node.js"];',
                      'expertise.map(tech => console.log(`Learning ${tech}`));',
                      'class Developer {',
                      '  constructor(name, skills) {',
                      '    this.name = name;',
                      '    this.skills = skills;',
                      '  }',
                      '  code() { return "Building amazing experiences"; }',
                      '}'
                    ][j % 12]}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>


      </section>
      
      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.muted}15)`
      }}>
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-6xl" style={{ color: colors.secondary }}>{'{'}</div>
          <div className="absolute top-40 right-20 text-4xl" style={{ color: colors.accent }}>{'</>'}</div>
          <div className="absolute bottom-40 left-20 text-5xl" style={{ color: colors.secondary }}>{'()'}</div>
          <div className="absolute bottom-20 right-10 text-3xl" style={{ color: colors.accent }}>{';'}</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20" style={{ color: colors.secondary }}>
            💻
          </div>
        </div>

        <ResponsiveContainer>
          <motion.div
            className="text-center mb-20 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="text-6xl mb-4">🚀</div>
            </motion.div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                background: `linear-gradient(135deg, ${colors.foreground}, ${colors.secondary}, ${colors.accent})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontFamily: 'var(--font-display)',
                letterSpacing: '2px',
              }}
            >
              <span style={{ color: colors.secondary }}>04.</span> Featured Projects
            </h2>

            <motion.div
              className="h-2 w-40 mb-8 mx-auto rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent}, ${colors.secondary})`,
                backgroundSize: '200% 100%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <p
              className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
              style={{
                color: colors.muted,
                fontFamily: 'var(--font-primary)',
                fontWeight: '500',
              }}
            >
              Explore my portfolio of full-stack applications, each built with modern technologies
              and designed to solve real-world problems. From concept to deployment,
              these projects showcase my development journey and technical expertise.
            </p>

            {/* Project stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { label: 'Projects', value: '12+', icon: '💼' },
                { label: 'Technologies', value: '20+', icon: '⚡' },
                { label: 'Code Lines', value: '50K+', icon: '📝' },
                { label: 'Commits', value: '1K+', icon: '🔄' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${colors.card}80, ${colors.muted}20)`,
                    border: `1px solid ${colors.border}`,
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: `0 10px 30px ${colors.secondary}20`
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{
                      color: colors.secondary,
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{
                      color: colors.muted,
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <ProjectShowcase />
        </ResponsiveContainer>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#121212] relative overflow-hidden">
        {/* Background code pattern - reduced for mobile */}
        <div className="absolute inset-0 opacity-5 z-0 text-[8px] font-mono overflow-hidden text-[#64ffda] leading-tight">
          {Array.from({ length: isMobile ? 20 : 50 }).map((_, i) => (
            <div key={i}>
              {`{ "name": "contact", "email": "<email>", "subject": "<subject>", "message": "<message>", "timestamp": "${new Date().toISOString()}" }`}
            </div>
          ))}
        </div>
      
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">05.</span> Contact
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
            <p className="text-center text-[#e6f1ff]/70 max-w-2xl mx-auto">
              Let's connect! I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {/* Terminal-inspired contact form */}
            <motion.div
              className="bg-[#0a192f] rounded-lg overflow-hidden border border-[#64ffda]/30 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Terminal header */}
              <div className="bg-[#1E1E2A] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-mono text-[#e6f1ff]/70">contact@osamahashmi.dev:~</div>
                </div>
                <div className="text-xs text-[#e6f1ff]/50 font-mono">Connected</div>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 bg-[#0a192f]/90 backdrop-blur-md">
                <div className="font-mono text-sm text-[#e6f1ff] mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[#8b5cf6]">$</span>
                    <span className="typing-animation w-full">echo "Hello! Send me a message and I'll get back to you soon."</span>
                  </div>
                  <div className="text-[#64ffda] ml-4">Hello! Send me a message and I'll get back to you soon.</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-[#8b5cf6]">$</span>
                    <span>contact --new</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact form */}
                  <motion.form
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-[#8b5cf6] font-mono text-sm">const</span>
                        <label htmlFor="name" className="ml-2 text-[#64ffda] font-mono text-sm">name</label>
                        <span className="text-[#e6f1ff] font-mono text-sm ml-2">=</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-[#1E1E2A]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors pl-6"
                          placeholder="Your Name"
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">"</span>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">";</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-[#8b5cf6] font-mono text-sm">const</span>
                        <label htmlFor="email" className="ml-2 text-[#64ffda] font-mono text-sm">email</label>
                        <span className="text-[#e6f1ff] font-mono text-sm ml-2">=</span>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 bg-[#1E1E2A]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors pl-6"
                          placeholder="your@email.com"
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">"</span>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">";</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-[#8b5cf6] font-mono text-sm">const</span>
                        <label htmlFor="subject" className="ml-2 text-[#64ffda] font-mono text-sm">subject</label>
                        <span className="text-[#e6f1ff] font-mono text-sm ml-2">=</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          className="w-full px-4 py-3 bg-[#1E1E2A]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors pl-6"
                          placeholder="Subject"
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">"</span>
                        <span className="absolute right-2 bottom-3 text-[#8b5cf6] font-mono">`;</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-[#8b5cf6] font-mono text-sm">const</span>
                        <label htmlFor="message" className="ml-2 text-[#64ffda] font-mono text-sm">message</label>
                        <span className="text-[#e6f1ff] font-mono text-sm ml-2">=</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-2 top-3 text-[#8b5cf6] font-mono">`</span>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-3 bg-[#1E1E2A]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors pl-6 pr-6"
                          placeholder="Your message..."
                        ></textarea>
                        <span className="absolute right-2 bottom-3 text-[#8b5cf6] font-mono">`;</span>
                      </div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full mt-6 px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-mono rounded-md 
                      hover:bg-[#64ffda]/10 transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-[#8b5cf6]/20 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                      <span className="relative z-10">sendMessage()</span>
                    </motion.button>
                  </motion.form>
                  
                  {/* Contact details with terminal-style output */}
                  <motion.div 
                    className="font-mono text-sm space-y-4 border-t md:border-t-0 md:border-l border-[#64ffda]/20 pt-6 md:pt-0 md:pl-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[#8b5cf6]">$</span>
                        <span>cat contact-info.json</span>
                      </div>
                      <div className="bg-[#1E1E2A]/50 p-4 rounded-md">
                        <pre className="text-xs overflow-x-auto">
{`{
  "email": "hashmiosama555@gmail.com",
  "location": "San Francisco, CA",
  "availability": "Open to opportunities",
  "response_time": "Within 24 hours",
  "social": {
    "github": "github.com/OSAMA-tec",
    "linkedin": "linkedin.com/in/osamahash",
    "twitter": "twitter.com/osamahashmi"
  }
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[#8b5cf6]">$</span>
                        <span>ls -la social/</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <motion.a 
                          href="https://github.com/OSAMA-tec" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-[#1E1E2A]/50 rounded-md hover:bg-[#1E1E2A] transition-colors text-[#e6f1ff]/80 hover:text-[#64ffda]"
                          whileHover={{ x: 3 }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          <span className="text-xs">GitHub</span>
                        </motion.a>
                        
                        <motion.a 
                          href="https://www.linkedin.com/in/osamahash/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-[#1E1E2A]/50 rounded-md hover:bg-[#1E1E2A] transition-colors text-[#e6f1ff]/80 hover:text-[#64ffda]"
                          whileHover={{ x: 3 }}
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          <span className="text-xs">LinkedIn</span>
                        </motion.a>
                        
                        <motion.a 
                          href="https://twitter.com/osamahashmi" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-[#1E1E2A]/50 rounded-md hover:bg-[#1E1E2A] transition-colors text-[#e6f1ff]/80 hover:text-[#64ffda]"
                          whileHover={{ x: 3 }}
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          <span className="text-xs">Twitter</span>
                        </motion.a>
                        
                        <motion.a 
                          href="mailto:hashmiosama555@gmail.com"
                          className="flex items-center px-3 py-2 bg-[#1E1E2A]/50 rounded-md hover:bg-[#1E1E2A] transition-colors text-[#e6f1ff]/80 hover:text-[#64ffda]"
                          whileHover={{ x: 3 }}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-xs">Email</span>
                        </motion.a>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[#8b5cf6]">$</span>
                        <span>uptime</span>
                      </div>
                      <div className="bg-[#1E1E2A]/50 p-3 rounded-md text-xs">
                        <p>Available for freelance work and open to job opportunities</p>
                        <p className="mt-2 text-[#64ffda]">Ready to collaborate on your next project!</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Terminal footer */}
              <div className="bg-[#1E1E2A] px-4 py-2 text-xs text-[#e6f1ff]/50 flex justify-between items-center">
                <span>status: ready</span>
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  waiting for input...
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer
        className="py-8 border-t"
        style={{
          backgroundColor: colors.primary,
          borderColor: colors.border
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              className="mb-4 md:mb-0"
              style={{ color: `${colors.foreground}60` }}
            >
              &copy; {new Date().getFullYear()} Osama Hashmi. All rights reserved.
            </div>
            <div
              className="font-mono text-sm"
              style={{ color: `${colors.foreground}60` }}
            >
              <span className="code-comment">// Built with React & ❤️</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
