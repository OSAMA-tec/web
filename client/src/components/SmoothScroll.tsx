import { useEffect, useRef, ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

interface SmoothScrollProps {
  children: ReactNode;
  className?: string;
}

export default function SmoothScroll({ children, className = "" }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const { theme, getThemeColors } = useTheme();
  const colors = getThemeColors(theme);

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax effects
  const y1 = useTransform(smoothProgress, [0, 1], [0, -50]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -150]);

  // Simplified scroll behavior - remove custom wheel handling that causes conflicts
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Simple smooth scroll setup
    container.style.scrollBehavior = 'smooth';
    container.style.overflowY = 'auto';
    container.style.height = '100vh';
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{
          scaleX: smoothProgress,
          background: colors.gradient
        }}
      />

      {/* Simplified parallax background layers */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{ y: y1 }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${colors.secondary}20, ${colors.accent}20)` }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg backdrop-blur-sm z-40"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
          boxShadow: `0 4px 20px ${colors.secondary}20`
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollYProgress.get() > 0.1 ? 1 : 0,
          scale: scrollYProgress.get() > 0.1 ? 1 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          containerRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke={colors.secondary}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
}
