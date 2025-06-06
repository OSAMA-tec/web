import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, X, Download, Share2, Settings, Palette,
  Zap, Eye, Code, MessageCircle, Heart, Star
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface FloatingAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
  color?: string;
}

interface FloatingActionMenuProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  variant?: 'circular' | 'linear' | 'grid';
  className?: string;
}

export default function FloatingActionMenu({
  position = 'bottom-right',
  variant = 'circular',
  className = ''
}: FloatingActionMenuProps) {
  const { getThemeColors, theme, toggleTheme } = useTheme();
  const { isMobile, isTablet, touchDevice } = useAdvancedMobile();
  const colors = getThemeColors(theme);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const actions: FloatingAction[] = [
    {
      id: 'theme',
      icon: <Palette size={20} />,
      label: 'Change Theme',
      action: toggleTheme,
      color: colors.secondary
    },
    {
      id: 'download',
      icon: <Download size={20} />,
      label: 'Download Resume',
      action: () => {
        // Create a download link for resume
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Osama_Hashmi_Resume.pdf';
        link.click();
      },
      color: colors.accent
    },
    {
      id: 'share',
      icon: <Share2 size={20} />,
      label: 'Share Portfolio',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Osama Hashmi - Portfolio',
            text: 'Check out my portfolio!',
            url: window.location.href,
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          // You could add a toast notification here
        }
      },
      color: '#10b981'
    },
    {
      id: 'contact',
      icon: <MessageCircle size={20} />,
      label: 'Quick Contact',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
      color: '#f59e0b'
    },
    {
      id: 'like',
      icon: <Heart size={20} />,
      label: 'Like Portfolio',
      action: () => {
        // Add like functionality
        console.log('Portfolio liked!');
      },
      color: '#ef4444'
    },
    {
      id: 'performance',
      icon: <Zap size={20} />,
      label: 'Performance Monitor',
      action: () => {
        // Toggle performance monitor
        const event = new KeyboardEvent('keydown', {
          key: 'P',
          ctrlKey: true,
          shiftKey: true
        });
        window.dispatchEvent(event);
      },
      color: '#8b5cf6'
    }
  ];

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const getActionPosition = (index: number, total: number) => {
    // Adjust spacing for mobile devices
    const spacing = isMobile ? 50 : isTablet ? 55 : 60;
    const radius = isMobile ? 60 : isTablet ? 70 : 80;

    switch (variant) {
      case 'circular':
        const angle = (index / total) * Math.PI * 1.5 - Math.PI * 0.25;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        };
      case 'linear':
        return {
          x: 0,
          y: -(index + 1) * spacing
        };
      case 'grid':
        const cols = Math.ceil(Math.sqrt(total));
        const row = Math.floor(index / cols);
        const col = index % cols;
        return {
          x: (col - cols / 2 + 0.5) * spacing,
          y: -(row + 1) * spacing
        };
      default:
        return { x: 0, y: -(index + 1) * spacing };
    }
  };

  const mainButtonVariants = {
    closed: { 
      rotate: 0,
      scale: 1,
    },
    open: { 
      rotate: 45,
      scale: 1.1,
    }
  };

  const actionVariants = {
    closed: { 
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    open: (i: number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    })
  };

  const labelVariants = {
    hidden: { opacity: 0, x: 10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 ${className}`}>
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && actions.map((action, index) => {
          const position = getActionPosition(index, actions.length);
          const isHovered = hoveredAction === action.id;
          
          return (
            <motion.div
              key={action.id}
              className="absolute"
              style={{
                x: position.x,
                y: position.y,
              }}
              variants={actionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              custom={index}
            >
              {/* Action button */}
              <motion.button
                className={`relative ${isMobile ? 'w-14 h-14' : 'w-12 h-12'} rounded-full shadow-lg backdrop-blur-md flex items-center justify-center touch-optimized`}
                style={{
                  backgroundColor: `${action.color || colors.secondary}20`,
                  border: `2px solid ${action.color || colors.secondary}40`,
                  color: action.color || colors.secondary,
                }}
                onClick={action.action}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                whileHover={{ 
                  scale: 1.2,
                  backgroundColor: `${action.color || colors.secondary}30`,
                  boxShadow: `0 0 20px ${action.color || colors.secondary}40`
                }}
                whileTap={{ scale: 0.9 }}
                data-cursor-text={action.label}
              >
                {action.icon}
                
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: action.color || colors.secondary }}
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileTap={{
                    scale: 2,
                    opacity: 0,
                    transition: { duration: 0.4 }
                  }}
                />
              </motion.button>

              {/* Label */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap"
                    style={{
                      backgroundColor: colors.card,
                      color: colors.foreground,
                      border: `1px solid ${colors.border}`,
                      boxShadow: `0 4px 12px ${colors.primary}20`
                    }}
                    variants={labelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {action.label}
                    
                    {/* Arrow */}
                    <div
                      className="absolute left-full top-1/2 transform -translate-y-1/2 w-2 h-2 rotate-45"
                      style={{ 
                        backgroundColor: colors.card,
                        border: `1px solid ${colors.border}`,
                        borderLeft: 'none',
                        borderBottom: 'none'
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        className={`relative ${isMobile ? 'w-16 h-16' : 'w-14 h-14'} rounded-full shadow-xl backdrop-blur-md flex items-center justify-center touch-optimized`}
        style={{
          background: colors.gradient,
          color: colors.primary,
          boxShadow: `0 4px 20px ${colors.secondary}30`
        }}
        variants={mainButtonVariants}
        animate={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ 
          scale: 1.1,
          boxShadow: `0 6px 25px ${colors.secondary}40`
        }}
        whileTap={{ scale: 0.95 }}
        data-cursor-text={isOpen ? "Close Menu" : "Open Menu"}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </motion.div>

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${colors.secondary}` }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Background particles */}
        {isOpen && (
          <div className="absolute inset-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: colors.primary }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x: Math.cos((i / 6) * Math.PI * 2) * 30,
                  y: Math.sin((i / 6) * Math.PI * 2) * 30,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </div>
        )}
      </motion.button>

      {/* Background blur when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 -z-10"
            style={{ backgroundColor: `${colors.primary}10` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
