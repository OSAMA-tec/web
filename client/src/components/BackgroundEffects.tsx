import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useIsMobile } from '@/hooks/use-mobile';

interface BackgroundEffectsProps {
  variant?: 'particles' | 'geometric' | 'waves' | 'matrix' | 'neural';
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

export default function BackgroundEffects({
  variant = 'particles',
  intensity = 'medium',
  interactive = true,
  className = ''
}: BackgroundEffectsProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Performance-based particle count
  const getParticleCount = () => {
    const baseCount = {
      low: isMobile ? 15 : 30,
      medium: isMobile ? 25 : 50,
      high: isMobile ? 35 : 80
    };
    return baseCount[intensity];
  };

  // Initialize particles
  const initializeParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const count = getParticleCount();
    particlesRef.current = [];

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() * 360,
        life: 0,
        maxLife: Math.random() * 200 + 100
      });
    }
  };

  // Mouse tracking
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Canvas setup and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw based on variant
      switch (variant) {
        case 'particles':
          drawParticles(ctx, canvas);
          break;
        case 'geometric':
          drawGeometric(ctx, canvas);
          break;
        case 'waves':
          drawWaves(ctx, canvas);
          break;
        case 'matrix':
          drawMatrix(ctx, canvas);
          break;
        case 'neural':
          drawNeural(ctx, canvas);
          break;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, intensity, isVisible, theme]);

  // Particle system
  const drawParticles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const particles = particlesRef.current;
    
    particles.forEach((particle, index) => {
      // Update particle
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Interactive mouse attraction
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += dx * force * 0.001;
          particle.vy += dy * force * 0.001;
        }
      }

      // Apply velocity damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Draw particle with theme colors
      ctx.save();
      ctx.globalAlpha = particle.opacity * (1 - particle.life / particle.maxLife);
      
      // Create gradient based on theme
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, colors.secondary);
      gradient.addColorStop(0.5, colors.accent);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Reset particle if life exceeded
      if (particle.life > particle.maxLife) {
        particles[index] = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          hue: Math.random() * 360,
          life: 0,
          maxLife: Math.random() * 200 + 100
        };
      }
    });

    // Draw connections between nearby particles
    if (intensity !== 'low') {
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (100 - distance) / 100 * 0.3;
            ctx.strokeStyle = colors.secondary;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
    }
  };

  // Geometric patterns
  const drawGeometric = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * 0.001;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.save();
    ctx.translate(centerX, centerY);

    // Draw rotating geometric shapes
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate((time + i) * 0.1);
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = colors.secondary;
      ctx.lineWidth = 2;
      
      const radius = 100 + i * 50;
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = (j / 6) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  };

  // Wave patterns
  const drawWaves = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * 0.002;
    
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = i === 0 ? colors.secondary : i === 1 ? colors.accent : colors.secondary;
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + 
          Math.sin((x * 0.01) + (time * (i + 1))) * (50 + i * 20) +
          Math.sin((x * 0.02) + (time * (i + 1) * 1.5)) * (25 + i * 10);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.restore();
    }
  };

  // Matrix-style falling code
  const drawMatrix = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Implementation for matrix effect would go here
    // This is a simplified version
    ctx.save();
    ctx.fillStyle = colors.secondary + '20';
    ctx.font = '12px monospace';
    
    for (let i = 0; i < 20; i++) {
      const x = (i * canvas.width) / 20;
      const y = (Date.now() * 0.1 + i * 50) % canvas.height;
      ctx.fillText('01', x, y);
    }
    ctx.restore();
  };

  // Neural network visualization
  const drawNeural = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Implementation for neural network effect would go here
    // This is a simplified version
    const nodes = 8;
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < nodes; i++) {
      const x = (canvas.width / nodes) * i + canvas.width / (nodes * 2);
      const y = canvas.height / 2 + Math.sin(time + i) * 100;
      
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = colors.secondary;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  // Visibility control based on performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Additional CSS-based effects */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 animated-gradient"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${colors.secondary}10 0%, transparent 50%), 
                        radial-gradient(circle at 80% 50%, ${colors.accent}10 0%, transparent 50%)`
          }}
        />
      </div>
    </div>
  );
}
