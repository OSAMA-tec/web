import React from 'react';
import { motion } from 'framer-motion';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
  enableAnimations?: boolean;
  optimizeForTouch?: boolean;
}

export default function ResponsiveContainer({
  children,
  className = '',
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = '',
  enableAnimations = true,
  optimizeForTouch = true
}: ResponsiveContainerProps) {
  const { 
    isMobile, 
    isTablet, 
    isDesktop, 
    touchDevice, 
    screenSize,
    orientation,
    isLowPowerMode 
  } = useAdvancedMobile();

  // Build responsive classes
  const responsiveClasses = [
    className,
    isMobile && mobileClassName,
    isTablet && tabletClassName,
    isDesktop && desktopClassName,
    touchDevice && optimizeForTouch && 'touch-optimized',
    isLowPowerMode && 'low-power-mode',
    `screen-${screenSize}`,
    `orientation-${orientation}`
  ].filter(Boolean).join(' ');

  // Determine if animations should be enabled
  const shouldAnimate = enableAnimations && !isLowPowerMode;

  if (shouldAnimate) {
    return (
      <motion.div
        className={responsiveClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: isMobile ? 0.3 : 0.5,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={responsiveClasses}>
      {children}
    </div>
  );
}
