import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

interface EnhancedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'glow' | 'floating';
  hover3D?: boolean;
  className?: string;
  onClick?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  gradient?: boolean;
  interactive?: boolean;
}

export default function EnhancedCard({
  children,
  variant = 'default',
  hover3D = false,
  className = '',
  onClick,
  header,
  footer,
  gradient = false,
  interactive = true,
}: EnhancedCardProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hover3D || !cardRef.current || !interactive) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    setMousePosition({ x: deltaX * 20, y: deltaY * 20 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: '1rem',
      overflow: 'hidden' as const,
      position: 'relative' as const,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    switch (variant) {
      case 'glass':
        return {
          ...baseStyles,
          background: `rgba(255, 255, 255, 0.1)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid rgba(255, 255, 255, 0.2)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        };
      
      case 'glow':
        return {
          ...baseStyles,
          background: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 0 30px ${colors.secondary}20, 0 8px 25px rgba(0, 0, 0, 0.1)`,
        };
      
      case 'floating':
        return {
          ...baseStyles,
          background: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        };
      
      default:
        return {
          ...baseStyles,
          background: gradient ? colors.gradient : colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        };
    }
  };

  const cardVariants = {
    initial: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
    },
    hover: { 
      scale: interactive ? 1.02 : 1,
      rotateX: hover3D ? mousePosition.y * -0.1 : 0,
      rotateY: hover3D ? mousePosition.x * 0.1 : 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const contentVariants = {
    initial: { opacity: 1 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`gpu-accelerated ${hover3D ? 'card-3d' : ''} ${className}`}
      style={{
        ...getVariantStyles(),
        perspective: hover3D ? '1000px' : 'none',
        transformStyle: hover3D ? 'preserve-3d' : 'flat',
        cursor: onClick ? 'pointer' : 'default',
      }}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Background gradient overlay */}
      {gradient && (
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{ background: colors.gradient }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Glow effect */}
      {variant === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0"
          style={{ 
            background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, ${colors.secondary}20, transparent 70%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shine effect */}
      {interactive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
          style={{ transform: 'translateX(-100%) skewX(-15deg)' }}
          animate={{
            transform: isHovered ? 'translateX(100%) skewX(-15deg)' : 'translateX(-100%) skewX(-15deg)',
            opacity: isHovered ? 0.1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}

      {/* Header */}
      {header && (
        <motion.div
          className="p-6 pb-0"
          variants={contentVariants}
        >
          {header}
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        className={`p-6 ${header ? 'pt-4' : ''} ${footer ? 'pb-4' : ''}`}
        variants={contentVariants}
        style={{ color: colors.foreground }}
      >
        {children}
      </motion.div>

      {/* Footer */}
      {footer && (
        <motion.div
          className="p-6 pt-0"
          variants={contentVariants}
        >
          {footer}
        </motion.div>
      )}

      {/* 3D depth indicator */}
      {hover3D && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg border opacity-20 pointer-events-none"
          style={{ 
            borderColor: colors.secondary,
            transform: 'translateZ(10px)',
          }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Floating particles for floating variant */}
      {variant === 'floating' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ 
                backgroundColor: colors.secondary,
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive ripple effect */}
      {onClick && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{ background: colors.secondary }}
          whileTap={{
            opacity: [0, 0.2, 0],
            scale: [0.95, 1, 0.95],
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
