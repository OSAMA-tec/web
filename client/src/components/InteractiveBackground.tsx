import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface InteractiveBackgroundProps {
  variant?: 'neural' | 'constellation' | 'fluid' | 'geometric' | 'quantum';
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  connections: number[];
  energy: number;
}

export default function InteractiveBackground({
  variant = 'neural',
  intensity = 'medium',
  interactive = true,
  className = ''
}: InteractiveBackgroundProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const { isMobile, isTablet, isLowPowerMode, devicePixelRatio } = useAdvancedMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Ultra-optimized configuration based on device capabilities
  const config = {
    low: {
      nodes: isMobile ? 8 : isTablet ? 15 : 25,
      connections: 2,
      speed: 0.2,
      quality: 0.3,
      renderDistance: 80
    },
    medium: {
      nodes: isMobile ? 12 : isTablet ? 20 : 35,
      connections: 3,
      speed: 0.4,
      quality: 0.6,
      renderDistance: 100
    },
    high: {
      nodes: isMobile ? 16 : isTablet ? 25 : 45,
      connections: 4,
      speed: 0.6,
      quality: 0.9,
      renderDistance: 120
    }
  };

  // Adjust intensity based on device performance
  let adjustedIntensity = intensity;
  if (isLowPowerMode) {
    adjustedIntensity = 'low';
  } else if (isMobile && intensity === 'high') {
    adjustedIntensity = 'medium';
  }

  const currentConfig = config[adjustedIntensity];

  // Initialize nodes
  const initializeNodes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    nodesRef.current = [];
    for (let i = 0; i < currentConfig.nodes; i++) {
      nodesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * currentConfig.speed,
        vy: (Math.random() - 0.5) * currentConfig.speed,
        size: Math.random() * 4 + 2,
        connections: [],
        energy: Math.random()
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNodes();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (variant) {
        case 'neural':
          drawNeural(ctx, canvas);
          break;
        case 'constellation':
          drawConstellation(ctx, canvas);
          break;
        case 'fluid':
          drawFluid(ctx, canvas);
          break;
        case 'geometric':
          drawGeometric(ctx, canvas);
          break;
        case 'quantum':
          drawQuantum(ctx, canvas);
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

  const drawNeural = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const nodes = nodesRef.current;
    const time = Date.now() * 0.001;

    // Update nodes
    nodes.forEach((node, i) => {
      node.x += node.vx;
      node.y += node.vy;
      node.energy = Math.sin(time + i) * 0.5 + 0.5;

      // Boundary wrapping
      if (node.x < 0) node.x = canvas.width;
      if (node.x > canvas.width) node.x = 0;
      if (node.y < 0) node.y = canvas.height;
      if (node.y > canvas.height) node.y = 0;

      // Mouse interaction
      if (interactive) {
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          node.vx += dx * force * 0.001;
          node.vy += dy * force * 0.001;
          node.energy = Math.min(1, node.energy + force * 0.1);
        }
      }

      // Velocity damping
      node.vx *= 0.99;
      node.vy *= 0.99;
    });

    // Optimized connection drawing with distance culling
    const renderDistance = currentConfig.renderDistance;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const otherNode = nodes[j];
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < renderDistance) {
          const opacity = (renderDistance - distance) / renderDistance;
          const energy = (node.energy + otherNode.energy) / 2;

          // Only draw if opacity is significant
          if (opacity > 0.1) {
            ctx.save();
            ctx.globalAlpha = opacity * energy * currentConfig.quality;
            ctx.strokeStyle = colors.secondary;
            ctx.lineWidth = Math.max(0.5, energy * 1.5);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            ctx.restore();

            // Energy pulse (only for high energy and close distance)
            if (energy > 0.8 && distance < renderDistance * 0.6) {
              const midX = (node.x + otherNode.x) / 2;
              const midY = (node.y + otherNode.y) / 2;

              ctx.save();
              ctx.globalAlpha = energy * currentConfig.quality;
              ctx.fillStyle = colors.accent;
              ctx.beginPath();
              ctx.arc(midX, midY, 1.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }
    }

    // Optimized node rendering
    nodes.forEach(node => {
      if (node.energy > 0.1) { // Only render visible nodes
        ctx.save();
        ctx.globalAlpha = node.energy * currentConfig.quality;

        // Simplified glow for performance
        if (currentConfig.quality > 0.5) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.size * 2.5
          );
          gradient.addColorStop(0, colors.secondary);
          gradient.addColorStop(1, 'transparent');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core node
        ctx.fillStyle = colors.secondary;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    });
  };

  const drawConstellation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const nodes = nodesRef.current;
    const time = Date.now() * 0.0005;

    nodes.forEach((node, i) => {
      // Slow orbital movement
      node.x += Math.sin(time + i) * 0.2;
      node.y += Math.cos(time + i * 0.7) * 0.2;
      
      // Twinkle effect
      node.energy = Math.sin(time * 3 + i) * 0.3 + 0.7;

      // Draw star
      ctx.save();
      ctx.globalAlpha = node.energy;
      ctx.fillStyle = colors.secondary;
      
      // Star shape
      const spikes = 5;
      const outerRadius = node.size;
      const innerRadius = node.size * 0.4;
      
      ctx.beginPath();
      for (let j = 0; j < spikes * 2; j++) {
        const radius = j % 2 === 0 ? outerRadius : innerRadius;
        const angle = (j * Math.PI) / spikes;
        const x = node.x + Math.cos(angle) * radius;
        const y = node.y + Math.sin(angle) * radius;
        
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      
      // Glow
      ctx.shadowColor = colors.secondary;
      ctx.shadowBlur = 10;
      ctx.fill();
      
      ctx.restore();
    });

    // Draw constellation lines
    nodes.forEach((node, i) => {
      if (i < nodes.length - 1) {
        const nextNode = nodes[i + 1];
        const distance = Math.sqrt(
          Math.pow(node.x - nextNode.x, 2) + Math.pow(node.y - nextNode.y, 2)
        );
        
        if (distance < 200) {
          ctx.save();
          ctx.globalAlpha = 0.3;
          ctx.strokeStyle = colors.secondary;
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nextNode.x, nextNode.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    });
  };

  const drawFluid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * 0.002;
    
    // Create fluid-like blobs
    for (let i = 0; i < 5; i++) {
      const x = canvas.width * 0.5 + Math.sin(time + i) * 200;
      const y = canvas.height * 0.5 + Math.cos(time * 0.7 + i) * 150;
      const size = 100 + Math.sin(time * 2 + i) * 50;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, `${colors.secondary}30`);
      gradient.addColorStop(0.5, `${colors.accent}20`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.save();
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  const drawGeometric = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * 0.001;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw rotating geometric shapes
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * (i + 1) * 0.1);
      
      const size = 50 + i * 30;
      const sides = 3 + i;
      
      ctx.strokeStyle = `${colors.secondary}${Math.floor(255 * (0.1 + i * 0.1)).toString(16)}`;
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      for (let j = 0; j < sides; j++) {
        const angle = (j / sides) * Math.PI * 2;
        const x = Math.cos(angle) * size;
        const y = Math.sin(angle) * size;
        
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      
      ctx.restore();
    }
  };

  const drawQuantum = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const time = Date.now() * 0.003;
    
    // Quantum field visualization
    const gridSize = 50;
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        const wave = Math.sin((x + y) * 0.01 + time) * 0.5 + 0.5;
        const size = wave * 10;
        
        if (size > 2) {
          ctx.save();
          ctx.globalAlpha = wave * 0.3;
          ctx.fillStyle = colors.secondary;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }
  };

  // Visibility control
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
        className="w-full h-full opacity-40"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Additional overlay effects */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${colors.secondary}15 0%, transparent 50%), 
                        radial-gradient(circle at 70% 60%, ${colors.accent}15 0%, transparent 50%)`,
          }}
          animate={{
            background: [
              `radial-gradient(circle at 30% 40%, ${colors.secondary}15 0%, transparent 50%), 
               radial-gradient(circle at 70% 60%, ${colors.accent}15 0%, transparent 50%)`,
              `radial-gradient(circle at 70% 40%, ${colors.secondary}15 0%, transparent 50%), 
               radial-gradient(circle at 30% 60%, ${colors.accent}15 0%, transparent 50%)`,
              `radial-gradient(circle at 30% 40%, ${colors.secondary}15 0%, transparent 50%), 
               radial-gradient(circle at 70% 60%, ${colors.accent}15 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
