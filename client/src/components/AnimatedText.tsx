import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface AnimatedTextProps {
  text: string | string[];
  variant?: 'typewriter' | 'fade' | 'slide' | 'glitch' | 'wave' | 'matrix' | 'neon';
  speed?: 'slow' | 'medium' | 'fast';
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
}

export default function AnimatedText({
  text,
  variant = 'typewriter',
  speed = 'medium',
  loop = false,
  className = '',
  onComplete,
  startDelay = 0
}: AnimatedTextProps) {
  const { getThemeColors, theme } = useTheme();
  const { isLowPowerMode, isMobile } = useAdvancedMobile();
  const colors = getThemeColors(theme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Simplify animations for low power mode
  const effectiveVariant = isLowPowerMode ? 'fade' : variant;
  const effectiveSpeed = isLowPowerMode ? 'fast' : isMobile ? 'medium' : speed;

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[currentIndex];

  const speedConfig = {
    slow: { typing: isMobile ? 120 : 150, pause: isMobile ? 1500 : 2000 },
    medium: { typing: isMobile ? 80 : 100, pause: isMobile ? 1200 : 1500 },
    fast: { typing: isMobile ? 40 : 50, pause: isMobile ? 800 : 1000 }
  };

  // Typewriter effect
  useEffect(() => {
    if (effectiveVariant !== 'typewriter') return;

    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, speedConfig[speed].typing);
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
        
        if (loop && textArray.length > 1) {
          timeout = setTimeout(() => {
            setDisplayText('');
            setIsComplete(false);
            setCurrentIndex((prev) => (prev + 1) % textArray.length);
          }, speedConfig[speed].pause);
        }
      }
    };

    if (startDelay > 0 && displayText === '') {
      timeout = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentText, variant, speed, loop, textArray.length, onComplete, startDelay]);

  // Cursor blinking
  useEffect(() => {
    if (variant !== 'typewriter') return;

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [variant]);

  // Reset when text changes
  useEffect(() => {
    if (variant === 'typewriter') {
      setDisplayText('');
      setIsComplete(false);
    }
  }, [currentIndex, variant]);

  const renderTypewriter = () => (
    <span className={className}>
      {displayText}
      {variant === 'typewriter' && (
        <motion.span
          className="inline-block ml-1"
          style={{ color: colors.secondary }}
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        >
          |
        </motion.span>
      )}
    </span>
  );

  const renderFade = () => (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentText}
      </motion.span>
    </AnimatePresence>
  );

  const renderSlide = () => (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        className={className}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentText}
      </motion.span>
    </AnimatePresence>
  );

  const renderGlitch = () => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const [glitchText, setGlitchText] = useState(currentText);

    useEffect(() => {
      const interval = setInterval(() => {
        if (Math.random() > 0.9) {
          const randomIndex = Math.floor(Math.random() * currentText.length);
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          const newText = currentText.split('');
          newText[randomIndex] = randomChar;
          setGlitchText(newText.join(''));
          
          setTimeout(() => setGlitchText(currentText), 100);
        }
      }, 200);

      return () => clearInterval(interval);
    }, [currentText]);

    return (
      <motion.span
        className={className}
        style={{
          textShadow: `2px 0 ${colors.accent}, -2px 0 ${colors.secondary}`,
        }}
        animate={{
          x: [0, -2, 2, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {glitchText}
      </motion.span>
    );
  };

  const renderWave = () => (
    <span className={className}>
      {currentText.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );

  const renderMatrix = () => {
    const [matrixChars, setMatrixChars] = useState(currentText.split(''));

    useEffect(() => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      let iterations = 0;
      
      const interval = setInterval(() => {
        setMatrixChars(prev => 
          prev.map((char, index) => {
            if (index < iterations) {
              return currentText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
        );
        
        if (iterations >= currentText.length) {
          clearInterval(interval);
        }
        
        iterations += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, [currentText]);

    return (
      <span className={`${className} font-mono`} style={{ color: colors.secondary }}>
        {matrixChars.join('')}
      </span>
    );
  };

  const renderNeon = () => (
    <motion.span
      className={className}
      style={{
        color: colors.secondary,
        textShadow: `
          0 0 5px ${colors.secondary},
          0 0 10px ${colors.secondary},
          0 0 15px ${colors.secondary},
          0 0 20px ${colors.accent}
        `,
      }}
      animate={{
        textShadow: [
          `0 0 5px ${colors.secondary}, 0 0 10px ${colors.secondary}, 0 0 15px ${colors.secondary}, 0 0 20px ${colors.accent}`,
          `0 0 10px ${colors.secondary}, 0 0 20px ${colors.secondary}, 0 0 30px ${colors.secondary}, 0 0 40px ${colors.accent}`,
          `0 0 5px ${colors.secondary}, 0 0 10px ${colors.secondary}, 0 0 15px ${colors.secondary}, 0 0 20px ${colors.accent}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {currentText}
    </motion.span>
  );

  // Auto-cycle through texts if multiple texts and loop is enabled
  useEffect(() => {
    if (loop && textArray.length > 1 && variant !== 'typewriter') {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % textArray.length);
      }, speedConfig[speed].pause);

      return () => clearInterval(interval);
    }
  }, [loop, textArray.length, speed, variant]);

  const renderVariant = () => {
    switch (effectiveVariant) {
      case 'typewriter':
        return renderTypewriter();
      case 'fade':
        return renderFade();
      case 'slide':
        return renderSlide();
      case 'glitch':
        return renderGlitch();
      case 'wave':
        return renderWave();
      case 'matrix':
        return renderMatrix();
      case 'neon':
        return renderNeon();
      default:
        return renderTypewriter();
    }
  };

  return (
    <div className="inline-block">
      {renderVariant()}
    </div>
  );
}
