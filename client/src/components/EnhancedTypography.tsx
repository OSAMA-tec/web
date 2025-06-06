import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'code' | 'display';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  color?: 'primary' | 'secondary' | 'accent' | 'foreground' | 'muted';
  gradient?: boolean;
  glow?: boolean;
  animate?: boolean;
  className?: string;
}

const fontFamilies = {
  h1: 'var(--font-display)',
  h2: 'var(--font-display)',
  h3: 'var(--font-secondary)',
  h4: 'var(--font-secondary)',
  h5: 'var(--font-primary)',
  h6: 'var(--font-primary)',
  body: 'var(--font-primary)',
  caption: 'var(--font-primary)',
  code: 'var(--font-mono)',
  display: 'var(--font-display)',
};

const fontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

const defaultSizes = {
  h1: '6xl',
  h2: '5xl',
  h3: '4xl',
  h4: '3xl',
  h5: '2xl',
  h6: 'xl',
  body: 'base',
  caption: 'sm',
  code: 'sm',
  display: '8xl',
};

const defaultWeights = {
  h1: 'bold',
  h2: 'bold',
  h3: 'semibold',
  h4: 'semibold',
  h5: 'medium',
  h6: 'medium',
  body: 'normal',
  caption: 'normal',
  code: 'medium',
  display: 'black',
};

export default function EnhancedTypography({
  children,
  variant = 'body',
  weight,
  size,
  color = 'foreground',
  gradient = false,
  glow = false,
  animate = false,
  className = '',
}: TypographyProps) {
  const { getThemeColors, theme } = useTheme();
  const { isMobile, screenSize } = useAdvancedMobile();
  const colors = getThemeColors(theme);

  // Responsive size adjustments
  const getResponsiveSize = (baseSize: string) => {
    const sizeMap = {
      '9xl': isMobile ? '6xl' : screenSize === 'sm' ? '7xl' : '9xl',
      '8xl': isMobile ? '5xl' : screenSize === 'sm' ? '6xl' : '8xl',
      '7xl': isMobile ? '4xl' : screenSize === 'sm' ? '5xl' : '7xl',
      '6xl': isMobile ? '3xl' : screenSize === 'sm' ? '4xl' : '6xl',
      '5xl': isMobile ? '2xl' : screenSize === 'sm' ? '3xl' : '5xl',
      '4xl': isMobile ? 'xl' : screenSize === 'sm' ? '2xl' : '4xl',
      '3xl': isMobile ? 'lg' : screenSize === 'sm' ? 'xl' : '3xl',
      '2xl': isMobile ? 'base' : screenSize === 'sm' ? 'lg' : '2xl',
    };
    
    return sizeMap[baseSize as keyof typeof sizeMap] || baseSize;
  };

  const finalSize = size || defaultSizes[variant];
  const responsiveSize = getResponsiveSize(finalSize);
  const finalWeight = weight || defaultWeights[variant];

  const getColorValue = () => {
    switch (color) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'accent':
        return colors.accent;
      case 'foreground':
        return colors.foreground;
      case 'muted':
        return colors.muted;
      default:
        return colors.foreground;
    }
  };

  const baseStyles = {
    fontFamily: fontFamilies[variant],
    fontWeight: fontWeights[finalWeight],
    fontSize: fontSizes[responsiveSize as keyof typeof fontSizes],
    lineHeight: variant.startsWith('h') ? '1.2' : '1.6',
    color: gradient ? 'transparent' : getColorValue(),
    background: gradient ? colors.gradient : 'transparent',
    backgroundClip: gradient ? 'text' : 'initial',
    WebkitBackgroundClip: gradient ? 'text' : 'initial',
    textShadow: glow ? `0 0 20px ${getColorValue()}, 0 0 40px ${getColorValue()}` : 'none',
  };

  const Component = variant === 'body' || variant === 'caption' || variant === 'code' ? 'span' : variant;

  const animationVariants = {
    hidden: { 
      opacity: 0, 
      y: variant.startsWith('h') ? 30 : 20,
      scale: variant.startsWith('h') ? 0.95 : 1,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    },
  };

  if (animate) {
    return (
      <motion.div
        className={`enhanced-typography ${className}`}
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        style={baseStyles}
      >
        {React.createElement(Component, {}, children)}
      </motion.div>
    );
  }

  return React.createElement(
    Component,
    {
      className: `enhanced-typography ${className}`,
      style: baseStyles,
    },
    children
  );
}

// Specialized typography components
export const DisplayText = ({ children, ...props }: Omit<TypographyProps, 'variant'>) => (
  <EnhancedTypography variant="display" gradient glow animate {...props}>
    {children}
  </EnhancedTypography>
);

export const Heading1 = ({ children, ...props }: Omit<TypographyProps, 'variant'>) => (
  <EnhancedTypography variant="h1" animate {...props}>
    {children}
  </EnhancedTypography>
);

export const Heading2 = ({ children, ...props }: Omit<TypographyProps, 'variant'>) => (
  <EnhancedTypography variant="h2" animate {...props}>
    {children}
  </EnhancedTypography>
);

export const Heading3 = ({ children, ...props }: Omit<TypographyProps, 'variant'>) => (
  <EnhancedTypography variant="h3" animate {...props}>
    {children}
  </EnhancedTypography>
);

export const BodyText = ({ children, ...props }: Omit<TypographyProps, 'variant'>) => (
  <EnhancedTypography variant="body" {...props}>
    {children}
  </EnhancedTypography>
);

export const CodeText = ({ children, ...props }: Omit<TypographyProps, 'variant'>) => (
  <EnhancedTypography variant="code" color="secondary" {...props}>
    {children}
  </EnhancedTypography>
);

export const CaptionText = ({ children, ...props }: Omit<TypographyProps, 'variant'>) => (
  <EnhancedTypography variant="caption" color="muted" {...props}>
    {children}
  </EnhancedTypography>
);

// Utility hook for typography
export const useTypography = () => {
  const { isMobile, screenSize } = useAdvancedMobile();
  
  const getResponsiveSize = (baseSize: string) => {
    if (isMobile) {
      const mobileMap: Record<string, string> = {
        '9xl': '5xl',
        '8xl': '4xl',
        '7xl': '3xl',
        '6xl': '2xl',
        '5xl': 'xl',
        '4xl': 'lg',
        '3xl': 'base',
      };
      return mobileMap[baseSize] || baseSize;
    }
    return baseSize;
  };

  return { getResponsiveSize, isMobile, screenSize };
};
