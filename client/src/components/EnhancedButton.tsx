import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow' | 'magnetic';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  magnetic?: boolean;
  glow?: boolean;
}

const LoadingSpinner = () => {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <motion.div
      className="w-4 h-4 border-2 border-transparent rounded-full"
      style={{ 
        borderTopColor: colors.foreground,
        borderRightColor: colors.foreground,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

export default function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon,
  loading = false,
  magnetic = false,
  glow = false,
}: EnhancedButtonProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    setMousePosition({ x: deltaX * 0.1, y: deltaY * 0.1 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const getVariantStyles = () => {
    const baseStyles = {
      position: 'relative' as const,
      overflow: 'hidden' as const,
      borderRadius: '0.75rem',
      fontWeight: '500',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: colors.gradient,
          color: colors.primary,
          boxShadow: glow ? `0 0 30px ${colors.secondary}40` : `0 4px 15px ${colors.secondary}20`,
        };
      
      case 'secondary':
        return {
          ...baseStyles,
          background: 'transparent',
          color: colors.secondary,
          border: `2px solid ${colors.secondary}`,
          boxShadow: glow ? `0 0 20px ${colors.secondary}30` : 'none',
        };
      
      case 'ghost':
        return {
          ...baseStyles,
          background: 'transparent',
          color: colors.foreground,
          border: `1px solid ${colors.border}`,
        };
      
      case 'glow':
        return {
          ...baseStyles,
          background: `linear-gradient(135deg, ${colors.card}90, ${colors.muted}90)`,
          color: colors.foreground,
          border: `1px solid ${colors.secondary}40`,
          boxShadow: `0 0 25px ${colors.secondary}30`,
          backdropFilter: 'blur(10px)',
        };
      
      case 'magnetic':
        return {
          ...baseStyles,
          background: colors.gradient,
          color: colors.primary,
          boxShadow: `0 8px 25px ${colors.secondary}30`,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        };
      
      default:
        return baseStyles;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
        };
      case 'lg':
        return {
          padding: '1rem 2rem',
          fontSize: '1.125rem',
        };
      default:
        return {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
        };
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: magnetic ? 1.05 : 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { 
      scale: 4, 
      opacity: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`gpu-accelerated ${className}`}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
      }}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      disabled={disabled || loading}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow effect */}
      {(glow || variant === 'glow') && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0"
          style={{ background: colors.gradient }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{ background: colors.secondary }}
        variants={rippleVariants}
        initial="initial"
        whileTap="animate"
      />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {icon && (
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
            )}
            <span>{children}</span>
          </>
        )}
      </div>

      {/* Shine effect */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          style={{ transform: 'translateX(-100%)' }}
          animate={{
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            opacity: isHovered ? 0.2 : 0,
          }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Magnetic field visualization */}
      {magnetic && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 opacity-30"
          style={{ borderColor: colors.secondary }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
}
