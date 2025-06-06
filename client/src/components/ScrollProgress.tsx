import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, ChevronUp } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface ScrollProgressProps {
  showBackToTop?: boolean;
  showSectionIndicators?: boolean;
  className?: string;
}

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function ScrollProgress({ 
  showBackToTop = true, 
  showSectionIndicators = true,
  className = '' 
}: ScrollProgressProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showBackButton, setShowBackButton] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show back to top button after scrolling 500px
      setShowBackButton(scrollPosition > 500);

      // Calculate section progress
      const newSectionProgress: Record<string, number> = {};
      let currentActiveSection = 'home';

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          const elementHeight = rect.height;
          
          // Calculate progress through this section
          const sectionStart = elementTop - windowHeight * 0.5;
          const sectionEnd = elementTop + elementHeight - windowHeight * 0.5;
          const progress = Math.max(0, Math.min(1, 
            (scrollPosition - sectionStart) / (sectionEnd - sectionStart)
          ));
          
          newSectionProgress[section.id] = progress;

          // Determine active section
          if (rect.top <= windowHeight * 0.3 && rect.bottom >= windowHeight * 0.3) {
            currentActiveSection = section.id;
          }
        }
      });

      setSectionProgress(newSectionProgress);
      setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={className}>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          background: colors.gradient,
          scaleX,
        }}
      />

      {/* Section Indicators */}
      {showSectionIndicators && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="space-y-4">
            {sections.map((section, index) => {
              const progress = sectionProgress[section.id] || 0;
              const isActive = activeSection === section.id;
              
              return (
                <motion.div
                  key={section.id}
                  className="relative group cursor-pointer"
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Progress Ring */}
                  <div className="relative w-4 h-4">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 24 24"
                    >
                      {/* Background circle */}
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke={`${colors.border}`}
                        strokeWidth="2"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke={colors.secondary}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 10}`}
                        strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress)}`}
                        initial={{ strokeDashoffset: `${2 * Math.PI * 10}` }}
                        animate={{ 
                          strokeDashoffset: `${2 * Math.PI * 10 * (1 - progress)}`,
                          stroke: isActive ? colors.accent : colors.secondary
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                    
                    {/* Center dot */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        scale: isActive ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: isActive ? colors.accent : colors.secondary,
                          boxShadow: isActive ? `0 0 10px ${colors.accent}` : 'none'
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      backgroundColor: colors.card,
                      color: colors.foreground,
                      border: `1px solid ${colors.border}`,
                      boxShadow: `0 4px 12px ${colors.primary}20`
                    }}
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.label}
                    
                    {/* Arrow */}
                    <div
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45"
                      style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && showBackButton && (
        <motion.button
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-40 group"
          style={{
            background: colors.gradient,
            color: colors.primary,
            boxShadow: `0 4px 20px ${colors.secondary}30`
          }}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: `0 6px 25px ${colors.secondary}40`
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronUp size={24} />
          </motion.div>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            style={{ backgroundColor: colors.primary }}
            whileTap={{
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              backgroundColor: colors.card,
              color: colors.foreground,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 12px ${colors.primary}20`
            }}
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            Back to top
            
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 rotate-45"
              style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}
            />
          </motion.div>
        </motion.button>
      )}

      {/* Mobile Section Progress */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40">
        <div 
          className="h-1"
          style={{ backgroundColor: `${colors.border}50` }}
        >
          <motion.div
            className="h-full origin-left"
            style={{
              background: colors.gradient,
              scaleX: scrollYProgress,
            }}
          />
        </div>
        
        {/* Current section indicator */}
        <div 
          className="px-4 py-2 text-center text-sm font-medium"
          style={{
            backgroundColor: `${colors.card}95`,
            color: colors.foreground,
            borderTop: `1px solid ${colors.border}`
          }}
        >
          {sections.find(s => s.id === activeSection)?.label || 'Home'}
        </div>
      </div>
    </div>
  );
}
