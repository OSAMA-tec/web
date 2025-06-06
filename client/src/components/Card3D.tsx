import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowEffect?: boolean;
  holographic?: boolean;
  floating?: boolean;
  onClick?: () => void;
}

export default function Card3D({
  children,
  className = '',
  intensity = 1,
  glowEffect = true,
  holographic = false,
  floating = false,
  onClick
}: Card3DProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15 * intensity, -15 * intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15 * intensity, 15 * intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        y: floating ? [0, -10, 0] : 0,
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* Main card */}
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: holographic 
            ? `linear-gradient(45deg, ${colors.secondary}20, ${colors.accent}20, ${colors.secondary}20)`
            : colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: glowEffect 
            ? `0 0 30px ${colors.secondary}20, 0 20px 40px rgba(0,0,0,0.1)`
            : `0 20px 40px rgba(0,0,0,0.1)`,
        }}
        animate={{
          boxShadow: isHovered && glowEffect
            ? `0 0 50px ${colors.secondary}40, 0 30px 60px rgba(0,0,0,0.2)`
            : glowEffect 
              ? `0 0 30px ${colors.secondary}20, 0 20px 40px rgba(0,0,0,0.1)`
              : `0 20px 40px rgba(0,0,0,0.1)`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Holographic overlay */}
        {holographic && (
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                ${mouseXSpring}deg,
                transparent 0%,
                ${colors.secondary}10 25%,
                ${colors.accent}20 50%,
                ${colors.secondary}10 75%,
                transparent 100%
              )`,
            }}
            animate={{
              opacity: isHovered ? 0.6 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              ${mouseXSpring}deg,
              transparent 0%,
              rgba(255,255,255,0.1) 50%,
              transparent 100%
            )`,
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 w-full h-full"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          {children}
        </motion.div>

        {/* Depth layers */}
        <motion.div
          className="absolute inset-2 rounded-lg border opacity-20 pointer-events-none"
          style={{
            borderColor: colors.secondary,
            transform: 'translateZ(10px)',
          }}
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute inset-4 rounded-lg border opacity-10 pointer-events-none"
          style={{
            borderColor: colors.accent,
            transform: 'translateZ(5px)',
          }}
          animate={{
            opacity: isHovered ? 0.2 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Floating particles */}
      {floating && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: colors.secondary,
                left: `${20 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 60}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                x: [0, Math.random() * 20 - 10, 0],
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

      {/* Reflection */}
      <motion.div
        className="absolute top-full left-0 right-0 h-full opacity-20 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${colors.card}, transparent)`,
          transform: 'rotateX(180deg) translateZ(-1px)',
          transformOrigin: 'top',
          maskImage: 'linear-gradient(to bottom, black, transparent 50%)',
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="transform scale-y-[-1]">
          {children}
        </div>
      </motion.div>

      {/* Ambient light */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouseXSpring}% ${mouseYSpring}%, ${colors.secondary}10, transparent 70%)`,
            transform: 'translateZ(-10px)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
