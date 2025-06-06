import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface CursorTrail {
  x: number;
  y: number;
  id: number;
}

export default function AdvancedCursor() {
  const { getThemeColors, theme } = useTheme();
  const { isMobile, touchDevice, isLowPowerMode } = useAdvancedMobile();
  const colors = getThemeColors(theme);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const trailIdRef = useRef(0);

  // Don't render custom cursor on mobile/touch devices
  if (isMobile || touchDevice) {
    return null;
  }

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Add trail effect
      setTrails(prev => {
        const newTrail = {
          x: e.clientX,
          y: e.clientY,
          id: trailIdRef.current++
        };
        const updatedTrails = [newTrail, ...prev.slice(0, 8)];
        return updatedTrails;
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle hover states for interactive elements
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor-text') || 'Click';
        setCursorText(text);
      } else if (target.matches('input, textarea')) {
        setIsHovering(true);
        setCursorText('Type');
      } else if (target.matches('img, video')) {
        setIsHovering(true);
        setCursorText('View');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Add event listeners for hover detection
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseout', handleElementLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseout', handleElementLeave);
    };
  }, [cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-50 w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors.secondary,
            left: trail.x - 4,
            top: trail.y - 4,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0.5,
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
          }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-8 h-8 border-2 rounded-full"
          style={{ borderColor: colors.secondary }}
          animate={{
            scale: isHovering ? 2 : 1,
            borderColor: isHovering ? colors.accent : colors.secondary,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Inner dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: colors.secondary }}
          animate={{
            scale: isHovering ? 0 : 1,
            backgroundColor: isHovering ? colors.accent : colors.secondary,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Cursor text */}
        {cursorText && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
            style={{
              backgroundColor: colors.card,
              color: colors.foreground,
              border: `1px solid ${colors.border}`,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>

      {/* Magnetic effect for hoverable elements */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-40 w-16 h-16 border border-opacity-30 rounded-full"
          style={{
            borderColor: colors.accent,
            x: cursorXSpring,
            y: cursorYSpring,
            marginLeft: -32,
            marginTop: -32,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </>
  );
}
