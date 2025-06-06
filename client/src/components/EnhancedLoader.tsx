import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

interface EnhancedLoaderProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
  variant?: 'minimal' | 'detailed' | 'particles';
}

const LoadingParticle = ({ delay = 0 }: { delay?: number }) => {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: colors.secondary }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const MinimalLoader = () => {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: colors.secondary }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const DetailedLoader = ({ progress = 0, message = "Loading..." }: { progress?: number; message?: string }) => {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <div className="text-center space-y-6">
      {/* Animated logo/icon */}
      <motion.div
        className="relative w-20 h-20 mx-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div 
          className="w-full h-full rounded-full border-4 border-transparent"
          style={{ 
            borderTopColor: colors.secondary,
            borderRightColor: colors.accent,
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{ backgroundColor: colors.secondary }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 mx-auto">
        <div 
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: colors.muted }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: colors.gradient }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm" style={{ color: colors.foreground }}>
          <span>{message}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Loading text with typing effect */}
      <motion.div
        className="text-lg font-mono"
        style={{ color: colors.secondary }}
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {message}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          _
        </motion.span>
      </motion.div>
    </div>
  );
};

const ParticlesLoader = () => {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Central core */}
      <motion.div
        className="absolute inset-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: colors.accent }}
        animate={{
          scale: [1, 1.5, 1],
          boxShadow: [
            `0 0 20px ${colors.accent}`,
            `0 0 40px ${colors.accent}`,
            `0 0 20px ${colors.accent}`
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orbiting particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: colors.secondary,
            left: '50%',
            top: '50%',
            transformOrigin: '0 60px',
          }}
          animate={{
            rotate: 360,
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }
          }}
        />
      ))}

      {/* Random floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <LoadingParticle key={i} delay={i * 0.1} />
      ))}
    </div>
  );
};

export default function EnhancedLoader({ 
  isLoading, 
  progress = 0, 
  message = "Loading...", 
  variant = 'detailed' 
}: EnhancedLoaderProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const renderLoader = () => {
    switch (variant) {
      case 'minimal':
        return <MinimalLoader />;
      case 'particles':
        return <ParticlesLoader />;
      default:
        return <DetailedLoader progress={displayProgress} message={message} />;
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ 
            background: `linear-gradient(135deg, ${colors.background}95, ${colors.primary}95)`,
            backdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {renderLoader()}
          </motion.div>

          {/* Background pattern */}
          <div 
            className="absolute inset-0 opacity-10 circuit-pattern"
            style={{ 
              backgroundImage: `radial-gradient(${colors.secondary} 1px, transparent 1px)`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
